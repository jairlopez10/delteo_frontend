import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import productosdb from "./Productosdb"
import productoscontenido from "./Productoscontenido"
import { itemDesdeProducto, track } from "../helpers/analytics"

const LISTA = { item_list_id: 'relacionados', item_list_name: 'También les encanta' }

const envio = { pequeno: 10000, grande: 20000 }

// "También les encanta": los ids de `relacionados` en Productoscontenido si existen;
// si no, productos con página nueva y disponibles, primero los de la misma edad
const Relacionados = ({ producto, tipocliente }) => {

  const nombresActual = [producto.titulo, productoscontenido[producto.id]?.nombre]
  const elegidos = productoscontenido[producto.id]?.relacionados
  const candidatos = elegidos
    ? elegidos.map(id => productosdb.find(item => item.id === id && item.status === 'disponible')).filter(Boolean).slice(0, 6)
    : productosdb
    .filter(item =>
      item.id !== producto.id &&
      item.status === 'disponible' &&
      productoscontenido[item.id] &&
      !nombresActual.includes(productoscontenido[item.id].nombre)
    )
    .sort((a, b) => Number(b.edad2 === producto.edad2) - Number(a.edad2 === producto.edad2))
    .slice(0, 6)

  const seccionRef = useRef(null)
  const idsCandidatos = candidatos.map(item => item.id).join(',')

  // view_item_list cuando el carrusel entra en pantalla, una vez por visita a la PDP
  useEffect(() => {
    const seccion = seccionRef.current
    if (!seccion) return
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      observer.disconnect()
      track('view_item_list', {
        ...LISTA,
        items: candidatos.map((item, i) => itemDesdeProducto(item, { index: i }))
      })
    }, { threshold: 0.3 })
    observer.observe(seccion)
    return () => observer.disconnect()
    // candidatos se recalcula en cada render; idsCandidatos es lo que importa
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsCandidatos])

  if (candidatos.length === 0) return null

  return (
    <section ref={seccionRef} className="pdp-seccion pdp-relacionados">
      <h2 className="pdp-h2">También les encanta</h2>
      <div className="pdp-carrusel">
        {candidatos.map((item, i) => {
          const precio = tipocliente === 'm'
            ? item.preciomayorista
            : item.precio + (item.precio >= 20000 ? envio.grande : envio.pequeno)
          const edad = item.edad2?.replace(/\D/g, '')
          return (
            <Link key={item.id} to={`/${item.titulo.replace(/ /g, '-')}/${tipocliente}`} className="pdp-card"
              onClick={() => track('select_item', { ...LISTA, items: [itemDesdeProducto(item, { index: i, ...LISTA })] })}
            >
              <div className="pdp-card-imagen">
                <img src={item.imagenes[0].url} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="pdp-card-texto">
                <p className="pdp-card-nombre">{productoscontenido[item.id]?.nombre || item.titulo}</p>
                {edad && <span className="pdp-chip-edad">{edad}+ años</span>}
                <p className="pdp-card-precio">${precio.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Relacionados
