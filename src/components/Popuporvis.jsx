import productosdb from "./Productosdb"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Popuporvis = () => {

    const producto = productosdb.find(prod => prod.id === 362)
    const [cantidadpop, setCantidadpop] = useState(1);
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carritojammy')) || []);
    const navigate = useNavigate()

    //USEEFFECTS
    useEffect(() => {
  
      localStorage.setItem('carritojammy', JSON.stringify(carrito))

    }, [carrito])


    //FUNCIONES
    const cambiarcantidadpop = (tipo) => {

      if(tipo === 'menos'){
        if(cantidadpop > 1){
          setCantidadpop(cantidadpop-1);
        } else {
          setCantidadpop(1);
        }
      } else {
        if(cantidadpop <= 0){
          setCantidadpop(1)
        } else {
          setCantidadpop(cantidadpop+1);
        }
      }
    }

    const agregaextracarrito = () => {


      const existe = carrito.some(item => item.id == producto.id)
      
      let nuevocarrito = [];

      if(existe){
        nuevocarrito = carrito.map(item => {
          if(item.id === producto.id){
            item.cantidad = item.cantidad + cantidadpop;
            return item;
          } else {
            return item;
          }
        })
      } else {

        const pedido = {
          id: producto.id,
          nombre: producto.titulo,
          cantidad: cantidadpop,
          precio: producto.precio,
          imagen: producto.imagenes[0].url
        }

        nuevocarrito = [...carrito, pedido]
      }

      setCarrito(nuevocarrito)

      setTimeout(() => {
        navigate("/checkout")
      }, 200);
    }


  return (
    <>
        <div className="div-backpopup">
            <div className="div-popup">
                <img src="/orvishidro.webp" alt="" />
                <div className="div-text-pop">
                  <p className="tit-orvis-pop">Orvis de Hidrogel X 10.000 Unds</p>
                  <p className="precioantes">${(producto.precio*2).toLocaleString('es-CO')}</p>
                  <p className="preciopoporvis">${(producto.precio).toLocaleString('es-CO')}</p>
                  <div className="botones-carrito">
                    <button onClick={() => cambiarcantidadpop('menos')}>-</button>
                    <input type="number" min="1" value={cantidadpop} onChange={e => setCantidadpop(e.target.value)} />
                    <button onClick={() => cambiarcantidadpop('mas')}>+</button>
                  </div>
                  <div className="div-ahora-agregar">
                    <button onClick={() => navigate("/checkout")}>AHORA NO</button>
                    <button onClick={() => agregaextracarrito()}>AGREGAR</button>
                  </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Popuporvis