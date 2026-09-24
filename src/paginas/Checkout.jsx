import usePagina from "../hooks/usePagina"
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Itemcheckout from "../components/Itemcheckout";
import Selectormunicipio from "../components/Selectormunicipio";
import Icono from "../components/Icono";
import { calcularEntrega, ciudadesEntrega, formatearFecha, guardarCiudad, leerCiudadGuardada } from "../helpers/entregas";
import { enlaceWhatsapp, formatoCelular, formatoPrecio, guardarUltimoPedido, textoPedido } from "../helpers/pedido";
import { guardarPagoPendiente, itemsParaBackend, leerPedidoId, METODO_CONTRAENTREGA, METODO_WOMPI, olvidarPedidoId } from "../helpers/pagos";
import { datosMeta, eventIdPurchase, itemsDesdeCarrito, leerAtribucion, marcarOcurrido, track, yaOcurrio } from "../helpers/analytics";

const PEDIDO_MINIMO = 44900
const CLAVE_BORRADOR = 'delteo_checkout_borrador'
const ORDEN_CAMPOS = ['telefono', 'nombre', 'ciudad', 'direccion', 'cedula']
// begin_checkout / InitiateCheckout: el primero de estos campos que la persona deja completo
const CAMPOS_INICIO = ['telefono', 'nombre', 'ciudad', 'cedula']

const leerJSON = (clave, respaldo) => {
    try {
        return JSON.parse(localStorage.getItem(clave)) || respaldo
    } catch {
        return respaldo
    }
}

const soloDigitos = texto => texto.replace(/\D/g, '')

const validar = (datos, municipio) => {
    const errores = {}
    const telefono = soloDigitos(datos.telefono)
    if (!telefono) errores.telefono = 'Escribe tu celular para confirmarte el pedido.'
    else if (!/^3\d{9}$/.test(telefono)) errores.telefono = 'El celular debe tener 10 dígitos y empezar por 3.'
    if (datos.nombre.trim().split(/\s+/).filter(Boolean).length < 2) errores.nombre = 'Escribe tu nombre y apellido.'
    if (!municipio) errores.ciudad = 'Elige tu ciudad o municipio de la lista.'
    const direccion = datos.direccion.trim()
    if (direccion.length < 8 || !/\d/.test(direccion)) errores.direccion = 'Escribe la dirección completa, por ejemplo: Calle 23 # 23-11.'
    if (!/^\d{6,10}$/.test(soloDigitos(datos.cedula))) errores.cedula = 'Escribe la cédula de quien recibe: solo números, de 6 a 10 dígitos.'
    return errores
}

// Etiqueta, campo y mensaje (ayuda o error) de cada dato del formulario
const Campo = ({ id, etiqueta, opcional, ayuda, error, children }) => (
    <div className="chk-campo">
        <label htmlFor={id}>{etiqueta}{opcional && <span> (opcional)</span>}</label>
        {children}
        {error ? (
            <p id={`${id}-mensaje`} className="chk-error"><Icono nombre="alerta" />{error}</p>
        ) : ayuda && (
            <p id={`${id}-mensaje`} className="chk-ayuda">{ayuda}</p>
        )}
    </div>
)

