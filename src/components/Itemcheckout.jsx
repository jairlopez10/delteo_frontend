
const Itemcheckout = ({item}) => {

    const { id, nombre, imagen, cantidad, precio } =item

  return (
    <>
        <div className="producto-checkout">
            <img src={imagen} className="imagen-checkout" alt={`Imagen ${nombre}`} />
            <div>
                <p className="nombre-checkout">{nombre}</p>
                <div className="flex gap-8">
                    <p className="cantidad-checkout">{`${cantidad} Unidades`}</p>
                    <p className="text-red-600 cursor-pointer">Eliminar</p>
                </div>
                
            </div>
            <p className=" text-end">{`$${(precio*cantidad).toLocaleString('es-CO')}`}</p>
        </div>
    </>
  )
}

export default Itemcheckout