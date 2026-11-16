/*
La primera entrada de `imagenes` a veces es un video (la MP5, por ejemplo). Un <img>
no puede mostrar un .mp4, así que para la foto fija de las tarjetas y del carrito se
usa la primera entrada que sea imagen de verdad.
*/
export const imagenPrincipal = producto => {
  const imagenes = producto?.imagenes || []
  const foto = imagenes.find(item => item?.url && !item.url.endsWith('.mp4'))
  return (foto || imagenes[0] || {}).url
}
