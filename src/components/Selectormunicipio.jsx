import { useEffect, useId, useState } from "react"

// Campo "Ciudad o municipio" con buscador sobre la lista DANE (combobox accesible)
const Selectormunicipio = ({ municipio, onElegir, buscar, error, describedBy, inputRef, onBlur }) => {

  const [texto, setTexto] = useState(municipio?.etiqueta || '')
  const [abierto, setAbierto] = useState(false)
  const [activo, setActivo] = useState(0)
  const idLista = useId()

  // Si el municipio llega después (borrador o ciudad de la PDP), se refleja en el campo
  useEffect(() => {
    if (municipio) setTexto(municipio.etiqueta)
  }, [municipio])

  const opciones = buscar ? buscar(texto === municipio?.etiqueta ? '' : texto) : []

  const elegir = opcion => {
    onElegir(opcion)
    setTexto(opcion.etiqueta)
    setAbierto(false)
  }

  const alTeclear = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setAbierto(true)
      setActivo(indice => Math.min(indice + 1, opciones.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActivo(indice => Math.max(indice - 1, 0))
    } else if (e.key === 'Enter' && abierto && opciones[activo]) {
      e.preventDefault()
      elegir(opciones[activo])
    } else if (e.key === 'Escape') {
      setAbierto(false)
    }
  }

  return (
    <div className="chk-combo">
      <input
        ref={inputRef}
        id="ciudad"
        name="ciudad"
        type="text"
        role="combobox"
        autoComplete="off"
        autoCapitalize="words"
        spellCheck="false"
        placeholder="Escribe tu ciudad o municipio"
        className={`chk-input ${error ? 'con-error' : ''} ${municipio ? 'valido' : ''}`}
        aria-expanded={abierto && opciones.length > 0}
        aria-controls={idLista}
        aria-autocomplete="list"
        aria-activedescendant={abierto && opciones[activo] ? `${idLista}-${opciones[activo].codigo}` : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        value={texto}
        onChange={e => {
          setTexto(e.target.value)
          setActivo(0)
          setAbierto(true)
          if (municipio) onElegir(null)
        }}
        onFocus={() => setAbierto(true)}
        onBlur={() => {
          setAbierto(false)
          onBlur?.()
        }}
        onKeyDown={alTeclear}
      />
      {abierto && opciones.length > 0 && (
        <ul className="chk-combo-lista" id={idLista} role="listbox">
          {opciones.map((opcion, indice) => (
            <li
              key={opcion.codigo}
              id={`${idLista}-${opcion.codigo}`}
              role="option"
              aria-selected={indice === activo}
              className={indice === activo ? 'activo' : ''}
              // mousedown en vez de click: se elige antes de que el input pierda el foco
              onMouseDown={e => {
                e.preventDefault()
                elegir(opcion)
              }}
            >
              <strong>{opcion.nombre}</strong>
              {opcion.codigo !== '11001' && <span>{opcion.departamento}</span>}
            </li>
          ))}
        </ul>
      )}
      {abierto && buscar && texto.trim().length > 1 && opciones.length === 0 && (
        <p className="chk-combo-vacio">No encontramos ese municipio. Revisa cómo está escrito.</p>
      )}
    </div>
  )
}

export default Selectormunicipio
