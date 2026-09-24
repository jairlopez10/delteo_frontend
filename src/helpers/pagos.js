// Pago en línea con Wompi. El backend es el que calcula el total, genera la
// referencia y firma la transacción: aquí solo se manda el carrito y se redirige.

export const METODO_CONTRAENTREGA = 'contraentrega'
export const METODO_WOMPI = 'wompi'

export const CLAVE_PAGO_PENDIENTE = 'delteo_pago_pendiente'

// Estados de pedido que devuelve el backend
export const ESTADOS = {
  PENDIENTE: 'PENDIENTE_PAGO',
  EN_PROCESO: 'PAGO_EN_PROCESO',
  PAGADO: 'PAGADO',
  RECHAZADO: 'PAGO_RECHAZADO',
  ANULADO: 'PAGO_ANULADO',
  ERROR: 'PAGO_ERROR'
}

export const esEstadoFinal = estado =>
  [ESTADOS.PAGADO, ESTADOS.RECHAZADO, ESTADOS.ANULADO, ESTADOS.ERROR].includes(estado)

// Lo mínimo que necesita el backend: él resuelve nombre y precio desde su catálogo
export const itemsParaBackend = carrito =>
  carrito.map(({ id, nombre, cantidad }) => ({ id, nombre, cantidad: Number(cantidad) }))

/*
Id del intento de compra. Se conserva en la pestaña mientras no se complete el pedido:
los reintentos de contra entrega mandan el mismo (el backend no duplica la fila) y es el
event_id del Purchase que comparten el Pixel y CAPI. También evita repetir
begin_checkout al recargar. Se olvida cuando el pedido queda registrado o pagado.
*/
const CLAVE_PEDIDO_ID = 'delteo_pedido_id'

// randomUUID no existe en navegadores viejos (algunos in-app): respaldo con Math.random
const nuevoPedidoId = () =>
  window.crypto?.randomUUID?.() ||
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`

export const leerPedidoId = () => {
  try {
    const guardado = sessionStorage.getItem(CLAVE_PEDIDO_ID)
    if (guardado) return guardado
    const nuevo = nuevoPedidoId()
    sessionStorage.setItem(CLAVE_PEDIDO_ID, nuevo)
    return nuevo
  } catch {
    return nuevoPedidoId()
  }
}

export const olvidarPedidoId = () => {
  try {
    sessionStorage.removeItem(CLAVE_PEDIDO_ID)
  } catch {
    // no pasa nada
  }
}

export const guardarPagoPendiente = datos => {
  try {
    sessionStorage.setItem(CLAVE_PAGO_PENDIENTE, JSON.stringify(datos))
  } catch {
    // Sin sessionStorage la página de resultado se apoya solo en el backend
  }
}

export const leerPagoPendiente = () => {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE_PAGO_PENDIENTE))
  } catch {
    return null
  }
}

export const olvidarPagoPendiente = () => {
  try {
    sessionStorage.removeItem(CLAVE_PAGO_PENDIENTE)
  } catch {
    // no pasa nada
  }
}

// Los eventos de compra deben dispararse una sola vez por referencia, aunque el
// cliente recargue la página de resultado.
const CLAVE_EVENTOS = 'delteo_purchase_enviado'

export const yaSeEnvioPurchase = referencia => {
  try {
    return (JSON.parse(localStorage.getItem(CLAVE_EVENTOS)) || []).includes(referencia)
  } catch {
    return false
  }
}

export const marcarPurchaseEnviado = referencia => {
  try {
    const previos = JSON.parse(localStorage.getItem(CLAVE_EVENTOS)) || []
    localStorage.setItem(CLAVE_EVENTOS, JSON.stringify([...previos, referencia].slice(-20)))
  } catch {
    // sin localStorage se podría duplicar el evento al recargar; no rompe la compra
  }
}
