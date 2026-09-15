// Reglas del estimador de entrega de la PDP (Fase 5).
// ⚠️ VALORES PROVISIONALES: confirmar hora de corte, sábados y ciudades principales antes de publicar.

export const configEntrega = {
  horaCorte: 14, // 2 p.m. hora Colombia. PROVISIONAL
  sabadosHabiles: false, // ¿Inter Rapidísimo despacha/entrega los sábados? PROVISIONAL
  // Días hábiles después del despacho. Se muestra el final del rango (promesa conservadora).
  diasPorZona: {
    bogota: 1,
    principal: 3, // rango real 2–3
    nacional: 5 // rango real 4–5
  }
}

// PROVISIONAL: lista de ciudades que llegan en 2–3 días hábiles
export const ciudadesEntrega = [
  { codigo: '11001', nombre: 'Bogotá', departamento: 'Cundinamarca', zona: 'bogota' },
  { codigo: '05001', nombre: 'Medellín', departamento: 'Antioquia', zona: 'principal' },
  { codigo: '76001', nombre: 'Cali', departamento: 'Valle del Cauca', zona: 'principal' },
  { codigo: '08001', nombre: 'Barranquilla', departamento: 'Atlántico', zona: 'principal' },
  { codigo: '13001', nombre: 'Cartagena', departamento: 'Bolívar', zona: 'principal' },
  { codigo: '68001', nombre: 'Bucaramanga', departamento: 'Santander', zona: 'principal' },
  { codigo: '66001', nombre: 'Pereira', departamento: 'Risaralda', zona: 'principal' },
  { codigo: '17001', nombre: 'Manizales', departamento: 'Caldas', zona: 'principal' },
  { codigo: '63001', nombre: 'Armenia', departamento: 'Quindío', zona: 'principal' },
  { codigo: '73001', nombre: 'Ibagué', departamento: 'Tolima', zona: 'principal' },
  { codigo: '47001', nombre: 'Santa Marta', departamento: 'Magdalena', zona: 'principal' },
  { codigo: '50001', nombre: 'Villavicencio', departamento: 'Meta', zona: 'principal' },
  { codigo: '54001', nombre: 'Cúcuta', departamento: 'Norte de Santander', zona: 'principal' },
  { codigo: '41001', nombre: 'Neiva', departamento: 'Huila', zona: 'principal' },
  { codigo: '52001', nombre: 'Pasto', departamento: 'Nariño', zona: 'principal' },
  { codigo: '23001', nombre: 'Montería', departamento: 'Córdoba', zona: 'principal' }
]

export const otraCiudad = { nombre: 'Otra ciudad o municipio', departamento: '', zona: 'nacional' }

// Zona de entrega de un municipio según su código DANE (DIVIPOLA)
export const zonaPorCodigo = (codigo) =>
  ciudadesEntrega.find(ciudad => ciudad.codigo === codigo)?.zona || 'nacional'

// Festivos de Colombia (fecha en que se descansa). Revisar cada año.
const festivos = new Set([
  '2026-01-01', '2026-01-12', '2026-03-23', '2026-04-02', '2026-04-03', '2026-05-01', '2026-05-18',
  '2026-06-08', '2026-06-15', '2026-06-29', '2026-07-20', '2026-08-07', '2026-08-17', '2026-10-12',
  '2026-11-02', '2026-11-16', '2026-12-08', '2026-12-25',
  '2027-01-01', '2027-01-11', '2027-03-22', '2027-03-25', '2027-03-26', '2027-05-01', '2027-05-10',
  '2027-05-31', '2027-06-07', '2027-07-05', '2027-07-12', '2027-07-20', '2027-08-07', '2027-08-16', '2027-10-18', '2027-11-01', '2027-11-15', '2027-12-08', '2027-12-25'
])

const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const CLAVE_CIUDAD = 'delteo_ciudad'

// Las fechas se manejan como "día de Colombia" guardado en UTC (Colombia no tiene horario de verano)
const ahoraColombia = (ahora) => new Date(ahora.getTime() - 5 * 60 * 60 * 1000)

const esHabil = (fecha) => {
  const dia = fecha.getUTCDay()
  if (dia === 0) return false
  if (dia === 6 && !configEntrega.sabadosHabiles) return false
  return !festivos.has(fecha.toISOString().slice(0, 10))
}

const siguienteHabil = (fecha) => {
  const siguiente = new Date(fecha)
  do {
    siguiente.setUTCDate(siguiente.getUTCDate() + 1)
  } while (!esHabil(siguiente))
  return siguiente
}

export const formatearFecha = (fecha) =>
  `${DIAS[fecha.getUTCDay()]} ${fecha.getUTCDate()} ${MESES[fecha.getUTCMonth()]}`

export const formatearHora = (hora) => {
  const h12 = hora % 12 === 0 ? 12 : hora % 12
  return `${h12} ${hora < 12 ? 'a.m.' : 'p.m.'}`
}

export const calcularEntrega = (ciudad, ahora = new Date()) => {
  const local = ahoraColombia(ahora)
  const hoy = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()))
  const despachaHoy = esHabil(hoy) && local.getUTCHours() < configEntrega.horaCorte
  let fecha = despachaHoy ? hoy : siguienteHabil(hoy)
  const dias = configEntrega.diasPorZona[ciudad.zona] ?? configEntrega.diasPorZona.nacional
  for (let i = 0; i < dias; i++) {
    fecha = siguienteHabil(fecha)
  }
  return { fecha, despachaHoy, esRango: ciudad.zona !== 'bogota' }
}

export const leerCiudadGuardada = () => {
  try {
    const guardada = JSON.parse(localStorage.getItem(CLAVE_CIUDAD))
    return guardada && guardada.nombre && guardada.zona ? guardada : null
  } catch {
    return null
  }
}

export const guardarCiudad = (ciudad) => {
  try {
    localStorage.setItem(CLAVE_CIUDAD, JSON.stringify(ciudad))
  } catch {
    // Sin localStorage (modo privado): la ciudad solo vive en esta visita
  }
}
