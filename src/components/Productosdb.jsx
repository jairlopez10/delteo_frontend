
const productosdb = [
    {
        id: 1,
        titulo: "Kit de Uñas X12 con Brillos",
        precio: 12000,
        descripcion: `¡Fusionamos diversión y creatividad en nuestro kit de uñas encantadoras! Diseñado especialmente para niñas de 3 a 7 años, este kit les brinda la oportunidad de explorar su lado artístico mientras se divierten.

        Con 12 uñas en colores vibrantes y diseños encantadores, cada uña es una pequeña obra maestra lista para ser creada. Desde delicadas flores hasta brillantes estrellas, ¡serán princesitas creativas!
        
        El kit incluye un tubito de pegamento suave y seguro para que las uñas permanezcan en su lugar durante todas las aventuras. Y para el toque final mágico, nuestro frasquito de brillo añade destellos y colores chispeantes a cada creación.`,
        imagenes: [
            {
                tipo: "imagen",
                url: "/producto1a.webp"
            },
            {
                tipo: "imagen",
                url: "/producto1b.webp"
            }
        ],
        status: "disponible",
        colores: "Rosado",
        edad: "+3",
        categoria: "maquillaje",
        genero: "ninas"
    },
    {
        id: 2,
        titulo: "Computador Interactivo Todo en Uno",
        precio: 45000,
        descripcion: `¡Descubre el emocionante mundo del aprendizaje con nuestro Computador Interactivo Todo en Uno, equipado con mouse y pantalla digital! Diseñado para preescolares, este juguete cautivante es más que un juego.

        Explora números del 1 al 10, el abecedario y palabras esenciales con diversión interactiva. Con canciones animadas y actividades intuitivas de suma y resta, cada momento se convierte en una lección emocionante.
        
        Colores vibrantes y personajes adorables hacen que el aprendizaje sea divertido. Los botones grandes y el mouse fácil de usar garantizan una inmersión sin complicaciones.
        
        Este computador educativo es una herramienta valiosa que fomenta el desarrollo cognitivo. ¡Cada toque en las teclas crea un futuro de conocimiento!`,
        imagenes: [
            {
                tipo: "imagen",
                url: "/producto2a.webp"
            },
            {
                tipo: "imagen",
                url: "/producto2b.webp"
            },
            {
                tipo: "imagen",
                url: "producto2c.webp"
            },
            {
                tipo: "imagen",
                url: "producto2d.webp"
            }
        ],
        status: "disponible",
        colores: "Rosado, Azul",
        edad: "+3",
        categoria: "educativo",
        genero: "ninas"
    },
    {
        id: 3,
        titulo: "Computador Interactivo 130 Actividades",
        precio: 10000,
        descripcion: `Descubre un mundo de aprendizaje interactivo con nuestro Computador Interactivo 130 Actividades. Diseñado para inspirar y enseñar, este juguete educativo es una experiencia completa.

        Desde letras y música hasta un reloj funcional, los niños explorarán un abanico de habilidades. Rellena palabras, deletrea, sumérgete en matemáticas y disfruta de juegos educativos, todo con el uso del mouse y el teclado interactivo. Este computador, con conexión a corriente, brinda horas de diversión y aprendizaje sin fin.
        
        Con su pantalla digital interactiva y actividades atractivas, tu pequeño estará inmerso en un mundo educativo emocionante. Prepárate para ver cómo su conocimiento y confianza se expanden mientras exploran este maravilloso mundo de oportunidades!`,
        imagenes: [
            {
                tipo: "imagen",
                url: "/producto3a.webp"
            },
            {
                tipo: "imagen",
                url: "/producto3b.webp"
            },
            {
                tipo: "imagen",
                url: "producto3c.webp"
            }
        ],
        status: "disponible",
        colores: "Azul, Rosado",
        edad: "+3",
        categoria: "educativo",
        genero: "unisex"
    },
    {
        id: 4,
        titulo: "Barbie +10 Vestidos con Hija, Bicicleta y Accesorios",
        precio: 23000,
        descripcion: `¡Diversión sin fin espera con este set único de Barbie con 10 vestidos impresionantes, para que ella pueda deslumbrar en cualquier ocasión. Pero eso no es todo, ¡también viene con su hija lista para un emocionante paseo en bicicleta!

        Explora un mundo de moda y creatividad mientras vistes a Barbie en los vestidos más elegantes y a la moda. Cada vestido está diseñado para reflejar su estilo único y personalidad. Además, el set incluye accesorios esenciales como cepillos y espejos, ¡para que Barbie y su hija estén siempre listas para el día!`,
        imagenes: [
            {
                tipo: "imagen",
                url: "/producto4a.webp"
            }
        ],
        status: "disponible",
        colores: "Rosado",
        edad: "+3",
        categoria: "munecas",
        genero: "ninas"
    },
    {
        id: 5,
        titulo: "Pistola de Burbujas Dinosaurio Rex",
        precio: 49000,
        descripcion: `¡Diversión prehistórica te espera con nuestra Pistola de Burbujas Dinosaurio Rex! Este juguete único combina la emoción de las burbujas con el estilo del legendario tiranosaurio rex.

        Con su diseño de dinosaurio rex en colores vibrantes, esta pistola de burbujas ofrece una experiencia mágica para niños de todas las edades. Incluye dos frascos de burbujas para que la diversión comience de inmediato. Y lo mejor de todo, ¡puedes recargarla fácilmente con jabón de la casa para que la diversión nunca termine!
        
        El juego interactivo se vuelve más emocionante a medida que los niños disparan burbujas y ven cómo flotan en el aire, creando momentos de asombro y risas. Además, esta increíble pistola de burbujas viene en una maleta en forma de cabeza de dinosaurio rex, que no solo es un almacenamiento conveniente, sino también un accesorio impresionante para la habitación de tu pequeño!`,
        imagenes: [
            {
                tipo: "imagen",
                url: "/producto5a.webp"
            },
            {
                tipo: "video",
                url: "producto5b.mp4"
            }
            
        ],
        status: "disponible",
        colores: "Verde, Azul",
        edad: "+3",
        categoria: "punteria",
        genero: "ninos"
    },
    {
        id: 6,
        titulo: "Dinosaurio Rex con Movimiento, Luces, Sonido",
        precio: 17000,
        descripcion: `¡Transporta a tu pequeño a la era de los dinosaurios con nuestro Dinosaurio Rex! Este magnífico amigo prehistórico está lleno de emocionantes luces brillantes, sonidos realistas y un movimiento fascinante en su cuerpo, garras y cola, este dinosaurio cobra vida en las manos de tu hijo. Cada paso es una aventura asombrosa mientras el dinosaurio camina y se balancea con autenticidad, creando momentos de maravilla y diversión.
        
        La interacción es clave: los niños adorarán activar los sonidos y movimientos con solo tocar un botón. Y para potenciar la diversión, este dinosaurio es fácil de alimentar. Simplemente coloca 3 pilas AA y estarás listo para la acción!`,
        imagenes: [
            {
                tipo: "imagen",
                url: "/producto6a.webp"
            },
            {
                tipo: "imagen",
                url: "/producto6b.webp"
            },
            {
                tipo: "video",
                url: "producto6c.mp4"
            }
        ],
        status: "disponible",
        colores: "Verde",
        edad: "+3",
        categoria: "dinosaurios",
        genero: "ninos"
    },
    {
        id: 7,
        titulo: "Dinosaurio Huevo Sorpresa, Luces, Movimiento y Sonido",
        precio: 17000,
        descripcion: `¡Sumérgete en una emocionante expedición prehistórica con nuestro Dinosaurio Huevo Sorpresa con luces brillantes, sonidos realistas y movimientos cautivadores que cobran vida en su cuerpo y cabeza. Pero aquí está la verdadera maravilla: este dinosaurio también tiene una sorpresa bajo la manga (o en este caso, bajo sus patas). ¡Bota huevos de plástico en cada paso, creando momentos de anticipación y emoción!

        Este dinosaurio es una fuente inagotable de diversión. Además, para que la diversión nunca termine, funciona con 3 pilas AA. Ideal para los apasionados por los dinosaurios y los amantes de la aventura!`,
        imagenes: [
            {
                tipo: "imagen",
                url: "/producto7a.webp"
            },
            {
                tipo: "video",
                url: "producto7b.mp4"
            }
        ],
        status: "disponible",
        colores: "Amarillo, Verde",
        edad: "+3",
        categoria: "dinosaurios",
        genero: "ninos"
    },
    {
        id: 8,
        titulo: "Set Barbie Familia y Amigos",
        precio: 17000,
        descripcion: `¡Crea mágicas historias con nuestro Set de Barbie Familia y Amigos! Este encantador conjunto incluye una Barbie radiante con una selección de 6 elegantes vestidos, ¡siempre lista para cualquier ocasión!

        Pero eso no es todo, ¡también presentamos a las adorables hijas de Barbie! Con 2 hijas llenas de personalidad y estilo, las posibilidades de juego se multiplican. Desde aventuras familiares hasta tardes de diversión, esta familia está lista para todo.
        
        Y para añadir un toque aún más especial, el set incluye un pony encantador para las hijas. Paseos en la naturaleza o puro juego imaginativo, este pony es la compañía perfecta para las pequeñas!`,
        imagenes: [
            {
                tipo: "imagen",
                url: "/producto8a.webp"
            }
        ],
        status: "disponible",
        colores: "Rosado",
        edad: "+3",
        categoria: "munecas",
        genero: "ninas"
    }
];


export default productosdb;