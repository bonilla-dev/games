// Registro de juegos. `node nuevo-juego.mjs "Nombre"` añade entradas aquí automáticamente.
// Mantén el contenido entre los corchetes como JSON válido (comillas dobles, sin comas finales).
//
// Campos:
//   slug         carpeta del juego en games/<slug>/  (obligatorio)
//   titulo       nombre visible                       (obligatorio)
//   descripcion  una o dos frases
//   estado       "desarrollo" | "beta" | "terminado"
//   generos      lista de etiquetas, p. ej. ["arcade", "puzzle"]
//   autores      lista de nombres
//   emoji        icono de la portada si no hay imagen
//   colores      [color1, color2] del degradado de la portada
//   portada      ruta a una imagen, p. ej. "games/mi-juego/portada.png" (opcional)
//   url          web del juego (si no está en games/<slug>/index.html)
//
// En la web se muestran ordenados por nombre.
window.GAMES = [
  {
    "slug": "uno-3d",
    "titulo": "UNO 3D",
    "descripcion": "El clásico UNO en 3D, ahora multijugador: cada uno en su móvil con un código de sala (hasta 10), pasando el móvil o contra bots.",
    "estado": "beta",
    "generos": ["cartas", "3D", "multijugador", "móvil"],
    "autores": [],
    "emoji": "🃏",
    "colores": ["#d63031", "#fdcb6e"],
    "url": "https://unogame3d.vercel.app/"
  },
  {
    "slug": "yo-nunca",
    "titulo": "Yo Nunca",
    "descripcion": "180 frases de «Yo nunca» para leer en voz alta: normales, extremas, picantes y muy picantes (+18). Una persona lee y el resto confiesa.",
    "estado": "beta",
    "generos": ["fiesta", "multijugador", "+18", "móvil"],
    "autores": [],
    "emoji": "🍻",
    "colores": ["#e84393", "#6c5ce7"],
    "url": "https://yonuncagame.vercel.app/"
  },
  {
    "slug": "legado",
    "titulo": "Legado · Historia Negra",
    "descripcion": "Juego educativo de historia negra: trivia, línea del tiempo, ¿Quién soy? y un archivo de historias para coleccionar.",
    "estado": "beta",
    "generos": ["educativo", "trivia", "historia", "móvil"],
    "autores": [],
    "emoji": "📜",
    "colores": ["#2d3436", "#e1a95f"],
    "url": "https://blackhistorygame.vercel.app/"
  },
  {
    "slug": "noche-de-halloween",
    "titulo": "Noche de Halloween",
    "descripcion": "Preguntas de Halloween para 2 a 10 jugadores: la sala en la tele o el portátil y cada jugador con su móvil de mando. Sin cuentas, solo un código de sala.",
    "estado": "beta",
    "generos": ["fiesta", "trivia", "multijugador", "online", "móvil"],
    "autores": [],
    "emoji": "🎃",
    "colores": ["#e17055", "#2d1b4e"],
    "url": "https://hallowquest.vercel.app/"
  },
  {
    "slug": "el-impostor",
    "titulo": "El Impostor",
    "descripcion": "Todos conocen la palabra secreta… menos el impostor. Juego de fiesta para pasar el móvil, de 3 a 20 jugadores y con 6 modos.",
    "estado": "beta",
    "generos": ["fiesta", "multijugador", "palabras", "móvil"],
    "autores": [],
    "emoji": "🕵️",
    "colores": ["#6c5ce7", "#d63031"],
    "url": "https://theimpostorgamer.vercel.app/"
  },
  {
    "slug": "escape-3d",
    "titulo": "Escape 3D",
    "descripcion": "Escape rooms en 3D para el móvil: resuelve los enigmas del despacho del detective y del laboratorio abandonado contra el reloj y escala en el ranking.",
    "estado": "beta",
    "generos": ["escape room", "puzle", "3D", "móvil"],
    "autores": [],
    "emoji": "🔐",
    "colores": ["#00b894", "#2d3436"],
    "url": "https://scaperooms.vercel.app/"
  },
  {
    "slug": "cronicas-de-eldoria",
    "titulo": "Crónicas de Eldoria",
    "descripcion": "Aventura 3D de fantasía para móvil y PC: elige entre 5 héroes, explora el mundo abierto, completa misiones, mejora armas, entrena mascotas y recupera los Fragmentos del Alba.",
    "estado": "beta",
    "generos": ["aventura", "RPG", "3D", "móvil"],
    "autores": [],
    "emoji": "⚔️",
    "colores": ["#2e7d32", "#4a2c6b"],
    "url": "https://eldoria3d.vercel.app/"
  },
  {
    "slug": "cinemamanager",
    "titulo": "CinemaManager",
    "descripcion": "Dirige tu propio cine de barrio en primera persona: vende entradas, atiende la tienda de palomitas, arregla el proyector y saca el cine adelante día a día.",
    "estado": "beta",
    "generos": ["simulación", "gestión", "3D", "PC"],
    "autores": [],
    "emoji": "🎬",
    "colores": ["#c0392b", "#1e1e2f"],
    "url": "https://cinemamanager.vercel.app/"
  }
];
