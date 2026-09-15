
const Itemcheckout = ({item, carritomostrar, setCarritoMostrar}) => {

    const { id, nombre, imagen, cantidad, precio } = item

    const eliminaritem = () => {
        const nuevocarrito = carritomostrar.filter(item => item.id !== id)
        setCarritoMostrar(nuevocarrito);

    }

    //La cantidad se edita aqui (en la pagina de producto ya no hay selector)
    const cambiarcantidad = (cambio) => {
        const nuevacantidad = Number(cantidad) + cambio
        if (nuevacantidad < 1) return
        const nuevocarrito = carritomostrar.map(producto => producto.id === id ? { ...producto, cantidad: nuevacantidad } : producto)
        setCarritoMostrar(nuevocarrito);
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
