import { useEffect } from "react"
import usePagina from "../hooks/usePagina"

const Nosotros = () => {

  const { pagina, setpagina, setContador } = usePagina();

  useEffect(() => {
    setpagina('nosotros')
    document.title = 'Delteo | Nosotros'
    const cont = JSON.parse(localStorage.getItem('carritojammy')) || []
    setContador(cont.length)
  }, [])

  useEffect(() => {
    
}, [])

  return (
    <>
      <div className="contenedor pt-64">
        <h1>NOSOTROS</h1>
        <div className="contenido-nosotros">
          <div className="imagenes-nosotros">
            <div className="div-imagen">
              <img src="/jair.webp" alt="imagen-jair" />
            </div>
            <div className="div-imagen">
              <img src="/cepeda.webp" alt="imagen-cepeda" />
            </div>
          </div>
          <div className="p-contactar">
            <p>¡Bienvenidos a DELTEO, donde todos los sueños se hacen realidad y cada sonrisa cuenta. Somos dos ingenieros industriales de la Pontificia Universidad Javeriana, los cuales buscamos brindar asombro y alegria todos los niños de nuestros seres queridos o amigos por medio de nuestros juguetes. Nos caracterizamos por ofrecer productos innovadores, de calidad, seguros y asequibles que quizás son inimaginables. Realizamos envíos a cualquier parte del país, por lo que nos puedes contar cuál es el sueño de tu pequeño por cumplir!</p>
            <div className="flex justify-center mt-8 divconta">
              <p className="titulo-contactanos uppercase">Redes Sociales</p>
            </div>
            
            <div className="flex justify-around mt-12">
              <img className="imagenredsocial" src="/facebook.webp" alt="imagen-facebook" onClick={() => window.open("https://www.facebook.com/jugueteriajammy")} />
              <img className="imagenredsocial" src="/instagram.webp" alt="imagen-instagram" onClick={() => window.open("https://www.instagram.com/delteocol")} />
              <img className="imagenredsocial" src="/whatsapp.webp" alt="imagen-whatsapp" onClick={() => window.open("https://wa.me/573054392872?text=Hola%20Delteo!%20Quisiera%20saber%20mas%20informacion%20sobre%20..")} />
              <img className="imagenredsocial" src="/tiktok.webp" alt="imagen-tiktok" onClick={() => window.open("https://www.tiktok.com/@delteocol")} />
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Nosotros