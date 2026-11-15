/*
Campaña de Black Friday. Todo lo de la campaña sale de aquí.

Cómo funciona el precio:
el valor de `precio` en Productosdb.jsx YA es el precio con el 30% de descuento.
El precio tachado ("antes") se calcula hacia arriba a partir de ese precio, sobre el
valor que ve el cliente (que ya trae el envío incluido).

Cómo se apaga:
  - poniendo `activo: false`, o
  - sola, cuando pasa la fecha de `fin`.
En los dos casos la tienda vuelve a verse exactamente como fuera de campaña.
*/

export const campana = {
  activo: true,
  inicio: '2026-11-15',
  fin: '2026-11-30',        // incluido: termina a las 11:59 p.m. de ese día
  porcentaje: 0.30,
  etiqueta: 'Black Friday',
  // Textos de la campaña, para no tenerlos repartidos por los componentes
  barra: 'BLACK FRIDAY −30%',
  tituloOfertas: 'Ofertas Black Friday',
  ctaHero: 'Ver las ofertas',
  subtituloHero: 'Esta semana, todo con 30% de descuento. Hasta el lunes 30 de noviembre.'
}

// Colombia no tiene horario de verano, así que basta con fijar el -05:00
const limite = (fecha, hora) => new Date(`${fecha}T${hora}-05:00`)

export const terminaEn = () => limite(campana.fin, '23:59:59')

export const bfVigente = (ahora = new Date()) =>
  campana.activo &&
  ahora >= limite(campana.inicio, '00:00:00') &&
  ahora <= terminaEn()

// "−30%"
export const textoPorcentaje = `−${Math.round(campana.porcentaje * 100)}%`

/*
Precio anterior a partir del precio de hoy: $139.900 ÷ 0,7 = $199.857 → $199.900.
Se redondea a los $100 más cercanos para que no queden cifras con decimales sueltos.
*/
export const precioAntes = precioActual =>
  Math.round(precioActual / (1 - campana.porcentaje) / 100) * 100

// Cuánto falta para que termine, en días y horas: { dias: 15, horas: 6, texto: '15 d 06 h' }
export const restante = (ahora = new Date()) => {
  const milisegundos = Math.max(0, terminaEn() - ahora)
  const dias = Math.floor(milisegundos / 86400000)
  const horas = Math.floor((milisegundos % 86400000) / 3600000)
  const minutos = Math.floor((milisegundos % 3600000) / 60000)
  // El último día se cuenta en horas y minutos, que es cuando la urgencia es real
  const texto = dias > 0
    ? `${dias} d ${String(horas).padStart(2, '0')} h`
    : `${horas} h ${String(minutos).padStart(2, '0')} m`
  return { dias, horas, minutos, texto }
}
