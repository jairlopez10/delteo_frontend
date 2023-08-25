import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import usePagina from "../hooks/usePagina"
import Slogan from "./Slogan";

const Header = () => {

    const { pagina } = usePagina();
    const [menu, setmenu] = useState(false);

  return (
    <>
        <header className={`${pagina !== 'inicio' ? 'radiusnormal' : ''}`}>
            <div className="divheader">
                <div className="contenidoheader contenedor">
                    <div className="divbarra">
                        
                        <Link to="/" className="logo" onClick={() => setmenu(false)}>
                            <img src="/logo4.png" alt="" />
                        </Link>
                        
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
                    </div>
                    
                    <nav className={`navegacion ${menu ? 'flex' : 'hidden'} md:flex`}>
                        <Link to="/" className="links" onClick={() => setmenu(false)}>Catalogo</Link>
                        <Link to="/nosotros" className="links" onClick={() => setmenu(false)}>Nosotros</Link>
                    </nav>
                </div>
                {pagina === 'inicio' ? <Slogan /> : ""}
            </div>
        </header>
    </>
  )
}

export default Header