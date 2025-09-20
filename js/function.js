const palabras = ["JAVASCRIPT", "PROGRAMACION", "JUEGO", "GUITARRA", "MANZANA", "AJOLOTE", "COLOMBIA",
    "GITHUB", "FRONTEND", "BACKEND", "LIMON", "MUSICA", "TECLADO", "MONITOR", "FELICIDAD"];
const maxErrores = 6;
const dibujo = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];

let seleccionarPalabra = "";
let palabraOculta = "";
let errores = 0;
let victorias = 0;
let derrotas = 0;

const seccionJuego = document.getElementById("game");
const containerPalabra = document.getElementById("word-cont");
const containerLetras = document.getElementById("letters");
const listaLetrasUsadas = document.getElementById("list");
const mensaje = document.getElementById("mensaje");
const erroresTexto = document.getElementById("errores");
const contadorVictorias = document.getElementById("win");
const contadorDerrotas = document.getElementById("loser");
const listaHistorial = document.getElementById("game_history");
const contenedorDibujo = document.getElementById("draw");

function jugar() {
    seccionJuego.style.display = "block";
    errores = 0;
    palabraOculta = [];
    seleccionarPalabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraOculta = Array(seleccionarPalabra.length).fill("_");
    containerPalabra.textContent = palabraOculta.join(" ");
    mensaje.textContent = "";
    listaLetrasUsadas.textContent = "";
    contenedorDibujo.innerHTML = "";
    generarLetras();
}

function generarLetras() {
    containerLetras.innerHTML = "";
    const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    alfabeto.forEach(letra => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.classList.add("letra-btn");
        btn.addEventListener("click", () => seleccionarLetra(letra, btn));
        containerLetras.appendChild(btn);
    });
}

function seleccionarLetra(letra, btn) {
    btn.disabled = true;
    btn.style.opacity = "0.5";

    if (seleccionarPalabra.includes(letra)) {
        for (let i = 0; i < seleccionarPalabra.length; i++) {
            if (seleccionarPalabra[i] === letra) {
                palabraOculta[i] = letra;
            }
        }
        containerPalabra.textContent = palabraOculta.join(" ");
        if (!palabraOculta.includes("_")) {
            victorias++;
            contadorVictorias.textContent = victorias;
            mensaje.textContent = `¡Ganaste con la palabra: ${seleccionarPalabra}!`;
            añadirHistorial(`Victoria. PALABRA: ${seleccionarPalabra}`);
            finalizarJuego();
        }
    } else {
        errores++;
        listaLetrasUsadas.textContent += letra + " ";
        erroresTexto.textContent = `Errores: ${errores}/${maxErrores}`;

        if (errores <= maxErrores) {
            const img = document.createElement("img");
            img.src = `img/${dibujo[errores - 1]}`;
            img.alt = "Parte del ahorcado";
            img.style.width = "200px";
            contenedorDibujo.appendChild(img);
        }

        if (errores >= maxErrores) {
            derrotas++;
            contadorDerrotas.textContent = derrotas;
            mensaje.textContent = `Perdiste, la palabra era: ${seleccionarPalabra}`;
            añadirHistorial(`Derrota. PALABRA: ${seleccionarPalabra}`);
            finalizarJuego();
        }
    }
}

function finalizarJuego() {
    const todosBotones = document.querySelectorAll(".letra-btn");
    todosBotones.forEach(btn => (btn.disabled = true));
}

function añadirHistorial(texto) {
    const li = document.createElement("li");
    li.textContent = texto;
    listaHistorial.appendChild(li);

    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(texto);
    localStorage.setItem("historial", JSON.stringify(historial));
}

window.addEventListener("load", () => {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.forEach(texto => {
        const li = document.createElement("li");
        li.textContent = texto;
        listaHistorial.appendChild(li);
    });
});

document.querySelector(".btn-play button").addEventListener("click", jugar);
