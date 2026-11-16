import { useEffect, useRef, useState } from "react"
import { imagenPrincipal } from "../helpers/imagenes"
import { precioAntes, textoPorcentaje } from "../helpers/blackfriday"
import useBlackfriday from "../hooks/useBlackfriday"

/*
Pop-up de orvis: sale al tocar "Comprar ahora" en las lanzadoras de hidrogel.
Reemplaza al recuadro con check que estaba dentro de la ficha.

Como la persona ya tocó comprar, SIEMPRE termina en el checkout: con "Agregar"
(con las orvis), con "Ahora no", tocando fuera o con Esc.
*/

const formatoPrecio = valor => `$${Number(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`

const Bumporvis = ({ abierto, producto, onAgregar, onOmitir }) => {

  const [cantidad, setCantidad] = useState(1)
  const blackfriday = useBlackfriday()
  // onOmitir cambia en cada render del padre; el ref evita volver a montar el listener
  const omitirRef = useRef(onOmitir)
  omitirRef.current = onOmitir

  useEffect(() => {
    if (!abierto) return
    setCantidad(1)
    const alPresionar = evento => {
      if (evento.key === 'Escape') omitirRef.current()
    }
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', alPresionar)
    return () => {
      document.body.style.overflow = overflowPrevio
      window.removeEventListener('keydown', alPresionar)
    }
  }, [abierto])

  if (!abierto || !producto) return null

  const antes = blackfriday.activo ? precioAntes(producto.precio) : null

  return (
    <div className="orvis-fondo" onClick={onOmitir}>
      <div className="orvis-hoja" role="dialog" aria-modal="true" aria-labelledby="orvis-titulo" onClick={evento => evento.stopPropagation()}>
        <span className="orvis-asa" aria-hidden="true" />

        <p id="orvis-titulo" className="orvis-titulo">¿Le agregas orvis de repuesto?</p>

        <div className="orvis-producto">
          <img src={imagenPrincipal(producto)} alt="" />
          <div>
            <p className="orvis-nombre">{producto.titulo}</p>
            <p className="orvis-precio">
              <strong>{formatoPrecio(producto.precio)}</strong>
              {antes && (
                <>
                  <s>{formatoPrecio(antes)}</s>
                  <span className="pdp-pct">{textoPorcentaje}</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="orvis-cantidad">
          <span>Cantidad</span>
          <div className="orvis-contador">
            <button type="button" onClick={() => setCantidad(valor => Math.max(1, valor - 1))} aria-label="Quitar una">−</button>
            <span aria-live="polite">{cantidad}</span>
            <button type="button" onClick={() => setCantidad(valor => Math.min(20, valor + 1))} aria-label="Agregar una">+</button>
          </div>
        </div>

        <div className="orvis-acciones">
          <button type="button" className="orvis-boton-no" onClick={onOmitir}>Ahora no</button>
          <button type="button" className="pdp-boton orvis-boton-si" onClick={() => onAgregar(cantidad)}>
            Agregar · {formatoPrecio(producto.precio * cantidad)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bumporvis
