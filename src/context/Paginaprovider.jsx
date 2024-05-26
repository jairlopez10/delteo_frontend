import { createContext, useState } from "react";

const Paginacontext = createContext();

const Paginaprovider = ({children}) => {

    const [pagina, setpagina] = useState('inicio');
    const [contador, setContador] = useState(0);

    return (
        <Paginacontext.Provider value={{
            pagina,
            setpagina,
            contador,
            setContador
        }} >
            {children}
        </Paginacontext.Provider>
    )
}

export {
    Paginaprovider
}

export default Paginacontext