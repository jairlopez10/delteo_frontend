import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import usePagina from "../hooks/usePagina"
import productosdb from "../components/Productosdb"
import productoscontenido from "../components/Productoscontenido"
import Icono from "../components/Icono"
import { edades, familias, hero, masPedidos, preguntas, promo, razones } from "../helpers/home"
import { itemDesdeProducto, track } from "../helpers/analytics"
import { WHATSAPP_DELTEO } from "../helpers/pedido"

const LISTA = { item_list_id: 'mas_pedidos', item_list_name: 'Los más pedidos' }
const envio = { pequeno: 10000, grande: 20000 }

const precioConEnvio = precio => precio + (precio >= 20000 ? envio.grande : envio.pequeno)
const formatoPrecio = valor => `$${valor.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
const urlProducto = producto => `/${producto.titulo.replace(/ /g, '-')}/d`

// Hero: collage mientras no haya video. Para pasar al video basta con llenar `hero.video`.
const Heromedia = () => {
  const videoRef = useRef(null)
  const [sinMovimiento] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (hero.video && !sinMovimiento) videoRef.current?.play().catch(() => {})
  }, [sinMovimiento])

  if (hero.video) {
    return (
      <div className="home-hero-media">
        <video
          ref={videoRef}
          poster={hero.video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          controls={sinMovimiento}
          aria-label={hero.titulo}
        >
          {hero.video.srcAncho && <source src={hero.video.srcAncho} media="(min-width: 768px)" type="video/mp4" />}
          <source src={hero.video.src} type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <div className="home-hero-media home-collage">
      {hero.collage.map((imagen, i) => (
        <div key={imagen.src}>
          <img src={imagen.src} alt={imagen.alt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
        </div>
      ))}
    </div>
  )
}

const Home = () => {

  const { setpagina } = usePagina()
  const carruselRef = useRef(null)

  const destacados = masPedidos
    .map(id => productosdb.find(producto => producto.id === id && producto.status === 'disponible'))
    .filter(Boolean)

  const promoVigente = promo && (!promo.hasta || new Date(`${promo.hasta}T23:59:59-05:00`) >= new Date())

  useEffect(() => {
    setpagina('inicio')
    document.title = 'Delteo | Juguetes que no se ven en cualquier juguetería'
    window.scrollTo(0, 0)
  }, [setpagina])

  // view_item_list del carrusel cuando entra en pantalla
  useEffect(() => {
    const carrusel = carruselRef.current
    if (!carrusel || destacados.length === 0) return
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      observer.disconnect()
      track('view_item_list', {
        ...LISTA,
        items: destacados.map((producto, i) => itemDesdeProducto(producto, { index: i }))
      })
    }, { threshold: 0.3 })
    observer.observe(carrusel)
    return () => observer.disconnect()
    // destacados sale de una lista fija
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="home">

      {/* HERO */}
      <section className="home-hero">
        <Heromedia />
        <h1 className="home-h1">{hero.titulo}</h1>
        <p className="home-lede">{hero.texto}</p>
        <a href="#mas-pedidos" className="pdp-boton home-hero-cta">{hero.cta}</a>
      </section>

      {/* CONFIANZA */}
      <ul className="home-confianza">
        <li><Icono nombre="camion" />Envío gratis</li>
        <li><Icono nombre="efectivo" />Pagas al recibir</li>
        <li><Icono nombre="escudo" />Garantía de 1 mes</li>
      </ul>

      {/* LOS MÁS PEDIDOS */}
      <section className="home-seccion" id="mas-pedidos">
        <div className="home-seccion-cabecera">
          <h2 className="home-h2">Los más pedidos</h2>
          <Link to="/juguetes" className="home-enlace">Ver todos</Link>
        </div>
        <div className="home-carrusel" ref={carruselRef}>
          {destacados.map((producto, i) => {
            const edad = producto.edad2?.replace(/\D/g, '')
            return (
              <Link
                key={producto.id}
                to={urlProducto(producto)}
                className="pdp-card"
                onClick={() => track('select_item', { ...LISTA, items: [itemDesdeProducto(producto, { index: i, ...LISTA })] })}
              >
                <div className="pdp-card-imagen">
                  <img src={producto.imagenes[0].url} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="pdp-card-texto">
                  <p className="pdp-card-nombre">{productoscontenido[producto.id]?.nombre || producto.titulo}</p>
                  {edad && <span className="pdp-chip-edad">{edad}+ años</span>}
                  <p className="pdp-card-precio">{formatoPrecio(precioConEnvio(producto.precio))}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* PROMO (solo cuando hay campaña real) */}
      {promoVigente && (
        <section className="home-seccion">
          <div className="home-promo">
            <h2 className="home-h2">{promo.titulo}</h2>
            {promo.texto && <p>{promo.texto}</p>}
            <Link to="/juguetes" className="pdp-boton">Ver juguetes</Link>
          </div>
        </section>
      )}

      {/* FAMILIAS */}
      <section className="home-seccion">
        <h2 className="home-h2">¿Qué tipo de juguete?</h2>
        <div className="home-familias">
          {familias.map(familia => (
            <Link key={familia.slug} to={`/juguetes?familia=${familia.slug}`} style={{ background: familia.color }}>
              <span>{familia.nombre}</span>
              <img src={familia.imagen} alt="" loading="lazy" decoding="async" />
            </Link>
          ))}
          <Link to="/juguetes" className="home-familia-todos">
            <span>Ver todos</span>
            <Icono nombre="derecha" />
          </Link>
        </div>
      </section>

      {/* EDAD */}
      <section className="home-seccion">
        <h2 className="home-h2">¿Cuántos años cumple?</h2>
        <div className="home-edades">
          {edades.map(edad => (
            <Link key={edad.valor} to={`/juguetes?edad=${encodeURIComponent(edad.valor)}`}>{edad.etiqueta}</Link>
          ))}
        </div>
      </section>

      {/* POR QUÉ DELTEO */}
      <section className="home-seccion">
        <h2 className="home-h2">Por qué Delteo</h2>
        <ul className="home-razones">
          {razones.map(razon => (
            <li key={razon.titulo}>
              <Icono nombre={razon.icono} />
              <div>
                <h3>{razon.titulo}</h3>
                <p>{razon.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="home-seccion home-nosotros">
        <div className="home-nosotros-fotos">
          <img src="/jair.webp" alt="Fundador de Delteo" loading="lazy" decoding="async" />
          <img src="/cepeda.webp" alt="Fundador de Delteo" loading="lazy" decoding="async" />
        </div>
        <div>
          <h2 className="home-h2">Quiénes somos</h2>
          <p>Somos dos ingenieros industriales de la Pontificia Universidad Javeriana. Buscamos los juguetes que nos habrían volado la cabeza a los 8 años.</p>
          <Link to="/nosotros" className="home-enlace">Conoce la historia</Link>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="home-seccion">
        <h2 className="home-h2">Preguntas frecuentes</h2>
        <div className="pdp-faq">
          {preguntas.map(item => (
            <details key={item.pregunta}>
              <summary>{item.pregunta}<Icono nombre="abajo" /></summary>
              <p>{item.respuesta}</p>
            </details>
          ))}
        </div>
        <a
          className="pdp-boton-wa home-wa"
          href={`https://wa.me/${WHATSAPP_DELTEO}?text=${encodeURIComponent('Hola Delteo, tengo una pregunta.')}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { location: 'home_faq' })}
        >
          <Icono nombre="whatsapp" />¿Otra duda? Escríbenos
        </a>
      </section>
    </div>
  )
}

export default Home
