import { useParams, useNavigate } from "react-router-dom"
import productosdb from "../components/Productosdb"
import Multimedia from "../components/Multimedia";
import Accesoriosproducto from "../components/Accesoriosproducto";
import { useState, useEffect, useRef } from "react";
import usePagina from "../hooks/usePagina";
import Terrenaitor from "../components/productsection/Terrenaitor";
import Ak from "../components/productsection/Ak";
import Tiburon from "../components/productsection/Tiburon";
import Lancha from "../components/productsection/Lancha";
import Dinosauriocontrol from "../components/productsection/Dinosauriocontrol";
import M416 from "../components/productsection/M416";
import Computadorpantalla from "../components/productsection/Computadorpantalla";
import Minigun from "../components/productsection/Minigun";
import PKM from "../components/productsection/PKM";
import Dinosauriozaza from "../components/productsection/Dinosauriozaza";
import Mp5 from "../components/productsection/Mp5";
import Lamparaluna from "../components/productsection/Lamparaluna";
import Nutriarelajante from "../components/productsection/Nutriarelajante";
import Consola400en1 from "../components/productsection/Consola400en1";
import Computadorpantallanomouse from "../components/productsection/Computadorpantallanomouse";
import Perrorepetidor from "../components/productsection/Perrorepetidor";
import Gimnasio from "../components/productsection/Gimnasio";
import Minecraftlegopeq from "../components/productsection/Minecraftlegopeq";
import Alerta from "../components/Alerta";

