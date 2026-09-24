import { useCallback, useState } from "react"
import Bottomsheet from "./Bottomsheet"
import Icono from "./Icono"
import {
  calcularEntrega, ciudadesEntrega, configEntrega, formatearFecha, formatearHora,
  guardarCiudad, leerCiudadGuardada, otraCiudad
} from "../helpers/entregas"

// Fila "Envío a [ciudad] · Llega [fecha]" del bloque de decisión
// onElegir: se llama solo cuando la persona elige una ciudad (no al cargar la guardada)
const Estimadorentrega = ({ onElegir }) => {

  const [ciudad, setCiudad] = useState(leerCiudadGuardada)
  const [abierto, setAbierto] = useState(false)
  const cerrar = useCallback(() => setAbierto(false), [])

  const elegir = opcion => {
    setCiudad(opcion)
    guardarCiudad(opcion)
    setAbierto(false)
    onElegir?.(opcion)
  }

  const entrega = ciudad ? calcularEntrega(ciudad) : null

  return (
    <>
      <div className="pdp-fila">
        <Icono nombre="pin" />
        <div>
          <button type="button" className="pdp-fila-selector" onClick={() => setAbierto(true)}>
            {ciudad ? `Envío a ${ciudad.nombre === otraCiudad.nombre ? 'tu municipio' : ciudad.nombre}` : 'Elige tu ciudad'}
            <Icono nombre="abajo" />
          </button>
          {entrega ? (
            <p>
              <span className="pdp-verde">
                {entrega.esRango ? 'Llega a más tardar el ' : 'Llega el '}{formatearFecha(entrega.fecha)}
              </span>
              {entrega.despachaHoy && ` si pides hoy antes de las ${formatearHora(configEntrega.horaCorte)}`}
            </p>
          ) : (
            <p>Te mostramos la fecha estimada de entrega</p>
          )}
        </div>
      </div>

      <Bottomsheet abierto={abierto} onCerrar={cerrar} titulo="¿A qué ciudad lo enviamos?">
        <ul className="pdp-opciones">
          {[...ciudadesEntrega, otraCiudad].map(opcion => (
            <li key={opcion.nombre}>
              <button
                type="button"
                className={ciudad?.nombre === opcion.nombre ? 'activo' : ''}
                onClick={() => elegir(opcion)}
              >
                <span>
                  {opcion.nombre}
                  {opcion.departamento && <small>{opcion.departamento}</small>}
                </span>
                <small className="pdp-verde">{formatearFecha(calcularEntrega(opcion).fecha)}</small>
              </button>
            </li>
          ))}
        </ul>
      </Bottomsheet>
    </>
  )
}

export default Estimadorentrega
