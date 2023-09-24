
import usePagina from "../hooks/usePagina"

const Slogan = () => {

  const { pagina } = usePagina();

  return (
    <> 
      <div className="slogan">
          <div className="div-imagen-promo">
            <img src="/slimepromo.webp" className="imagenpromo" alt="" />
          </div>
          <div className="contenido-slogan">
            <h3><span className="cincuenta">Slime Gratis</span> en tu primera compra !</h3>
            <p>Aprovecha esta oferta <span className=" text-yellow-500">limitada</span></p>
            
          </div>
      </div>
    </>
  )
}

export default Slogan