import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import usePagina from "../hooks/usePagina"
import productosdb from "../components/Productosdb";
import Productocard from "../components/Productocard";
import Bottomsheet from "../components/Bottomsheet";
import { itemDesdeProducto, track } from "../helpers/analytics";
import { familiaPorSlug, familias } from "../helpers/home";

const LISTA_CATALOGO = { id: 'catalogo', nombre: 'Catálogo' }

/*
Todos los filtros viven dentro de la hoja "Filtrar y ordenar": tipo de juguete
(las familias de helpers/home.js), para quién, edad, precio y orden.
*/
const OPCIONES_GENERO = [
  { valor: '', etiqueta: 'Todos' },
  { valor: 'ninas', etiqueta: 'Niñas' },
  { valor: 'ninos', etiqueta: 'Niños' },
  { valor: 'unisex', etiqueta: 'Unisex' }
]

const OPCIONES_EDAD = [
  { valor: '', etiqueta: 'Todas' },
  { valor: '+0', etiqueta: '0 a 2' },
  { valor: '+3', etiqueta: '3 a 5' },
  { valor: '+6', etiqueta: '6 a 8' },
  { valor: '+8', etiqueta: '8 o más' }
]

const OPCIONES_ORDEN = [
  { valor: '', etiqueta: 'Más pedidos' },
  { valor: 'asc', etiqueta: 'Menor precio' },
  { valor: 'des', etiqueta: 'Mayor precio' }
]

