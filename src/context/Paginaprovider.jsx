import { createContext } from "react";
import { useState, useEffect } from "react";

const Paginacontext = createContext();

const Paginaprovider = ({children}) => {

    const [pagina, setpagina] = useState('inicio');

    return (
        <Paginacontext.Provider value={{
            pagina,
            setpagina
        }} >
            {children}
        </Paginacontext.Provider>
    )
}

export {
    Paginaprovider
}

export default Paginacontext