import usePagina from "../hooks/usePagina"
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icono from "../components/Icono";
import { calcularEntrega, formatearFecha } from "../helpers/entregas";
import { enlaceWhatsapp, formatoPrecio, leerUltimoPedido, textoPedido } from "../helpers/pedido";

const PedidoConfirmado = () => {

    const { setpagina } = usePagina();
    const { state } = useLocation();
    // El resumen llega desde el checkout; si recargan la página, se lee de sessionStorage
    const pedido = state || leerUltimoPedido();
    const primerNombre = pedido?.nombre?.split(' ')[0];
    const entrega = pedido?.zona ? calcularEntrega({ zona: pedido.zona }, new Date(pedido.creado || Date.now())) : null;

    useEffect(() => {
        setpagina('otros')
        document.title = 'Delteo | Pedido recibido'
        window.scrollTo(0, 0)
    }, [setpagina])

    const mensajeConfirmacion = pedido
        ? textoPedido('Hola Delteo, acabo de hacer un pedido en la página y quiero confirmarlo:', pedido)
        : 'Hola Delteo, acabo de hacer un pedido en la página y quiero confirmarlo.'

  return (
    <div className="chk chk-confirmacion">
        <div className="chk-card chk-confirmacion-cabecera">
            <img src="/logodelteo.webp" alt="" className="chk-mascota" />
            <h1 className="chk-h1">{primerNombre ? `¡Listo, ${primerNombre}! Recibimos tu pedido.` : '¡Listo! Recibimos tu pedido.'}</h1>
            {entrega && (
                <p className="chk-entrega chk-entrega-grande">
                    <Icono nombre="camion" />
                    {entrega.esRango ? 'Llega a más tardar el ' : 'Llega el '}{formatearFecha(entrega.fecha)}
                </p>
            )}
        </div>

        <section className="chk-card" aria-labelledby="chk-pasos-titulo">
            <h2 id="chk-pasos-titulo" className="chk-h2">Qué pasa ahora</h2>
            <ol className="chk-pasos">
                <li>
                    <strong>Te escribimos por WhatsApp</strong>
                    Desde el 305 439 2872 (guárdalo). Te escribimos en menos de 1 hora, de lunes a sábado entre 8 a.m. y 7 p.m. Si pediste fuera de ese horario, un domingo o un festivo, te escribimos a primera hora del siguiente día hábil.
                </li>
                <li>
                    <strong>Confirmas tu pedido</strong>
                    Revisamos juntos los datos de entrega.
                </li>
                <li>
                    <strong>Lo despachamos</strong>
                    Lo enviamos con Inter Rapidísimo a {pedido?.ciudad || 'tu ciudad'}.
                </li>
                <li>
                    <strong>Recibes y pagas</strong>
                    {pedido ? `Pagas ${formatoPrecio(pedido.total)} en efectivo cuando lo tengas en la mano.` : 'Pagas en efectivo cuando lo tengas en la mano.'}
                </li>
            </ol>

            <a className="pdp-boton-wa chk-boton-ancho" href={enlaceWhatsapp(mensajeConfirmacion)} target="_blank" rel="noopener noreferrer">
                <Icono nombre="whatsapp" />Confirmar ahora por WhatsApp
            </a>
            <p className="chk-micro">Si nos escribes tú primero, confirmamos más rápido.</p>
        </section>

        {pedido?.productos?.length > 0 && (
            <section className="chk-card" aria-labelledby="chk-resumen-final">
                <h2 id="chk-resumen-final" className="chk-h2">Resumen del pedido</h2>
                <ul className="chk-items">
                    {pedido.productos.map(item => (
                        <li key={item.id} className="chk-item">
                            <img src={item.imagen} className="chk-item-imagen" alt="" />
                            <div className="chk-item-texto">
                                <p className="chk-item-nombre">{item.nombre}</p>
                                <p className="chk-item-cantidad">{item.cantidad} {Number(item.cantidad) === 1 ? 'unidad' : 'unidades'}</p>
                            </div>
                            <p className="chk-item-precio">{formatoPrecio(item.precio * item.cantidad)}</p>
                        </li>
                    ))}
                </ul>
                <div className="chk-fila"><span>Envío</span><span className="chk-verde">Gratis</span></div>
                <div className="chk-fila chk-total"><span>Total a pagar al recibir</span><span>{formatoPrecio(pedido.total)}</span></div>
            </section>
        )}

        <p className="chk-volver"><Link to="/">Volver a la tienda</Link></p>
    </div>
  )
}

export default PedidoConfirmado
