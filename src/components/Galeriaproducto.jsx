import { useEffect, useMemo, useRef, useState } from "react"
import Icono from "./Icono"

// Galería con swipe (scroll-snap). El video va primero y usa la primera foto como poster.
const Galeriaproducto = ({ imagenes, nombre }) => {

  const medios = useMemo(() => [
    ...imagenes.filter(medio => medio.tipo === 'video'),
    ...imagenes.filter(medio => medio.tipo !== 'video')
  ], [imagenes])
  const poster = imagenes.find(medio => medio.tipo !== 'video')?.url

  const [actual, setActual] = useState(0)
  const [pantallaCompleta, setPantallaCompleta] = useState(null)
  const pistaRef = useRef(null)
  const pistaCompletaRef = useRef(null)
  const videosRef = useRef({})

  const indiceDesdeScroll = pista => {
    const slide = pista.firstElementChild
    if (!slide) return 0
    const paso = slide.offsetWidth + parseFloat(getComputedStyle(pista).columnGap || 0)
    return Math.min(medios.length - 1, Math.max(0, Math.round(pista.scrollLeft / paso)))
  }

  const irA = (indice, behavior = 'smooth') => {
    const pista = pistaRef.current
    const slide = pista?.children[indice]
    if (!slide) return
    pista.scrollTo({ left: slide.offsetLeft - pista.firstElementChild.offsetLeft, behavior })
  }

  // Al cerrar la pantalla completa, la galería queda en el medio que se estaba viendo
  const cerrarPantallaCompleta = () => {
    const pista = pistaCompletaRef.current
    const indice = pista ? Math.round(pista.scrollLeft / pista.clientWidth) : 0
    setPantallaCompleta(null)
    requestAnimationFrame(() => irA(indice, 'auto'))
  }

  // Solo se reproduce el video visible (ahorra datos en el navegador de Instagram)
  useEffect(() => {
    Object.entries(videosRef.current).forEach(([indice, video]) => {
      if (!video) return
      if (Number(indice) === actual && pantallaCompleta === null) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [actual, pantallaCompleta])

  useEffect(() => {
    if (pantallaCompleta === null) return
    const pista = pistaCompletaRef.current
    if (pista) pista.scrollLeft = pista.clientWidth * pantallaCompleta
    const cerrarConEsc = e => {
      if (e.key === 'Escape') cerrarPantallaCompleta()
    }
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', cerrarConEsc)
    return () => {
      document.body.style.overflow = overflowPrevio
      window.removeEventListener('keydown', cerrarConEsc)
    }
    // Solo al abrir: el índice inicial no debe mover la pista mientras se desliza
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pantallaCompleta !== null])

  return (
    <div className="pdp-galeria">
      <div className="pdp-galeria-marco">
        <div
          className="pdp-galeria-pista"
          ref={pistaRef}
          onScroll={e => setActual(indiceDesdeScroll(e.currentTarget))}
        >
          {medios.map((medio, indice) => (
            <button
              type="button"
              key={medio.url}
              className="pdp-galeria-slide"
              onClick={() => setPantallaCompleta(indice)}
              aria-label={`Ver ${medio.tipo === 'video' ? 'video' : 'foto'} ${indice + 1} de ${medios.length} en pantalla completa`}
            >
              {medio.tipo === 'video' ? (
                <>
                  <video
                    ref={elemento => { videosRef.current[indice] = elemento }}
                    src={medio.url}
                    poster={poster}
                    muted
                    loop
                    playsInline
                    preload={indice === 0 ? 'metadata' : 'none'}
                  />
                  <span className="pdp-galeria-accion"><Icono nombre="play" />En acción</span>
                </>
              ) : (
                <img
                  src={medio.url}
                  alt={indice === 0 ? nombre : `${nombre}, foto ${indice + 1}`}
                  loading={indice === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              )}
            </button>
          ))}
        </div>

        {medios.length > 1 && (
          <>
            <span className="pdp-galeria-contador">{actual + 1} / {medios.length}</span>
            <button type="button" className="pdp-galeria-flecha anterior" onClick={() => irA(actual - 1)} disabled={actual === 0} aria-label="Anterior">
              <Icono nombre="izquierda" />
            </button>
            <button type="button" className="pdp-galeria-flecha siguiente" onClick={() => irA(actual + 1)} disabled={actual === medios.length - 1} aria-label="Siguiente">
              <Icono nombre="derecha" />
            </button>
          </>
        )}
      </div>

      {medios.length > 1 && (
        <div className="pdp-galeria-puntos">
          {medios.map((medio, indice) => (
            <button
              type="button"
              key={medio.url}
              className={indice === actual ? 'activo' : ''}
              onClick={() => irA(indice)}
              aria-label={`Ir al medio ${indice + 1}`}
            />
          ))}
        </div>
      )}

      {pantallaCompleta !== null && (
        <div className="pdp-lightbox" role="dialog" aria-modal="true" aria-label={`Galería de ${nombre}`}>
          <div className="pdp-lightbox-barra">
            <span>{actual + 1} / {medios.length}</span>
            <button type="button" onClick={cerrarPantallaCompleta} aria-label="Cerrar galería">
              <Icono nombre="cerrar" />
            </button>
          </div>
          <div
            className="pdp-lightbox-pista"
            ref={pistaCompletaRef}
            onScroll={e => {
              const pista = e.currentTarget
              setActual(Math.round(pista.scrollLeft / pista.clientWidth))
            }}
          >
            {medios.map((medio, indice) => (
              <div className="pdp-lightbox-slide" key={medio.url}>
                {medio.tipo === 'video' ? (
                  <video src={medio.url} poster={poster} controls playsInline loop muted autoPlay={indice === pantallaCompleta} />
                ) : (
                  <img src={medio.url} alt={`${nombre}, foto ${indice + 1}`} loading="lazy" decoding="async" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Galeriaproducto
