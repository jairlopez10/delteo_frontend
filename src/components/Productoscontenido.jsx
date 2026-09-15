// Contenido de la página de producto (Fase 5), por id de producto.
// Reemplaza a los componentes de productsection/: se edita texto, no JSX.
//
// Campos (todos opcionales):
//   nombre        Nombre visible (el `titulo` de Productosdb se sigue usando en la URL y la analítica)
//   subtitulo     Una línea que diga qué hace
//   nota          Aviso junto al selector de modelo
//   badges        ['mas-pedido' | 'nuevo'], máx. 2, solo si es real
//   rating        { promedio, total } — solo se muestra con total >= 5 opiniones reales
//   precioAnterior, promoHasta   Solo con una promo real (precio y fecha de fin, 'AAAA-MM-DD')
//   regalo        Texto del regalo promocional, solo si existe
//   incluye       ['...']
//   destacados    [{ titulo, texto, media }]
//   ficha         { 'Dato': 'valor' }
//   faq           [{ pregunta, respuesta }]
//   relacionados  [ids] en orden; si no está, se eligen solos (misma edad primero)

const aireLibre = { titulo: 'Para jugar al aire libre', texto: 'Partidas en equipo en el patio o el parque.' }
const orvisSinRastro = { titulo: 'Orvis que no dejan rastro', texto: 'Se hidratan en agua de 3 a 4 horas y quedan listas para jugar.' }

const computador = {
  subtitulo: 'Computador didáctico con pantalla y actividades de matemáticas, inglés, letras y ortografía.',
  destacados: [
    { titulo: 'Aprende jugando', texto: 'Pantalla interactiva con juegos educativos.', media: '/producto2agif.gif' },
    { titulo: 'Matemáticas, inglés y ortografía', texto: 'Actividades y canciones para practicar de forma divertida.', media: '/producto2bgif.gif' },
    { titulo: 'Llévalo a todas partes', texto: 'Funciona con 3 pilas AA.', media: '/producto2cgif.gif' }
  ],
  incluye: [
    'Computador interactivo',
    'Mouse',
    'Más de 20 actividades de matemáticas',
    'Más de 10 actividades de inglés',
    'Más de 10 actividades de letras',
    'Más de 10 actividades de ortografía'
  ]
}

