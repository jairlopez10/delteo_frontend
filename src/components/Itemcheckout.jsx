
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
    <>
        <div className="producto-checkout">
            <img src={imagen} className="imagen-checkout" alt={`Imagen ${nombre}`} />
            <div>
                <p className="nombre-checkout">{nombre}</p>
                <div className="flex gap-8 items-center">
                    <div className="cantidad-stepper" aria-label={`Cantidad de ${nombre}`}>
                        <button type="button" onClick={() => cambiarcantidad(-1)} disabled={Number(cantidad) <= 1} aria-label="Quitar una unidad">−</button>
                        <span>{cantidad}</span>
                        <button type="button" onClick={() => cambiarcantidad(1)} aria-label="Agregar una unidad">+</button>
                    </div>
                    <p className="text-red-600 cursor-pointer" onClick={() => eliminaritem()}>Eliminar</p>
                </div>
                
            </div>
            <p className=" text-end">{`$${(precio*cantidad).toLocaleString('es-CO')}`}</p>
        </div>
    </>
  )
}

export default Itemcheckout