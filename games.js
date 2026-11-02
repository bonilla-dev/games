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
//   fecha        "AAAA-MM-DD" (se usa para ordenar)
//   controles    texto que aparece bajo el juego
//   emoji        icono de la portada si no hay imagen
//   colores      [color1, color2] del degradado de la portada
//   portada      ruta a una imagen, p. ej. "games/snake/portada.png" (opcional)
//   url          solo si el juego no está en games/<slug>/index.html (opcional)
window.GAMES = [
  {
    "slug": "snake",
    "titulo": "Snake",
    "descripcion": "El clásico de toda la vida: come manzanas, crece y no te muerdas la cola.",
    "estado": "terminado",
    "generos": ["arcade", "clásico"],
    "autores": ["Equipo"],
    "fecha": "2026-11-02",
    "controles": "Flechas o WASD para moverte · Espacio para pausar",
    "emoji": "🐍",
    "colores": ["#1f8a5b", "#9be15d"]
  }
];
