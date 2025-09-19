const palabras = ["JAVASCRIPT", "PROGRAMACION", "JUEGO", "GUITARRA", "MANZANA", "AJOLOTE", "COLOMBIA", "GITHUB", "FRONTEND"];
const maxErrores = 6;
const dibujo = ["img/1.png", "img/2.png","img/3.png", "img/4.png", "img/5.png", "img/6.png"];

let seleccionarPalabra = "";
let palabraOculta = "";
let errores = 0;
let victorias = 0;
let defeats = 0;

const seccionJuego = document.getElementById("game");
const containerPalabra = document.getElementById("word-cont");
const containerLetras = document.getElementById("letters");
const listaLetrasUsadas = document.getElementById("list");
const contadorVictorias = document.getElementById("win");
const contadorDerrotas = document.getElementById("loser");
const listaHistorial = document.getElementById("game_history");
const contenedorDibujo = document.getElementById("draw");