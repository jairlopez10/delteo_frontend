
const Itemcheckout = ({item, carritomostrar, setCarritoMostrar}) => {

    const { id, nombre, imagen, cantidad, precio } = item

    const eliminaritem = () => {
        const nuevocarrito = carritomostrar.filter(item => item.id !== id)

        setCarritoMostrar(nuevocarrito);

    }



  return (
    <>
        <div className="producto-checkout">
            <img src={imagen} className="imagen-checkout" alt={`Imagen ${nombre}`} />
            <div>
                <p className="nombre-checkout">{nombre}</p>
                <div className="flex gap-8">
                    <p className="cantidad-checkout">{`${cantidad} Unidades`}</p>
                    <p className="text-red-600 cursor-pointer" onClick={() => eliminaritem()}>Eliminar</p>
                </div>
                
            </div>
            <p className=" text-end">{`$${(precio*cantidad).toLocaleString('es-CO')}`}</p>
        </div>
    </>
  )
}

export default Itemcheckout