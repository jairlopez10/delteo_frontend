import { Link } from "react-router-dom"
import usePagina from "../hooks/usePagina"

const Footer = () => {

  const { pagina } = usePagina();

  return (
    <>
      <footer className=" bg-black flex justify-center">
        
        <Link to={"/mayorista"} className="logo" onClick={() => setmenu(false)}>
            <img src="/logo.png" alt="" />
        </Link>
      </footer>
    </>
  )
}

export default Footer