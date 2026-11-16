import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import productosdb from "../components/Productosdb"
import productoscontenido from "../components/Productoscontenido"
import usePagina from "../hooks/usePagina"
import Galeriaproducto from "../components/Galeriaproducto"
import Bottomsheet from "../components/Bottomsheet"
import Estimadorentrega from "../components/Estimadorentrega"
import Relacionados from "../components/Relacionados"
import Icono from "../components/Icono"
import { imagenPrincipal } from "../helpers/imagenes"
import Videodestacado from "../components/Videodestacado"
import Opiniones from "../components/Opiniones"
import Bumporvis from "../components/Bumporvis"
import { datosMeta, itemDesdeProducto, track } from "../helpers/analytics"
import useBlackfriday from "../hooks/useBlackfriday"
import { campana, precioAntes, textoPorcentaje } from "../helpers/blackfriday"

const envio = {
  pequeno: 10000,
  grande: 20000
}
const idlanzadorashidrogel = [376, 395, 401, 375]
const ID_ORVIS = 362
const etiquetasBadge = { 'mas-pedido': 'Más pedido', nuevo: 'Nuevo' }
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
/*
Bloque "Envío a tu municipio" + "Pagas al recibir" de la ficha: oculto a pedido de Jair.
El código se queda; para volver a mostrarlo basta con poner esto en true.
*/
const MOSTRAR_ENTREGA_Y_PAGO = false

const formatoPrecio = valor => `$${Number(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`

const leerCarrito = () => {
  try {
    return JSON.parse(localStorage.getItem('carritojammy')) || []
  } catch {
    return []
  }
}

const Producto = () => {
  const { titulo, tipocliente } = useParams()
  // La key hace que la página arranque de cero al pasar a otro producto (relacionados)
  return <Paginaproducto key={`${titulo}/${tipocliente}`} tituloUrl={titulo} tipocliente={tipocliente} />
}

