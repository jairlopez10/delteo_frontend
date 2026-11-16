import Icono from "./Icono"

/*
Opiniones de clientes de un producto. Se escriben a mano en Productoscontenido.jsx,
en el campo `opiniones` de cada id:

  opiniones: [
    { nombre: 'Andrea P.', estrellas: 5, texto: 'Llegó en dos días y mi hijo no lo suelta.' }
  ]

Sin foto: se muestra la inicial del nombre. Si el producto no tiene opiniones,
el bloque no aparece.
*/

const ESTRELLAS = [1, 2, 3, 4, 5]

const Opiniones = ({ opiniones }) => {

  if (!Array.isArray(opiniones) || opiniones.length === 0) return null

  const total = opiniones.length
  const promedio = opiniones.reduce((suma, opinion) => suma + Number(opinion.estrellas || 0), 0) / total

  return (
    <section className="pdp-opiniones" aria-labelledby="pdp-opiniones-titulo">
      <div className="pdp-opiniones-cabecera">
        <h2 id="pdp-opiniones-titulo" className="pdp-h2">Opiniones de clientes</h2>
        <p className="pdp-opiniones-resumen">
          <span className="pdp-estrellas" aria-hidden="true">
            {ESTRELLAS.map(numero => <Icono key={numero} nombre="estrella" />)}
          </span>
          {promedio.toLocaleString('es-CO', { maximumFractionDigits: 1 })} · {total} {total === 1 ? 'opinión' : 'opiniones'}
        </p>
      </div>

      <ul className="pdp-opiniones-lista">
        {opiniones.map((opinion, indice) => (
          <li key={`${opinion.nombre}-${indice}`} className="pdp-opinion">
            <div className="pdp-opinion-persona">
              <span className="pdp-opinion-inicial" aria-hidden="true">{opinion.nombre.trim().charAt(0).toUpperCase()}</span>
              <div>
                <p className="pdp-opinion-nombre">{opinion.nombre}</p>
                <p className="pdp-opinion-estrellas">
                  <span className="pdp-estrellas" aria-hidden="true">
                    {ESTRELLAS.slice(0, Math.round(Number(opinion.estrellas) || 0)).map(numero => (
                      <Icono key={numero} nombre="estrella" />
                    ))}
                  </span>
                  <span className="sr-only">{opinion.estrellas} de 5</span>
                </p>
              </div>
            </div>
            <p className="pdp-opinion-texto">{opinion.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Opiniones