const productoscontenido = {
  2: {
    ...computador,
    nombre: 'Computador con pantalla y mouse',
    nota: 'Te escribimos por WhatsApp para confirmar el modelo: Spiderman o Princesas.'
  },
  381: {
    ...computador,
    nombre: 'Computador con pantalla y mouse'
  },
  386: {
    nombre: 'Computador con pantalla interactivo',
    subtitulo: 'Computador didáctico con pantalla y actividades de matemáticas, inglés, letras y ortografía.',
    destacados: [
      { titulo: 'Aprende jugando', texto: 'Pantalla interactiva con juegos educativos.', media: '/producto2agif.gif' },
      { titulo: 'Matemáticas, inglés y ortografía', texto: 'Actividades y canciones para practicar de forma divertida.', media: '/compunormal3.gif' },
      { titulo: 'Llévalo a todas partes', texto: 'Funciona con 3 pilas AA.', media: '/compunormal2.gif' }
    ],
    incluye: [
      'Computador interactivo',
      'Más de 20 actividades de matemáticas',
      'Más de 10 actividades de inglés',
      'Más de 10 actividades de letras',
      'Más de 10 actividades de ortografía'
    ]
  },
  13: {
    nombre: 'Gimnasio musical interactivo para bebé',
    subtitulo: 'Tapete de juego con piano musical y colgantes interactivos.',
    destacados: [
      { titulo: 'Para sus primeros meses', texto: 'Estimula su desarrollo sensorial, físico y cognitivo.', media: '/gimnasio2.gif' },
      { titulo: 'Más de 10 melodías', texto: 'Para despertar su sentido auditivo.', media: '/gimnasio1.webp' },
      { titulo: 'Plegable y fácil de llevar', texto: 'Lo guardas o lo llevas a donde quieras.', media: '/gimnasiogif1.webp' }
    ],
    incluye: ['Tapete gimnasio interactivo', 'Piano musical', 'Colgantes interactivos', 'Soportes']
  },
  371: {
    nombre: 'Pistola de agua recargable',
    subtitulo: 'Dispara en modo automático o manual y trae dos proveedores de agua.',
    destacados: [
      { titulo: 'Automática o manual', texto: 'Tú decides: potencia constante o disparos precisos.', media: '/pisaguagif3.gif' },
      { titulo: 'Dos proveedores de agua', texto: 'Uno mediano y uno grande, según cómo quieras jugar.', media: '/pisaguagif2.gif' },
      { titulo: 'Efectos de luz', texto: 'Luces en cada disparo, también de noche.', media: '/pisaguagif1.gif' }
    ],
    incluye: ['Pistola de agua', 'Batería recargable', 'Proveedor mediano', 'Proveedor grande', 'Cargador USB']
  },
  372: {
    nombre: 'Terrenaitor, carro a control con sensor',
    subtitulo: 'Carro todoterreno con luces y vapor que manejas con control remoto o con una manilla de sensor.',
    destacados: [
      { titulo: 'Luces y vapor de agua', texto: 'Carro a control remoto con luces, vapor y batería recargable.', media: '/terrenaitor2.gif' },
      { titulo: 'Manéjalo con la mano', texto: 'Usa la manilla de sensor o el control remoto.', media: '/terrenaitor1.gif' },
      { titulo: 'Para cualquier terreno', texto: 'Arena, barro o piedras: llévalo a donde quieras.', media: '/terrenaitor3.gif' },
      { titulo: 'Listo para salir a jugar', texto: 'Carga la batería por USB y a rodar.', media: '/terrenaitor4.gif' }
    ],
    incluye: ['Carro Terrenaitor', 'Manilla de sensor', 'Control remoto', 'Batería recargable', 'Cargador USB', 'Dispensador de agua']
  },
  373: {
    nombre: 'Lanzadora de hidrogel MP5 recargable',
    subtitulo: 'Lanzadora de hidrogel con silenciador con luz, láser, linterna y 15.000 orvis.',
    destacados: [
      { ...aireLibre, media: '/ak3.gif' },
      { titulo: 'Silenciador con luz, láser y linterna', texto: 'Los tres accesorios vienen incluidos.', media: '/mp5f.gif' },
      { ...orvisSinRastro, media: '/ak5.gif' },
      { titulo: '15.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/mp5b.gif' }
    ],
    incluye: ['Lanzadora de hidrogel MP5', 'Silenciador con luz', 'Láser', 'Linterna', '15.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB', 'Proveedor tipo granada'],
    relacionados: [374, 375, 376, 377, 395, 401]
  },
  374: {
    nombre: 'Lanzadora de hidrogel AK recargable',
    subtitulo: 'Lanzadora de hidrogel con silenciador con luz y 11.000 orvis.',
    destacados: [
      { ...aireLibre, media: '/ak3.gif' },
      { titulo: 'Luz en cada disparo', texto: 'El silenciador se ilumina sin pilas adicionales.', media: '/ak6.gif' },
      { ...orvisSinRastro, media: '/ak5.gif' },
      { titulo: '11.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/ak7.gif' }
    ],
    incluye: ['Lanzadora de hidrogel', 'Silenciador con luz', '11.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB', 'Proveedor tipo granada']
  },
  375: {
    nombre: 'Minigun de hidrogel recargable',
    subtitulo: 'Lanzadora de hidrogel con cañón giratorio, gafas de protección y 12.000 orvis.',
    destacados: [
      { ...aireLibre, media: '/minigun.gif' },
      { titulo: 'Cañón giratorio', texto: 'Todo el cañón gira al disparar. Trae gafas de protección.', media: '/minigun3.gif' },
      { ...orvisSinRastro, media: '/minigun2.gif' },
      { titulo: '12.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/minigun4.gif' }
    ],
    incluye: ['Minigun de hidrogel', '12.000 orvis de hidrogel', 'Gafas de protección', 'Batería recargable', 'Cargador USB', 'Proveedor superior']
  },
  376: {
    nombre: 'Lanzadora de hidrogel M416 con luz y humo',
    subtitulo: 'Silenciador con luz y humo, mira telescópica y 15.000 orvis.',
    destacados: [
      { titulo: 'Luz y humo en cada disparo', texto: 'El silenciador ilumina y echa humo sin pilas adicionales.', media: '/m416b.gif' },
      { ...aireLibre, media: '/m416c.gif' },
      { ...orvisSinRastro, media: '/m416d.gif' },
      { titulo: 'Cargadores intercambiables', texto: 'Trae dos cargadores para cambiar rápido y seguir jugando.', media: '/m416e.gif' },
      { titulo: 'Alcance de hasta 25 metros', texto: 'Con mira telescópica para apuntar mejor.', media: '/m416f.gif' },
      { titulo: '15.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/m416g.gif' }
    ],
    incluye: ['Lanzadora de hidrogel M416', 'Silenciador con luz y humo', 'Mira telescópica', 'Cargador extendido', 'Cargador mediano', '15.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB', 'Gafas de protección']
  },
  377: {
    nombre: 'Lanzadora de hidrogel PKM recargable',
    subtitulo: 'Lanzadora de hidrogel con trípode, silenciador con luz y 11.000 orvis.',
    destacados: [
      { ...aireLibre, media: '/ak3.gif' },
      { titulo: 'Luz en cada disparo', texto: 'El silenciador se ilumina sin pilas adicionales.', media: '/ak6.gif' },
      { ...orvisSinRastro, media: '/ak5.gif' },
      { titulo: '11.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/pkm1.gif' }
    ],
    incluye: ['Lanzadora de hidrogel', 'Silenciador con luz', '11.000 orvis de hidrogel', 'Trípode', 'Batería recargable', 'Cargador USB', 'Proveedor tipo granada']
  },
  378: {
    nombre: 'Tiburón o delfín a control remoto',
    subtitulo: 'Nada en la piscina y solo se activa cuando toca el agua.',
    destacados: [
      { titulo: 'Se desliza por el agua', texto: 'Para jugar en la piscina o el lago con amigos o en familia.', media: '/tiburon2.gif' },
      { titulo: 'Para niños y adultos', texto: 'Cualquiera puede manejarlo y divertirse.', media: '/tiburon3.gif' },
      { titulo: 'Solo se activa en el agua', texto: 'Se enciende únicamente cuando está en contacto con el agua.', media: '/delfingif1a.gif' },
      { titulo: 'Batería recargable', texto: 'Se carga por USB, sin pilas desechables.', media: '/tiburon1.gif' },
      { titulo: 'Listo para la piscina', texto: 'Carga la batería, ponlo en el agua y a jugar.', media: '/tiburon4.gif' }
    ],
    incluye: ['Tiburón o delfín, según el modelo', 'Control remoto', 'Batería recargable', 'Cargador USB', 'Destornillador', '2 hélices de repuesto']
  },
  379: {
    nombre: 'Lancha Drifter a control remoto',
    subtitulo: 'Lancha de derrape a control remoto que llega a 20 km/h.',
    destacados: [
      { titulo: 'Derrapa en el agua', texto: 'Velocidad, control y diseño deportivo.', media: '/lancha1.gif' },
      { titulo: 'Hasta 20 km/h', texto: 'Más de 1 hora de juego por carga.', media: '/lancha2.gif' },
      { titulo: 'Para principiantes y expertos', texto: 'Se adapta a todos los niveles, sea un niño o un adulto.', media: '/lancha3.gif' }
    ],
    incluye: ['Lancha Drifter', 'Control remoto', 'Batería recargable', 'Cargador USB', '2 hélices de repuesto', 'Protector de hélices', 'Calcomanías']
  },
  380: {
    nombre: 'Velociraptor a control remoto con vapor',
    subtitulo: 'Camina, ruge y lanza vapor de agua por la boca.',
    destacados: [
      { titulo: 'Lanza vapor por la boca', texto: 'El vapor de agua simula fuego.', media: '/dinocontrol2.gif' },
      { titulo: 'Controla cada movimiento', texto: 'Desde el control: camina hacia adelante y atrás, ruge y lanza vapor.', media: '/dinocontrol1.gif' },
      { titulo: 'Hasta 2 horas de juego', texto: 'Batería recargable, sin pilas desechables.', media: '/dinocontrol3.gif' }
    ],
    incluye: ['Velociraptor', 'Control remoto', 'Batería recargable', 'Lanzador de vapor de agua', 'Cargador USB', 'Dispensador de agua']
  },
  382: {
    nombre: 'Dinosaurio Za Za',
    subtitulo: 'Mueve la cabeza y la cola, se ilumina y ruge.',
    destacados: [
      { titulo: 'Mueve la cabeza y la cola', texto: 'Para jugar con amigos o en familia.', media: '/zaza1.gif' },
      { titulo: 'Su cabeza gira hasta 300 grados', texto: 'Cada vez que presionas el botón hace un movimiento distinto.', media: '/zaza2.gif' },
      { titulo: 'Luces y rugidos', texto: 'Su boca se ilumina y hace sonidos.', media: '/zaza3.gif' }
    ]
  },
  383: {
    nombre: 'Lámpara luna',
    subtitulo: 'Lámpara de luna con base de madera para la mesa de noche, el escritorio o la sala.',
    destacados: [
      { titulo: 'Un regalo para alguien especial', texto: 'La luna con luz, para regalar o decorar.', media: '/lampluna2.webp' },
      { titulo: 'Ilumina cada noche', texto: 'Luna con luz y un estilo elegante.', media: '/lampluna3.webp' },
      { titulo: 'Para cualquier lugar', texto: 'Mesa de noche, oficina, sala o cuarto.', media: '/lampluna4.gif' }
    ],
    incluye: ['Lámpara luna', 'Base de madera', 'Cable USB'],
    ficha: { Alto: '10 cm' }
  },
  384: {
    nombre: 'Nutria relajante que respira',
    subtitulo: 'Peluche para abrazar y descansar, para niños y adultos.',
    destacados: [
      { titulo: 'Compañía para dormir', texto: 'Para esa persona especial, niño o adulto.', media: '/nutria1.gif' },
      { titulo: 'Para momentos de calma', texto: 'Una forma sencilla de desconectarse del día.', media: '/nutria1.webp' },
      { titulo: 'Para abrazar y descansar', texto: 'Acompaña la hora de dormir.', media: '/nutria5.gif' }
    ]
  },
  385: {
    nombre: 'Consola Game Box recargable',
    subtitulo: 'Consola portátil con 400 juegos clásicos y batería recargable.',
    destacados: [
      { titulo: '400 juegos clásicos', texto: 'En la palma de la mano.', media: '/game1.gif' },
      { titulo: 'Batería recargable', texto: 'Juega donde quieras.', media: '/game2.gif' },
      { titulo: 'Conéctala al televisor', texto: 'Con su cable AV juegas en pantalla grande.', media: '/game3.gif' }
    ]
  },
  387: {
    nombre: 'Perro caminador, repetidor y con sensor',
    subtitulo: 'Camina, saca la lengua y repite lo que le dices.',
    destacados: [
      { titulo: 'Como una mascota de verdad', texto: 'Camina, saca la lengua y repite lo que dices.', media: '/perrogif1.gif' },
      { titulo: 'Reacciona a las caricias', texto: 'Acarícialo en la cabeza o el cuerpo: camina y ladra.', media: '/perrogif2.gif' },
      { titulo: 'Repite lo que le cuentas', texto: 'Háblale y te responde con tus palabras. Batería recargable.', media: '/perrogif3.gif' }
    ],
    incluye: ['Perro interactivo con sensor', 'Lazo', 'Batería recargable', 'Cable USB', 'Collar o pañuelo']
  },
  388: {
    nombre: 'Lego de Minecraft con luz, 239 piezas',
    subtitulo: 'Set armable de 239 piezas con luz incorporada.',
    destacados: [
      { titulo: 'Construye su propio mundo', texto: 'También sirve como lámpara decorativa.', media: '/gif388c.gif' },
      { titulo: '239 piezas', texto: 'Para los que aman Minecraft.', media: '/gif388b.gif' },
      { titulo: 'Con luz incorporada', texto: 'Decora el cuarto y trabaja la motricidad y la creatividad.', media: '/gif388a.gif' },
      { titulo: 'Listo para armar', texto: 'Trae manual guía.', media: '/gif388d.gif' }
    ],
    incluye: ['239 piezas', 'Luz interna', 'Manual guía']
  },
  395: {
    nombre: 'Lanzadora de hidrogel MP5 con luz y humo',
    subtitulo: 'Silenciador con luz y humo, proveedor tipo granada y 10.000 orvis.',
    destacados: [
      { titulo: 'Luz y humo en cada disparo', texto: 'El silenciador ilumina y echa humo sin pilas adicionales.', media: '/mp52025gifa.gif' },
      { ...aireLibre, media: '/ak3.gif' },
      { ...orvisSinRastro, media: '/ak5.gif' },
      // REVISAR: este GIF es de la M416 (venía así en Mp52025.jsx)
      { titulo: 'Alcance de hasta 25 metros', texto: 'Potencia para jugar en espacios abiertos.', media: '/m416b.gif' }
    ],
    incluye: ['Lanzadora de hidrogel MP5', 'Silenciador con luz y humo', 'Proveedor tipo granada', '10.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB'],
    relacionados: [374, 375, 376, 377, 395, 401]
  },
  401: {
    nombre: 'Lanzadora de hidrogel M16 con luz y humo',
    subtitulo: 'Silenciador con luz y humo, mira telescópica y 10.000 orvis.',
    destacados: [
      // Sin media: el GIF que tenía (m416b.gif) era de la M416
      { titulo: 'Luz y humo en cada disparo', texto: 'El silenciador ilumina y echa humo sin pilas adicionales.' },
      { ...aireLibre, media: '/arpgifb.gif' },
      { ...orvisSinRastro, media: '/m416d.gif' },
      { titulo: 'Alcance de hasta 25 metros', texto: 'Potencia para jugar en espacios abiertos.', media: '/arpgifa.gif' }
    ],
    incluye: ['Lanzadora de hidrogel M16', 'Mira telescópica', 'Silenciador con luz y humo', 'Proveedor extendido', '10.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB']
  },
  409: {
    nombre: 'Juego Basta + UNO Flip de regalo',
    subtitulo: 'Basta electrónico y UNO Flip para jugar en familia.',
    destacados: [
      { titulo: 'Un combo para jugar en familia', texto: 'Basta electrónico y UNO Flip en el mismo pedido.', media: '/bastagif1.webp' },
      { titulo: 'Elige categoría y piensa rápido', texto: 'Presiona el botón y responde antes de que se acabe el tiempo.', media: '/bastagif2.gif' },
      { titulo: 'UNO Flip tiene un lado oscuro', texto: 'El UNO de siempre, pero más rápido y más salvaje.', media: '/unogif1.gif' }
    ],
    incluye: ['Juego Basta electrónico', 'Más de 144 categorías y 36 tarjetas', 'Cartas UNO Flip (dos lados en un solo mazo)']
  }
}

export default productoscontenido
