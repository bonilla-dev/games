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
//   controles    texto que aparece bajo el juego
//   emoji        icono de la portada si no hay imagen
//   colores      [color1, color2] del degradado de la portada
//   portada      ruta a una imagen, p. ej. "games/mi-juego/portada.png" (opcional)
//   url          solo si el juego no está en games/<slug>/index.html (opcional)
//   iframe       false si la web del juego no se deja incrustar (se abre en pestaña nueva)
//
// El orden de esta lista es el de "Destacados" en la web.
window.GAMES = [
  {
    "slug": "uno-3d",
    "titulo": "UNO 3D",
    "descripcion": "El clásico juego de cartas UNO, ahora en 3D. Quédate sin cartas antes que nadie.",
    "estado": "beta",
    "generos": ["cartas", "3D"],
    "autores": [],
    "controles": "Ratón o pantalla táctil",
    "emoji": "🃏",
    "colores": ["#d63031", "#fdcb6e"],
    "url": "https://unogame3d.vercel.app/"
  },
  {
    "slug": "yo-nunca",
    "titulo": "Yo Nunca",
    "descripcion": "180 frases de «Yo nunca» para leer en voz alta: normales, extremas, picantes y muy picantes (+18). Una persona lee y el resto confiesa.",
    "estado": "beta",
    "generos": ["fiesta", "grupo", "+18"],
    "autores": [],
    "controles": "Toca para pasar a la siguiente frase",
    "emoji": "🍻",
    "colores": ["#e84393", "#6c5ce7"],
    "url": "https://yonuncagame.vercel.app/"
  },
  {
    "slug": "legado",
    "titulo": "Legado · Historia Negra",
    "descripcion": "Juego educativo de historia negra: trivia, línea del tiempo, ¿Quién soy? y un archivo de historias para coleccionar.",
    "estado": "beta",
    "generos": ["educativo", "trivia", "historia"],
    "autores": [],
    "controles": "Ratón o pantalla táctil",
    "emoji": "📜",
    "colores": ["#2d3436", "#e1a95f"],
    "url": "https://blackhistorygame.vercel.app/"
  },
  {
    "slug": "noche-de-halloween",
    "titulo": "Noche de Halloween",
    "descripcion": "Preguntas de Halloween para 2 a 10 jugadores: la sala en la tele o el portátil y cada jugador con su móvil de mando. Sin cuentas, solo un código de sala.",
    "estado": "beta",
    "generos": ["fiesta", "trivia", "multijugador"],
    "autores": [],
    "controles": "Abre la sala en una pantalla grande y únete desde el móvil con el código",
    "emoji": "🎃",
    "colores": ["#e17055", "#2d1b4e"],
    "url": "https://hallowquest.vercel.app/",
    "iframe": false
  },
  {
    "slug": "duelo-de-umbrales",
    "titulo": "Duelo de Umbrales",
    "descripcion": "Duelos tácticos 1 contra 1 por turnos.",
    "estado": "beta",
    "generos": ["estrategia", "por turnos", "multijugador"],
    "autores": [],
    "controles": "Ratón o pantalla táctil",
    "emoji": "⚔️",
    "colores": ["#0984e3", "#6c5ce7"],
    "url": "https://duelodeumbrales.vercel.app/",
    "iframe": false
  }
];
