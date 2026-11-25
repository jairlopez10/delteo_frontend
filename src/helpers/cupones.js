/*
Cupones de descuento del checkout.

ESTA LISTA ES SOLO PARA MOSTRAR. El que manda es el backend (backend/helpers/cupones.js):
él recalcula el total del pedido y firma con ese valor la transacción de Wompi. Si cambias
un cupón aquí, cámbialo también allá y despliega los dos lados seguidos, o el cliente verá
un descuento que no se le cobra.

Cada cupón se puede usar una sola vez por pedido, pero no tiene límite de usos entre
pedidos: lo puede poner cuanta gente quiera, en todos los pedidos que haga.
Para desactivar un cupón, quítalo de esta lista (y de la del backend).

  tipo 'monto'  → descuenta `valor` pesos del total
  tipo 'regalo' → no cambia el precio: suma `regalo` al pedido como producto gratis
*/

export const CUPONES = [
    {
        codigo: 'BASTA26',
        tipo: 'regalo',
        // Producto que se despacha gratis con el pedido. Va en el texto que recibe el Sheet.
        regalo: 'Juego Basta',
        mensaje: 'Te llega el Juego Basta gratis con tu pedido.'
    },
    {
        codigo: 'COMUNI26',
        tipo: 'monto',
        valor: 15000,
        mensaje: 'Descontamos $15.000 de tu pedido.'
    }
]

export const normalizarCupon = texto => String(texto ?? '').trim().toUpperCase()

export const buscarCupon = codigo => {
    const limpio = normalizarCupon(codigo)
    if (!limpio) return null
    return CUPONES.find(cupon => cupon.codigo === limpio) || null
}

// Lo que el cupón descuenta del total, en pesos. Un cupón de regalo no baja el precio.
export const descuentoCupon = cupon => (cupon?.tipo === 'monto' ? cupon.valor : 0)

// Nombre del producto gratis que acompaña al pedido, si el cupón regala algo
export const regaloCupon = cupon => (cupon?.tipo === 'regalo' ? cupon.regalo : null)

// Línea del regalo para el texto del pedido (Sheet y WhatsApp)
export const textoRegalo = (regalo, codigo) => `+ ${regalo} (gratis, cupón ${codigo})`
