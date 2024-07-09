import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import usePagina from "../hooks/usePagina";

const Productocard = ({producto}) => {

    const {titulo, precio, imagenes, preciomayorista} = producto;

    const { pagina } = usePagina();
    let tipocliente;
    let precioshow
    const envios = {
      pequeno: 10000,
      grande: 20000
    }

    if (pagina === "mayorista") {
      precioshow = preciomayorista
      tipocliente = "m";
    } else {
      //Define el precio del articulo con envio segun su precio base
      if(precio >= 20000){
        precioshow = precio + envios.grande
      } else {
        precioshow = precio + envios.pequeno
      }
      
      tipocliente = "d"
    }
     
    const navegar = useNavigate();

    //Reemplaza el espacio por un - para que la url se pueda compartir
    const titulourl = titulo.replace(/ /g, "-");

  return (
    <>
        <div className="productocard cursor-pointer" onClick={() => window.open(`/${titulourl}/${tipocliente}`)}>
            <div className="div-imagen-prodcard">
              <img src={imagenes[0].url} className="cursor-pointer imagencard" alt={`Imagen ${titulo}`} />
            </div>
            <div className="contenidocard">
                <p className="titulo cursor-pointer hover:underline" >{titulo}</p>
                <p className="precio cursor-pointer" >{tipocliente === "d" ? "" : "Precio Mayorista:"} <span className={`${tipocliente === "d" ? "" : "preciocard"}`}>{`$${precioshow.toLocaleString('es-CO')}`}</span></p>
                {tipocliente === "m" ? (
                  <>
                    <p className="precio cursor-pointer" >Precio Sugerido: <span className="preciocard">{`$${precio.toLocaleString('es-CO')}`}</span></p>
                  </>
                ) : (
                  <>
                  </>
                )}

                {/*<Link className="informacion">Ver Más</Link>*/}
            </div>
        </div>
    </>
  )
}

export default Productocard