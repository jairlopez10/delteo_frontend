/*
Configuración de la página de inicio (Fase 4). Todo lo editable vive aquí:
cambiar la home es cambiar estos datos, no el JSX.
*/

/*
HERO
----
Mientras no haya video, el hero muestra un collage con las fotos de `collage`.
Para pasar al video solo hay que llenar `video` (y dejarlo así):

  video: {
    src: '/hero.mp4',            // vertical/cuadrado, para móvil
    srcAncho: '/hero-16x9.mp4',  // opcional: versión horizontal para escritorio
    poster: '/hero-poster.jpg'   // primera imagen, se ve mientras carga
  }

El video se reproduce en bucle, sin sonido y sin controles; si el celular está en
"reducir movimiento" se queda en el poster.
*/
export const hero = {
  video: null,
  collage: [
    { src: '/producto378f.jpg', alt: 'Tiburón a control remoto' },
    { src: '/producto376e.webp', alt: 'Lanzadora de hidrogel M416' },
    { src: '/producto387d.webp', alt: 'Perro interactivo' }
  ],
  titulo: 'Juguetes que no se ven en cualquier juguetería.',
  texto: 'Control remoto, hidrogel y tecnología para niños de 3 a 12 años. Elegidos y probados por nosotros.',
  cta: 'Ver los más pedidos'
}

/*
MÓDULO DE PROMOCIÓN (opcional)
Solo aparece si existe y la fecha de fin no ha pasado. Sin campaña real, déjalo en null.
  promo: { titulo: 'Hasta el domingo: el segundo juguete con 15% off', texto: '...', hasta: '2026-10-19' }
*/
export const promo = null

/*
LOS MÁS PEDIDOS
Orden manual: el primero de la lista es el primero que se ve.
⚠️ Ajusta este orden con tus ventas reales antes de publicar.
*/
export const masPedidos = [378, 376, 372, 380, 379, 387]

/*
FAMILIAS (¿qué tipo de juguete?)
Cada una lleva los ids que le pertenecen; el listado /juguetes filtra con ellos.
El color es de la paleta pastel de la Fase 7 y solo se usa en estos bloques.
*/
export const familias = [
  {
    slug: 'control-remoto',
    nombre: 'Control remoto',
    color: '#DCEBFF',
    imagen: '/producto378f.jpg',
    ids: [378, 379, 380, 372]
  },
  {
    slug: 'hidrogel-y-agua',
    nombre: 'Hidrogel y agua',
    color: '#FFF1C7',
    imagen: '/producto376e.webp',
    ids: [376, 395, 375, 371, 373, 374, 377, 401, 362]
  },
  {
    slug: 'tecnologia',
    nombre: 'Tecnología e interactivos',
    color: '#E6F6EC',
    imagen: '/producto387d.webp',
    ids: [387, 385, 2, 381, 386]
  },
  {
    slug: 'calma',
    nombre: 'Calma y sensoriales',
    color: '#EFE6FF',
    imagen: '/producto384a.webp',
    ids: [384, 383, 13]
  },
  {
    slug: 'armables',
    nombre: 'Armables y juegos',
    color: '#FFE3D6',
    imagen: '/producto388a.webp',
    ids: [388, 409, 382]
  }
]

export const familiaPorSlug = slug => familias.find(familia => familia.slug === slug) || null

/*
EDADES
El valor es el que usa el filtro del listado (campo `edad` de Productosdb).
*/
export const edades = [
  { valor: '+3', etiqueta: '3 a 5 años' },
  { valor: '+6', etiqueta: '6 a 8 años' },
  { valor: '+8', etiqueta: '8 años o más' }
]

// Por qué Delteo: razones concretas, nada que no se pueda cumplir
export const razones = [
  {
    icono: 'check',
    titulo: 'Los elegimos uno por uno',
    texto: 'Buscamos juguetes que sorprendan. Si no nos sorprende a nosotros, no entra al catálogo.'
  },
  {
    icono: 'efectivo',
    titulo: 'Pagas cuando lo recibes',
    texto: 'O en línea con tarjeta, PSE o Nequi, y te descontamos el 5%.'
  },
  {
    icono: 'escudo',
    titulo: 'Garantía de 1 mes',
    texto: 'Si llega con falla de fábrica, escríbenos y te ayudamos con el cambio.'
  },
  {
    icono: 'whatsapp',
    titulo: 'Te atienden personas',
    texto: 'Confirmamos cada pedido por WhatsApp antes de despacharlo.'
  }
]

// Las dudas que hoy llegan por WhatsApp
export const preguntas = [
  {
    pregunta: '¿Cuánto tarda en llegar?',
    respuesta: 'Enviamos con Inter Rapidísimo a toda Colombia. En Bogotá suele llegar al día hábil siguiente y al resto del país entre 2 y 5 días hábiles. En cada producto puedes elegir tu ciudad y ver la fecha estimada.'
  },
  {
    pregunta: '¿Cómo pago?',
    respuesta: 'Puedes pagar en efectivo cuando recibes el pedido, o pagar en línea con tarjeta, PSE, Nequi o Bancolombia y ahorrar el 5%.'
  },
  {
    pregunta: '¿Qué pasa si llega con falla?',
    respuesta: 'Todos los juguetes tienen garantía de 1 mes. Escríbenos por WhatsApp con una foto o un video y te ayudamos con el cambio.'
  },
  {
    pregunta: '¿Envían a mi ciudad?',
    respuesta: 'Sí, enviamos a toda Colombia y el envío es gratis. En la página de cada juguete puedes buscar tu municipio y ver cuándo llegaría.'
  }
]