const Producto = () => {
  
  const {setpagina, setContador, contador} = usePagina()
  const params = useParams();
  let titulo = params.titulo;
  let tipocliente = params.tipocliente;
  const navigate = useNavigate()
  const idlanzadoras = [2, 13, 50, 303, 277, 51, 290, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388]
  const productsection = {
    2: <Computadorpantalla />,
    372: <Terrenaitor />,
    373: <Mp5 />,
    374: <Ak />,
    375: <Minigun />,
    377: <PKM />,
    378: <Tiburon />,
    379: <Lancha />,
    380: <Dinosauriocontrol />,
    376: <M416 />,
    381: <Computadorpantalla />,
    382: <Dinosauriozaza />,
    383: <Lamparaluna />,
    384: <Nutriarelajante />,
    385: <Consola400en1 />,
    386: <Computadorpantallanomouse />,
    387: <Perrorepetidor />,
    388: <Minecraftlegopeq />,
    13: <Gimnasio />
  }
  const envio = {
    pequeno:  10000,
    grande: 20000
  }
  const [visiblecomprar, setVisiblecomprar] = useState(true);
  const botoncomprarref = useRef(null); //Referencia el boton
  const estrellasref = useRef(null)

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

    const observer = new IntersectionObserver( entries => {
      if(entries[0].isIntersecting){
        setVisiblecomprar(true)
      } else {
        setVisiblecomprar(false)
      }
    })
  
    if(botoncomprarref.current){
      observer.observe(botoncomprarref.current)
    }

    return () => {
      if(botoncomprarref.current) {
        observer.unobserve(botoncomprarref.current);
      }
    }

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
  const [mostrarcolores, setMostrarcolores] = useState(false);
  const [colorselected, setColorselected] = useState("")
  const [idcolor, setIdcolor] = useState("")
  const [productpage, setproductpage] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [variante, setVariante] = useState(typeof producto.colores === "object" ? true : false)

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

    const lanzatemporal = idlanzadoras.some(item => item === producto.id)
    
    lanzatemporal ? setproductpage(true) : setproductpage(false);
    setContador(carrito.length || 0)
    
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

    if(colorselected === "" && variante === true){
      if(estrellasref.current){
        estrellasref.current.scrollIntoView({behavior: 'smooth'})
      }

      setAlerta(true)
      setTimeout(() => {
        setAlerta(false)
      }, 2000);
      return;
    }

    //Se crean estos temps por si son productos que tienen variantes
    const nombretemp = variante === true ? producto.titulo + ` (${colorselected})` : producto.titulo;
    const idtemp = variante === true ? idcolor : producto.id

    const pedido = {
      id: idtemp,
      nombre: nombretemp,
      cantidad,
      precio: producto.precio >= 20000 ? producto.precio + envio.grande : producto.precio + envio.pequeno,
      imagen: producto.imagenes[0].url
    }

    let nuevocarrito = []

    const existe = carrito.some(item => item.id === idtemp);

    if(existe){
      nuevocarrito = carrito.map(item => {
        if(item.id === idtemp){
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
    setContador(nuevocarrito.length)

    notificacioncarrito()

    setTimeout(() => {
      navigate("/checkout")
    }, 200);
  }

  const notificacioncarrito = () => {
    setAlertaCarrito(true);
    setTimeout(() => {
      setAlertaCarrito(false);
    }, 200);
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
             
              <div ref={estrellasref} className="flex gap-1 items-center">
                <img src="/estrella.webp" alt="estrella" className="estrella"/>
                <img src="/estrella.webp" alt="estrella" className="estrella"/>
                <img src="/estrella.webp" alt="estrella" className="estrella"/>
                <img src="/estrella.webp" alt="estrella" className="estrella"/>
                <img src="/estrella.webp" alt="estrella" className="estrella"/>
                <p> + {producto.id + 25} Vendidos</p>
              </div>
              
            </div>
            
            {tipocliente === "m" ? (
              <>
                <p className="precio-prod">{`Precio: $${producto.preciomayorista.toLocaleString('es-CO')} / Und`}</p>
                <p className="precio-prod">{`Precio Sugerido: $${producto.precio.toLocaleString('es-CO')} / Und`}</p>
              </>
            ) : (
              <>
                <p className="precio-prod-antes">{`$${producto.precio >= 20000 ? ((producto.precio + envio.grande)*2).toLocaleString('es-CO') : ((producto.precio + envio.pequeno)*2).toLocaleString('es-CO')}`}</p>
                <div className="flex items-center gap-3">
                  <p className="precio-prod">{`$${producto.precio >= 20000 ? (producto.precio + envio.grande).toLocaleString('es-CO') : (producto.precio + envio.pequeno).toLocaleString('es-CO')}`}</p>
                  <p className="oferta-text">50% DESCTO</p>
                </div>
                
              </>
            )}
            
            {typeof producto.colores === "object" ? (
              <>
                <div className="div-colores">
                  <p className="font-bold">Modelo:</p>
                  <div className="relative">
                    <p className="selector-color" onClick={() => setMostrarcolores(!mostrarcolores)}>{colorselected === "" ? "-- Selecciona -- " : colorselected}</p>
                    <div className={`${mostrarcolores ? 'opciones-colores' : 'hidden'}`}>
                      {producto.colores.map(color => (
                        <p className=" cursor-pointer py-2" key={color.id} onClick={e => {
                          setColorselected(color.texto)
                          setIdcolor(color.id)
                          setMostrarcolores(false);
                        }}>{color.texto}</p>
                      ))}
                    </div>
                  </div>
                  
                </div>
                {alerta ? (
                  <Alerta
                  alerta={{msg: "Selecciona modelo"}}
                />
                ): ""}
              </>
            ) : (
              <>
                <p className="colores">Colores: <span>{producto.colores}</span></p>
              </>
            )}
            
            <div className="botones-carrito">
              <button onClick={() => cambiarcantidad('menos')}>-</button>
              <input type="number" min="1" value={cantidad} onChange={e => setCantidad(e.target.value)} />
              <button onClick={() => cambiarcantidad('mas')}>+</button>
            </div>
            {/*
              <button className="boton-agregar-carrito" onClick={() => agregaralcarrito()}>Agregar Carrito </button>
            */}
            
            <button ref={botoncomprarref} className={`boton-comprar-ahora`} onClick={() => {
              agregaralcarrito();
              
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icono-carrito-producto icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              Pagar en Casa</button>

            <button className={`${visiblecomprar ? 'hidden' : 'fijar-boton-comprar-ahora boton-comprar-ahora'}`} onClick={() => {
              agregaralcarrito();
              
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icono-carrito-producto icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              Pagar en Casa</button>
            {/*Agrega la seccion del producto con sus gifts y estrategia AIDA */}
            {productpage ? (
              <>
                <img src="/puntosfuertes.webp" className="puntosfuertes" alt="puntos fuertes" />
                {productsection[producto.id]}

              </>
            ) : (
              <>
                <div className="descripcion-promocion">
                  <div className="descripcion">
                    <div className="boton-descripcion" onClick={() => setdescripcion(!descripcion)}>
                      <p>Caracteristicas</p>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="#555555" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 10l6 6l6 -6h-12" />
                      </svg>
                    </div>
                    <div className={`${descripcion ? 'block' : 'hidden'} descripcion-parrafo`}>
                    <p>{producto.descripcion}</p>
                      {/*productpage ? (
                        <>
                          <Accesoriosproducto 
                            accesorios={producto.descripcion}
                          />
                        </>
                      ) : (
                        <>
                          <p>{producto.descripcion}</p>
                        </>
                      )*/}
                    </div>
                    
                  </div>
                  
                </div>
              </>
            )}

            <img src="/delta.webp" className=" mt-10" alt="imagen-delta" />
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Producto