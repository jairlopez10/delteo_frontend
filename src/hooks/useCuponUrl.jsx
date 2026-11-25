/*
Cupón que llega en el enlace (?cupon=BASTA26), en cualquier página de la tienda.

Lo guarda en el navegador para que el checkout lo aplique solo y manda a GA4 el
evento coupon_from_link una sola vez por pestaña y por código. El código que no
existe se ignora: no se guarda nada y no se avisa nada.

El parámetro se queda en la URL a propósito: así GA4 ve la página de entrada con
el cupón y los utm_* del enlace, sin que una redirección le cambie la sesión.
*/
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { buscarCupon, guardarCuponDelEnlace, PARAM_CUPON } from "../helpers/cupones"
import { marcarOcurrido, track, yaOcurrio } from "../helpers/analytics"

const useCuponUrl = () => {
    const [parametros] = useSearchParams()
    const codigoDelEnlace = parametros.get(PARAM_CUPON)

    useEffect(() => {
        const cupon = buscarCupon(codigoDelEnlace)
        if (!cupon) return
        guardarCuponDelEnlace(cupon.codigo)

        // Una visita pasa por varias páginas: el evento sale una vez, no en cada una
        const clave = `coupon_from_link_${cupon.codigo}`
        if (yaOcurrio(clave)) return
        marcarOcurrido(clave)
        track('coupon_from_link', { coupon: cupon.codigo })
    }, [codigoDelEnlace])
}

export default useCuponUrl