const Checkout = () => {

    const { setpagina, setContador } = usePagina();
    const navegar = useNavigate()

    const [carrito, setCarrito] = useState(() => leerJSON('carritojammy', []));
    const [borrador] = useState(() => leerJSON(CLAVE_BORRADOR, {}));
    const [datos, setDatos] = useState({
        telefono: borrador.telefono || '',
        nombre: borrador.nombre || '',
        direccion: borrador.direccion || '',
        indicaciones: borrador.indicaciones || '',
        cedula: ''
    });
    const [municipio, setMunicipio] = useState(null);
    const [buscador, setBuscador] = useState(null);
    const [verIndicaciones, setVerIndicaciones] = useState(Boolean(borrador.indicaciones));
    const [tocados, setTocados] = useState({});
    const [intentoEnvio, setIntentoEnvio] = useState(false);
    const [estado, setEstado] = useState('listo'); // listo | enviando | error
    const [metodoPago, setMetodoPago] = useState(borrador.metodoPago || METODO_CONTRAENTREGA);
    // Si el backend recalcula un total distinto al del carrito, se muestra antes de cobrar
    const [avisoTotal, setAvisoTotal] = useState(null);
    const [erroresPago, setErroresPago] = useState([]);
    const [ctaVisible, setCtaVisible] = useState(true);
    const [pedidoId] = useState(leerPedidoId);
    // Campos de CAMPOS_INICIO que la persona editó (un borrador precargado no cuenta)
    const [editados, setEditados] = useState({});
    const checkoutReportadoRef = useRef(false);
    // `enviando` (estado) no alcanza a bloquear un doble toque: los dos clics llegan
    // antes del siguiente render. El ref sí, y evita pedidos y compras duplicados.
    const enviandoRef = useRef(false);
    const referencias = useRef({});
    const ctaRef = useRef(null);
    const minimoRef = useRef(null);
    //Total que el backend corrigió y que el cliente ya vio: al reintentar, se cobra este
    const totalConfirmadoRef = useRef(null);

    //Calcular total a pagar
    const subtotal = carrito.reduce((acumulado, item) => acumulado + item.cantidad * item.precio, 0)
    /*
    Descuentos (hoy desactivados, siempre en 0):
    Si hay solamente 1 producto de mas de $20.000 = NO DESCUENTO
    Si hay 1 producto de mas de 20.000
        Si hay 1 o mas productos de mas de 20.000 = DESCUENTO DE 10.000
        Si hay 1 producto o mas de menos de 20.000 = DESCUENTO DE 10.000
    Si hay mas de 1 producto de menos de 20.000
        SUBTOTAL MINIMO DE $45.000
            SI HAY MAS DE 2 PRODUCTOS DE MENOS 20.000 = DESCUENTO DE $5.000
    */
    const descuento = 0
    const total = subtotal - descuento
    const faltaParaMinimo = PEDIDO_MINIMO - subtotal
    const unidades = carrito.reduce((acumulado, item) => acumulado + Number(item.cantidad), 0)
    const errores = validar(datos, municipio)
    const errorVisible = campo => (intentoEnvio || tocados[campo]) ? errores[campo] : undefined
    const entrega = municipio ? calcularEntrega(municipio) : null
    const enviando = estado === 'enviando'
    const hayProductos = carrito.length > 0
    const pagaEnLinea = metodoPago === METODO_WOMPI
    //Si el backend corrigió el total, el botón muestra el valor que se va a cobrar
    const totalACobrar = avisoTotal !== null ? avisoTotal : total
    const textoBoton = enviando
        ? (pagaEnLinea ? 'Llevándote a pagar…' : 'Enviando pedido…')
        : `${pagaEnLinea ? 'Ir a pagar' : 'Confirmar pedido'} · ${formatoPrecio(totalACobrar)}`

    useEffect(() => {
        setpagina('checkout')
        document.title = 'Delteo | Confirmar Pedido'
        window.scrollTo(0,0)

        // view_cart: el checkout es también el carrito. Una vez por montaje, solo con productos.
        const carritoInicial = leerJSON('carritojammy', [])
        if (carritoInicial.length > 0) {
            const items = itemsDesdeCarrito(carritoInicial)
            const valor = carritoInicial.reduce((acumulado, item) => acumulado + item.cantidad * item.precio, 0)
            track('view_cart', { value: valor, items })
        }

        // La lista de municipios (~28 KB) se descarga solo cuando alguien llega al checkout
        // Ciudad elegida en la PDP (las guardadas antes de tener código DANE se buscan por nombre)
        const ciudadPdp = leerCiudadGuardada()
        const codigoInicial = borrador.codigoMunicipio || ciudadPdp?.codigo ||
            ciudadesEntrega.find(ciudad => ciudad.nombre === ciudadPdp?.nombre)?.codigo
        import("../helpers/municipios").then(modulo => {
            setBuscador(() => modulo.buscarMunicipios)
            if (codigoInicial) {
                setMunicipio(actual => actual || modulo.municipioPorCodigo(codigoInicial))
            }
        })
        // Solo al montar
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem('carritojammy', JSON.stringify(carrito));
        setContador(carrito.length);
        //Si cambia el carrito hay que volver a pedirle el total al backend
        totalConfirmadoRef.current = null;
        setAvisoTotal(null);
        setErroresPago([]);
    }, [carrito, setContador])

    // Borrador para quien sale a Instagram y vuelve. La cédula no se guarda.
    useEffect(() => {
        try {
            localStorage.setItem(CLAVE_BORRADOR, JSON.stringify({
                telefono: datos.telefono,
                nombre: datos.nombre,
                direccion: datos.direccion,
                indicaciones: datos.indicaciones,
                codigoMunicipio: municipio?.codigo,
                metodoPago
            }))
        } catch {
            // Sin localStorage el formulario funciona igual, solo no queda borrador
        }
    }, [datos.telefono, datos.nombre, datos.direccion, datos.indicaciones, municipio, metodoPago])

    // La barra fija del botón se oculta mientras el botón después del total está en pantalla
    useEffect(() => {
        const cta = ctaRef.current
        if (!cta) return
        const observer = new IntersectionObserver(entries => setCtaVisible(entries[0].isIntersecting))
        observer.observe(cta)
        return () => observer.disconnect()
    }, [hayProductos])

    /*
    begin_checkout (GA4) + InitiateCheckout (Pixel), una sola vez por intento de compra:
    cuando la persona completa el primero de celular, nombre, ciudad o cédula. El guard
    usa el pedidoId, así que tampoco se repite al recargar o al volver de Instagram.
    */
    const reportarInicioCheckout = () => {
        if (checkoutReportadoRef.current || yaOcurrio(`begin_checkout_${pedidoId}`)) return
        checkoutReportadoRef.current = true
        marcarOcurrido(`begin_checkout_${pedidoId}`)
        const items = itemsDesdeCarrito(carrito)
        track('begin_checkout', { value: total, items }, {
            nombre: 'InitiateCheckout',
            datos: { ...datosMeta(items), value: total }
        })
    }

    const inicioCompleto = CAMPOS_INICIO.some(campo => editados[campo] && !errores[campo])
    useEffect(() => {
        if (inicioCompleto && hayProductos) reportarInicioCheckout()
        // reportarInicioCheckout lee el carrito actual; solo importa cuándo se completa el campo
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inicioCompleto, hayProductos])

    const marcarEditado = campo => {
        if (CAMPOS_INICIO.includes(campo) && !editados[campo]) setEditados(actual => ({ ...actual, [campo]: true }))
    }

    const cambiar = campo => e => {
        let valor = e.target.value
        if (campo === 'telefono') {
            valor = soloDigitos(valor)
            if (valor.length > 10 && valor.startsWith('57')) valor = valor.slice(2)
            valor = valor.slice(0, 10)
        }
        if (campo === 'cedula') valor = soloDigitos(valor).slice(0, 10)
        setDatos(actual => ({ ...actual, [campo]: valor }))
        marcarEditado(campo)
        if (estado === 'error') setEstado('listo')
    }

    const tocar = campo => () => setTocados(actual => ({ ...actual, [campo]: true }))

    const elegirMunicipio = opcion => {
        setMunicipio(opcion)
        marcarEditado('ciudad')
        if (opcion) {
            guardarCiudad({ codigo: opcion.codigo, nombre: opcion.nombre, departamento: opcion.departamento, zona: opcion.zona })
        }
    }

    const propsCampo = campo => ({
        id: campo,
        name: campo,
        ref: elemento => { referencias.current[campo] = elemento },
        value: datos[campo],
        onChange: cambiar(campo),
        onBlur: tocar(campo),
        'aria-invalid': Boolean(errorVisible(campo)),
        'aria-describedby': `${campo}-mensaje`,
        className: `chk-input ${errorVisible(campo) ? 'con-error' : ''}`
    })

    const direccionCompleta = () => [datos.direccion.trim(), datos.indicaciones.trim()].filter(Boolean).join(' · ')

    const pedidoParaWhatsapp = () => ({
        productos: carrito,
        total,
        nombre: datos.nombre.trim(),
        telefono: soloDigitos(datos.telefono),
        ciudad: municipio?.etiqueta,
        direccion: direccionCompleta(),
        cedula: soloDigitos(datos.cedula)
    })

    //Pago en línea: el backend calcula el total, firma la transacción y devuelve la URL de Wompi
    const pagarconwompi = async () => {
        setEstado('enviando');
        setErroresPago([]);
        setAvisoTotal(null);

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/ordenes`;
            const { data } = await axios.post(url, {
                items: itemsParaBackend(carrito),
                // fbp/fbc de esta visita: el Purchase de CAPI sale del webhook, sin navegador
                atribucion: leerAtribucion(),
                cliente: {
                    nombre: datos.nombre.trim(),
                    telefono: soloDigitos(datos.telefono),
                    cedula: soloDigitos(datos.cedula),
                    ciudad: municipio.etiqueta,
                    region: municipio.departamento,
                    direccion: direccionCompleta(),
                    zona: municipio.zona
                }
            })

            //El backend manda sobre el precio: si no coincide, se le muestra al cliente
            //antes de cobrar. Al volver a tocar el botón ya se acepta ese total.
            if (data.total !== total && totalConfirmadoRef.current !== data.total) {
                totalConfirmadoRef.current = data.total
                setAvisoTotal(data.total)
                setEstado('listo')
                return
            }

            //Para que la página de resultado pueda mostrar la entrega estimada
            guardarPagoPendiente({
                referencia: data.referencia,
                zona: municipio.zona,
                creado: Date.now()
            })

            //El carrito NO se vacía aquí: si el pago falla, el cliente lo conserva
            window.location.href = data.urlpago
            return true

        } catch (error) {
            const respuesta = error?.response?.data
            if (respuesta?.errores?.length) {
                setErroresPago(respuesta.errores)
                if (typeof respuesta.total === 'number' && respuesta.total !== total) setAvisoTotal(respuesta.total)
            } else {
                setEstado('error')
                return
            }
            setEstado('listo')
        }
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (enviando || enviandoRef.current) return;
        setIntentoEnvio(true);

        //Revisar los campos y llevar al primero con error
        // Quien llega con el borrador lleno no edita nada: si tiene alguno de los
        // campos de inicio completo, el checkout empezó con este clic
        if (CAMPOS_INICIO.some(campo => !errores[campo])) reportarInicioCheckout()

        const primerError = ORDEN_CAMPOS.find(campo => errores[campo])
        if (primerError) {
            const elemento = referencias.current[primerError]
            elemento?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemento?.focus({ preventScroll: true })
            return;
        }

        //Verifica que el subtotal sea mayor al pedido minimo
        if (subtotal < PEDIDO_MINIMO) {
            minimoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return;
        }

        enviandoRef.current = true;

        //Pago en línea: se va a Wompi. El pedido se registra cuando el pago se aprueba.
        if (pagaEnLinea) {
            // payment_started: un evento por clic válido en "Ir a pagar" (el ref bloquea el doble toque)
            track('payment_started', {
                value: totalACobrar,
                payment_type: METODO_WOMPI,
                items: itemsDesdeCarrito(carrito)
            })
            const redirigio = await pagarconwompi()
            // Si no se fue a Wompi (total corregido o error) se puede volver a intentar
            if (!redirigio) enviandoRef.current = false
            return;
        }

        const productostext = carrito.map(item => item.cantidad + ' - ' + item.nombre + " || ").join('')
        const fechahoy = new Date();
        const fecha = (fechahoy.getMonth()+1)+"/"+fechahoy.getDate()+"/"+fechahoy.getFullYear()

        //Crear el pedido (mismos campos que recibe el backend hoy)
        const pedido = {
            cliente: datos.nombre.trim(),
            origen: '',
            fecha,
            productos: carrito,
            productostext,
            ciudad: municipio.etiqueta,
            direccion: direccionCompleta(),
            telefono: soloDigitos(datos.telefono),
            cedula: soloDigitos(datos.cedula),
            total,
            // Mismo id en cada reintento: el backend no duplica el pedido y es el event_id de CAPI
            pedidoid: pedidoId,
            atribucion: leerAtribucion()
        }

        setEstado('enviando');

        //Enviar pedido
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/clientes`;
            const { data } = await axios.post(url, pedido)
            const idPedido = data?.pedidoid || pedidoId

            /*
            Eventos de compra: SOLO cuando el pedido llegó al backend.
            transaction_id deja que GA4 descarte un purchase repetido; el eventID es el
            mismo del Purchase que manda el backend por CAPI, y Meta se queda con uno.
            */
            const items = itemsDesdeCarrito(carrito)
            const compra = { transaction_id: idPedido, value: total, payment_type: METODO_CONTRAENTREGA, items }
            track('purchase', compra, {
                nombre: 'Purchase',
                eventID: eventIdPurchase(idPedido),
                datos: { ...datosMeta(items), value: total }
            })
            // Conversión de Google Ads importada desde GA4: se conserva igual que antes
            track('ads_conversion_Purchase_1', compra)
            olvidarPedidoId()

            const resumen = {
                nombre: pedido.cliente,
                ciudad: municipio.etiqueta,
                zona: municipio.zona,
                productos: carrito,
                total,
                pedidoid: idPedido,
                creado: Date.now()
            }
            guardarUltimoPedido(resumen)
            localStorage.setItem('carritojammy', JSON.stringify([]));
            localStorage.removeItem(CLAVE_BORRADOR);
            setContador(0);
            navegar('/pedidoconfirmado', { state: resumen, replace: true })

        } catch (error) {
            console.log(error);
            enviandoRef.current = false;
            setEstado('error');
        }
    }

    if (!hayProductos) {
        return (
            <div className="chk chk-vacio">
                <h1 className="chk-h1">Tu carrito está vacío</h1>
                <p>Mira los juguetes que tenemos y elige el que quieras regalar.</p>
                <Link to="/" className="pdp-boton">Ver juguetes</Link>
            </div>
        )
    }

  return (
    <div className="chk">
        <form id="chk-form" className="chk-grid" noValidate onSubmit={handlesubmit}>

            <section className="chk-card chk-resumen" aria-labelledby="chk-titulo">
                <div className="chk-card-cabecera">
                    <h1 id="chk-titulo" className="chk-h2">Tu pedido</h1>
                    <span>{unidades} {unidades === 1 ? 'producto' : 'productos'}</span>
                </div>
                <ul className="chk-items">
                    {carrito.map(item => (
                        <Itemcheckout
                            key={item.id}
                            item={item}
                            carritomostrar={carrito}
                            setCarritoMostrar={setCarrito}
                        />
                    ))}
                </ul>
            </section>

            <section className="chk-card chk-datos" aria-labelledby="chk-datos-titulo">
                <h2 id="chk-datos-titulo" className="chk-h2">Datos de entrega</h2>

                <Campo id="telefono" etiqueta="Celular (WhatsApp)" ayuda="Por aquí te confirmamos el pedido." error={errorVisible('telefono')}>
                    <div className={`chk-prefijo ${errorVisible('telefono') ? 'con-error' : ''}`}>
                        <span aria-hidden="true">+57</span>
                        <input
                            {...propsCampo('telefono')}
                            value={formatoCelular(datos.telefono)}
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            placeholder="300 123 4567"
                        />
                    </div>
                </Campo>

                <Campo id="nombre" etiqueta="Nombre y apellido" error={errorVisible('nombre')}>
                    <input {...propsCampo('nombre')} type="text" autoComplete="name" autoCapitalize="words" placeholder="Laura Gómez" />
                </Campo>

                <Campo
                    id="ciudad"
                    etiqueta="Ciudad o municipio"
                    error={errorVisible('ciudad')}
                    ayuda={entrega && (
                        <span className="chk-entrega">
                            <Icono nombre="camion" />
                            {entrega.esRango ? 'Llega a más tardar el ' : 'Llega el '}{formatearFecha(entrega.fecha)}
                        </span>
                    )}
                >
                    <Selectormunicipio
                        municipio={municipio}
                        onElegir={elegirMunicipio}
                        buscar={buscador}
                        error={errorVisible('ciudad')}
                        describedBy="ciudad-mensaje"
                        inputRef={elemento => { referencias.current.ciudad = elemento }}
                        onBlur={tocar('ciudad')}
                    />
                </Campo>

                <Campo id="direccion" etiqueta="Dirección" error={errorVisible('direccion')}>
                    <input {...propsCampo('direccion')} type="text" autoComplete="street-address" placeholder="Calle 23 # 23-11" />
                </Campo>

                {verIndicaciones ? (
                    <Campo id="indicaciones" etiqueta="Barrio, apto o indicaciones" opcional>
                        <input {...propsCampo('indicaciones')} aria-describedby={undefined} type="text" autoComplete="address-line2" placeholder="Barrio San Felipe, apto 330" />
                    </Campo>
                ) : (
                    <button type="button" className="chk-enlace" onClick={() => setVerIndicaciones(true)}>
                        + Agregar barrio, apto o indicaciones
                    </button>
                )}

                <Campo id="cedula" etiqueta="Cédula de quien recibe" ayuda="La transportadora la pide para entregarte." error={errorVisible('cedula')}>
                    <input {...propsCampo('cedula')} type="text" inputMode="numeric" autoComplete="off" placeholder="Solo números" />
                </Campo>
            </section>

            <section className="chk-card chk-pago" aria-labelledby="chk-pago-titulo">
                <h2 id="chk-pago-titulo" className="chk-h2">¿Cómo quieres pagar?</h2>

                <div className="chk-metodos">
                    <label className={`chk-metodo ${!pagaEnLinea ? 'activo' : ''}`}>
                        <input
                            type="radio"
                            name="pago"
                            value={METODO_CONTRAENTREGA}
                            checked={!pagaEnLinea}
                            onChange={() => { setMetodoPago(METODO_CONTRAENTREGA); setAvisoTotal(null); setErroresPago([]) }}
                        />
                        <span className="chk-radio" aria-hidden="true" />
                        <span>
                            <strong><Icono nombre="efectivo" />Pagar al recibir</strong>
                            Pagas en efectivo al transportador. Antes de despacharlo te confirmamos por WhatsApp.
                        </span>
                    </label>

                    <label className={`chk-metodo ${pagaEnLinea ? 'activo' : ''}`}>
                        <input
                            type="radio"
                            name="pago"
                            value={METODO_WOMPI}
                            checked={pagaEnLinea}
                            onChange={() => { setMetodoPago(METODO_WOMPI); setEstado('listo') }}
                        />
                        <span className="chk-radio" aria-hidden="true" />
                        <span>
                            <strong><Icono nombre="tarjeta" />Pagar ahora</strong>
                            Tarjeta, PSE, Nequi o Bancolombia. Pago seguro con Wompi; despachamos apenas se aprueba.
                        </span>
                    </label>
                </div>

                <p className="chk-transportadora">
                    Enviamos con <img src="/inter.webp" alt="Inter Rapidísimo" loading="lazy" />
                </p>
            </section>

            <section className="chk-card chk-totales" aria-labelledby="chk-total-titulo">
                <h2 id="chk-total-titulo" className="sr-only">Total del pedido</h2>
                <div className="chk-fila"><span>Subtotal</span><span>{formatoPrecio(subtotal)}</span></div>
                {descuento > 0 && (
                    <div className="chk-fila"><span>Descuento</span><span>- {formatoPrecio(descuento)}</span></div>
                )}
                <div className="chk-fila"><span>Envío</span><span className="chk-verde">Gratis</span></div>
                <div className="chk-fila chk-total"><span>Total</span><span>{formatoPrecio(total)}</span></div>

                {faltaParaMinimo > 0 && (
                    <p ref={minimoRef} className={`chk-aviso ${intentoEnvio ? 'resaltado' : ''}`}>
                        Te faltan <strong>{formatoPrecio(faltaParaMinimo)}</strong> para el pedido mínimo de {formatoPrecio(PEDIDO_MINIMO)}.{' '}
                        <Link to="/">Agregar otro juguete</Link>
                    </p>
                )}

                {avisoTotal !== null && (
                    <div className="chk-fallo" role="alert">
                        <p>
                            <strong>El total de tu pedido cambió a {formatoPrecio(avisoTotal)}.</strong>{' '}
                            Revisamos los precios antes de cobrarte. Vuelve a tocar el botón para continuar con este valor.
                        </p>
                    </div>
                )}

                {erroresPago.length > 0 && (
                    <div className="chk-fallo" role="alert">
                        <p><strong>Revisa tu pedido antes de pagar:</strong></p>
                        <ul className="chk-errores-pago">
                            {erroresPago.map((mensaje, i) => <li key={i}>{mensaje}</li>)}
                        </ul>
                    </div>
                )}

                {estado === 'error' && (
                    <div className="chk-fallo" role="alert">
                        <p><strong>No pudimos enviar tu pedido.</strong> Tus datos siguen aquí. Intenta de nuevo o envíanoslo por WhatsApp.</p>
                        <div className="chk-fallo-acciones">
                            <button type="submit" className="pdp-boton-secundario">Reintentar</button>
                            <a
                                className="pdp-boton-wa"
                                href={enlaceWhatsapp(textoPedido('Hola Delteo, quiero hacer este pedido:', pedidoParaWhatsapp()))}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => track('whatsapp_click', { location: 'checkout_error' })}
                            >
                                <Icono nombre="whatsapp" />Enviar por WhatsApp
                            </a>
                        </div>
                    </div>
                )}

                <button ref={ctaRef} type="submit" className="pdp-boton chk-cta" disabled={enviando} aria-busy={enviando}>
                    {enviando && <span className="chk-spinner" aria-hidden="true" />}
                    {textoBoton}
                </button>
                <p className="chk-micro">
                    <Icono nombre="candado" />
                    {pagaEnLinea
                        ? 'Te llevamos al pago seguro de Wompi. Delteo nunca ve los datos de tu tarjeta.'
                        : 'No pagas nada ahora. Te confirmamos por WhatsApp antes de despacharlo.'}
                </p>
                <p className="chk-privacidad">Usamos tus datos solo para entregar tu pedido y contactarte sobre él.</p>
            </section>
        </form>

        <div className={`chk-sticky ${ctaVisible ? 'oculto' : ''}`} aria-hidden={ctaVisible}>
            <button type="submit" form="chk-form" className="pdp-boton" disabled={enviando} tabIndex={ctaVisible ? -1 : 0}>
                {enviando && <span className="chk-spinner" aria-hidden="true" />}
                {textoBoton}
            </button>
        </div>
    </div>
  )
}

export default Checkout
