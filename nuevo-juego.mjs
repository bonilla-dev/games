#!/usr/bin/env node
// Crea un juego nuevo a partir de la plantilla y lo registra en games.js.
// Uso: node nuevo-juego.mjs "Nombre del juego" [--slug mi-slug] [--autor "Nombre"] [--genero arcade,puzzle] [--estado desarrollo]

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const registry = join(root, 'games.js');
const MARKER = 'window.GAMES = ';
const ESTADOS = ['desarrollo', 'beta', 'terminado'];
const PALETAS = [
  ['#ff4fa3', '#4fb3ff'], ['#ff9f43', '#ffcc33'], ['#6c5ce7', '#00cec9'],
  ['#e84393', '#fd79a8'], ['#0984e3', '#74b9ff'], ['#d63031', '#e17055'],
];
const EMOJIS = ['🎮', '👾', '🕹️', '🚀', '⚔️', '🧩', '🏎️', '🐉', '🌌', '🎯'];

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args.splice(i, 2)[1] : undefined;
};
const slugArg = opt('slug');
const autor = opt('autor');
const genero = opt('genero');
const estado = opt('estado') || 'desarrollo';
const titulo = args.join(' ').trim();

if (!titulo) {
  console.error('Uso: node nuevo-juego.mjs "Nombre del juego" [--slug mi-slug] [--autor "Nombre"] [--genero arcade,puzzle] [--estado desarrollo|beta|terminado]');
  process.exit(1);
}
if (!ESTADOS.includes(estado)) {
  console.error(`Estado no válido: "${estado}". Usa uno de: ${ESTADOS.join(', ')}`);
  process.exit(1);
}

const slug = (slugArg || titulo)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

if (!slug) {
  console.error('No se pudo generar un slug válido; pásalo con --slug');
  process.exit(1);
}

// Leer el registro
const src = readFileSync(registry, 'utf8');
const start = src.indexOf(MARKER);
const end = src.lastIndexOf(']');
if (start < 0 || end < 0) {
  console.error('No encuentro "window.GAMES = [ ... ]" en games.js');
  process.exit(1);
}
let games;
try {
  games = JSON.parse(src.slice(start + MARKER.length, end + 1));
} catch (e) {
  console.error('games.js no contiene JSON válido entre los corchetes:', e.message);
  process.exit(1);
}

const dir = join(root, 'games', slug);
if (games.some((g) => g.slug === slug) || existsSync(dir)) {
  console.error(`Ya existe un juego con el slug "${slug}". Usa --slug para elegir otro.`);
  process.exit(1);
}

// Crear la carpeta desde la plantilla
const plantilla = readFileSync(join(root, 'plantilla', 'index.html'), 'utf8');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'index.html'), plantilla.replaceAll('{{TITULO}}', titulo));

// Registrar
const n = games.length;
games.push({
  slug,
  titulo,
  descripcion: 'Describe aquí tu juego en una o dos frases.',
  estado,
  generos: genero ? genero.split(',').map((s) => s.trim()).filter(Boolean) : [],
  autores: autor ? [autor] : [],
  fecha: new Date().toISOString().slice(0, 10),
  controles: 'Flechas o WASD',
  emoji: EMOJIS[n % EMOJIS.length],
  colores: PALETAS[n % PALETAS.length],
});

const json = JSON.stringify(games, null, 2)
  // Listas cortas en una sola línea para que el fichero sea fácil de leer
  .replace(/\[\s+("[^"\n]*"(?:,\s+"[^"\n]*")*)\s+\]/g, (_, inner) => `[${inner.replace(/,\s+/g, ', ')}]`);
writeFileSync(registry, src.slice(0, start) + MARKER + json + src.slice(end + 1));

console.log(`✔ Creado games/${slug}/index.html`);
console.log(`✔ Añadido "${titulo}" a games.js — edita allí su descripción, géneros y controles.`);
