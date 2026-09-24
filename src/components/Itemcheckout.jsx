import { itemDesdeCarrito, track } from "../helpers/analytics"

// Solo GA4: en Meta, AddToCart queda para la intención de compra en la página de producto
const reportarCambio = (evento, item, unidades) => {
    const itemGA4 = { ...itemDesdeCarrito(item), quantity: unidades }
    track(evento, { value: itemGA4.price * unidades, items: [itemGA4] })
}

const Itemcheckout = ({item, carritomostrar, setCarritoMostrar}) => {

    const { id, nombre, imagen, cantidad, precio } = item

    const eliminaritem = () => {
        const nuevocarrito = carritomostrar.filter(item => item.id !== id)
        setCarritoMostrar(nuevocarrito);
        reportarCambio('remove_from_cart', item, Number(cantidad))

    }

    //La cantidad se edita aqui (en la pagina de producto ya no hay selector)
    const cambiarcantidad = (cambio) => {
        const nuevacantidad = Number(cantidad) + cambio
        if (nuevacantidad < 1) return
        const nuevocarrito = carritomostrar.map(producto => producto.id === id ? { ...producto, cantidad: nuevacantidad } : producto)
        setCarritoMostrar(nuevocarrito);
        reportarCambio(cambio > 0 ? 'add_to_cart' : 'remove_from_cart', item, Math.abs(cambio))
    }

  return (
    <li className="chk-item">
        <img src={imagen} className="chk-item-imagen" alt="" />
        <div className="chk-item-texto">
            <p className="chk-item-nombre">{nombre}</p>
            <div className="chk-item-acciones">
                <div className="cantidad-stepper" role="group" aria-label={`Cantidad de ${nombre}`}>
                    <button type="button" onClick={() => cambiarcantidad(-1)} disabled={Number(cantidad) <= 1} aria-label="Quitar una unidad">−</button>
                    <span aria-live="polite">{cantidad}</span>
                    <button type="button" onClick={() => cambiarcantidad(1)} aria-label="Agregar una unidad">+</button>
                </div>
                <button type="button" className="chk-item-eliminar" onClick={() => eliminaritem()}>Eliminar</button>
            </div>
        </div>
        <p className="chk-item-precio">{`$${(precio*cantidad).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`}</p>
    </li>
  )
}

export default Itemcheckout
