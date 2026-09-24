import usePagina from "../hooks/usePagina"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import axios from "axios"
import Icono from "../components/Icono"
import { calcularEntrega, formatearFecha } from "../helpers/entregas"
import { enlaceWhatsapp, formatoPrecio, textoPedido } from "../helpers/pedido"
import { datosMeta, eventIdPurchase, itemsDesdeBackend, track } from "../helpers/analytics"
import {
    ESTADOS, esEstadoFinal, leerPagoPendiente, marcarPurchaseEnviado,
    METODO_WOMPI, olvidarPagoPendiente, olvidarPedidoId, yaSeEnvioPurchase
} from "../helpers/pagos"

/*
Aquí vuelve el cliente después de pagar en Wompi.

La redirección NO decide nada: solo trae el id de la transacción. El estado real
lo dice el backend, que lo consulta contra el API de Wompi con la llave privada.

El backend puede tardar en responder la primera vez (Render se duerme), así que
se reintenta con esperas crecientes en vez de mostrar un error de una.
*/

const ESPERAS = [0, 2000, 3000, 5000, 8000, 10000, 15000, 20000, 30000]

const PagoResultado = () => {

    const { setpagina, setContador } = usePagina()
    const [parametros] = useSearchParams()
    const idtransaccion = parametros.get('id')

    const [pago, setPago] = useState(null)
    const [fase, setFase] = useState('consultando') // consultando | listo | sinrespuesta | sinid
    const intentoRef = useRef(0)
    const temporizadorRef = useRef(null)
    const pendiente = useRef(leerPagoPendiente()).current

    const consultar = useCallback(async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/pagos/${encodeURIComponent(idtransaccion)}`
            const { data } = await axios.get(url, { timeout: 30000 })
            setPago(data)

            if (esEstadoFinal(data.estado)) {
                setFase('listo')
                return true
            }
            // Sigue en proceso (PSE y Bancolombia pueden tardar): se vuelve a preguntar
            setFase('listo')
            return false

        } catch (error) {
            // 404 significa que Wompi no conoce esa transacción: no tiene sentido insistir
            if (error?.response?.status === 404) {
                setFase('sinrespuesta')
                return true
            }
            return false
        }
    }, [idtransaccion])

    useEffect(() => {
        setpagina('otros')
        document.title = 'Delteo | Resultado del pago'
        window.scrollTo(0, 0)

        if (!idtransaccion) {
            setFase('sinid')
            return
        }

        let cancelado = false

        const siguiente = async () => {
            if (cancelado) return
            const termino = await consultar()
            if (cancelado || termino) return

            intentoRef.current += 1
            if (intentoRef.current >= ESPERAS.length) {
                setFase(actual => (actual === 'consultando' ? 'sinrespuesta' : actual))
                return
            }
            temporizadorRef.current = setTimeout(siguiente, ESPERAS[intentoRef.current])
        }

        siguiente()

        return () => {
            cancelado = true
            clearTimeout(temporizadorRef.current)
        }
        // Solo al montar
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // El carrito se vacía y se reportan los eventos SOLO cuando el pago quedó aprobado
    useEffect(() => {
        if (pago?.estado !== ESTADOS.PAGADO) return

        localStorage.setItem('carritojammy', JSON.stringify([]))
        setContador(0)
        olvidarPagoPendiente()
        // La próxima compra en esta pestaña es un checkout nuevo
        olvidarPedidoId()

        if (yaSeEnvioPurchase(pago.referencia)) return
        marcarPurchaseEnviado(pago.referencia)

        /*
        El ordenid lo genera el backend: es el transaction_id de GA4 y el event_id que el
        backend usa en el Purchase de CAPI (enviado desde el webhook o desde la consulta
        de esta página). Si este mismo Purchase llega desde otro dispositivo, GA4 y Meta
        lo descartan por el id.
        */
        const idPedido = pago.ordenid || pago.referencia
        const items = itemsDesdeBackend(pago.items || [])
        const compra = { transaction_id: idPedido, value: pago.total, payment_type: METODO_WOMPI, items }
        track('purchase', compra, {
            nombre: 'Purchase',
            eventID: pago.ordenid ? eventIdPurchase(pago.ordenid) : undefined,
            datos: { ...datosMeta(items), value: pago.total }
        })
        // Conversión de Google Ads importada desde GA4: se conserva igual que antes
        track('ads_conversion_Purchase_1', compra)
    }, [pago, setContador])

    const zona = pago?.zona || pendiente?.zona
    const entrega = pago?.estado === ESTADOS.PAGADO && zona
        ? calcularEntrega({ zona }, new Date(pendiente?.creado || Date.now()))
        : null
    const primerNombre = pago?.nombre?.split(' ')[0]

    const pedidoParaWhatsapp = pago && {
        productos: (pago.items || []).map(item => ({ ...item, precio: item.preciounitario })),
        total: pago.total,
        nombre: pago.nombre,
        ciudad: pago.ciudad,
        notaPago: `(ya pagado${pago.metodopago ? ` con ${pago.metodopago}` : ''})`
    }

    // ------------------------------------------------------------ vistas

    if (fase === 'sinid') {
        return (
            <div className="chk chk-vacio">
                <h1 className="chk-h1">No encontramos este pago</h1>
                <p>El enlace no trae la información de la transacción.</p>
                <Link to="/" className="pdp-boton">Volver a la tienda</Link>
            </div>
        )
    }

    if (fase === 'consultando' || !pago) {
        return (
            <div className="chk chk-confirmacion">
                <div className="chk-card chk-confirmacion-cabecera">
                    <span className="chk-spinner chk-spinner-grande" aria-hidden="true" />
                    <h1 className="chk-h1">Estamos confirmando tu pago…</h1>
                    <p>Esto puede tardar unos segundos. No cierres ni recargues esta página.</p>
                </div>
            </div>
        )
    }

    if (fase === 'sinrespuesta') {
        return (
            <div className="chk chk-confirmacion">
                <div className="chk-card chk-confirmacion-cabecera">
                    <Icono nombre="alerta" className="chk-icono-grande" />
                    <h1 className="chk-h1">No pudimos confirmar tu pago todavía</h1>
                    <p>Tu dinero está seguro. Si el pago salió, lo vamos a ver igual y te escribimos por WhatsApp.</p>
                </div>
                <section className="chk-card">
                    <a className="pdp-boton-wa chk-boton-ancho" href={enlaceWhatsapp('Hola Delteo, acabo de pagar en la página y quiero confirmar mi pedido.')} target="_blank" rel="noopener noreferrer"
                        onClick={() => track('whatsapp_click', { location: 'pago_sin_confirmar' })}>
                        <Icono nombre="whatsapp" />Escríbenos por WhatsApp
                    </a>
                    <p className="chk-volver"><Link to="/">Volver a la tienda</Link></p>
                </section>
            </div>
        )
    }

    const aprobado = pago.estado === ESTADOS.PAGADO
    const enProceso = pago.estado === ESTADOS.EN_PROCESO || pago.estado === ESTADOS.PENDIENTE
    const rechazado = [ESTADOS.RECHAZADO, ESTADOS.ANULADO, ESTADOS.ERROR].includes(pago.estado)

    const titulos = {
        [ESTADOS.RECHAZADO]: 'Tu pago fue rechazado',
        [ESTADOS.ANULADO]: 'Tu pago fue anulado',
        [ESTADOS.ERROR]: 'Hubo un problema con tu pago'
    }

    return (
        <div className="chk chk-confirmacion">

            <div className="chk-card chk-confirmacion-cabecera">
                {aprobado && <img src="/logodelteo.webp" alt="" className="chk-mascota" />}
                {enProceso && <span className="chk-spinner chk-spinner-grande" aria-hidden="true" />}
                {rechazado && <Icono nombre="alerta" className="chk-icono-grande" />}

                <h1 className="chk-h1">
                    {aprobado && (primerNombre ? `¡Listo, ${primerNombre}! Tu pago fue aprobado.` : '¡Listo! Tu pago fue aprobado.')}
                    {enProceso && 'Tu pago está en proceso'}
                    {rechazado && titulos[pago.estado]}
                </h1>

                {aprobado && entrega && (
                    <p className="chk-entrega chk-entrega-grande">
                        <Icono nombre="camion" />
                        {entrega.esRango ? 'Llega a más tardar el ' : 'Llega el '}{formatearFecha(entrega.fecha)}
                    </p>
                )}
                {enProceso && <p>Algunos medios de pago, como PSE, tardan un poco en confirmarse. Te avisamos por WhatsApp apenas se apruebe.</p>}
                {rechazado && <p>No se te cobró nada. Puedes intentar con otro medio de pago; tu carrito sigue guardado.</p>}
            </div>

            {aprobado && (
                <section className="chk-card" aria-labelledby="chk-pasos-titulo">
                    <h2 id="chk-pasos-titulo" className="chk-h2">Qué pasa ahora</h2>
                    <ol className="chk-pasos">
                        <li>
                            <strong>Ya recibimos tu pago</strong>
                            Tu pedido quedó registrado{pago.metodopago ? ` (pagaste con ${pago.metodopago})` : ''}.
                        </li>
                        <li>
                            <strong>Te escribimos por WhatsApp</strong>
                            Desde el 305 439 2872 (guárdalo). Te confirmamos los datos de entrega.
                        </li>
                        <li>
                            <strong>Lo despachamos</strong>
                            Lo enviamos con Inter Rapidísimo a {pago.ciudad || 'tu ciudad'}.
                        </li>
                    </ol>
                    <a className="pdp-boton-wa chk-boton-ancho" href={enlaceWhatsapp(textoPedido('Hola Delteo, acabo de pagar mi pedido en la página:', pedidoParaWhatsapp))} target="_blank" rel="noopener noreferrer"
                        onClick={() => track('whatsapp_confirmation', { payment_type: METODO_WOMPI, transaction_id: pago.ordenid || pago.referencia })}>
                        <Icono nombre="whatsapp" />Confirmar por WhatsApp
                    </a>
                </section>
            )}

            {enProceso && (
                <section className="chk-card">
                    <p className="chk-micro"><Icono nombre="reloj" />Esta página se actualiza sola. Si cierras, te escribimos igual.</p>
                    <a className="pdp-boton-wa chk-boton-ancho" href={enlaceWhatsapp('Hola Delteo, acabo de pagar y quiero saber cómo va mi pedido.')} target="_blank" rel="noopener noreferrer"
                        onClick={() => track('whatsapp_click', { location: 'pago_en_proceso' })}>
                        <Icono nombre="whatsapp" />Escríbenos por WhatsApp
                    </a>
                </section>
            )}

            {rechazado && (
                <section className="chk-card">
                    <Link to="/checkout" className="pdp-boton chk-boton-ancho">Intentar de nuevo</Link>
                    <a className="pdp-boton-wa chk-boton-ancho" href={enlaceWhatsapp('Hola Delteo, mi pago fue rechazado y quiero hacer el pedido de otra forma.')} target="_blank" rel="noopener noreferrer"
                        onClick={() => track('whatsapp_click', { location: 'pago_rechazado' })}>
                        <Icono nombre="whatsapp" />Pedir por WhatsApp
                    </a>
                </section>
            )}

            {pago.items?.length > 0 && (
                <section className="chk-card" aria-labelledby="chk-resumen-final">
                    <h2 id="chk-resumen-final" className="chk-h2">Resumen del pedido</h2>
                    <ul className="chk-items">
                        {pago.items.map(item => (
                            <li key={`${item.id}-${item.nombre}`} className="chk-item">
                                <div className="chk-item-texto">
                                    <p className="chk-item-nombre">{item.nombre}</p>
                                    <p className="chk-item-cantidad">{item.cantidad} {Number(item.cantidad) === 1 ? 'unidad' : 'unidades'}</p>
                                </div>
                                <p className="chk-item-precio">{formatoPrecio(item.subtotal)}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="chk-fila"><span>Envío</span><span className="chk-verde">Gratis</span></div>
                    <div className="chk-fila chk-total">
                        <span>{aprobado ? 'Total pagado' : 'Total'}</span>
                        <span>{formatoPrecio(pago.total)}</span>
                    </div>
                    {pago.referencia && <p className="chk-privacidad">Referencia de pago: {pago.referencia}</p>}
                </section>
            )}

            <p className="chk-volver"><Link to="/">Volver a la tienda</Link></p>
        </div>
    )
}

export default PagoResultado
