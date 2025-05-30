import usePagina from "../hooks/usePagina"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import Itemcheckout from "../components/Itemcheckout";
import productosdb from "../components/Productosdb";
import axios from 'axios';

const Checkout = () => {

    const { setpagina, setContador } = usePagina();
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cedula, setCedula] = useState('');
    const [origen, setOrigen] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [alerta, setAlerta] = useState({});
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carritojammy')) || []);
    const [carritomostrar, setCarritoMostrar] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [descuento, setDescuento] = useState(0);
    const [total, setTotal] = useState(0);
    const [cliente, setCliente] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [aceptarecibir, setAceptarecibir] = useState(false);
    const navegar = useNavigate()
    const envios = {
        pequeno: 10000,
        grande: 20000
    }

    useEffect(() => {

        //Verifica que los productos que estaban en el carrito sigan disponibles pero se deshabilita porque se agregaron variantes en los productos para seleccionar los colores

        /*
        const carritotemporal = carrito.map(item => {
            if(productosdb.some(produ => produ.id === item.id && produ.status === 'disponible')){
                return item;
            }
        })*/

        const carritotemporal = carrito

        setCarritoMostrar(carritotemporal);

    }, [carrito])


    useEffect(() => {
        //Calcular total a pagar
        let totalcarrito = 0;
        carritomostrar.forEach(item => {
            totalcarrito+=(item.cantidad*item.precio)
        })

        calculardescuento();
        setSubtotal(totalcarrito);

        localStorage.setItem('carritojammy', JSON.stringify(carritomostrar));
        setContador(carritomostrar.length);

    }, [carritomostrar])

    useEffect(() => {
        setTotal(subtotal - descuento);
    }, [subtotal, descuento])


    useEffect(() => {
        setpagina('otra')
        dataLayer.push({
            'event': `Checkout`
        })
        document.title = 'Delteo | Checkout'
        window.scrollTo(0,0)
        fbq('track', 'InitiateCheckout', {
            contents: carritomostrar,
            currency: 'COP',
            value: total
        })
        
    }, [])

    useEffect(() => {
        setCliente(nombres + ' ' + apellidos)
    }, [nombres, apellidos]);

    function calcularsubtotal () {
        let totalcarrito = 0;
        carritomostrar.forEach(item => {
            totalcarrito+=(item.cantidad*item.precio)
        })
        return totalcarrito
    }

    const calculardescuento = () => {

        let conttempprodpeq = 0;
        let conttempprodgde = 0;
        let descuentoacum = 0;

        //Contar cuantos productos hay de mas de $20.000
        carritomostrar.forEach(prod => {
            if(prod.precio >= 30000){
                conttempprodgde+=prod.cantidad
            } else {
                conttempprodpeq+=prod.cantidad
            }
        })

        if(conttempprodgde === 1 && conttempprodpeq === 0) {
            setDescuento(0);
        } else if (conttempprodgde >= 1) {
            /*
            if(conttempprodgde > 1){
                descuentoacum+=(conttempprodgde-1)*10000
            }
            if(conttempprodpeq >= 1){
                descuentoacum+=(conttempprodpeq)*5000
            }
                */
            setDescuento(0)
        } else if (conttempprodgde === 0 && conttempprodpeq > 2) {
            setDescuento(0)
            //descuentoacum+=(conttempprodpeq-2)*5000
        }


        //Colocar codigo de subtotal debe ser mayor a $45.000 

        setDescuento(descuentoacum)

        /*
        Si hay solamente 1 producto de mas de $20.000 = NO DESCUENTO

        Si hay 1 producto de mas de 20.000 
            Si hay 1 o mas productos de mas de 20.000 = DESCUENTO DE 10.000
            Si hay 1 producto o mas de menos de 20.000 = DESCUENTO DE 10.000
        
        Si hay mas de 1 producto de menos de 20.000
            SUBTOTAL MINIMO DE $45.000
                SI HAY MAS DE 2 PRODUCTOS DE MENOS 20.000 = DESCUENTO DE $5.000
        */

    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        setSpinner(true);

        //Revisar si algun campo esta vacio y generar alerta
        if([nombres, apellidos, telefono, cedula, origen, ciudad, direccion].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setSpinner(false);
            
            setTimeout(() => {
                setAlerta({});
            }, 3500);
            return;

        }

        //Verifica si el checkbox de acepto que la informacion es correcta esta checkeado
        if(aceptarecibir === false){
            setAlerta({
                msg: 'Debes confirmar que recibiras el pedido',
                error: true
            })
            setSpinner(false);
            
            setTimeout(() => {
                setAlerta({});
            }, 3500);
            return;
        }

        //Verifica que el subtotal sea mayor a $49.900
        if(subtotal < 44900){
            setAlerta({
                msg: 'Pedido minimo de $44.900',
                error: true
            })

            setSpinner(false);
            
            setTimeout(() => {
                setAlerta({});
            }, 4000);
            return;

        }

        let productostext = ""
        carritomostrar.forEach(item => productostext+=item.cantidad + ' - ' + item.nombre+" || ")
        

        //Crear el pedido

        const fechahoy = new Date();
        const fecha = (fechahoy.getMonth()+1)+"/"+fechahoy.getDate()+"/"+fechahoy.getFullYear()

        const pedido = {
            cliente,
            origen,
            fecha,
            productos: carritomostrar,
            productostext,
            ciudad,
            direccion,
            telefono,
            cedula,
            total
        }
        
        //Enviar evento de compra al Pixel de Facebook
        fbq('track', 'Purchase', {
            currency: "COP",
            value: total
        })

        gtag('event', 'purchase', {
            value: total,
            currency: 'COP',
            items: carritomostrar
        })

        gtag('event', 'ads_conversion_Purchase_1', {
            value: total,
            currency: 'COP',
            items: carritomostrar
        })

        //Enviar pedido
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/clientes`;
            await axios.post(url, pedido)
            setSpinner(false);
            navegar('/pedidoconfirmado')
            localStorage.setItem('carritojammy', JSON.stringify([]));
            setCarrito([]);
            setCarritoMostrar([]);
            
            
        } catch (error) {
            console.log(error);
        }


    }

  return (
    <>
        <div className="contenedor-checkout pt-60">
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
                                <label htmlFor="cedula">Cedula:</label>
                                <input type="tel" placeholder="794382312" id="cedula" value={cedula} onChange={e => setCedula(e.target.value)}/>
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="div-row-info">
                                <label htmlFor="ciudad">Ciudad/Departamento:</label>
                                <input type="text" placeholder="Ciudad/Departamento" id="ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)}/>
                            </div>
                            <div className="div-row-info">
                                <label>¿Como nos conociste?</label>
                                <select onChange={e => setOrigen(e.target.value)} value={origen}>
                                    <option value="" disabled>Selecciona</option>
                                    <option value="Facebook Ads">Facebook</option>
                                    <option value="Instagram Ads">Instagram</option>
                                    <option value="Voz a Voz">Voz a Voz</option>
                                </select>
                            
                                
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="div-row-info">
                                <label htmlFor="direccion">Dirección:</label>
                                <input type="text" placeholder="Calle 23 #23-11 Barrio San Felipe Apto 330" id="direccion" value={direccion} onChange={e => setDireccion(e.target.value)} />
                            </div>
                        </div>
                        <div className="div-rows-info mt-4">
                            <div className="flex gap-4 div-texto-aceptar">
                                <input type="checkbox" name='aceptarrecibir' id='aceptarrecibir' className="checkboxinput" value={aceptarecibir} onChange={e =>
                                setAceptarecibir(!aceptarecibir)}/>
                                <label className="texto-aceptar" htmlFor='aceptarrecibir' >Confirmo que la información consignada es verdadera y voy a recibir mi pedido</label>
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
                        {carritomostrar.map(item => (
                            <Itemcheckout 
                                key={item.id}
                                item={item}
                                carritomostrar={carritomostrar}
                                setCarritoMostrar={setCarritoMostrar}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-3">
                        <p className={`${subtotal > 45000 ? 'hidden' : 'asterisco' }`}>*Pedido minimo $45.000</p>
                    </div>
                    {/*
                        <div className="flex justify-between mt-3">
                            <p className=" font-bold">Subtotal</p>
                            <p>{`$${subtotal.toLocaleString('es-CO')}`}</p>
                        </div>
                    */}
                    <div className={`${descuento > 0 ? 'flex justify-between mt-4' : 'hidden'}`}>
                        <p className=" font-bold">Descuento</p>
                        <p className="colorgris">{`- $${descuento.toLocaleString('es-CO')}`}</p>
                    </div>
                    <div className="flex justify-between mt-5">
                        <p className=" font-bold">Envio Contra Entrega</p>
                        <p className="text-blue-600 font-bold">{`GRATIS`}</p>
                    </div>
                    <div className="flex justify-between mt-8 seccion-total">
                        <p className=" font-bold">TOTAL</p>
                        <p className=" text-3xl font-bold">{`$${total.toLocaleString('es-CO')}`}</p>
                    </div>

                    <div>
                        <h2 className="text-black mt-8">Paga en casa</h2>
                        <div className="flex justify-center mt-6">
                            <img className=" w-80" src="./inter.webp" alt="" />
                        </div>
                        
                        <p className="  px-8 py-6 text-center"> <span className=" font-bold">ENVIO TOTALMENTE</span><span className=" font-bold text-blue-600"> GRATIS</span> y recibe tu pedido entre 1-2 dias habiles (Pago en efectivo)</p>
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

                    <div className={`${spinner ? 'block bgspiner' : 'hidden'}`}>
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout