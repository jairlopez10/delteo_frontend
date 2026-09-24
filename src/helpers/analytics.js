// Punto único de envío de eventos a GA4 (gtag) y Meta Pixel (fbq).
//
// - Los scripts base y el page_view / PageView automáticos viven en index.html.
//   El Pixel ya manda PageView en cada cambio de ruta, así que aquí no se repite.
// - Ningún componente llama a gtag ni a fbq directamente: todo pasa por track().
// - Si un script está bloqueado o falla, la compra sigue.
// - A GA4 nunca se le manda nombre, celular, cédula, dirección ni email.
// - Purchase es el único evento que también sale del servidor (Meta CAPI). Comparte
//   eventID con el del Pixel para que Meta los deduplique.

import productosdb from "../components/Productosdb"

export const MONEDA = 'COP'

const ENVIO = { pequeno: 10000, grande: 20000 }

// Precio que se cobra en la tienda: el del catálogo con el envío incluido
export const precioVenta = producto =>
  producto.precio + (producto.precio >= 20000 ? ENVIO.grande : ENVIO.pequeno)

/*
track('add_to_cart', { value, items }, { nombre: 'AddToCart', datos: {...}, eventID })
El tercer parámetro es opcional: sin él, el evento va solo a GA4.
*/
export const track = (evento, params = {}, meta) => {
  // currency solo acompaña a un value (eventos de ecommerce)
  const datosGA4 = 'value' in params ? { currency: MONEDA, ...params } : params
  try {
    window.gtag?.('event', evento, datosGA4)
  } catch (error) {
    console.warn('[GA4]', evento, error)
  }

  if (meta) {
    try {
      window.fbq?.(
        'track',
        meta.nombre,
        { currency: MONEDA, ...meta.datos },
        meta.eventID ? { eventID: meta.eventID } : undefined
      )
    } catch (error) {
      console.warn('[Meta]', meta.nombre, error)
    }
  }

  if (import.meta.env.DEV) console.debug('[analytics]', evento, datosGA4, meta || '')
}

// ------------------------------------------------------------------ items GA4

// Item de GA4 a partir de un producto de Productosdb
export const itemDesdeProducto = (producto, extra = {}) => {
  const item = {
    item_id: String(producto.id),
    item_name: producto.titulo,
    price: precioVenta(producto),
    quantity: 1,
    ...extra
  }
  if (producto.categoria) item.item_category = producto.categoria
  return item
}

// Producto al que pertenece un item del carrito. Los carritos guardados antes de
// agregar idproducto se resuelven por nombre ("Título" o "Título (Variante)").
const productoDeItemCarrito = item => {
  if (item.idproducto != null) return productosdb.find(producto => producto.id === Number(item.idproducto))
  return productosdb.find(producto => producto.titulo === item.nombre && !Array.isArray(producto.colores)) ||
    productosdb.find(producto => Array.isArray(producto.colores) &&
      producto.colores.some(opcion => opcion.id === item.id) &&
      item.nombre?.startsWith(`${producto.titulo} (`))
}

const varianteDeNombre = (nombre, producto) =>
  producto && nombre?.startsWith(`${producto.titulo} (`) ? nombre.slice(producto.titulo.length + 2, -1) : undefined

// Item de GA4 a partir de un item del carrito (precio y cantidad reales del carrito)
export const itemDesdeCarrito = item => {
  const producto = productoDeItemCarrito(item)
  const variante = item.variante || varianteDeNombre(item.nombre, producto)
  const itemGA4 = {
    item_id: String(producto?.id ?? item.idproducto ?? item.id),
    item_name: producto?.titulo || item.nombre,
    price: Number(item.precio),
    quantity: Number(item.cantidad)
  }
  if (producto?.categoria) itemGA4.item_category = producto.categoria
  if (variante) itemGA4.item_variant = variante
  return itemGA4
}

export const itemsDesdeCarrito = carrito => carrito.map(itemDesdeCarrito)

// Items que devuelve el backend: { id, idproducto, nombre, cantidad, preciounitario }
export const itemsDesdeBackend = items => items.map(item => itemDesdeCarrito({
  id: item.id,
  idproducto: item.idproducto,
  nombre: item.nombre,
  cantidad: item.cantidad,
  precio: item.preciounitario
}))

export const valorItems = items => items.reduce((suma, item) => suma + item.price * item.quantity, 0)

// Parámetros de Meta a partir de items de GA4 (mismo id de producto en los dos)
export const datosMeta = items => ({
  content_type: 'product',
  content_ids: [...new Set(items.map(item => item.item_id))],
  contents: items.map(item => ({ id: item.item_id, quantity: item.quantity })),
  num_items: items.reduce((suma, item) => suma + item.quantity, 0)
})

// ------------------------------------------------------------------ Purchase

// Mismo formato que el backend (helpers/metacapi.js): así Meta deduplica Pixel + CAPI
export const eventIdPurchase = idPedido => `purchase_${idPedido}`

// ------------------------------------------------------------- una sola vez

// Marca persistente en la pestaña: sobrevive a recargas y a salir y volver
export const yaOcurrio = clave => {
  try {
    return sessionStorage.getItem(`delteo_evento_${clave}`) === '1'
  } catch {
    return false
  }
}

export const marcarOcurrido = clave => {
  try {
    sessionStorage.setItem(`delteo_evento_${clave}`, '1')
  } catch {
    // Sin sessionStorage el guard queda solo en memoria (useRef del componente)
  }
}

// ------------------------------------------------------------- atribución

const leerCookie = nombre => {
  const encontrada = document.cookie.split('; ').find(cookie => cookie.startsWith(`${nombre}=`))
  return encontrada ? decodeURIComponent(encontrada.slice(nombre.length + 1)) : undefined
}

// Cookies del Pixel (_fbp, _fbc) para que el Purchase de CAPI quede atribuido a esta
// visita y al clic del anuncio. El backend guarda la URL sin query.
export const leerAtribucion = () => {
  try {
    return { fbp: leerCookie('_fbp'), fbc: leerCookie('_fbc'), url: window.location.href }
  } catch {
    return {}
  }
}
