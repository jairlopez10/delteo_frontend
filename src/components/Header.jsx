import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import usePagina from "../hooks/usePagina"

const Header = () => {

    const { pagina, contador, setContador } = usePagina();
    const [menu, setmenu] = useState(false);
    const [anuncio, setAnuncio] = useState(0);
    const anuncios = ['ENVIOS GRATIS TODO COLOMBIA', 'TODA LA TIENDA - 30% DCTO']
    // En la página de producto no hay barra de anuncio y el header se esconde al bajar
    const esPaginaProducto = ['producto', 'mayoristaproducto'].includes(pagina)
    // En el checkout el header solo tiene volver, logo y "Compra segura"
    const esCheckout = pagina === 'checkout'
    const navigate = useNavigate()
    const [oculto, setOculto] = useState(false)

    useEffect(() => {
        const cont = JSON.parse(localStorage.getItem('carritojammy')) || []
        setContador(cont.length)
    }, [])

    useEffect(() => {
        setOculto(false)
        if (!esPaginaProducto) return

        let ultimoY = window.scrollY
        const alHacerScroll = () => {
            const y = window.scrollY
            if (Math.abs(y - ultimoY) < 8) return
            setOculto(y > ultimoY && y > 80)
            ultimoY = y
        }
        window.addEventListener('scroll', alHacerScroll, { passive: true })
        return () => window.removeEventListener('scroll', alHacerScroll)
    }, [esPaginaProducto])

    useEffect(() => {
        setTimeout(() => {
            anuncio === 0 ? setAnuncio(1) : setAnuncio(0)
        }, 6000);
    }, [anuncio])


  return (
    <>
        <header className={`${['inicio', 'mayorista'].some(item => pagina === item) ? '' : 'radiusnormal fixed w-full top-0'} ${esPaginaProducto ? 'header-producto' : ''} ${esPaginaProducto && oculto && !menu ? 'header-oculto' : ''}`}>
            {!esPaginaProducto && !esCheckout && (
                <div className="divanuncios">
                    <p className="anuncio1">{anuncios[anuncio]}</p>
                </div>
            )}
            {esCheckout ? (
            <div className="divheader">
                <div className="contenidoheader contenedor">
                    <div className="divbarra header-checkout">
                        <button type="button" className="header-volver" aria-label="Volver" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M15 6l-6 6l6 6" />
                            </svg>
                        </button>
                        <Link to={"/"} className="logo">
                            <img src="/logo.webp" alt="Delteo" />
                        </Link>
                        <span className="header-seguro">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="5" y="11" width="14" height="10" rx="2" />
                                <circle cx="12" cy="16" r="1" />
                                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                            </svg>
                            Compra segura
                        </span>
                    </div>
                </div>
            </div>
            ) : (
            <div className="divheader">
                <div className="contenidoheader contenedor">
                    <div className="divbarra">

                        <svg xmlns="http://www.w3.org/2000/svg" className={`${menu ? 'hidden' : 'block'} menuicono icon cursor-pointer icon-tabler icon-tabler-menu-2`} width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => setmenu(!menu)}>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 6l16 0" />
                            <path d="M4 12l16 0" />
                            <path d="M4 18l16 0" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`${menu ? 'block' : 'hidden'} cursor-pointer menuicono icon icon-tabler icon-tabler-x`} width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => setmenu(!menu)}>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                        
                        <Link to={"/"} className="logo" onClick={() => setmenu(false)}>
                            <img src="/logo.webp" alt="" />
                        </Link>

                        <Link to="/checkout" onClick={() => setmenu(false)} className="md:hidden flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="carrito icon icon-tabler icon-tabler-shopping-cart" width="84" height="84" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="6" cy="19" r="2" />
                                <circle cx="17" cy="19" r="2" />
                                <path d="M17 17h-11v-14h-2" />
                                <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                            <p className={`contador-carrito ${contador > 0 ? 'block' : 'hidden'}`}>{contador}</p>
                        </Link>
                    </div>
                    
                    <nav className={`navegacion ${menu ? 'flex' : 'hidden'} md:flex`}>
                        <Link to={"/"} className="links" onClick={() => setmenu(false)}>Juguetería</Link>
                        <Link to="/nosotros" className={`links`} onClick={() => setmenu(false)}>Nosotros</Link>
                        <Link to="/checkout" onClick={() => setmenu(false)} className="carrito-ocultar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="carrito icon icon-tabler icon-tabler-shopping-cart" width="84" height="84" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="6" cy="19" r="2" />
                                <circle cx="17" cy="19" r="2" />
                                <path d="M17 17h-11v-14h-2" />
                                <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                            <p className={`contador-carrito ${contador > 0 ? 'block' : 'hidden'}`}>{contador}</p>
                        </Link>
                    </nav>

                    

                </div>
                
            </div>
            )}
        </header>
    </>
  )
}

export default Header