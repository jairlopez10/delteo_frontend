import { useEffect, useState } from "react"
import usePagina from "../hooks/usePagina"
import productosdb from "../components/Productosdb";
import Productocard from "../components/Productocard";
import { Link } from "react-router-dom";

const Catalogo = () => {

  const { pagina, setpagina } = usePagina();
  const [seccionfiltro, setseccionfiltro] = useState(false);
  const [categoria, setcategoria] = useState('');
  const [genero, setgenero] = useState('');
  const [edad, setedad] = useState('');
  const [ordenar, setordenar] = useState('');
  const [preciomax, setpreciomax] = useState(70000);
  const [productosmostrar, setproductosmostrar] = useState(productosdb);
  const [productosfiltrados, setproductosfiltrados] = useState(productosdb);
  const [numpagina, setnumpagina] = useState(1);

  const MIN = 5000;
  const MAX = 70000;
  const STEP = 5000;
  const numproductospag = 8;

  const definirpaginadores = () => {

    const numpaginadores = Math.ceil(productosfiltrados.length / numproductospag);
    
    let arraypaginas = []

    for(let i=1; i<=numpaginadores; i++){
      arraypaginas.push(i);
    }

    return arraypaginas;

  }

  const definirproductospagina = () => {

    let iteradormax = numpagina * numproductospag;
    let iteradormin = iteradormax - numproductospag;

    //Define si el listado de productos es menor que el iteradormayor definido inicial
    if (productosfiltrados.length <= iteradormax) iteradormax = productosfiltrados.length;

    let nuevolistado = [];

    for (let i=iteradormin; i<iteradormax; i++){
      nuevolistado.push(productosfiltrados[i]);
    }

    setproductosmostrar(nuevolistado);

    definirpaginadores();

  }

  const filtrarcategoria = (product) => {
    if (categoria === "") return product
    if(product.categoria === categoria){
      return product;
    }
  }

  const filtrargenero = (product) => {
    if (genero === "") return product;
    if (product.genero === genero) {
      return product;
    }
  }

  const filtraredad = (product) => {
    if (edad === "") return product;
    if (product.edad === edad) return product;
  }

  const filtrarpreciomax = (product) => {
    if (product.precio <= preciomax) return product;
  }

  useEffect(() => {
    setpagina('inicio');
  }, [])

  useEffect(() => {
    let newlist = productosdb.filter(filtrarcategoria).filter(filtrargenero).filter(filtraredad).filter(filtrarpreciomax);

    if(ordenar !== ""){
      if (ordenar === 'asc'){
        newlist.sort(((a,b) => a.precio - b.precio));
      } else {
        newlist.sort(((a,b) => b.precio - a.precio));
      }
    }
    setproductosfiltrados(newlist);
    setnumpagina(1);
  }, [categoria, genero, edad, preciomax, ordenar])

  useEffect(() => {
    definirproductospagina();
  }, [productosfiltrados, numpagina])


  return (
    <>
      <div className="seccionproductos contenedor">
        <h1 className="tituloproductos">Productos</h1>
        <div className="flex items-center justify-center gap-2 md:hidden cursor-pointer w-min mb-4 filtrodiv" onClick={() => setseccionfiltro(!seccionfiltro)}>
          <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-adjustments-horizontal" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#3d3d3d" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M4 6l8 0" />
            <path d="M16 6l4 0" />
            <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M4 12l2 0" />
            <path d="M10 12l10 0" />
            <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M4 18l11 0" />
            <path d="M19 18l1 0" />
          </svg>
          <p className="filtrotext">Filtros</p>
        </div>
        <div className="productos">
          <div className={`${seccionfiltro ? 'flex' : 'hidden'} md:flex seccionfiltros`}>
            <select name="genero" id="genero" onChange={(e) => setgenero(e.target.value)}>
              <option value="">Genero</option>
              <option value="ninas">Niñas</option>
              <option value="ninos">Niños</option>
              <option value="unisex">Unisex</option>
            </select>
            <select name="edad" id="edad" onChange={e => setedad(e.target.value)}>
              <option value="">{edad === "" ? "Edad" : "Todas las edades"}</option>
              <option value="1">Entre 0-1 año</option>
              <option value="2">Entre 1-2 años</option>
              <option value="3">Entre 2-3 años</option>
              <option value="7">Entre 4-7 años</option>
              <option value="12">Entre 8-12 años</option>
            </select>
            <select name="categoria" id="categoria" onChange={(e) => setcategoria(e.target.value)}>
              <option value="" >{categoria === "" ? "Categoria" : "Todas las categorias"}</option>
              <option value="dinosaurios">Dinosaurios</option>
              <option value="munecas">Muñecas</option>
              <option value="punteria">Punteria</option>
              <option value="maquillaje">Maquillaje y Belleza</option>
              <option value="educativo">Interactivo y Educativo</option>
              <option value="accion">Figuras de accion</option>
            </select>
            <select name="ordenar" id="ordenar" onChange={e => setordenar(e.target.value)}>
              <option value="">Ordenar</option>
              <option value="asc">Precio menor a mayor</option>
              <option value="des">Precio mayor a menor</option>
            </select>
            <div className="preciosrange">
              <p>Rango Precios</p>
              <input type="range" defaultValue={MAX} onChange={e => setpreciomax(+e.target.value)} min={MIN} max={MAX} step={STEP} className="range"/>
              <div className="rangeprices">
                <p>{`$${MIN.toLocaleString('es-CO')}`}</p>
                <p>{`$${preciomax.toLocaleString('es-CO')}`}</p>
              </div>
            </div>
          </div>
          {productosfiltrados.length === 0 ? (<div className={`bg-red-500 h-min text-3xl text-white rounded-2xl p-4 text-center uppercase md:ml-4 w-full`}>Lo sentimos, intenta con otros filtros!</div>) : (
            <>
              <div className="">
                <div className="productoscards">
                  {productosmostrar.map(producto => {
                    if(producto.status === "disponible"){
                      return ((
                        <Productocard 
                          key={producto.id}
                          producto={producto} 
                        />
                      ))
                    }
                  })}
                </div>
                <div className="divpaginador">
                  {definirpaginadores().map(pag => (
                    <button key={pag} className={`${pag === 1 ? 'paginador-activo' : ''} paginador`} onClick={(e) => {
                      //Cambiar la pagina
                      setnumpagina(pag);

                      const paginadores = document.querySelectorAll('.paginador');
                      paginadores.forEach(pagin => pagin.classList.remove('paginador-activo'))
                      e.target.classList.add('paginador-activo');
                    }}>{pag}</button>
                  ))}
                </div>
              </div>
              
            </>
          
          )}
          
          
        </div>
      </div>
      
      <img src="/wa.webp" alt="img WA" className="whatsapp" onClick={() => {
        window.open("https://wa.me/573246767492?text=Hola%20Jammy,%20quisiera%20saber%20mas%20informacion%20por%20favor%20", '_blank');
      }}/>
      
    </>
  )
}

export default Catalogo