import { useEffect } from "react"
import usePagina from "../hooks/usePagina"

/*
Fundadores: las fotos se recortan con object-fit, así sirve lo mismo una horizontal
que una vertical. Para cambiar una basta con reemplazar el archivo en /public.
*/
const fundadores = [
  { nombre: 'Jair', foto: '/jair.webp' },
  { nombre: 'Cepeda', foto: '/cepeda.webp' }
]

const redes = [
  { nombre: 'Instagram', icono: '/instagram.webp', url: 'https://www.instagram.com/delteocol' },
  { nombre: 'TikTok', icono: '/tiktok.webp', url: 'https://www.tiktok.com/@delteocol' },
  { nombre: 'Facebook', icono: '/facebook.webp', url: 'https://www.facebook.com/profile.php?id=61562319237668' },
  { nombre: 'WhatsApp', icono: '/whatsapp.webp', url: 'https://wa.me/573054392872?text=Hola%20Delteo!%20Quisiera%20saber%20mas%20informacion%20sobre%20..' }
]

const Nosotros = () => {

  const { setpagina, setContador } = usePagina();

  useEffect(() => {
    setpagina('nosotros')
    document.title = 'Delteo | Nosotros'
    window.scrollTo(0, 0)
    const cont = JSON.parse(localStorage.getItem('carritojammy')) || []
    setContador(cont.length)
    // Solo al montar la página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="nos">
      <div className="nos-contenido">
        <h1 className="nos-titulo">Buscando juguetes que sorprendan!</h1>
        <p className="nos-lede">Así nació Delteo.</p>

        <div className="nos-fundadores">
          {fundadores.map(persona => (
            <figure key={persona.nombre} className="nos-fundador">
              <div className="nos-foto">
                <img src={persona.foto} alt={persona.nombre} loading="lazy" decoding="async" />
              </div>
              <figcaption>
                <strong>{persona.nombre}</strong>
                <span>Cofundador</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="nos-texto">
          <p>Somos dos ingenieros industriales de la Pontificia Universidad Javeriana. Delteo nació buscando regalos que de verdad sorprendieran a los niños de la familia.</p>
          <p>Probamos cada juguete antes de publicarlo. Si no nos sorprende a nosotros, no entra al catálogo.</p>
          <p>Garantía de un mes en todo el catálogo y envío gratis a toda Colombia.</p>
        </div>

        <div className="nos-redes">
          <p className="nos-redes-titulo">Síguenos</p>
          <div className="nos-redes-iconos">
            {redes.map(red => (
              <a key={red.nombre} href={red.url} target="_blank" rel="noopener noreferrer" aria-label={red.nombre}>
                <img src={red.icono} alt="" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nosotros
