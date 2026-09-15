// Utilidades compartidas entre el checkout y la confirmación del pedido

export const WHATSAPP_DELTEO = '573054392872'
export const CLAVE_ULTIMO_PEDIDO = 'delteo_ultimo_pedido'

export const formatoPrecio = valor =>
  `$${Number(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`

export const formatoCelular = digitos =>
  digitos.replace(/^(\d{3})(\d{0,3})(\d{0,4}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(' '))

export const enlaceWhatsapp = texto =>
  `https://wa.me/${WHATSAPP_DELTEO}?text=${encodeURIComponent(texto)}`

// Mensaje con el pedido completo, para confirmar o para enviarlo por WhatsApp si la web falla
export const textoPedido = (intro, pedido) => {
  const lineas = [
    intro,
    '',
    ...pedido.productos.map(item => `• ${item.cantidad} x ${item.nombre}`),
    `Total: ${formatoPrecio(pedido.total)} (pago al recibir)`,
    '',
    pedido.nombre && `Nombre: ${pedido.nombre}`,
    pedido.telefono && `Celular: ${formatoCelular(pedido.telefono)}`,
    pedido.ciudad && `Ciudad: ${pedido.ciudad}`,
    pedido.direccion && `Dirección: ${pedido.direccion}`,
    pedido.cedula && `Cédula de quien recibe: ${pedido.cedula}`
  ]
  return lineas.filter(linea => linea !== false && linea !== undefined && linea !== null).join('\n')
}

export const guardarUltimoPedido = pedido => {
  try {
    sessionStorage.setItem(CLAVE_ULTIMO_PEDIDO, JSON.stringify(pedido))
  } catch {
    // Sin sessionStorage: la confirmación usa el estado de la navegación
  }
}

export const leerUltimoPedido = () => {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE_ULTIMO_PEDIDO))
  } catch {
    return null
  }
}
