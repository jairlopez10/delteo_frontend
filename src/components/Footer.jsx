import { Link } from "react-router-dom"
import usePagina from "../hooks/usePagina"

const Footer = () => {

  const { pagina } = usePagina();

  return (
    <>
      <footer className="flex justify-center">
        
        <Link to={"/"} className="logo" onClick={() => setmenu(false)}>
            <img src="/lotoo.png" alt="" />
        </Link>
      </footer>
    </>
  )
}

export default Footer