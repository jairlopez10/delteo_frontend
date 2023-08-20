import { useEffect } from "react"
import usePagina from "../hooks/usePagina"

const Nosotros = () => {

  const { pagina, setpagina } = usePagina();

  useEffect(() => {
    setpagina('nosotros')
  }, [])

  return (
    <div>Nosotros</div>
  )
}

export default Nosotros