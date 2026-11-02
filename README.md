# Nos Hemos Viciado

Web estática (https://noshemosviciado.vercel.app) que reúne todos los juegos que estamos creando. No necesita dependencias ni compilación.

## Verla en local

```bash
python3 -m http.server 8765
```

Abre http://localhost:8765.

## Añadir un juego

```bash
node nuevo-juego.mjs "Nombre del juego" --autor "Ana" --genero arcade,puzzle --estado desarrollo
```

Esto crea `games/nombre-del-juego/index.html` desde `plantilla/` y añade su ficha a `games.js`. Luego:

1. Programa el juego en su carpeta (puede tener sus propios archivos JS, imágenes, sonidos…).
2. Ajusta su ficha en `games.js`: descripción, géneros, estado, portada.

¿Ya tienes un juego hecho? Copia su carpeta a `games/<slug>/` (con un `index.html` dentro) y añade la entrada a mano en `games.js`, o usa el campo `url` si vive en otro sitio.

## Estructura

```
index.html, styles.css, app.js   el portal
games.js                         registro de juegos (lista JSON)
games/<slug>/index.html          cada juego
plantilla/index.html             punto de partida para juegos nuevos
nuevo-juego.mjs                  script de alta
```

Cada tarjeta abre la web del juego en una pestaña nueva.

## Publicarla

Es una carpeta estática: sirve tal cual en GitHub Pages, Netlify, Vercel o Cloudflare Pages.
