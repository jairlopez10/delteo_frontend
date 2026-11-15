import { useEffect, useState } from "react"
import { bfVigente, restante } from "../helpers/blackfriday"

/*
Estado de la campaña de Black Friday para los componentes.
Devuelve { activo, texto } y se refresca cada minuto, así la campaña también se
apaga sola si alguien deja la página abierta cuando termina.
*/
const estadoActual = () => {
  const activo = bfVigente()
  return { activo, texto: activo ? restante().texto : '' }
}

const useBlackfriday = () => {
  const [estado, setEstado] = useState(estadoActual)

  useEffect(() => {
    const id = setInterval(() => {
      setEstado(anterior => {
        const nuevo = estadoActual()
        // Evita renders innecesarios mientras no cambie el minuto mostrado
        return (nuevo.activo === anterior.activo && nuevo.texto === anterior.texto) ? anterior : nuevo
      })
    }, 60000)
    return () => clearInterval(id)
  }, [])

  return estado
}

export default useBlackfriday
