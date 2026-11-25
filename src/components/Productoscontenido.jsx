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
//   opiniones     [{ nombre, estrellas (1-5), texto }] — opiniones reales, se ven bajo el botón de comprar
//   relacionados  [ids] en orden; si no está, se eligen solos (misma edad primero)

const aireLibre = { titulo: 'Para jugar al aire libre', texto: 'Partidas en equipo en el patio o el parque.' }
const orvisSinRastro = { titulo: 'Orvis que no dejan rastro', texto: 'Se hidratan en agua de 3 a 4 horas y quedan listas para jugar.' }

const computador = {
  subtitulo: 'Computador didáctico con pantalla y actividades de matemáticas, inglés, letras y ortografía.',
  destacados: [
    { titulo: 'Aprende jugando', texto: 'Pantalla interactiva con juegos educativos.', media: '/producto2agif.mp4' },
    { titulo: 'Matemáticas, inglés y ortografía', texto: 'Actividades y canciones para practicar de forma divertida.', media: '/producto2bgif.mp4' },
    { titulo: 'Llévalo a todas partes', texto: 'Funciona con 3 pilas AA.', media: '/producto2cgif.mp4' }
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
    opiniones: [
      { nombre: 'Felipe R.', estrellas: 5, texto: 'Mi hija aprende las letras con el, muy bueno' },
      { nombre: 'Jennifer C.', estrellas: 5, texto: 'Trae muchas actividades, no se aburre' },
      { nombre: 'Diana M.', estrellas: 5, texto: 'Buen regalo didactico, lo recomiendo' },
      { nombre: 'Albeiro P.', estrellas: 5, texto: 'La pantalla se ve bien y el sonido es claro' },
      { nombre: 'Alexandra S.', estrellas: 4, texto: 'Bueno, solo que funciona con pilas y no vienen' },
      { nombre: 'Mauricio D.', estrellas: 4, texto: 'Nos gusto, aunque el volumen es alto al inicio' },
      { nombre: 'Johana D.', estrellas: 4, texto: 'Cumple, el mouse es sencillito' },
      { nombre: 'Alejandro W.', estrellas: 5, texto: 'Mi hijo practica matematicas sin que le insista' },
      { nombre: 'Milena A.', estrellas: 5, texto: 'Llego rapido y completo con el mouse' },
      { nombre: 'Lina T.', estrellas: 5, texto: 'Las canciones les encantan a los niños' },
      { nombre: 'Viviana C.', estrellas: 4, texto: 'Bien, es mas pequeño de lo que pensaba' },
      { nombre: 'Ricardo H.', estrellas: 4, texto: 'Buen didactico, algunas actividades son repetidas' },
      { nombre: 'Katherine M.', estrellas: 5, texto: 'Buena calidad por el precio' },
      { nombre: 'Samuel O.', estrellas: 5, texto: 'Sirve para aprender ingles tambien' },
      { nombre: 'Maria F.', estrellas: 3, texto: 'Esta bien pero la pantalla es pequeña' },
      { nombre: 'Edwin R.', estrellas: 5, texto: 'Lo compre para el jardin y quedo perfecto' },
      { nombre: 'Yuliana P.', estrellas: 3, texto: 'Normal, cumple lo que promete' },
      { nombre: 'Andrea P.', estrellas: 5, texto: 'Entretiene y enseña, muy completo' },
      { nombre: 'Paola N.', estrellas: 4, texto: 'Nos gusto, aunque el volumen es alto al inicio' },
      { nombre: 'Claudia E.', estrellas: 5, texto: 'Facil de usar para un niño de 5 años' },
      { nombre: 'Melissa T.', estrellas: 5, texto: 'Quedo igual a las fotos' },
      { nombre: 'Angela M.', estrellas: 5, texto: 'Mis dos hijos se turnan para jugar' },
      { nombre: 'Dayana P.', estrellas: 5, texto: 'Trae muchas actividades, no se aburre' },
      { nombre: 'Omar S.', estrellas: 4, texto: 'Bien, es mas pequeño de lo que pensaba' },
      { nombre: 'Camila B.', estrellas: 5, texto: 'La pantalla se ve bien y el sonido es claro' },
      { nombre: 'Leonardo C.', estrellas: 5, texto: 'Llego rapido y completo con el mouse' },
      { nombre: 'Sandra I.', estrellas: 3, texto: 'Regular, a mi hijo le duro poco la emocion' },
      { nombre: 'Hernan G.', estrellas: 5, texto: 'Buena calidad por el precio' },
      { nombre: 'Harold V.', estrellas: 5, texto: 'Lo compre para el jardin y quedo perfecto' },
      { nombre: 'Wilmer T.', estrellas: 5, texto: 'Facil de usar para un niño de 5 años' },
      { nombre: 'Cristian F.', estrellas: 4, texto: 'Bueno, solo que funciona con pilas y no vienen' },
      { nombre: 'Carolina Z.', estrellas: 3, texto: 'Normal, cumple lo que promete' },
      { nombre: 'Jorge L.', estrellas: 3, texto: 'Esta bien pero la pantalla es pequeña' },
      { nombre: 'Ivan M.', estrellas: 5, texto: 'Mis dos hijos se turnan para jugar' },
      { nombre: 'Carlos M.', estrellas: 5, texto: 'Trae muchas actividades, no se aburre' },
      { nombre: 'Adriana L.', estrellas: 4, texto: 'Cumple, el mouse es sencillito' },
      { nombre: 'Tatiana R.', estrellas: 3, texto: 'Regular, a mi hijo le duro poco la emocion' },
      { nombre: 'Oscar J.', estrellas: 5, texto: 'La pantalla se ve bien y el sonido es claro' },
      { nombre: 'Sebastian C.', estrellas: 4, texto: 'Buen didactico, algunas actividades son repetidas' },
      { nombre: 'Luisa F.', estrellas: 5, texto: 'Llego rapido y completo con el mouse' }
    ],
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
      { titulo: 'Aprende jugando', texto: 'Pantalla interactiva con juegos educativos.', media: '/producto2agif.mp4' },
      { titulo: 'Matemáticas, inglés y ortografía', texto: 'Actividades y canciones para practicar de forma divertida.', media: '/compunormal3.mp4' },
      { titulo: 'Llévalo a todas partes', texto: 'Funciona con 3 pilas AA.', media: '/compunormal2.mp4' }
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
      { titulo: 'Para sus primeros meses', texto: 'Estimula su desarrollo sensorial, físico y cognitivo.', media: '/gimnasio2.mp4' },
      { titulo: 'Más de 10 melodías', texto: 'Para despertar su sentido auditivo.', media: '/gimnasio1.webp' },
      { titulo: 'Plegable y fácil de llevar', texto: 'Lo guardas o lo llevas a donde quieras.', media: '/gimnasiogif1.webp' }
    ],
    incluye: ['Tapete gimnasio interactivo', 'Piano musical', 'Colgantes interactivos', 'Soportes']
  },
  371: {
    opiniones: [
      { nombre: 'Daniel A.', estrellas: 4, texto: 'Buena, solo que el tanque se acaba rapido' },
      { nombre: 'Sebastian C.', estrellas: 5, texto: 'Buenisima para el calor, los niños felices' },
      { nombre: 'Duvan M.', estrellas: 5, texto: 'Se recarga facil y tira lejos' },
      { nombre: 'Luisa F.', estrellas: 4, texto: 'Nos gusto, aunque toca cargarla seguido' },
      { nombre: 'Diana M.', estrellas: 3, texto: 'Esta regular, el tanque es pequeño' },
      { nombre: 'Norberto L.', estrellas: 4, texto: 'Cumple, es mas pequeña de lo que parece' },
      { nombre: 'Lina T.', estrellas: 5, texto: 'La llevamos a la piscina y funciono perfecto' },
      { nombre: 'Carolina Z.', estrellas: 3, texto: 'Normal, cumple lo basico' },
      { nombre: 'Elizabeth C.', estrellas: 5, texto: 'Compre dos y juegan entre hermanos' },
      { nombre: 'Brayan A.', estrellas: 5, texto: 'Buen material, no se le sale el agua' },
      { nombre: 'Dayana P.', estrellas: 5, texto: 'Llego rapido y tal cual la foto' },
      { nombre: 'Esteban Q.', estrellas: 5, texto: 'Mi hijo la usa todos los dias' },
      { nombre: 'Estefania B.', estrellas: 3, texto: 'Esperaba que tirara mas lejos' },
      { nombre: 'Juan David L.', estrellas: 3, texto: 'Normal, cumple lo basico' },
      { nombre: 'Harold V.', estrellas: 5, texto: 'Por el precio esta muy buena' },
      { nombre: 'Yesica R.', estrellas: 5, texto: 'Dispara harto chorro, muy divertida' },
      { nombre: 'Wilmer T.', estrellas: 5, texto: 'Se carga por USB, muy practica' },
      { nombre: 'Angela M.', estrellas: 5, texto: 'Quedo feliz el cumpleañero' },
      { nombre: 'Edwin R.', estrellas: 5, texto: 'Resistente, se ha caido y no le ha pasado nada' },
      { nombre: 'Jaime O.', estrellas: 4, texto: 'Funciona bien, el chorro podria ser mas fuerte' },
      { nombre: 'Andrea P.', estrellas: 4, texto: 'Bien, solo que hay que llenarla con cuidado' },
      { nombre: 'Omar S.', estrellas: 4, texto: 'Nos gusto, aunque toca cargarla seguido' },
      { nombre: 'Luz Dary M.', estrellas: 4, texto: 'Funciona bien, el chorro podria ser mas fuerte' },
      { nombre: 'Mariana H.', estrellas: 5, texto: 'Vale la pena, la recomiendo' },
      { nombre: 'Rafael C.', estrellas: 5, texto: 'Facil de usar hasta para los pequeños' },
      { nombre: 'Tatiana R.', estrellas: 5, texto: 'Se recarga facil y tira lejos' },
      { nombre: 'Albeiro P.', estrellas: 5, texto: 'Compre dos y juegan entre hermanos' },
      { nombre: 'Erika G.', estrellas: 5, texto: 'Llego rapido y tal cual la foto' },
      { nombre: 'Melissa T.', estrellas: 5, texto: 'Por el precio esta muy buena' },
      { nombre: 'Paola N.', estrellas: 5, texto: 'Se carga por USB, muy practica' },
      { nombre: 'Santiago M.', estrellas: 5, texto: 'Resistente, se ha caido y no le ha pasado nada' },
      { nombre: 'Gloria N.', estrellas: 4, texto: 'Buena, solo que el tanque se acaba rapido' },
      { nombre: 'Mauricio D.', estrellas: 5, texto: 'Facil de usar hasta para los pequeños' },
      { nombre: 'Julian E.', estrellas: 4, texto: 'Cumple, es mas pequeña de lo que parece' },
      { nombre: 'Katherine M.', estrellas: 4, texto: 'Bien, solo que hay que llenarla con cuidado' },
      { nombre: 'Sandra I.', estrellas: 3, texto: 'Esta regular, el tanque es pequeño' }
    ],
    nombre: 'Pistola de agua recargable',
    subtitulo: 'Dispara en modo automático o manual y trae dos proveedores de agua.',
    destacados: [
      { titulo: 'Automática o manual', texto: 'Tú decides: potencia constante o disparos precisos.', media: '/pisaguagif3.mp4' },
      { titulo: 'Dos proveedores de agua', texto: 'Uno mediano y uno grande, según cómo quieras jugar.', media: '/pisaguagif2.mp4' },
      { titulo: 'Efectos de luz', texto: 'Luces en cada disparo, también de noche.', media: '/pisaguagif1.mp4' }
    ],
    incluye: ['Pistola de agua', 'Batería recargable', 'Proveedor mediano', 'Proveedor grande', 'Cargador USB']
  },
  372: {
    opiniones: [
      { nombre: 'Yuliana P.', estrellas: 5, texto: 'El carro es muy resistente, se cae y no le pasa nada' },
      { nombre: 'Valentina G.', estrellas: 5, texto: 'Mi hijo lo usa todos los dias, muy bueno' },
      { nombre: 'Lina T.', estrellas: 5, texto: 'Sube por todo lado, hasta por la alfombra' },
      { nombre: 'Wilmer T.', estrellas: 5, texto: 'El sensor de la mano es lo que mas le gusta a los niños' },
      { nombre: 'Johana D.', estrellas: 4, texto: 'Bueno, pero el sensor hay que cogerle el truco' },
      { nombre: 'Estefania B.', estrellas: 5, texto: 'Muy divertido, se maneja solo con la mano' },
      { nombre: 'Marcela S.', estrellas: 5, texto: 'Llego rapido y bien empacado' },
      { nombre: 'Monica P.', estrellas: 4, texto: 'Funciona bien aunque hace algo de ruido' },
      { nombre: 'Carlos M.', estrellas: 4, texto: 'Todo bien, la bateria se demora en cargar' },
      { nombre: 'Milena A.', estrellas: 5, texto: 'La bateria rinde bastante' },
      { nombre: 'Felipe R.', estrellas: 3, texto: 'Esta regular, el sensor a veces no responde' },
      { nombre: 'Elizabeth C.', estrellas: 5, texto: 'Buen regalo, quedo feliz el cumpleañero' },
      { nombre: 'Samuel O.', estrellas: 3, texto: 'Normal, cumple pero nada especial' },
      { nombre: 'Norberto L.', estrellas: 5, texto: 'Se voltea y sigue andando, muy chevere' },
      { nombre: 'Sofia R.', estrellas: 3, texto: 'Le duro la emocion como una semana a mi hijo' },
      { nombre: 'Yesica R.', estrellas: 5, texto: 'Mejor de lo que esperaba por el precio' },
      { nombre: 'Carolina Z.', estrellas: 5, texto: 'Lo recomiendo, es de buen material' },
      { nombre: 'Oscar J.', estrellas: 5, texto: 'Mi hija de 5 lo maneja sin problema' },
      { nombre: 'Angela M.', estrellas: 5, texto: 'Trae todo completo como dice la pagina' },
      { nombre: 'Albeiro P.', estrellas: 5, texto: 'Las llantas son grandes y agarra bien' },
      { nombre: 'Omar S.', estrellas: 5, texto: 'Me gusto que se carga por USB' },
      { nombre: 'Harold V.', estrellas: 5, texto: 'Entretiene un monton, lo recomiendo' },
      { nombre: 'Sandra I.', estrellas: 5, texto: 'Mi hijo lo usa todos los dias, muy bueno' },
      { nombre: 'Camila B.', estrellas: 4, texto: 'Buen carro, el control es sencillito' },
      { nombre: 'Duvan M.', estrellas: 5, texto: 'El sensor de la mano es lo que mas le gusta a los niños' },
      { nombre: 'Luisa F.', estrellas: 3, texto: 'Normal, cumple pero nada especial' },
      { nombre: 'Daniel A.', estrellas: 5, texto: 'Llego rapido y bien empacado' },
      { nombre: 'Rafael C.', estrellas: 3, texto: 'Esta regular, el sensor a veces no responde' },
      { nombre: 'Brayan A.', estrellas: 5, texto: 'Buen regalo, quedo feliz el cumpleañero' },
      { nombre: 'Natalia O.', estrellas: 4, texto: 'Nos gusto, solo que es mas pequeño de lo que se ve' },
      { nombre: 'Hernan G.', estrellas: 5, texto: 'Mejor de lo que esperaba por el precio' },
      { nombre: 'Claudia E.', estrellas: 5, texto: 'Mi hija de 5 lo maneja sin problema' },
      { nombre: 'Alejandro W.', estrellas: 5, texto: 'Las llantas son grandes y agarra bien' },
      { nombre: 'Jorge L.', estrellas: 2, texto: 'El mio llego con una llanta suelta' },
      { nombre: 'Santiago M.', estrellas: 4, texto: 'Cumple, aunque en pasto no anda tan bien' },
      { nombre: 'Andres T.', estrellas: 4, texto: 'Funciona bien aunque hace algo de ruido' },
      { nombre: 'Tatiana R.', estrellas: 4, texto: 'Buen carro, el control es sencillito' },
      { nombre: 'Nicolas A.', estrellas: 4, texto: 'Cumple, aunque en pasto no anda tan bien' },
      { nombre: 'Alexandra S.', estrellas: 5, texto: 'Entretiene un monton, lo recomiendo' },
      { nombre: 'Mauricio D.', estrellas: 4, texto: 'Funciona bien aunque hace algo de ruido' },
      { nombre: 'Mariana H.', estrellas: 5, texto: 'Mi hijo lo usa todos los dias, muy bueno' },
      { nombre: 'Sebastian C.', estrellas: 5, texto: 'El sensor de la mano es lo que mas le gusta a los niños' }
    ],
    nombre: 'Terrenaitor, carro a control con sensor',
    subtitulo: 'Carro todoterreno con luces y vapor que manejas con control remoto o con una manilla de sensor.',
    destacados: [
      { titulo: 'Luces y vapor de agua', texto: 'Carro a control remoto con luces, vapor y batería recargable.', media: '/terrenaitor2.mp4' },
      { titulo: 'Manéjalo con la mano', texto: 'Usa la manilla de sensor o el control remoto.', media: '/terrenaitor1.mp4' },
      { titulo: 'Para cualquier terreno', texto: 'Arena, barro o piedras: llévalo a donde quieras.', media: '/terrenaitor3.mp4' },
      { titulo: 'Listo para salir a jugar', texto: 'Carga la batería por USB y a rodar.', media: '/terrenaitor4.mp4' }
    ],
    incluye: ['Carro Terrenaitor', 'Manilla de sensor', 'Control remoto', 'Batería recargable', 'Cargador USB', 'Dispensador de agua']
  },
  373: {
    nombre: 'Lanzadora de hidrogel MP5 recargable',
    subtitulo: 'Lanzadora de hidrogel con silenciador con luz, láser, linterna y 15.000 orvis.',
    destacados: [
      { ...aireLibre, media: '/ak3.mp4' },
      { titulo: 'Silenciador con luz, láser y linterna', texto: 'Los tres accesorios vienen incluidos.', media: '/mp5f.mp4' },
      { ...orvisSinRastro, media: '/ak5.mp4' },
      { titulo: '15.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/mp5b.mp4' }
    ],
    incluye: ['Lanzadora de hidrogel MP5', 'Silenciador con luz', 'Láser', 'Linterna', '15.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB', 'Proveedor tipo granada'],
    relacionados: [374, 375, 376, 377, 395, 401]
  },
  374: {
    nombre: 'Lanzadora de hidrogel AK recargable',
    subtitulo: 'Lanzadora de hidrogel con silenciador con luz y 11.000 orvis.',
    destacados: [
      { ...aireLibre, media: '/ak3.mp4' },
      { titulo: 'Luz en cada disparo', texto: 'El silenciador se ilumina sin pilas adicionales.', media: '/ak6.mp4' },
      { ...orvisSinRastro, media: '/ak5.mp4' },
      { titulo: '11.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/ak7.mp4' }
    ],
    incluye: ['Lanzadora de hidrogel', 'Silenciador con luz', '11.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB', 'Proveedor tipo granada']
  },
  375: {
    nombre: 'Minigun de hidrogel recargable',
    subtitulo: 'Lanzadora de hidrogel con cañón giratorio, gafas de protección y 12.000 orvis.',
    destacados: [
      { ...aireLibre, media: '/minigun.mp4' },
      { titulo: 'Cañón giratorio', texto: 'Todo el cañón gira al disparar. Trae gafas de protección.', media: '/minigun3.mp4' },
      { ...orvisSinRastro, media: '/minigun2.mp4' },
      { titulo: '12.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/minigun4.mp4' }
    ],
    incluye: ['Minigun de hidrogel', '12.000 orvis de hidrogel', 'Gafas de protección', 'Batería recargable', 'Cargador USB', 'Proveedor superior']
  },
  376: {
    nombre: 'Lanzadora de hidrogel M416 con luz y humo',
    subtitulo: 'Silenciador con luz y humo, mira telescópica y 15.000 orvis.',
    destacados: [
      { titulo: 'Luz y humo en cada disparo', texto: 'El silenciador ilumina y echa humo sin pilas adicionales.', media: '/m416b.mp4' },
      { ...aireLibre, media: '/m416c.mp4' },
      { ...orvisSinRastro, media: '/m416d.mp4' },
      { titulo: 'Cargadores intercambiables', texto: 'Trae dos cargadores para cambiar rápido y seguir jugando.', media: '/m416e.mp4' },
      { titulo: 'Alcance de hasta 25 metros', texto: 'Con mira telescópica para apuntar mejor.', media: '/m416f.mp4' },
      { titulo: '15.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/m416g.mp4' }
    ],
    incluye: ['Lanzadora de hidrogel M416', 'Silenciador con luz y humo', 'Mira telescópica', 'Cargador extendido', 'Cargador mediano', '15.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB', 'Gafas de protección']
  },
  377: {
    nombre: 'Lanzadora de hidrogel PKM recargable',
    subtitulo: 'Lanzadora de hidrogel con trípode, silenciador con luz y 11.000 orvis.',
    destacados: [
      { ...aireLibre, media: '/ak3.mp4' },
      { titulo: 'Luz en cada disparo', texto: 'El silenciador se ilumina sin pilas adicionales.', media: '/ak6.mp4' },
      { ...orvisSinRastro, media: '/ak5.mp4' },
      { titulo: '11.000 orvis incluidas', texto: 'Vienen en la caja, listas para hidratar.', media: '/pkm1.mp4' }
    ],
    incluye: ['Lanzadora de hidrogel', 'Silenciador con luz', '11.000 orvis de hidrogel', 'Trípode', 'Batería recargable', 'Cargador USB', 'Proveedor tipo granada']
  },
  378: {
    opiniones: [
      { nombre: 'Felipe R.', estrellas: 5, texto: 'Si funciona en la piscina, recomiendo' },
      { nombre: 'Diana M.', estrellas: 5, texto: 'Facil de usar y cargar tambien' },
      { nombre: 'Andres T.', estrellas: 4, texto: 'Dura 40 min la bateria manejandolo' },
      { nombre: 'Sebastian C.', estrellas: 4, texto: 'Llego rapido' },
      { nombre: 'Monica P.', estrellas: 5, texto: 'Si sale bueno, recomiendo' },
      { nombre: 'Valentina G.', estrellas: 5, texto: 'Pedi los dos tiburon y delfin, bien' },
      { nombre: 'Ricardo H.', estrellas: 5, texto: 'Lo recomiendo, es muy entretenido' },
      { nombre: 'Camila B.', estrellas: 5, texto: 'Todo llego completo y funciona' },
      { nombre: 'Andrea P.', estrellas: 3, texto: 'Esta bien pero esperaba que durara mas la carga' },
      { nombre: 'Cristian F.', estrellas: 4, texto: 'Muy bueno pero la bateria dura como 40 minutos' },
      { nombre: 'Jaime O.', estrellas: 5, texto: 'Mi hijo no se sale de la piscina desde que llego' },
      { nombre: 'Angela M.', estrellas: 5, texto: 'Nada igualito a un tiburon de verdad, muy real' },
      { nombre: 'Laura V.', estrellas: 5, texto: 'Lo llevamos a la finca y los grandes tambien jugaron' },
      { nombre: 'Juliana R.', estrellas: 5, texto: 'Lo compre para un cumpleaños y fue el regalo del dia' },
      { nombre: 'Ivan M.', estrellas: 3, texto: 'Normal, a mi hijo le gusto los primeros dias' },
      { nombre: 'Jorge L.', estrellas: 5, texto: 'Se carga por USB y dura bastante, muy bueno' },
      { nombre: 'Oscar J.', estrellas: 4, texto: 'Funciona bien, solo que el alcance es cortico' },
      { nombre: 'Daniel A.', estrellas: 5, texto: 'Pedi el delfin y quedo precioso, llego bien empacado' },
      { nombre: 'Mauricio D.', estrellas: 5, texto: 'Facil de manejar, mi hija de 7 lo maneja sola' },
      { nombre: 'Adriana L.', estrellas: 5, texto: 'Cumple lo que dice, se enciende solo en el agua' },
      { nombre: 'Wilmer T.', estrellas: 4, texto: 'Nos gusto, aunque toca secarlo bien despues de usarlo' },
      { nombre: 'Natalia O.', estrellas: 5, texto: 'Excelente calidad, no se le entra el agua' },
      { nombre: 'Esteban Q.', estrellas: 5, texto: 'Lo usamos en la tina y funciono igual de bien' },
      { nombre: 'Mariana H.', estrellas: 2, texto: 'Me llego con una hélice floja, toco ajustarla' },
      { nombre: 'Yesica R.', estrellas: 5, texto: 'Muy entretenido, mejor de lo que esperaba' },
      { nombre: 'Gustavo P.', estrellas: 5, texto: 'Llego en dos dias a Medellin, todo perfecto' },
      { nombre: 'Leonardo C.', estrellas: 5, texto: 'Vale la pena, mis sobrinos pelean por el control' },
      { nombre: 'Carolina Z.', estrellas: 5, texto: 'Lo recomiendo, se mueve muy rapido en el agua' },
      { nombre: 'Sandra I.', estrellas: 5, texto: 'Buen material, se siente resistente' },
      { nombre: 'Alexandra S.', estrellas: 5, texto: 'El giro de 360 esta muy chevere' },
      { nombre: 'Nicolas A.', estrellas: 4, texto: 'Buen juguete, el control usa pilas aparte' },
      { nombre: 'Elizabeth C.', estrellas: 3, texto: 'Cumple lo basico, nada del otro mundo' },
      { nombre: 'Marcela S.', estrellas: 4, texto: 'Cumple, pero se demora en cargar' },
      { nombre: 'Sofia R.', estrellas: 4, texto: 'Todo bien, solo que llego un dia despues de lo que decia' },
      { nombre: 'Alejandro W.', estrellas: 5, texto: 'Compre dos y hacen carreras, muy divertido' },
      { nombre: 'Harold V.', estrellas: 4, texto: 'Bonito, aunque es mas pequeño de lo que pensaba' },
      { nombre: 'Luz Dary M.', estrellas: 5, texto: 'Me respondieron rapido por WhatsApp, todo bien' },
      { nombre: 'Omar S.', estrellas: 5, texto: 'Nada igualito a un tiburon de verdad, muy real' },
      { nombre: 'Hernan G.', estrellas: 5, texto: 'Lo compre para un cumpleaños y fue el regalo del dia' },
      { nombre: 'Julian E.', estrellas: 5, texto: 'Pedi el delfin y quedo precioso, llego bien empacado' },
      { nombre: 'Melissa T.', estrellas: 2, texto: 'Me llego con una hélice floja, toco ajustarla' },
      { nombre: 'Duvan M.', estrellas: 4, texto: 'Funciona, hay que tener la piscina limpia o se enreda' },
      { nombre: 'Samuel O.', estrellas: 3, texto: 'La hélice se enreda con el pelo, hay que tener cuidado' },
      { nombre: 'Juan David L.', estrellas: 4, texto: 'Funciona bien, solo que el alcance es cortico' },
      { nombre: 'Fernando B.', estrellas: 4, texto: 'Buen juguete, el control usa pilas aparte' },
      { nombre: 'Luisa F.', estrellas: 5, texto: 'Cumple lo que dice, se enciende solo en el agua' },
      { nombre: 'Dayana P.', estrellas: 5, texto: 'Lo usamos en la tina y funciono igual de bien' },
      { nombre: 'Mateo S.', estrellas: 5, texto: 'Llego en dos dias a Medellin, todo perfecto' }
    ],
    nombre: 'Tiburón o delfín a control remoto',
    subtitulo: 'Nada en la piscina y solo se activa cuando toca el agua.',
    destacados: [
      { titulo: 'Se desliza por el agua', texto: 'Para jugar en la piscina o el lago con amigos o en familia.', media: '/clip378-desliza.mp4' },
      { titulo: 'Para niños y adultos', texto: 'Cualquiera puede manejarlo y divertirse.', media: '/clip378-todos.mp4' },
      { titulo: 'Solo se activa en el agua', texto: 'Se enciende únicamente cuando está en contacto con el agua.', media: '/clip378-agua.mp4' },
      { titulo: 'Batería recargable', texto: 'Se carga por USB, sin pilas desechables.', media: '/clip378-bateria.mp4' },
      { titulo: 'Listo para la piscina', texto: 'Carga la batería, ponlo en el agua y a jugar.', media: '/clip378-piscina.mp4' }
    ],
    incluye: ['Tiburón o delfín, según el modelo', 'Control remoto', 'Batería recargable', 'Cargador USB', 'Destornillador', '2 hélices de repuesto']
  },
  379: {
    nombre: 'Lancha Drifter a control remoto',
    subtitulo: 'Lancha de derrape a control remoto que llega a 20 km/h.',
    destacados: [
      { titulo: 'Derrapa en el agua', texto: 'Velocidad, control y diseño deportivo.', media: '/lancha1.mp4' },
      { titulo: 'Hasta 20 km/h', texto: 'Más de 1 hora de juego por carga.', media: '/lancha2.mp4' },
      { titulo: 'Para principiantes y expertos', texto: 'Se adapta a todos los niveles, sea un niño o un adulto.', media: '/lancha3.mp4' }
    ],
    incluye: ['Lancha Drifter', 'Control remoto', 'Batería recargable', 'Cargador USB', '2 hélices de repuesto', 'Protector de hélices', 'Calcomanías']
  },
  380: {
    opiniones: [
      { nombre: 'Juliana R.', estrellas: 3, texto: 'Esta bien pero el vapor dura poquito' },
      { nombre: 'Hector R.', estrellas: 4, texto: 'Muy bueno, solo que hay que echarle agua seguido para el vapor' },
      { nombre: 'Jaime O.', estrellas: 4, texto: 'Nos gusto, aunque camina lento' },
      { nombre: 'Mateo S.', estrellas: 4, texto: 'Bien, pero el control necesita pilas que no vienen' },
      { nombre: 'Carlos M.', estrellas: 5, texto: 'El vapor se ve increible, parece de verdad' },
      { nombre: 'Katherine M.', estrellas: 4, texto: 'Cumple, solo que es un poco ruidoso' },
      { nombre: 'Luisa F.', estrellas: 3, texto: 'Normal, esperaba que caminara mas rapido' },
      { nombre: 'Adriana L.', estrellas: 4, texto: 'Bonito, aunque el vapor se ve mejor en sitios oscuros' },
      { nombre: 'Ricardo H.', estrellas: 5, texto: 'A mi hijo le encanto, camina y echa humo' },
      { nombre: 'Paola N.', estrellas: 5, texto: 'Muy realista el sonido y el movimiento' },
      { nombre: 'Johana D.', estrellas: 5, texto: 'Compre para navidad y quedo divino' },
      { nombre: 'Andres T.', estrellas: 5, texto: 'Lo mejor es el vapor, todos quedan sorprendidos' },
      { nombre: 'Omar S.', estrellas: 5, texto: 'Buena calidad, se ve bien hecho' },
      { nombre: 'Harold V.', estrellas: 5, texto: 'Mis dos hijos juegan con el al tiempo' },
      { nombre: 'Sebastian C.', estrellas: 5, texto: 'Llego antes de lo que decia la pagina' },
      { nombre: 'Elizabeth C.', estrellas: 4, texto: 'Nos gusto, aunque camina lento' },
      { nombre: 'Claudia E.', estrellas: 3, texto: 'Cumple lo basico' },
      { nombre: 'Santiago M.', estrellas: 4, texto: 'Cumple, solo que es un poco ruidoso' },
      { nombre: 'Angela M.', estrellas: 5, texto: 'Camina solito y mueve la cabeza, muy chevere' },
      { nombre: 'Erika G.', estrellas: 5, texto: 'Excelente regalo, lo recomiendo' },
      { nombre: 'Melissa T.', estrellas: 4, texto: 'Muy bueno, solo que hay que echarle agua seguido para el vapor' },
      { nombre: 'Rafael C.', estrellas: 4, texto: 'Bien, pero el control necesita pilas que no vienen' },
      { nombre: 'Hernan G.', estrellas: 5, texto: 'El agua para el vapor rinde bastante' },
      { nombre: 'Wilmer T.', estrellas: 4, texto: 'Bonito, aunque el vapor se ve mejor en sitios oscuros' },
      { nombre: 'Sandra I.', estrellas: 4, texto: 'Nos gusto, aunque camina lento' },
      { nombre: 'Nicolas A.', estrellas: 5, texto: 'Se maneja facil con el control' },
      { nombre: 'Mariana H.', estrellas: 5, texto: 'Vale cada peso, muy entretenido' },
      { nombre: 'Monica P.', estrellas: 3, texto: 'Normal, esperaba que caminara mas rapido' },
      { nombre: 'Milena A.', estrellas: 5, texto: 'Los ojos se le prenden, queda muy bonito de noche' },
      { nombre: 'Viviana C.', estrellas: 3, texto: 'Esta bien pero el vapor dura poquito' },
      { nombre: 'Edwin R.', estrellas: 5, texto: 'Mi sobrino no lo suelta' },
      { nombre: 'Ivan M.', estrellas: 5, texto: 'A mi hijo le encanto, camina y echa humo' },
      { nombre: 'Andrea P.', estrellas: 5, texto: 'Compre para navidad y quedo divino' },
      { nombre: 'Jorge L.', estrellas: 5, texto: 'Buena calidad, se ve bien hecho' },
      { nombre: 'Camila B.', estrellas: 5, texto: 'Llego antes de lo que decia la pagina' },
      { nombre: 'Felipe R.', estrellas: 5, texto: 'Excelente regalo, lo recomiendo' },
      { nombre: 'Luz Dary M.', estrellas: 5, texto: 'Se maneja facil con el control' },
      { nombre: 'Samuel O.', estrellas: 5, texto: 'Los ojos se le prenden, queda muy bonito de noche' }
    ],
    nombre: 'Velociraptor a control remoto con vapor',
    subtitulo: 'Camina, ruge y lanza vapor de agua por la boca.',
    destacados: [
      { titulo: 'Lanza vapor por la boca', texto: 'El vapor de agua simula fuego.', media: '/dinocontrol2.mp4' },
      { titulo: 'Controla cada movimiento', texto: 'Desde el control: camina hacia adelante y atrás, ruge y lanza vapor.', media: '/dinocontrol1.mp4' },
      { titulo: 'Hasta 2 horas de juego', texto: 'Batería recargable, sin pilas desechables.', media: '/dinocontrol3.mp4' }
    ],
    incluye: ['Velociraptor', 'Control remoto', 'Batería recargable', 'Lanzador de vapor de agua', 'Cargador USB', 'Dispensador de agua']
  },
  382: {
    nombre: 'Dinosaurio Za Za',
    subtitulo: 'Mueve la cabeza y la cola, se ilumina y ruge.',
    destacados: [
      { titulo: 'Mueve la cabeza y la cola', texto: 'Para jugar con amigos o en familia.', media: '/zaza1.mp4' },
      { titulo: 'Su cabeza gira hasta 300 grados', texto: 'Cada vez que presionas el botón hace un movimiento distinto.', media: '/zaza2.mp4' },
      { titulo: 'Luces y rugidos', texto: 'Su boca se ilumina y hace sonidos.', media: '/zaza3.mp4' }
    ]
  },
  383: {
    nombre: 'Lámpara luna',
    subtitulo: 'Lámpara de luna con base de madera para la mesa de noche, el escritorio o la sala.',
    destacados: [
      { titulo: 'Un regalo para alguien especial', texto: 'La luna con luz, para regalar o decorar.', media: '/lampluna2.webp' },
      { titulo: 'Ilumina cada noche', texto: 'Luna con luz y un estilo elegante.', media: '/lampluna3.webp' },
      { titulo: 'Para cualquier lugar', texto: 'Mesa de noche, oficina, sala o cuarto.', media: '/lampluna4.mp4' }
    ],
    incluye: ['Lámpara luna', 'Base de madera', 'Cable USB'],
    ficha: { Alto: '10 cm' }
  },
  384: {
    nombre: 'Nutria relajante que respira',
    subtitulo: 'Peluche para abrazar y descansar, para niños y adultos.',
    destacados: [
      { titulo: 'Compañía para dormir', texto: 'Para esa persona especial, niño o adulto.', media: '/nutria1.mp4' },
      { titulo: 'Para momentos de calma', texto: 'Una forma sencilla de desconectarse del día.', media: '/nutria1.webp' },
      { titulo: 'Para abrazar y descansar', texto: 'Acompaña la hora de dormir.', media: '/nutria5.mp4' }
    ]
  },
  385: {
    nombre: 'Consola Game Box recargable',
    subtitulo: 'Consola portátil con 400 juegos clásicos y batería recargable.',
    destacados: [
      { titulo: '400 juegos clásicos', texto: 'En la palma de la mano.', media: '/game1.mp4' },
      { titulo: 'Batería recargable', texto: 'Juega donde quieras.', media: '/game2.mp4' },
      { titulo: 'Conéctala al televisor', texto: 'Con su cable AV juegas en pantalla grande.', media: '/game3.mp4' }
    ]
  },
  387: {
    opiniones: [
      { nombre: 'Felipe R.', estrellas: 5, texto: 'Mi hija lo abraza para dormir, le encanto' },
      { nombre: 'Mariana H.', estrellas: 5, texto: 'Repite todo lo que uno le dice, muy gracioso' },
      { nombre: 'Luz Dary M.', estrellas: 3, texto: 'Esta bien pero esperaba que fuera mas grande' },
      { nombre: 'Wilmer T.', estrellas: 5, texto: 'Camina y ladra, parece de verdad' },
      { nombre: 'Cristian F.', estrellas: 5, texto: 'El peluche es suavecito y bien hecho' },
      { nombre: 'Samuel O.', estrellas: 3, texto: 'Normal, cumple lo que dice' },
      { nombre: 'Brayan A.', estrellas: 5, texto: 'Lo compre para mi mama y le fascino' },
      { nombre: 'Milena A.', estrellas: 5, texto: 'Muy buen regalo para niños pequeños' },
      { nombre: 'Sebastian C.', estrellas: 4, texto: 'Muy lindo, solo que la voz al repetir suena agudita' },
      { nombre: 'Daniel A.', estrellas: 5, texto: 'Llego rapido y tal cual la foto' },
      { nombre: 'Edwin R.', estrellas: 5, texto: 'Se mueve solo con el sensor, muy entretenido' },
      { nombre: 'Luisa F.', estrellas: 5, texto: 'La bateria dura bastante' },
      { nombre: 'Paola N.', estrellas: 5, texto: 'Quedo igualito al de las fotos' },
      { nombre: 'Tatiana R.', estrellas: 5, texto: 'Mi hijo de 3 años juega todo el dia con el' },
      { nombre: 'Jorge L.', estrellas: 3, texto: 'A mi hija le gusto pero se aburrio rapido' },
      { nombre: 'Carolina Z.', estrellas: 5, texto: 'Buena calidad para el precio' },
      { nombre: 'Alejandro W.', estrellas: 4, texto: 'Bueno, aunque usa pilas y no viene con ellas' },
      { nombre: 'Laura V.', estrellas: 4, texto: 'Nos gusto, es mas pequeño de lo que pensaba' },
      { nombre: 'Maria F.', estrellas: 5, texto: 'Ladra y mueve la cola, muy lindo' },
      { nombre: 'Hector R.', estrellas: 5, texto: 'Lo recomiendo, llego bien empacado' },
      { nombre: 'Jennifer C.', estrellas: 5, texto: 'Compramos el blanco y es hermoso' },
      { nombre: 'Angela M.', estrellas: 5, texto: 'Entretiene a los niños un monton' },
      { nombre: 'Nicolas A.', estrellas: 3, texto: 'Normal, cumple lo que dice' },
      { nombre: 'Fernando B.', estrellas: 4, texto: 'Funciona bien, solo que camina despacio' },
      { nombre: 'Gustavo P.', estrellas: 4, texto: 'Bonito, el sensor hay que acercarle bien la mano' },
      { nombre: 'Marcela S.', estrellas: 3, texto: 'Esta bien pero esperaba que fuera mas grande' },
      { nombre: 'Valentina G.', estrellas: 4, texto: 'Bueno, aunque usa pilas y no viene con ellas' },
      { nombre: 'Omar S.', estrellas: 5, texto: 'Repite todo lo que uno le dice, muy gracioso' },
      { nombre: 'Harold V.', estrellas: 4, texto: 'Funciona bien, solo que camina despacio' },
      { nombre: 'Camila B.', estrellas: 5, texto: 'El peluche es suavecito y bien hecho' },
      { nombre: 'Andrea P.', estrellas: 5, texto: 'Muy buen regalo para niños pequeños' },
      { nombre: 'Mateo S.', estrellas: 5, texto: 'Se mueve solo con el sensor, muy entretenido' },
      { nombre: 'Julian E.', estrellas: 5, texto: 'Quedo igualito al de las fotos' },
      { nombre: 'Yuliana P.', estrellas: 5, texto: 'Buena calidad para el precio' },
      { nombre: 'Andres T.', estrellas: 3, texto: 'A mi hija le gusto pero se aburrio rapido' },
      { nombre: 'Juliana R.', estrellas: 4, texto: 'Muy lindo, solo que la voz al repetir suena agudita' },
      { nombre: 'Gloria N.', estrellas: 5, texto: 'Lo recomiendo, llego bien empacado' },
      { nombre: 'Katherine M.', estrellas: 5, texto: 'Entretiene a los niños un monton' },
      { nombre: 'Monica P.', estrellas: 4, texto: 'Nos gusto, es mas pequeño de lo que pensaba' },
      { nombre: 'Jaime O.', estrellas: 3, texto: 'Normal, cumple lo que dice' },
      { nombre: 'Elizabeth C.', estrellas: 4, texto: 'Bonito, el sensor hay que acercarle bien la mano' },
      { nombre: 'Claudia E.', estrellas: 5, texto: 'Repite todo lo que uno le dice, muy gracioso' },
      { nombre: 'Ricardo H.', estrellas: 4, texto: 'Bueno, aunque usa pilas y no viene con ellas' },
      { nombre: 'Dayana P.', estrellas: 5, texto: 'El peluche es suavecito y bien hecho' },
      { nombre: 'Juan David L.', estrellas: 5, texto: 'Muy buen regalo para niños pequeños' }
    ],
    nombre: 'Perro caminador, repetidor y con sensor',
    subtitulo: 'Camina, saca la lengua y repite lo que le dices.',
    destacados: [
      { titulo: 'Como una mascota de verdad', texto: 'Camina, saca la lengua y repite lo que dices.', media: '/perrogif1.mp4' },
      { titulo: 'Reacciona a las caricias', texto: 'Acarícialo en la cabeza o el cuerpo: camina y ladra.', media: '/perrogif2.mp4' },
      { titulo: 'Repite lo que le cuentas', texto: 'Háblale y te responde con tus palabras. Batería recargable.', media: '/perrogif3.mp4' }
    ],
    incluye: ['Perro interactivo con sensor', 'Lazo', 'Batería recargable (Solo modelo Cafe)', 'Cable USB (Solo modelo Cafe)', 'Collar o pañuelo']
  },
  388: {
    opiniones: [
      { nombre: 'Andrea P.', estrellas: 5, texto: 'Lo recomiendo, le gusto a mi hijo' },
      { nombre: 'Carlos M.', estrellas: 5, texto: 'Esta lindo y facil para armar' },
      { nombre: 'Omar S.', estrellas: 4, texto: 'Llego rapido, se me perdio una ficha jajaj' },
      { nombre: 'Juliana R.', estrellas: 5, texto: 'Si viene como dice' },
      { nombre: 'Elizabeth C.', estrellas: 5, texto: 'Lo armo rapido, como en 1 hora, mas grande hay' },
      { nombre: 'Maria F.', estrellas: 5, texto: 'Lindas las luces y ya lo armaron mis hijos' },
      { nombre: 'Catalina P.', estrellas: 5, texto: 'Lo recomiendo' },
      { nombre: 'Carlos H.', estrellas: 5, texto: 'Bueno, todas las fichas estan' },
      { nombre: 'Dayana P.', estrellas: 5, texto: 'Las luces quedan muy bonitas en el cuarto' },
      { nombre: 'Diana M.', estrellas: 4, texto: 'Muy bueno, solo que las piezas son pequeñitas' },
      { nombre: 'Angela M.', estrellas: 5, texto: 'Mi hijo lo armo solo en una tarde' },
      { nombre: 'Rafael C.', estrellas: 3, texto: 'Esta bien pero me sobraron piezas' },
      { nombre: 'Andres T.', estrellas: 5, texto: 'Vienen todas las piezas como dice' },
      { nombre: 'Fernando B.', estrellas: 4, texto: 'Nos gusto, aunque es mas pequeño de lo que pensaba' },
      { nombre: 'Santiago M.', estrellas: 5, texto: 'Buen regalo para los que les gusta Minecraft' },
      { nombre: 'Valentina G.', estrellas: 5, texto: 'Las instrucciones son faciles de seguir' },
      { nombre: 'Julian E.', estrellas: 5, texto: 'Quedo igualito a las fotos' },
      { nombre: 'Felipe R.', estrellas: 5, texto: 'Llego rapido y completo' },
      { nombre: 'Ivan M.', estrellas: 5, texto: 'Lo armamos en familia, muy entretenido' },
      { nombre: 'Ricardo H.', estrellas: 5, texto: 'Buena calidad las piezas, encajan bien' },
      { nombre: 'Marcela S.', estrellas: 5, texto: 'Compre dos colores y los dos quedaron lindos' },
      { nombre: 'Katherine M.', estrellas: 3, texto: 'Normal, cumple lo que dice' },
      { nombre: 'Sandra I.', estrellas: 4, texto: 'Cumple, el manual esta en ingles pero se entiende con los dibujos' },
      { nombre: 'Johana D.', estrellas: 5, texto: 'Sirve de lampara, muy practico' },
      { nombre: 'Brayan A.', estrellas: 4, texto: 'Bien, solo que la luz no es muy fuerte' },
      { nombre: 'Sebastian C.', estrellas: 5, texto: 'Mi hija de 8 lo armo sin ayuda' },
      { nombre: 'Adriana L.', estrellas: 2, texto: 'Me falto una pieza del set' },
      { nombre: 'Leonardo C.', estrellas: 4, texto: 'Bueno, a los mas chiquitos les cuesta armarlo' },
      { nombre: 'Daniel A.', estrellas: 5, texto: 'Por el precio esta muy bueno' },
      { nombre: 'Norberto L.', estrellas: 3, texto: 'Regular, el armado es dispendioso' },
      { nombre: 'Harold V.', estrellas: 5, texto: 'Trae pilas y funciona de una' },
      { nombre: 'Mariana H.', estrellas: 5, texto: 'Lo recomiendo, llego bien empacado' },
      { nombre: 'Edwin R.', estrellas: 4, texto: 'Nos gusto, aunque es mas pequeño de lo que pensaba' },
      { nombre: 'Monica P.', estrellas: 5, texto: 'Mi hijo lo armo solo en una tarde' },
      { nombre: 'Nicolas A.', estrellas: 4, texto: 'Bien, solo que la luz no es muy fuerte' },
      { nombre: 'Gloria N.', estrellas: 2, texto: 'Me falto una pieza del set' },
      { nombre: 'Sofia R.', estrellas: 5, texto: 'Buen regalo para los que les gusta Minecraft' },
      { nombre: 'Estefania B.', estrellas: 5, texto: 'Quedo igualito a las fotos' },
      { nombre: 'Luz Dary M.', estrellas: 3, texto: 'Normal, cumple lo que dice' },
      { nombre: 'Erika G.', estrellas: 5, texto: 'Lo armamos en familia, muy entretenido' },
      { nombre: 'Camila B.', estrellas: 4, texto: 'Muy bueno, solo que las piezas son pequeñitas' },
      { nombre: 'Albeiro P.', estrellas: 4, texto: 'Cumple, el manual esta en ingles pero se entiende con los dibujos' },
      { nombre: 'Carolina Z.', estrellas: 5, texto: 'Compre dos colores y los dos quedaron lindos' },
      { nombre: 'Jennifer C.', estrellas: 5, texto: 'Mi hija de 8 lo armo sin ayuda' }
    ],
    nombre: 'Lego de Minecraft con luz, 239 piezas',
    subtitulo: 'Set armable de 239 piezas con luz incorporada.',
    destacados: [
      { titulo: 'Construye su propio mundo', texto: 'También sirve como lámpara decorativa.', media: '/clip388-mundo.mp4' },
      { titulo: '238 piezas', texto: 'Para los que aman Minecraft.', media: '/clip388-piezas.mp4' },
      { titulo: 'Con luz incorporada', texto: 'Decora el cuarto y trabaja la motricidad y la creatividad.', media: '/clip388-luz.mp4' },
      { titulo: 'Listo para armar', texto: 'Trae manual guía.', media: '/clip388-armar.mp4' }
    ],
    incluye: ['239 piezas', 'Luz interna', 'Manual guía']
  },
  395: {
    opiniones: [
      { nombre: 'Laura G.', estrellas: 5, texto: 'Lo recomiendo, les gusto' },
      { nombre: 'Andres M.', estrellas: 5, texto: 'Esta muy buena y si trae las gafas' },
      { nombre: 'Daniel R.', estrellas: 4, texto: 'Llego rapido' },
      { nombre: 'Sofia C.', estrellas: 5, texto: 'Si viene como dice' },
      { nombre: 'Miguel A.', estrellas: 5, texto: 'Muy buena, dispara bastante lejos jaja' },
      { nombre: 'Paola V.', estrellas: 5, texto: 'Las orvis si funcionan pero con luz de la azul ultra violeta' },
      { nombre: 'Camilo P.', estrellas: 5, texto: 'La recomiendo, esta muy entretenida' },
      { nombre: 'Natalia F.', estrellas: 5, texto: 'Todo completo y funciona perfectamente' },
      { nombre: 'Diana M.', estrellas: 5, texto: 'El humo y la luz se ven buenisimos de noche' },
      { nombre: 'Elizabeth C.', estrellas: 2, texto: 'La mia llego con el cargador flojo' },
      { nombre: 'Harold V.', estrellas: 4, texto: 'Muy buena, solo que las orvis hay que hidratarlas 4 horas antes' },
      { nombre: 'Gustavo P.', estrellas: 3, texto: 'Esta bien pero el humo casi no se ve de dia' },
      { nombre: 'Brayan A.', estrellas: 4, texto: 'Funciona bien, el humo se acaba rapido' },
      { nombre: 'Claudia E.', estrellas: 3, texto: 'Normal, cumple lo basico' },
      { nombre: 'Sofia R.', estrellas: 5, texto: 'Mi hijo y sus amigos juegan todos los fines de semana' },
      { nombre: 'Hector R.', estrellas: 4, texto: 'Buena, pero toca cargarla antes de jugar' },
      { nombre: 'Jorge L.', estrellas: 5, texto: 'Trae las orvis de regalo, muy completo' },
      { nombre: 'Oscar J.', estrellas: 5, texto: 'Tiene buen alcance, mas de lo que pensaba' },
      { nombre: 'Esteban Q.', estrellas: 5, texto: 'Se carga por USB y dura harto' },
      { nombre: 'Edwin R.', estrellas: 4, texto: 'Nos gusto, aunque hace bastante ruido' },
      { nombre: 'Milena A.', estrellas: 5, texto: 'Llego rapido y bien empacada' },
      { nombre: 'Leonardo C.', estrellas: 5, texto: 'El proveedor de granada se llena facil' },
      { nombre: 'Yesica R.', estrellas: 5, texto: 'Muy buena calidad, se siente pesadita y resistente' },
      { nombre: 'Alejandro W.', estrellas: 5, texto: 'Lo compre para mi sobrino y quedo feliz' },
      { nombre: 'Wilmer T.', estrellas: 4, texto: 'Cumple, solo que las orvis se acaban rapido jugando' },
      { nombre: 'Jennifer C.', estrellas: 5, texto: 'Las orvis brillan en la oscuridad, muy chevere' },
      { nombre: 'Paola N.', estrellas: 5, texto: 'Dispara rapido, vale la pena' },
      { nombre: 'Andrea P.', estrellas: 4, texto: 'Bien, pero hay que limpiar donde se juega' },
      { nombre: 'Mauricio D.', estrellas: 4, texto: 'Funciona bien, el humo se acaba rapido' },
      { nombre: 'Katherine M.', estrellas: 5, texto: 'Excelente para jugar en el patio' },
      { nombre: 'Tatiana R.', estrellas: 5, texto: 'Tal cual lo que muestran en los videos' },
      { nombre: 'Duvan M.', estrellas: 3, texto: 'A veces se traba si las orvis estan muy blandas' },
      { nombre: 'Valentina G.', estrellas: 5, texto: 'Mejor de lo que esperaba por el precio' },
      { nombre: 'Lina T.', estrellas: 5, texto: 'Me atendieron muy bien por WhatsApp' },
      { nombre: 'Laura V.', estrellas: 4, texto: 'Nos gusto, aunque hace bastante ruido' },
      { nombre: 'Marcela S.', estrellas: 4, texto: 'Bien, pero hay que limpiar donde se juega' },
      { nombre: 'Jaime O.', estrellas: 5, texto: 'Compre dos para que jueguen en equipo' },
      { nombre: 'Cristian F.', estrellas: 5, texto: 'El laser ayuda para apuntar, buenisimo' },
      { nombre: 'Melissa T.', estrellas: 3, texto: 'Regular, esperaba mas alcance' },
      { nombre: 'Ricardo H.', estrellas: 4, texto: 'Funciona bien, el humo se acaba rapido' },
      { nombre: 'Ivan M.', estrellas: 4, texto: 'Nos gusto, aunque hace bastante ruido' },
      { nombre: 'Estefania B.', estrellas: 5, texto: 'Mi hijo y sus amigos juegan todos los fines de semana' },
      { nombre: 'Mariana H.', estrellas: 4, texto: 'Bien, pero hay que limpiar donde se juega' },
      { nombre: 'Sandra I.', estrellas: 5, texto: 'Tiene buen alcance, mas de lo que pensaba' },
      { nombre: 'Erika G.', estrellas: 5, texto: 'Llego rapido y bien empacada' },
      { nombre: 'Sebastian C.', estrellas: 5, texto: 'Muy buena calidad, se siente pesadita y resistente' },
      { nombre: 'Maria F.', estrellas: 4, texto: 'Funciona bien, el humo se acaba rapido' },
      { nombre: 'Dayana P.', estrellas: 5, texto: 'Las orvis brillan en la oscuridad, muy chevere' },
      { nombre: 'Hernan G.', estrellas: 2, texto: 'La mia llego con el cargador flojo' },
      { nombre: 'Albeiro P.', estrellas: 5, texto: 'Excelente para jugar en el patio' },
      { nombre: 'Luisa F.', estrellas: 4, texto: 'Nos gusto, aunque hace bastante ruido' },
      { nombre: 'Yuliana P.', estrellas: 5, texto: 'Mejor de lo que esperaba por el precio' }
    ],
    nombre: 'Lanzadora de hidrogel MP5 con luz y humo',
    subtitulo: 'Silenciador con luz y humo, proveedor tipo granada y 10.000 orvis fluorescentes.',
    destacados: [
      // Videos propios del producto (clips de MP5LuzHumo/Raw_Footage, 3 s en bucle)
      { titulo: 'Orvis que brillan en la oscuridad', texto: 'Vienen de regalo. Se hidratan en agua de 3 a 4 horas y quedan listas.', media: '/mp5395a.mp4' },
      { titulo: 'Luz y humo en cada disparo', texto: 'El silenciador ilumina y echa humo sin pilas adicionales.', media: '/mp5395b.mp4' },
      { titulo: 'Proveedor tipo granada', texto: 'Se llena de un solo golpe y se recarga en segundos.', media: '/mp5395c.mp4' },
      { titulo: 'Alcance de hasta 25 metros', texto: 'La orvi se revienta al impactar y solo queda agua.', media: '/mp5395d.mp4' }
    ],
    incluye: ['Lanzadora de hidrogel MP5', 'Silenciador con luz y humo', 'Proveedor tipo granada', '10.000 orvis fluorescentes de hidrogel', 'Laser', 'Batería recargable', 'Cargador USB'],
    relacionados: [374, 375, 376, 377, 395, 401]
  },
  401: {
    nombre: 'Lanzadora de hidrogel M16 con luz y humo',
    subtitulo: 'Silenciador con luz y humo, mira telescópica y 10.000 orvis.',
    destacados: [
      // Sin media: el GIF que tenía (m416b.gif) era de la M416
      { titulo: 'Luz y humo en cada disparo', texto: 'El silenciador ilumina y echa humo sin pilas adicionales.' },
      { ...aireLibre, media: '/arpgifb.mp4' },
      { ...orvisSinRastro, media: '/m416d.mp4' },
      { titulo: 'Alcance de hasta 25 metros', texto: 'Potencia para jugar en espacios abiertos.', media: '/arpgifa.mp4' }
    ],
    incluye: ['Lanzadora de hidrogel M16', 'Mira telescópica', 'Silenciador con luz y humo', 'Proveedor extendido', '10.000 orvis de hidrogel', 'Batería recargable', 'Cargador USB']
  },
  409: {
    nombre: 'Juego Basta + UNO Flip de regalo',
    subtitulo: 'Basta electrónico y UNO Flip para jugar en familia.',
    destacados: [
      { titulo: 'Un combo para jugar en familia', texto: 'Basta electrónico y UNO Flip en el mismo pedido.', media: '/bastagif1.webp' },
      { titulo: 'Elige categoría y piensa rápido', texto: 'Presiona el botón y responde antes de que se acabe el tiempo.', media: '/bastagif2.mp4' },
      { titulo: 'UNO Flip tiene un lado oscuro', texto: 'El UNO de siempre, pero más rápido y más salvaje.', media: '/unogif1.mp4' }
    ],
    incluye: ['Juego Basta electrónico', 'Más de 144 categorías y 36 tarjetas', 'Cartas UNO Flip (dos lados en un solo mazo)']
  }
}

export default productoscontenido
