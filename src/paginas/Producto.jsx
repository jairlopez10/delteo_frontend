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

const envio = {
  pequeno: 10000,
  grande: 20000
}
const idlanzadorashidrogel = [376, 395, 401, 375]
const ID_ORVIS = 362
const WHATSAPP = '573054392872'
const etiquetasBadge = { 'mas-pedido': 'Más pedido', nuevo: 'Nuevo' }
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

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
  const [agregarBump, setAgregarBump] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(true)
  const ctaRef = useRef(null)

  const cerrarSheetVariante = useCallback(() => {
    setSheetVariante(false)
    setCompraPendiente(false)
  }, [])

  useEffect(() => {
    setpagina(esMayorista ? 'mayoristaproducto' : 'producto')
    document.title = esMayorista ? `${titulo} (${tipocliente})` : titulo
    window.scrollTo(0, 0)
    setContador(leerCarrito().length)
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
  const bump = idlanzadorashidrogel.includes(producto.id)
    ? productosdb.find(item => item.id === ID_ORVIS && item.status === 'disponible')
    : null
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

  const agregaralcarrito = (opcion) => {

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
          nombre: nombretemp,
          cantidad,
          precio: precioConEnvio,
          imagen: producto.imagenes[0].url
        }]

    // Order bump de orvis (reemplaza el popup): se agrega una vez si no estaba en el carrito
    if (bump && agregarBump && !nuevocarrito.some(item => item.id === bump.id)) {
      nuevocarrito.push({
        id: bump.id,
        nombre: bump.titulo,
        cantidad: 1,
        precio: bump.precio,
        imagen: bump.imagenes[0].url
      })
    }

    //Enviar evento al Pixel de Facebook (si el script está bloqueado, la compra sigue)
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', {
        content_ids: producto.id,
        content_name: producto.titulo,
        currency: 'COP',
        value: producto.precio * cantidad
      })
    }

    //Enviar evento a Google Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        currency: 'COP',
        value: producto.precio * cantidad,
        items: [{
          item_id: producto.id,
          item_name: producto.titulo,
          quantity: cantidad,
          price: producto.precio
        }]
      })
    }

    localStorage.setItem('carritojammy', JSON.stringify(nuevocarrito))
    setContador(nuevocarrito.length)
    navigate("/checkout")
  }

  const comprar = () => {
    if (variantes && !variante) {
      setCompraPendiente(true)
      setSheetVariante(true)
      return
    }
    agregaralcarrito(variante)
  }

  const elegirVarianteEnSheet = (opcion) => {
    setVariante(opcion)
    setSheetVariante(false)
    if (compraPendiente) {
      setCompraPendiente(false)
      agregaralcarrito(opcion)
    }
  }

  const compartir = async () => {
    const url = window.location.href
    const texto = `Mira este juguete de Delteo: ${nombre}`
    if (navigator.share) {
      try {
        await navigator.share({ title: nombre, text: texto, url })
        return
      } catch (error) {
        if (error?.name === 'AbortError') return
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${texto} ${url}`)}`, '_blank', 'noopener')
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
          {(badges.length > 0 || edad) && (
            <div className="pdp-badges">
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
                {promoActiva ? (
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

          <div className="pdp-filas">
            <Estimadorentrega />
            <div className="pdp-fila">
              <Icono nombre="efectivo" />
              <div>
                <p className="pdp-fila-titulo">Pagas al recibir, en efectivo</p>
                <p>Envío gratis a toda Colombia con Inter Rapidísimo</p>
              </div>
            </div>
          </div>

          {bump && (
            <label className={`pdp-bump ${agregarBump ? 'activo' : ''}`}>
              <input type="checkbox" checked={agregarBump} onChange={e => setAgregarBump(e.target.checked)} />
              <span className="pdp-bump-check"><Icono nombre="check" /></span>
              <img src={bump.imagenes[0].url} alt="" loading="lazy" />
              <span className="pdp-bump-texto">
                <strong>Agrega orvis de hidrogel x10.000</strong>
                <span>Para tener repuesto desde el primer día</span>
              </span>
              <span className="pdp-bump-precio">+{formatoPrecio(bump.precio)}</span>
            </label>
          )}

          <button ref={ctaRef} type="button" className="pdp-boton pdp-boton-cta" onClick={comprar}>
            Comprar ahora
          </button>
          <p className="pdp-micro">Te confirmamos por WhatsApp antes de despacharlo</p>

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
                      ? <video src={destacado.media} muted loop playsInline autoPlay preload="none" />
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
            <a
              className="pdp-boton-wa"
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola Delteo, tengo una pregunta sobre: ${nombre}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icono nombre="whatsapp" />¿Dudas? Escríbenos
            </a>
            <Link to="/nosotros" className="pdp-enlace">Conoce la historia</Link>
          </div>
        </div>
      </section>

      <section className="pdp-seccion pdp-compartir">
        <p>¿Lo quieres consultar con alguien antes de comprar?</p>
        <button type="button" className="pdp-boton-secundario" onClick={compartir}>
          <Icono nombre="compartir" />Enviar a alguien por WhatsApp
        </button>
      </section>

      <div className={`pdp-sticky ${ctaVisible ? 'oculto' : ''}`} aria-hidden={ctaVisible}>
        <div className="pdp-sticky-precio">
          <strong>{formatoPrecio(precioVisible)}</strong>
          <span>Pagas al recibir</span>
        </div>
        <button type="button" className="pdp-boton" onClick={comprar} tabIndex={ctaVisible ? -1 : 0}>
          Comprar ahora
        </button>
      </div>

      {variantes && (
        <Bottomsheet abierto={sheetVariante} onCerrar={cerrarSheetVariante} titulo="Elige el modelo">
          {botonesVariante(elegirVarianteEnSheet)}
        </Bottomsheet>
      )}
    </div>
  )
}

export default Producto
