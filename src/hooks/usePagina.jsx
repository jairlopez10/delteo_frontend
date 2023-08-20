import { useContext } from "react"
import Paginacontext from "../context/Paginaprovider"

const usePagina = () => {
    return useContext(Paginacontext)
}

export default usePagina;