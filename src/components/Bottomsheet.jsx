import { useEffect, useRef, useState } from "react"
import Icono from "./Icono"

// Panel inferior para elegir opciones (modelo, ciudad). Se cierra con la X, tocando fuera, Esc o deslizando hacia abajo.
const Bottomsheet = ({ abierto, onCerrar, titulo, children }) => {

  const [arrastre, setArrastre] = useState(0)
  const inicioY = useRef(null)

  useEffect(() => {
    if (!abierto) return
    const cerrarConEsc = e => {
      if (e.key === 'Escape') onCerrar()
    }
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', cerrarConEsc)
    return () => {
      document.body.style.overflow = overflowPrevio
      window.removeEventListener('keydown', cerrarConEsc)
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  const terminarArrastre = () => {
    if (arrastre > 90) onCerrar()
    setArrastre(0)
    inicioY.current = null
  }

  return (
    <div className="pdp-sheet-fondo" onClick={onCerrar}>
      <div
        className="pdp-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        style={arrastre ? { transform: `translateY(${arrastre}px)`, transition: 'none' } : undefined}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="pdp-sheet-cabecera"
          onTouchStart={e => { inicioY.current = e.touches[0].clientY }}
          onTouchMove={e => {
            if (inicioY.current === null) return
            setArrastre(Math.max(0, e.touches[0].clientY - inicioY.current))
          }}
          onTouchEnd={terminarArrastre}
        >
          <span className="pdp-sheet-asa" />
          <p className="pdp-sheet-titulo">{titulo}</p>
          <button type="button" className="pdp-sheet-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <Icono nombre="cerrar" />
          </button>
        </div>
        <div className="pdp-sheet-contenido">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Bottomsheet
