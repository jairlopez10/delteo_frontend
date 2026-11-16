import { Link } from "react-router-dom"
import Icono from "./Icono"
import { WHATSAPP_DELTEO } from "../helpers/pedido"
import { track } from "../helpers/analytics"

const Footer = () => {

  return (
    <footer className="pie">
      <div className="pie-contenido">
        <Link to={"/"} className="logo pie-logo">
          <img src="/delteologowhite.webp" alt="Delteo" />
        </Link>

        <nav className="pie-enlaces" aria-label="Enlaces del sitio">
          <Link to="/juguetes">Juguetería</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/checkout">Tu pedido</Link>
        </nav>

        <a
          className="pie-wa"
          href={`https://wa.me/${WHATSAPP_DELTEO}?text=${encodeURIComponent('Hola Delteo, tengo una pregunta.')}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { location: 'footer' })}
        >
          <Icono nombre="whatsapp" />305 439 2872
        </a>
      </div>

      <p className="pie-legal">© {new Date().getFullYear()} Delteo</p>
    </footer>
  )
}

export default Footer