const Catalogo = () => {

  const productosavailable = productosdb.filter(producto => {
    if(producto.status === "disponible"){
      return producto;
    }
  })

  const { setpagina } = usePagina();
  // La home enlaza aquí con ?familia= y ?edad=; la hoja de filtros también escribe aquí
  const [parametrosurl, setParametrosurl] = useSearchParams();
  const familia = familiaPorSlug(parametrosurl.get('familia'));
  const [seccionfiltro, setseccionfiltro] = useState(false);
  const [genero, setgenero] = useState('');
  const [edad, setedad] = useState(parametrosurl.get('edad') || '');
  const [ordenar, setordenar] = useState('');
  const [preciomax, setpreciomax] = useState(190000);
  const [productosmostrar, setproductosmostrar] = useState(productosavailable);
  const [productosfiltrados, setproductosfiltrados] = useState(productosavailable);
  const [numpagina, setnumpagina] = useState(1);
  const tituloproductosref = useRef(null);
  // Último listado reportado: al montar, los efectos arman la misma página 2 veces
  const listaReportadaRef = useRef('');
 
  const MIN = 5000;
  const MAX = 190000;
  const STEP = 5000;
  const numproductospag = 12;

  // Cuántos filtros hay puestos: es el número del botón "Filtrar y ordenar"
  const filtrosActivos = [familia, genero, edad, ordenar, preciomax < MAX].filter(Boolean).length

  const elegirFamilia = (slug) => {
    const parametros = {}
    if (slug) parametros.familia = slug
    if (edad) parametros.edad = edad
    setParametrosurl(parametros, { replace: true })
  }

  const limpiarFiltros = () => {
    setgenero('')
    setedad('')
    setordenar('')
    setpreciomax(MAX)
    setParametrosurl({}, { replace: true })
  }

  /*
  Sin paginación: la grilla arranca con 12 y "Ver más" agrega otros 12 sin recargar
  ni perder el scroll. `numpagina` es cuántos bloques de 12 están visibles.
  */
  const definirproductospagina = () => {

    const nuevolistado = productosfiltrados.slice(0, numpagina * numproductospag);

    setproductosmostrar(nuevolistado);

    // view_item_list con los productos visibles; se repite solo si cambian (ver más o filtros)
    const firma = nuevolistado.map(producto => producto.id).join(',');
    if (nuevolistado.length > 0 && firma !== listaReportadaRef.current) {
      listaReportadaRef.current = firma;
      track('view_item_list', {
        item_list_id: LISTA_CATALOGO.id,
        item_list_name: LISTA_CATALOGO.nombre,
        items: nuevolistado.map((producto, i) => itemDesdeProducto(producto, { index: i }))
      });
    }

  }

  // Familia elegida en la home (ids definidos en src/helpers/home.js)
  const filtrarfamilia = (product) => {
    if (!familia) return product;
    if (familia.ids.includes(product.id)) return product;
  }

  const filtrargenero = (product) => {
    if (genero === "") return product;
    if(genero === 'unisex'){
      if (product.genero === genero) {
        return product;
      }
    } else {
      //Niña o niño
      if (product.genero === genero || product.genero === 'unisex'){
        return product;
      }
    }
    
  }

  const filtraredad = (product) => {
    if (edad === "") return product;

    if(product.edad.includes(edad)){
      return product;
    }
    
  }

  const filtrarpreciomax = (product) => {
    if (product.precio <= preciomax) return product;
  }

  useEffect(() => {
    setpagina('inicio');
    document.title = familia ? `Delteo | ${familia.nombre}` : "Delteo | Juguetería"
    window.scrollTo(0,0)
  },[])



  useEffect(() => {
    let newlist = productosavailable.filter(filtrarfamilia).filter(filtrargenero).filter(filtraredad).filter(filtrarpreciomax);

    if(ordenar !== ""){
      if (ordenar === 'asc'){
        newlist.sort(((a,b) => a.precio - b.precio));
      } else {
        newlist.sort(((a,b) => b.precio - a.precio));
      }
    }
    setproductosfiltrados(newlist);
    setnumpagina(1);
    // familia?.slug: al cambiar de familia desde la home la URL cambia sin remontar la página
  }, [genero, edad, preciomax, ordenar, familia?.slug])

  useEffect(() => {
    definirproductospagina();

  }, [productosfiltrados, numpagina])


  return (
    <>
      <div className="seccionproductos contenedor">
        <div className="cat-encabezado" ref={tituloproductosref}>
          <h1 className="cat-titulo">{familia ? familia.nombre : 'Juguetería'}</h1>
          <p className="cat-lede">{familia ? 'Todo lo que tenemos de esta familia, con envío gratis.' : 'Juguetes elegidos uno por uno. Si no esta el que quieres escribe un comentario'}</p>
        </div>
        <div className="cat-barra-filtros">
          <button type="button" className="cat-boton-filtros" onClick={() => setseccionfiltro(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16M4 12h10M4 18h5" />
            </svg>
            Filtrar y ordenar
            {filtrosActivos > 0 && <span className="cat-filtros-badge">{filtrosActivos}</span>}
          </button>
          <p className="cat-cuenta">{productosfiltrados.length} {productosfiltrados.length === 1 ? 'juguete' : 'juguetes'}</p>
        </div>

        <Bottomsheet abierto={seccionfiltro} onCerrar={() => setseccionfiltro(false)} titulo="Filtrar y ordenar">
          <div className="cat-filtros">
            <div className="cat-filtro-grupo">
              <p className="cat-filtro-titulo">Tipo de juguete</p>
              <div className="cat-chips">
                <button type="button" className={`cat-chip ${!familia ? 'activo' : ''}`} onClick={() => elegirFamilia(null)}>Todos</button>
                {familias.map(item => (
                  <button
                    type="button"
                    key={item.slug}
                    className={`cat-chip ${familia?.slug === item.slug ? 'activo' : ''}`}
                    onClick={() => elegirFamilia(item.slug)}
                  >{item.nombre}</button>
                ))}
              </div>
            </div>

            <div className="cat-filtro-grupo">
              <p className="cat-filtro-titulo">Para quién</p>
              <div className="cat-chips">
                {OPCIONES_GENERO.map(opcion => (
                  <button
                    type="button"
                    key={opcion.valor || 'todos'}
                    className={`cat-chip ${genero === opcion.valor ? 'activo' : ''}`}
                    onClick={() => setgenero(opcion.valor)}
                  >{opcion.etiqueta}</button>
                ))}
              </div>
            </div>

            <div className="cat-filtro-grupo">
              <p className="cat-filtro-titulo">Edad</p>
              <div className="cat-chips">
                {OPCIONES_EDAD.map(opcion => (
                  <button
                    type="button"
                    key={opcion.valor || 'todas'}
                    className={`cat-chip ${edad === opcion.valor ? 'activo' : ''}`}
                    onClick={() => setedad(opcion.valor)}
                  >{opcion.etiqueta}</button>
                ))}
              </div>
            </div>

            <div className="cat-filtro-grupo">
              <p className="cat-filtro-titulo">Precio hasta</p>
              <input
                type="range"
                value={preciomax}
                onChange={e => setpreciomax(+e.target.value)}
                min={MIN}
                max={MAX}
                step={STEP}
                className="range"
                aria-label="Precio máximo"
              />
              <div className="cat-rango">
                <span>{`$${MIN.toLocaleString('es-CO')}`}</span>
                <strong>{preciomax >= MAX ? 'Sin límite' : `$${preciomax.toLocaleString('es-CO')}`}</strong>
              </div>
            </div>

            <div className="cat-filtro-grupo">
              <p className="cat-filtro-titulo">Ordenar</p>
              <div className="cat-chips">
                {OPCIONES_ORDEN.map(opcion => (
                  <button
                    type="button"
                    key={opcion.valor || 'relevancia'}
                    className={`cat-chip ${ordenar === opcion.valor ? 'activo' : ''}`}
                    onClick={() => setordenar(opcion.valor)}
                  >{opcion.etiqueta}</button>
                ))}
              </div>
            </div>

            <div className="cat-filtros-pie">
              <button type="button" className="cat-boton-limpiar" onClick={limpiarFiltros} disabled={filtrosActivos === 0}>Limpiar</button>
              <button type="button" className="pdp-boton" onClick={() => setseccionfiltro(false)}>
                Ver {productosfiltrados.length} {productosfiltrados.length === 1 ? 'juguete' : 'juguetes'}
              </button>
            </div>
          </div>
        </Bottomsheet>

        <div className="productos">
          {productosfiltrados.length === 0 ? (<div className={`bg-red-500 h-min text-3xl text-white rounded-2xl p-4 text-center uppercase md:ml-4 w-full`}>Lo sentimos, intenta con otros filtros!</div>) : (
            <>
              <div className="">
                <div className="productoscards">
                  {productosmostrar.map((producto, i) => {
                    if(producto.status === "disponible"){
                      return ((
                        <Productocard 
                          key={producto.id}
                          producto={producto} 
                          lista={LISTA_CATALOGO}
                          indice={(numpagina - 1) * numproductospag + i}
                        />
                      ))
                    }
                  })}
                </div>
                {productosmostrar.length < productosfiltrados.length && (
                  <div className="cat-vermas">
                    <button type="button" className="cat-boton-vermas" onClick={() => setnumpagina(numpagina + 1)}>
                      Ver más juguetes
                    </button>
                    <p className="cat-contador">Viendo {productosmostrar.length} de {productosfiltrados.length}</p>
                  </div>
                )}
              </div>
              
            </>
          
          )}
          
          
        </div>
      </div>
    </>
  )
}

export default Catalogo