const Paginaproducto = ({ tituloUrl, tipocliente }) => {

  const { setpagina, setContador } = usePagina()
  const navigate = useNavigate()
  const blackfriday = useBlackfriday()

  //Remplaza las - por espacios para buscar el titulo
  const titulo = tituloUrl.replace(/-/g, " ")
  const producto = productosdb.find(product => product.titulo === titulo)
  const contenido = (producto && productoscontenido[producto.id]) || {}
  const nombre = contenido.nombre || producto?.titulo
  const esMayorista = tipocliente === "m"
  const variantes = Array.isArray(producto?.colores) ? producto.colores : null

  const [variante, setVariante] = useState(variantes?.length === 1 ? variantes[0] : null)
  const [sheetVariante, setSheetVariante] = useState(false)
  const [compraPendiente, setCompraPendiente] = useState(false)
  const [popupOrvis, setPopupOrvis] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(true)
  const ctaRef = useRef(null)
  const vistaReportada = useRef(false)

  const cerrarSheetVariante = useCallback(() => {
    setSheetVariante(false)
    setCompraPendiente(false)
  }, [])

  useEffect(() => {
    setpagina(esMayorista ? 'mayoristaproducto' : 'producto')
    document.title = esMayorista ? `${titulo} (${tipocliente})` : titulo
    window.scrollTo(0, 0)
    setContador(leerCarrito().length)

    /*
    view_item / ViewContent: una vez por visualización. La página se vuelve a montar al
    cambiar de producto (key en Producto), así que entrar de nuevo al mismo producto más
    tarde sí genera otro evento; un re-render no, por el ref.
    */
    if (producto && !vistaReportada.current) {
      vistaReportada.current = true
      const item = itemDesdeProducto(producto)
      track('view_item', { value: item.price, items: [item] }, {
        nombre: 'ViewContent',
        datos: { ...datosMeta([item]), content_name: producto.titulo, value: item.price }
      })
    }
    // Solo al montar la página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // La barra sticky se oculta mientras el botón de la página está en pantalla
  useEffect(() => {
    const cta = ctaRef.current
    if (!cta) return
    const observer = new IntersectionObserver(entries => setCtaVisible(entries[0].isIntersecting))
    observer.observe(cta)
    return () => observer.disconnect()
  }, [])

  if (!producto) {
    return (
      <div className="pdp pdp-no-encontrado">
        <h1 className="pdp-titulo">No encontramos este juguete</h1>
        <p>Puede que el enlace haya cambiado. Mira los juguetes que tenemos disponibles.</p>
        <Link to="/" className="pdp-boton">Ver juguetes</Link>
      </div>
    )
  }

  const precioConEnvio = producto.precio >= 20000 ? producto.precio + envio.grande : producto.precio + envio.pequeno
  const precioVisible = esMayorista ? producto.preciomayorista : precioConEnvio
  const edad = producto.edad2?.replace(/\D/g, '')
  const badges = (contenido.badges || []).filter(badge => etiquetasBadge[badge]).slice(0, 2)
  const mostrarRating = contenido.rating && contenido.rating.total >= 5
  const finPromo = contenido.promoHasta ? new Date(`${contenido.promoHasta}T23:59:59-05:00`) : null
  const promoActiva = !esMayorista && contenido.precioAnterior > precioConEnvio && finPromo && finPromo >= new Date()
  /*
  Black Friday: el precio de hoy ya trae el descuento, así que el tachado se calcula
  hacia arriba. Un precioAnterior escrito a mano en Productoscontenido manda sobre el cálculo.
  */
  const bfActivo = blackfriday.activo && !esMayorista
  const antesBf = bfActivo ? (contenido.precioAnterior || precioAntes(precioConEnvio)) : null
  const bump = idlanzadorashidrogel.includes(producto.id)
    ? productosdb.find(item => item.id === ID_ORVIS && item.status === 'disponible')
    : null
  const orvisEnCarrito = bump ? leerCarrito().some(item => item.id === bump.id) : false
  const caracteristicas = Array.isArray(producto.descripcion)
    ? producto.descripcion.filter(item => item.trim() !== '')
    : []
  const descripcionTexto = typeof producto.descripcion === 'string' ? producto.descripcion.trim() : ''

  const preguntas = [
    ...(contenido.faq || []),
    { pregunta: '¿Cuándo llega?', respuesta: 'Lo enviamos gratis a toda Colombia con Inter Rapidísimo. Elige tu ciudad junto al precio para ver la fecha estimada de entrega.' },
    { pregunta: '¿Cómo pago?', respuesta: 'Pagas en efectivo cuando lo recibes. Antes de despacharlo te escribimos por WhatsApp para confirmar tu pedido.' },
    { pregunta: '¿Qué pasa si llega con falla?', respuesta: 'Tiene garantía de 1 mes. Escríbenos por WhatsApp y te ayudamos con el cambio.' },
    edad && { pregunta: '¿Para qué edad es?', respuesta: `Lo recomendamos a partir de los ${edad} años.` }
  ].filter(Boolean)

  const agregaralcarrito = (opcion, cantidadBump = 0) => {

    //Se crean estos temps por si son productos que tienen variantes
    const nombretemp = opcion ? `${producto.titulo} (${opcion.texto})` : producto.titulo
    const idtemp = opcion ? opcion.id : producto.id
    const cantidad = 1

    const carrito = leerCarrito()
    const existe = carrito.some(item => item.id === idtemp)

    const nuevocarrito = existe
      ? carrito.map(item => item.id === idtemp ? { ...item, cantidad: Number(item.cantidad) + cantidad } : item)
      : [...carrito, {
          id: idtemp,
          // idproducto y variante: para reportar el producto (no la variante) en GA4 y Meta
          idproducto: producto.id,
          variante: opcion?.texto,
          nombre: nombretemp,
          cantidad,
          precio: precioConEnvio,
          imagen: imagenPrincipal(producto)
        }]

    // Items del evento: el producto (con su variante) y el bump si se agrega ahora.
    // price es el precio que se cobra en el carrito, con el envío incluido.
    const itemsEvento = [itemDesdeProducto(producto, {
      price: precioConEnvio,
      quantity: cantidad,
      ...(opcion ? { item_variant: opcion.texto } : {})
    })]

    // Orvis del pop-up: se agregan si la persona tocó "Agregar" y no estaban ya en el carrito
    if (bump && cantidadBump > 0 && !nuevocarrito.some(item => item.id === bump.id)) {
      nuevocarrito.push({
        id: bump.id,
        idproducto: bump.id,
        nombre: bump.titulo,
        cantidad: cantidadBump,
        precio: bump.precio,
        imagen: imagenPrincipal(bump)
      })
      itemsEvento.push(itemDesdeProducto(bump, { price: bump.precio, quantity: cantidadBump }))
    }

    const valor = itemsEvento.reduce((suma, item) => suma + item.price * item.quantity, 0)
    track('add_to_cart', { value: valor, items: itemsEvento }, {
      nombre: 'AddToCart',
      datos: { ...datosMeta(itemsEvento), content_name: producto.titulo, value: valor }
    })

    localStorage.setItem('carritojammy', JSON.stringify(nuevocarrito))
    setContador(nuevocarrito.length)
    navigate("/checkout")
  }

  /*
  Al tocar comprar: primero el modelo (si hace falta), después las orvis.
  Si el pop-up de orvis se cierra de cualquier forma, el pedido sigue al checkout.
  */
  const comprar = (opcion = variante) => {
    if (variantes && !opcion) {
      setCompraPendiente(true)
      setSheetVariante(true)
      return
    }
    if (bump && !orvisEnCarrito) {
      setPopupOrvis(true)
      return
    }
    agregaralcarrito(opcion)
  }

  const elegirVarianteEnSheet = (opcion) => {
    setVariante(opcion)
    setSheetVariante(false)
    if (compraPendiente) {
      setCompraPendiente(false)
      comprar(opcion)
    }
  }

  const botonesVariante = (onElegir) => (
    <div className="pdp-variantes">
      {variantes.map(opcion => (
        <button
          type="button"
          key={opcion.id}
          className={`pdp-variante ${variante?.id === opcion.id ? 'activa' : ''}`}
          aria-pressed={variante?.id === opcion.id}
          onClick={() => onElegir(opcion)}
        >
          {opcion.img && <img src={opcion.img} alt="" />}
          {opcion.texto}
        </button>
      ))}
    </div>
  )

  return (
    <div className="pdp">
      <div className="pdp-principal">
        <Galeriaproducto imagenes={producto.imagenes} nombre={nombre} />

        <div className="pdp-info">
          {/* ZONA A: primer pantallazo */}
          {(bfActivo || badges.length > 0 || edad) && (
            <div className="pdp-badges">
              {bfActivo && <span className="pdp-badge pdp-badge-bf">{campana.etiqueta}</span>}
              {badges.map(badge => <span key={badge} className="pdp-badge">{etiquetasBadge[badge]}</span>)}
              {edad && <span className="pdp-chip-edad">{edad}+ años</span>}
            </div>
          )}
          <h1 className="pdp-titulo">{nombre}</h1>
          {contenido.subtitulo && <p className="pdp-subtitulo">{contenido.subtitulo}</p>}
          {mostrarRating && (
            <p className="pdp-rating">
              <span className="pdp-estrellas">{[1, 2, 3, 4, 5].map(n => <Icono key={n} nombre="estrella" />)}</span>
              {contenido.rating.promedio.toLocaleString('es-CO')} · {contenido.rating.total} opiniones
            </p>
          )}

          <div className="pdp-precio">
            {esMayorista ? (
              <>
                <p className="pdp-precio-actual">{formatoPrecio(producto.preciomayorista)} <small>/ und</small></p>
                <p className="pdp-precio-nota">Precio sugerido: {formatoPrecio(producto.precio)} / und</p>
              </>
            ) : (
              <>
                <p className="pdp-precio-actual">{formatoPrecio(precioConEnvio)}</p>
                {bfActivo ? (
                  <>
                    <s className="pdp-precio-anterior">{formatoPrecio(antesBf)}</s>
                    <span className="pdp-pct">{textoPorcentaje}</span>
                    <span className="pdp-verde pdp-linea-llena">Envío gratis incluido</span>
                  </>
                ) : promoActiva ? (
                  <>
                    <s className="pdp-precio-anterior">{formatoPrecio(contenido.precioAnterior)}</s>
                    <span className="pdp-ahorro">
                      Ahorras {formatoPrecio(contenido.precioAnterior - precioConEnvio)} · hasta el {Number(contenido.promoHasta.slice(8, 10))} {MESES[Number(contenido.promoHasta.slice(5, 7)) - 1]}
                    </span>
                  </>
                ) : (
                  <span className="pdp-verde">Envío gratis incluido</span>
                )}
              </>
            )}
          </div>

          {bfActivo && (
            <div className="pdp-reloj">
              <Icono nombre="reloj" />
              <span>Promoción termina <b>{blackfriday.texto}</b></span>
            </div>
          )}

          {/* ZONA B: bloque de decisión */}
          {variantes ? (
            <div className="pdp-bloque">
              <p className="pdp-etiqueta">Modelo{variante && <span>: {variante.texto}</span>}</p>
              {botonesVariante(setVariante)}
            </div>
          ) : (
            producto.colores && producto.colores !== 'Unicolor' && (
              <p className="pdp-colores"><strong>Colores:</strong> {producto.colores}</p>
            )
          )}
          {contenido.nota && <p className="pdp-nota">{contenido.nota}</p>}

          {MOSTRAR_ENTREGA_Y_PAGO && (
          <div className="pdp-filas">
            <Estimadorentrega
              onElegir={ciudad => track('delivery_estimate_pdp', {
                item_id: String(producto.id),
                shipping_tier: ciudad.zona,
                // Solo ciudades de la lista fija (u "otra"): no identifica a nadie
                delivery_city: ciudad.codigo ? ciudad.nombre : 'otra'
              })}
            />
            <div className="pdp-fila">
              <Icono nombre="efectivo" />
              <div>
                <p className="pdp-fila-titulo">Pagas al recibir, en efectivo</p>
                <p>Envío gratis a toda Colombia con Inter Rapidísimo</p>
              </div>
            </div>
          </div>
          )}

          <button ref={ctaRef} type="button" className="pdp-boton pdp-boton-cta" onClick={() => comprar()}>
            Comprar ahora
          </button>

          {contenido.regalo && (
            <div className="pdp-regalo">
              <Icono nombre="regalo" />
              <p><strong>Regalo con tu pedido:</strong> {contenido.regalo}</p>
            </div>
          )}

          <ul className="pdp-confianza">
            <li><Icono nombre="camion" />Envío gratis</li>
            <li><Icono nombre="escudo" />Garantía de 1 mes</li>
            <li><Icono nombre="cambio" />Cambio si llega con falla</li>
          </ul>

          <Opiniones opiniones={contenido.opiniones} />
        </div>
      </div>

      {/* ZONA C: convencer */}
      <div className="pdp-detalles">
        {contenido.incluye ? (
          <section className="pdp-seccion">
            <h2 className="pdp-h2">Qué incluye</h2>
            <ul className="pdp-checklist">
              {contenido.incluye.map(item => <li key={item}><Icono nombre="check" />{item}</li>)}
            </ul>
          </section>
        ) : (caracteristicas.length > 0 || descripcionTexto) && (
          <section className="pdp-seccion">
            <h2 className="pdp-h2">Características</h2>
            {caracteristicas.length > 0 ? (
              <ul className="pdp-checklist">
                {caracteristicas.map(item => <li key={item}><Icono nombre="check" />{item}</li>)}
              </ul>
            ) : (
              <p className="pdp-texto">{descripcionTexto}</p>
            )}
          </section>
        )}

        {contenido.destacados && (
          <section className="pdp-seccion">
            <h2 className="pdp-h2">Lo que lo hace especial</h2>
            <div className="pdp-destacados">
              {contenido.destacados.map(destacado => (
                <article key={destacado.titulo} className="pdp-destacado">
                  {destacado.media && (
                    destacado.media.endsWith('.mp4')
                      ? <Videodestacado src={destacado.media} poster={destacado.media.replace(/\.mp4$/, '-poster.jpg')} />
                      : <img src={destacado.media} alt="" loading="lazy" decoding="async" />
                  )}
                  <h3>{destacado.titulo}</h3>
                  <p>{destacado.texto}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {contenido.ficha && (
          <section className="pdp-seccion">
            <h2 className="pdp-h2">Ficha rápida</h2>
            <dl className="pdp-ficha">
              {Object.entries(contenido.ficha).map(([dato, valor]) => (
                <div key={dato}><dt>{dato}</dt><dd>{valor}</dd></div>
              ))}
            </dl>
          </section>
        )}

        <section className="pdp-seccion">
          <h2 className="pdp-h2">Preguntas frecuentes</h2>
          <div className="pdp-faq">
            {preguntas.map(item => (
              <details key={item.pregunta}>
                <summary>{item.pregunta}<Icono nombre="abajo" /></summary>
                <p>{item.respuesta}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* ZONA D: más abajo */}
      <Relacionados producto={producto} tipocliente={tipocliente} />

      <section className="pdp-seccion pdp-nosotros">
        <div className="pdp-nosotros-fotos">
          <img src="/jair.webp" alt="Fundador de Delteo" loading="lazy" decoding="async" />
          <img src="/cepeda.webp" alt="Fundador de Delteo" loading="lazy" decoding="async" />
        </div>
        <div>
          <h2 className="pdp-h2">Detrás de Delteo</h2>
          <p className="pdp-texto">Somos dos ingenieros industriales de la Pontificia Universidad Javeriana. Buscamos juguetes innovadores que no se ven en cualquier juguetería.</p>
          <div className="pdp-nosotros-acciones">
            <Link to="/nosotros" className="pdp-enlace-gris">Conoce la historia</Link>
          </div>
        </div>
      </section>

      
      <div className={`pdp-sticky ${ctaVisible ? 'oculto' : ''}`} aria-hidden={ctaVisible}>
        <div className="pdp-sticky-precio">
          <span className="pdp-sticky-linea">
            <strong>{formatoPrecio(precioVisible)}</strong>
            {bfActivo && (
              <>
                <s>{formatoPrecio(antesBf)}</s>
                <span className="pdp-pct">{textoPorcentaje}</span>
              </>
            )}
          </span>
          <span className="pdp-sticky-nota">Pagas al recibir</span>
        </div>
        <button type="button" className="pdp-boton" onClick={() => comprar()} tabIndex={ctaVisible ? -1 : 0}>
          Comprar ahora
        </button>
      </div>

      <Bumporvis
        abierto={popupOrvis}
        producto={bump}
        onAgregar={cantidad => { setPopupOrvis(false); agregaralcarrito(variante, cantidad) }}
        onOmitir={() => { setPopupOrvis(false); agregaralcarrito(variante, 0) }}
      />

      {variantes && (
        <Bottomsheet abierto={sheetVariante} onCerrar={cerrarSheetVariante} titulo="Elige el modelo">
          {botonesVariante(elegirVarianteEnSheet)}
        </Bottomsheet>
      )}
    </div>
  )
}

export default Producto
