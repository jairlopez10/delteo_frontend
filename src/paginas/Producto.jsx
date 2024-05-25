import { useParams } from "react-router-dom"
import productosdb from "../components/Productosdb"
import Multimedia from "../components/Multimedia";
import Accesoriosproducto from "../components/Accesoriosproducto";
import { useState, useEffect } from "react";
import usePagina from "../hooks/usePagina";

const Producto = () => {
  
  const {setpagina} = usePagina()
  const params = useParams();
  let titulo = params.titulo;
  let tipocliente = params.tipocliente;
  const idlanzadoras = [50, 303, 277, 51, 290]

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
  const [cantidad, setCantidad] = useState(1);
  const [alertacarrito, setAlertaCarrito] = useState(false);
  const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carritojammy')) || []);
  const [lanzadoraboolean, setLanzadoraBoolean] = useState(false);

  useEffect(() => {
    const imagenprincipal = document.querySelector(".imagen-principal-producto")

    imagenprincipal.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    })
    
  }, [multiactual])

  useEffect(() => {
  
    localStorage.setItem('carritojammy', JSON.stringify(carrito))

  }, [carrito])



  useEffect(() => {

    if(window.innerWidth <= 1024){
      setdescripcion(false);
    }

    const lanzatemporal = idlanzadoras.some(item => item === producto.id)
    
    lanzatemporal ? setLanzadoraBoolean(true) : setLanzadoraBoolean(false);


    
  }, [])

  const cambiarcantidad = (tipo) => {

    if(tipo === 'menos'){
      if(cantidad > 1){
        setCantidad(cantidad-1);
      } else {
        setCantidad(1);
      }
    } else {
      if(cantidad<=0){
        setCantidad(1)
      } else {
        setCantidad(cantidad+1);
      }
    }
  }

  const agregaralcarrito = () => {

    const pedido = {
      id: producto.id,
      nombre: producto.titulo,
      cantidad,
      precio: producto.precio,
      imagen: producto.imagenes[0].url
    }

    let nuevocarrito = []

    const existe = carrito.some(item => item.id === producto.id);

    if(existe){
      nuevocarrito = carrito.map(item => {
        if(item.id === producto.id){
          item.cantidad = item.cantidad + cantidad;
          return item;
        } else {
          return item;
        }
      })
    } else {
      nuevocarrito = [...carrito, pedido]
    }

    //Enviar evento al Pixel de Facebook
    fbq('track', 'AddToCart', {
      content_ids: producto.id,
      content_name: producto.titulo,
      currency: 'COP',
      value: producto.precio * cantidad
    });
    
    //Enviar evento a Google Analytics
    gtag('event', 'add_to_cart', {
      currency: 'COP',
      value: producto.precio * cantidad,
      items: [{
        item_id: producto.id,
        item_name: producto.titulo,
        quantity: cantidad,
        price: producto.precio
      }]
    })
    
    
    setCarrito(nuevocarrito);

    notificacioncarrito()
  }

  const notificacioncarrito = () => {
    setAlertaCarrito(true);
    setTimeout(() => {
      setAlertaCarrito(false);
    }, 3000);
  }

  return (
    <>
      <div className="contenedor2 pt-44">
        <div className={`${alertacarrito ? 'block' : 'hidden'} notificacion-carrito`}>
          Agregado Correctamente
        </div>
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
                <p>Envio a tu dirección <span className=" text-green-600 font-bold">GRATIS</span></p>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icono-incluido icon icon-tabler icon-tabler-shield-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
                  <path d="M15 19l2 2l4 -4" />
                </svg>
                <p>Garantia de <span className=" text-green-600 font-bold">1 mes</span></p>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icono-incluido icon icon-tabler icon-tabler-align-box-bottom-left" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                  <path d="M7 15v2" />
                  <path d="M10 11v6" />
                  <path d="M13 13v4" />
                </svg>
                <p>Stock <span className=" text-green-600 font-bold">disponible</span></p>
              </div>
            </div>
            {tipocliente === "m" ? (
              <>
                <p className="precio-prod">{`Precio: $${producto.preciomayorista.toLocaleString('es-CO')} / Und`}</p>
                <p className="precio-prod">{`Precio Sugerido: $${producto.precio.toLocaleString('es-CO')} / Und`}</p>
              </>
            ) : (
              <>
                <p className="precio-prod">{`$${producto.precio.toLocaleString('es-CO')}`}</p>
              </>
            )}
            
            <p className="colores">Colores: <span>{producto.colores}</span></p>
            <div className="botones-carrito">
              <button onClick={() => cambiarcantidad('menos')}>-</button>
              <input type="number" min="1" value={cantidad} onChange={e => setCantidad(e.target.value)} />
              <button onClick={() => cambiarcantidad('mas')}>+</button>
            </div>
            <button className="boton-agregar-carrito" onClick={() => agregaralcarrito()}>Agregar Carrito </button>
            
            <div className="descripcion-promocion">
              <div className="descripcion">
                <div className="boton-descripcion" onClick={() => setdescripcion(!descripcion)}>
                  <p>Caracteristicas</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#3d3d3d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 10l6 6l6 -6h-12" />
                  </svg>
                </div>
                <div className={`${descripcion ? 'block' : 'hidden'} descripcion-parrafo`}>
                  {lanzadoraboolean ? (
                    <>
                      <Accesoriosproducto 
                        accesorios={producto.descripcion}
                      />
                    </>
                  ) : (
                    <>
                      <p>{producto.descripcion}</p>
                    </>
                  )}
                </div>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Producto