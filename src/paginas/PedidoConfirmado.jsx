import usePagina from "../hooks/usePagina"
import { useEffect } from "react";

const PedidoConfirmado = () => {

    const { setpagina } = usePagina();

    useEffect(() => {
        setpagina('otros')
    }, [])

  return (
    <>
        <div className="contenedor pt-60">
            <div className="card-confirmacion">
                <div className="confirmacion">
                    <div className="flex flex-col justify-center items-center gap-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icono-confirmacion icon-tabler icon-tabler-circle-check-filled" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" strokeWidth="0" fill="currentColor" />
                        </svg>
                        <h1 className="text-black">¡Hemos recibido tu pedido!</h1>
                    </div>
                    <p className=" text-4xl">Nos pondremos en contacto en un periodo de <span className=" font-bold">1 hora</span> para confirmar tu pedido</p>
                </div>
                <div className="contacto-wa">
                <p className="text-4xl pregunta">¿Tienes alguna pregunta?</p>
                <button className="boton-contacto-pedido" onClick={() => window.open(`https://wa.me/573054392872?text=Hola!%20Acabo%20de%20realizar%20un%20pedido%20a%20nombre%20de`)}>
                    <img src="./wa.webp" alt="imagen-wa" />
                    <p>Contactanos</p>
                </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default PedidoConfirmado