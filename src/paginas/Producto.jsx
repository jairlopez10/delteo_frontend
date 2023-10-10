import { useParams } from "react-router-dom"
import productosdb from "../components/Productosdb"
import Multimedia from "../components/Multimedia";
import { useState, useEffect } from "react";
import usePagina from "../hooks/usePagina";

const Producto = () => {
  
  const {setpagina} = usePagina()
  const params = useParams();
  let titulo = params.titulo;
  let tipocliente = params.tipocliente;

  useEffect(() => {
    if(tipocliente === "m"){
      setpagina('mayoristaproducto');
      document.title = `${titulo} (${tipocliente})`
    } else {
      setpagina('otra');
      document.title = titulo;
    }
    window.scrollTo(0,0);
    //Cambia el nombre del titulo de la pagina
    
  }, [])
  
  //Remplaza las - por espacios para buscar el titulo
  titulo = titulo.replace(/-/g, " ")
  

  const imagenespr = document.querySelectorAll(".imagen-prod-pag");

  imagenespr.forEach(imgpro => {
    imgpro.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      console.log('Evitando')
    })
  })

  

  //Buscar la informacion del producto
  const producto = productosdb.find(product => product.titulo === titulo);

  const [multiactual, setmultiactual] = useState(producto.imagenes[0])
  const [descripcion, setdescripcion] = useState(true);

  useEffect(() => {
    const imagenprincipal = document.querySelector(".imagen-principal-producto")

    imagenprincipal.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    })
    
  }, [multiactual])

  useEffect(() => {
    if(window.innerWidth <= 1024){
      setdescripcion(false);
    }
  }, [])

  return (
    <>
      <div className="contenedor2">
        <div className="imagen-titulos">
          <div className="imagen-carousel">
            {multiactual.tipo === 'imagen' ? (
              <>
                <img src={multiactual.url} alt="" className="imagen-principal-producto" />
              </>
            ) : (
              <>
                <video className="imagen-principal-producto" autoPlay loop controls controlsList="nodownload">
                  <source src={multiactual.url} />
                </video>
              </>
            )}
            <div className="carousel">
              {producto.imagenes.map(multimedia => (
                <Multimedia 
                  key={multimedia.url} 
                  multimedia={multimedia}
                  setmultiactual={setmultiactual}
                />
              ))}
            </div>
          </div>
          <div className="contenido-producto-final">
            <p className="titulo-producto-final">{producto.titulo}</p>
            <div className="beneficios">
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icono-incluido icon icon-tabler icon-tabler-truck-delivery" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                  <path d="M3 9l4 0" />
                </svg>
                <p>Entregas a todo Colombia (contra entrega)</p>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icono-incluido icon icon-tabler icon-tabler-shield-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
                  <path d="M15 19l2 2l4 -4" />
                </svg>
                <p>Garantia de 1 mes</p>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icono-incluido icon icon-tabler icon-tabler-align-box-bottom-left" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                  <path d="M7 15v2" />
                  <path d="M10 11v6" />
                  <path d="M13 13v4" />
                </svg>
                <p>Stock <span className=" text-green-600">disponible</span></p>
              </div>
            </div>
            {tipocliente === "m" ? (
              <>
                <p className="precio-prod">{`Precio: $${producto.preciomayorista.toLocaleString('es-CO')} / Und`}</p>
                <p className="precio-prod">{`Precio Sugerido: $${producto.precio.toLocaleString('es-CO')} / Und`}</p>
              </>
            ) : (
              <>
                <p className="precio-prod">{`$${producto.precio.toLocaleString('es-CO')} / Und`}</p>
              </>
            )}
            
            <p className="colores">Colores: <span>{producto.colores}</span></p>
            <div className="boton-ordenar" onClick={() => window.open(`https://wa.me/573054392872?text=Hola!%20Estoy%20interesado%20en%20el%20producto%20que%20vi%20en%20${window.location.href}`)}>
              <img src="/wa.webp" alt="" />
              <p>Comprar Ahora</p>
            </div>
            <div className="descripcion-promocion">
              <div className="descripcion">
                <div className="boton-descripcion" onClick={() => setdescripcion(!descripcion)}>
                  <p>Descripción</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#3d3d3d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 10l6 6l6 -6h-12" />
                  </svg>
                </div>
                <p className={`${descripcion ? 'block' : 'hidden'} descripcion-parrafo`}>{producto.descripcion}</p>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Producto