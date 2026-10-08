import { Link } from "react-router-dom"
import Icono from "./Icono"
import { WHATSAPP_DELTEO } from "../helpers/pedido"
import { track } from "../helpers/analytics"

const Footer = () => {

  return (
    <footer className="pie">
      <div className="pie-contenido">
        <div className="pie-marca">
          <Link to={"/"} className="logo">
            <img src="/logo.webp" alt="Delteo" />
          </Link>
          <p>Juguetes que no se ven en cualquier juguetería. Envíos a toda Colombia.</p>
        </div>

        <nav className="pie-enlaces" aria-label="Enlaces del sitio">
          <Link to="/juguetes">Juguetería</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/checkout">Tu pedido</Link>
        </nav>

        <div className="pie-contacto">
          <a
            href={`https://wa.me/${WHATSAPP_DELTEO}?text=${encodeURIComponent('Hola Delteo, tengo una pregunta.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { location: 'footer' })}
          >
            <Icono nombre="whatsapp" />305 439 2872
          </a>
          <p>Escribimos de lunes a sábado, de 8 a.m. a 7 p.m.</p>
          <p className="pie-pagos">Pago contra entrega o en línea con tarjeta, PSE y Nequi.</p>
        </div>
      </div>

      <p className="pie-legal">© {new Date().getFullYear()} Delteo</p>
    </footer>
  )
}

export default Footer
