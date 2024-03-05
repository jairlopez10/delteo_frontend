import usePagina from "../hooks/usePagina"
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import Itemcheckout from "../components/Itemcheckout";

const Checkout = () => {

    const { setpagina } = usePagina();
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [alerta, setAlerta] = useState({});
    const [total, setTotal] = useState(0);

    const carrito = [
        {
            id: 50,
            nombre: 'Lanzadora MP5 con 6000 Orvis Hidrogel',
            imagen: '/producto50a.webp',
            cantidad: 5,
            precio: 104900
        },
        {
            id: 2,
            nombre: 'Organeta Vaca con Luces y Sonido',
            imagen: '/producto179a.webp',
            cantidad: 2,
            precio: 39900
        },
        {
            id: 179,
            nombre: 'Huevo Cry Baby Sorpresa',
            imagen: '/producto70a.webp',
            cantidad: 1,
            precio: 28900
        },

    ]

    useEffect(() => {
        setpagina('otra')

        //Calcular total a pagar
        let totalcarrito = 0;
        carrito.forEach(item => {
            totalcarrito+=(item.cantidad*item.precio)
        })
        setTotal(totalcarrito);
        

    }, [])

    const handlesubmit = (e) => {
        e.preventDefault();

        //Revisar si algun campo esta vacio y generar alerta
        if([nombres, apellidos, telefono, email, departamento, ciudad, direccion].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            
            setTimeout(() => {
                setAlerta({});
            }, 3500);
            return;

        }

        console.log('Enviando Info')


    }

  return (
    <>
        <div className="contenedor-checkout">
            <div className="pagina-checkout">
                <div className="informacion-envio grid-item">
                    <h1 className="text-black">Dirección de Envio</h1>
                    <div className="formulario-datos">
                        <div className="div-rows-info">
                            <div className="div-row-info">
                                <label htmlFor="nombres">Nombres:</label>
                                <input type="text" placeholder="Nombres" id="nombres" value={nombres} onChange={e => setNombres(e.target.value)} />
                            </div>
                            <div className="div-row-info">
                                <label htmlFor="apellidos">Apellidos:</label>
                                <input type="text" placeholder="Apellidos" id="apellidos" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="div-row-info">
                                <label htmlFor="telefono">Telefono:</label>
                                <input type="tel" placeholder="Telefono" id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)}/>
                            </div>
                            <div className="div-row-info">
                                <label htmlFor="email">Email:</label>
                                <input type="email" placeholder="Email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="div-row-info">
                                <label htmlFor="departamento">Departamento:</label>
                                <input type="text" placeholder="Departamento" id="departamento" value={departamento} onChange={e => setDepartamento(e.target.value)} />
                            </div>
                            <div className="div-row-info">
                                <label htmlFor="ciudad">Ciudad:</label>
                                <input type="text" placeholder="Ciudad" id="ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)}/>
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="div-row-info">
                                <label htmlFor="direccion">Dirección:</label>
                                <input type="text" placeholder="Calle 23 #23-11 Barrio San Felipe Apto 330" id="direccion" value={direccion} onChange={e => setDireccion(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        {alerta.msg && 
                            <Alerta 
                                alerta={alerta}
                            />
                        }
                    </div>
                    <button className={`lg:hidden  boton-checkout`} onClick={handlesubmit}>
                        ENVIAR PEDIDO
                    </button>
                </div>
                <div className="informacion-pedido grid-item">
                    <h1 className="text-black">Tu Pedido</h1>
                    <div className="resumen-productos">
                        {carrito.map(item => (
                            <Itemcheckout 
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between mt-8">
                        <p className=" font-bold">Envio Contra Entrega</p>
                        <p>GRATIS</p>
                    </div>
                    <div className="flex justify-between mt-8 seccion-total">
                        <p className=" font-bold">TOTAL</p>
                        <p className=" text-3xl">{`$${total.toLocaleString('es-CO')}`}</p>
                    </div>

                    <div>
                        <h2 className="text-black mt-8">Formas de Pago</h2>
                        <div className="envios-fotos">
                            <img className="" src="./truck.png" alt="" />
                            <img className="" src="./contraentrega.jpg" alt="" />
                        </div>
                        <p className="  px-8 py-6 text-center">Pago Contra Entrega <span className=" font-bold text-green-600">GRATIS</span> entre 1-2 dias habiles y el pago se realiza en efectivo</p>
                    </div>

                    <div className="ocultar-info-pedido">
                        {alerta.msg && 
                            <Alerta 
                                alerta={alerta}
                            />
                        }
                    </div>
                    
                    
                    <button className={`boton-info-pedido boton-checkout`} onClick={handlesubmit}>
                        ENVIAR PEDIDO
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout