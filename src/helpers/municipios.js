// Municipios de Colombia (DANE DIVIPOLA) para el campo de ciudad del checkout.
// Se carga con import() desde el checkout para no sumar peso al resto del sitio.
import datos from "./municipios.json"
import { ciudadesEntrega, zonaPorCodigo } from "./entregas"

const normalizar = (texto) => texto
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9ñ ]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

export const municipios = datos.municipios.map(([codigo, nombre, indiceDepartamento]) => {
  const departamento = datos.departamentos[indiceDepartamento]
  const esBogota = codigo === '11001'
  return {
    codigo,
    nombre,
    departamento,
    zona: zonaPorCodigo(codigo),
    // Texto que se guarda en el pedido: "Medellín, Antioquia"
    etiqueta: esBogota ? nombre : `${nombre}, ${departamento}`,
    busqueda: normalizar(`${nombre} ${esBogota ? '' : departamento}`)
  }
})

const porCodigo = new Map(municipios.map(municipio => [municipio.codigo, municipio]))

export const municipioPorCodigo = (codigo) => porCodigo.get(codigo) || null

// Sugerencias al enfocar el campo vacío: las ciudades con entrega más rápida
export const municipiosDestacados = ciudadesEntrega
  .map(ciudad => porCodigo.get(ciudad.codigo))
  .filter(Boolean)

const prioridadZona = { bogota: 0, principal: 1, nacional: 2 }

export const buscarMunicipios = (texto, limite = 8) => {
  const consulta = normalizar(texto)
  if (!consulta) return municipiosDestacados.slice(0, limite)

  return municipios
    .map(municipio => {
      const nombre = normalizar(municipio.nombre)
      const palabras = nombre.split(' ')
      let puntaje = -1
      // 0: palabra exacta ("cali" → Santiago de Cali) · 1: empieza igual · 2: contiene
      if (nombre === consulta || palabras.includes(consulta)) puntaje = 0
      else if (nombre.startsWith(consulta) || palabras.some(palabra => palabra.startsWith(consulta))) puntaje = 1
      else if (municipio.busqueda.includes(consulta)) puntaje = 2
      return { municipio, puntaje }
    })
    .filter(item => item.puntaje >= 0)
    .sort((a, b) =>
      a.puntaje - b.puntaje ||
      prioridadZona[a.municipio.zona] - prioridadZona[b.municipio.zona] ||
      a.municipio.nombre.localeCompare(b.municipio.nombre, 'es')
    )
    .slice(0, limite)
    .map(item => item.municipio)
}
