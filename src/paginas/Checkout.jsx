import usePagina from "../hooks/usePagina"
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Itemcheckout from "../components/Itemcheckout";
import Selectormunicipio from "../components/Selectormunicipio";
import Icono from "../components/Icono";
import { calcularEntrega, ciudadesEntrega, formatearFecha, guardarCiudad, leerCiudadGuardada } from "../helpers/entregas";
import { enlaceWhatsapp, formatoCelular, formatoPrecio, guardarUltimoPedido, textoPedido } from "../helpers/pedido";

const PEDIDO_MINIMO = 44900
const CLAVE_BORRADOR = 'delteo_checkout_borrador'
const ORDEN_CAMPOS = ['telefono', 'nombre', 'ciudad', 'direccion', 'cedula']

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
    const [ctaVisible, setCtaVisible] = useState(true);
    const referencias = useRef({});
    const ctaRef = useRef(null);
    const minimoRef = useRef(null);

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
    const textoBoton = enviando ? 'Enviando pedido…' : `Confirmar pedido · ${formatoPrecio(total)}`

    useEffect(() => {
        setpagina('checkout')
        document.title = 'Delteo | Confirmar Pedido'
        window.scrollTo(0,0)

        const carritoInicial = leerJSON('carritojammy', [])
        const valorInicial = carritoInicial.reduce((acumulado, item) => acumulado + item.cantidad * item.precio, 0)
        if (Array.isArray(window.dataLayer)) {
            window.dataLayer.push({
                'event': `Checkout`
            })
        }
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'InitiateCheckout', {
                contents: carritoInicial,
                currency: 'COP',
                value: valorInicial
            })
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
    }, [carrito, setContador])

    // Borrador para quien sale a Instagram y vuelve. La cédula no se guarda.
    useEffect(() => {
        try {
            localStorage.setItem(CLAVE_BORRADOR, JSON.stringify({
                telefono: datos.telefono,
                nombre: datos.nombre,
                direccion: datos.direccion,
                indicaciones: datos.indicaciones,
                codigoMunicipio: municipio?.codigo
            }))
        } catch {
            // Sin localStorage el formulario funciona igual, solo no queda borrador
        }
    }, [datos.telefono, datos.nombre, datos.direccion, datos.indicaciones, municipio])

    // La barra fija del botón se oculta mientras el botón después del total está en pantalla
    useEffect(() => {
        const cta = ctaRef.current
        if (!cta) return
        const observer = new IntersectionObserver(entries => setCtaVisible(entries[0].isIntersecting))
        observer.observe(cta)
        return () => observer.disconnect()
    }, [hayProductos])

    const cambiar = campo => e => {
        let valor = e.target.value
        if (campo === 'telefono') {
            valor = soloDigitos(valor)
            if (valor.length > 10 && valor.startsWith('57')) valor = valor.slice(2)
            valor = valor.slice(0, 10)
        }
        if (campo === 'cedula') valor = soloDigitos(valor).slice(0, 10)
        setDatos(actual => ({ ...actual, [campo]: valor }))
        if (estado === 'error') setEstado('listo')
    }

    const tocar = campo => () => setTocados(actual => ({ ...actual, [campo]: true }))

    const elegirMunicipio = opcion => {
        setMunicipio(opcion)
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

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (enviando) return;
        setIntentoEnvio(true);

        //Revisar los campos y llevar al primero con error
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
            total
        }

        setEstado('enviando');

        //Enviar pedido
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/clientes`;
            await axios.post(url, pedido)

            //Eventos de compra: SOLO cuando el pedido llegó al backend (antes se enviaban aunque fallara)
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'Purchase', {
                    currency: "COP",
                    value: total
                })
            }
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'purchase', {
                    value: total,
                    currency: 'COP',
                    items: carrito
                })
                window.gtag('event', 'ads_conversion_Purchase_1', {
                    value: total,
                    currency: 'COP',
                    items: carrito
                })
            }

            const resumen = {
                nombre: pedido.cliente,
                ciudad: municipio.etiqueta,
                zona: municipio.zona,
                productos: carrito,
                total,
                creado: Date.now()
            }
            guardarUltimoPedido(resumen)
            localStorage.setItem('carritojammy', JSON.stringify([]));
            localStorage.removeItem(CLAVE_BORRADOR);
            setContador(0);
            navegar('/pedidoconfirmado', { state: resumen, replace: true })

        } catch (error) {
            console.log(error);
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
                <label className="chk-metodo activo">
                    <input type="radio" name="pago" value="contraentrega" checked readOnly />
                    <span className="chk-radio" aria-hidden="true" />
                    <span>
                        <strong><Icono nombre="efectivo" />Pagar al recibir</strong>
                        Pagas en efectivo al transportador. Antes de despacharlo te confirmamos por WhatsApp.
                    </span>
                </label>
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
                <p className="chk-micro"><Icono nombre="candado" />No pagas nada ahora. Te confirmamos por WhatsApp antes de despacharlo.</p>
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
