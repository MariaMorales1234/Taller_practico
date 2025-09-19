const tablero = document.getElementById('tablero');
const mensaje = document.getElementById('mensaje');
const spanIntentos = document.getElementById('intentos');
const spanTiempo = document.getElementById('tiempo');
const spanMejor = document.getElementById('mejor');

let primeraCarta = null;
let segundaCarta = null;
let bloquear = false;
let paresEncontrados = 0;
let paresTotales = 0;
let intentos = 0;
let tiempo = 0;
let timer = null;

const imagenesDisponibles = [
    "img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png","img/10.png",
    "img/11.png","img/12.png","img/13.png","img/14.png","img/15.png","img/16.png","img/17.png","img/18.png","img/19.png","img/20.png",
    "img/21.png","img/22.png","img/23.png","img/24.png","img/25.png","img/26.png","img/27.png","img/28.png","img/29.png","img/30.png",
    "img/31.png","img/32.png","img/33.png","img/34.png","img/35.png","img/36.png","img/37.png","img/38.png","img/39.png","img/40.png",
    "img/41.png","img/42.png","img/43.png","img/44.png","img/45.png","img/46.png","img/47.png","img/48.png","img/49.png","img/50.png"
];

function iniciarJuego(tamaño){
    tablero.innerHTML = "";
    mensaje.textContent = "";
    primeraCarta = null;
    segundaCarta = null;
    bloquear = false;
    paresEncontrados = 0;
    intentos = 0;
    tiempo = 0;
    clearInterval(timer);

    spanIntentos.textContent = "Intentos: 0";
    spanTiempo.textContent = "Tiempo: 0s";

    tablero.style.gridTemplateColumns = `repeat(${tamaño}, 80px)`;
    tablero.style.gridTemplateRows = `repeat(${tamaño}, 80px)`;

    paresTotales = (tamaño * tamaño) / 2;

    const seleccionadas = imagenesDisponibles.slice(0, paresTotales);
    let cartas = [...seleccionadas, ...seleccionadas];
    cartas.sort(() => Math.random() - 0.5);

    cartas.forEach(src => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.innerHTML = `
            <div class="cara caraFrente"></div>
            <div class="cara caraAtras"><img src="${src}" alt="imagen"></div>
        `;
        carta.addEventListener('click', () => voltearCarta(carta, src));
        tablero.appendChild(carta);
    });

    timer = setInterval(() => {
        tiempo++;
        spanTiempo.textContent = `Tiempo: ${tiempo}s`;
    }, 1000);
}

function voltearCarta(carta, src){
    if (bloquear || carta.classList.contains('volteada')) return;

    carta.classList.add('volteada');

    if (!primeraCarta){
        primeraCarta = {carta, src};
    } else if (!segundaCarta){
        segundaCarta = {carta, src};
        bloquear = true;
        intentos++;
        spanIntentos.textContent = `Intentos: ${intentos}`;

        if (primeraCarta.src === segundaCarta.src){
            paresEncontrados++;
            primeraCarta = null;
            segundaCarta = null;
            bloquear = false;

            if (paresEncontrados === paresTotales){
                clearInterval(timer);
                mensaje.textContent = `🎉 ¡Ganaste en ${intentos} intentos y ${tiempo}s!`;

                guardarMejores(intentos, tiempo);
            }
        } else {
            setTimeout(() => {
                primeraCarta.carta.classList.remove('volteada');
                segundaCarta.carta.classList.remove('volteada');
                primeraCarta = null;
                segundaCarta = null;
                bloquear = false;
            }, 1000);
        }
    }
}

function guardarMejores(nuevosIntentos, nuevoTiempo){
    let mejor = JSON.parse(localStorage.getItem("mejorMemorama")) || {intentos: null, tiempo: null};

    let actualizar = false;

    if (mejor.intentos === null || nuevosIntentos < mejor.intentos){
        mejor.intentos = nuevosIntentos;
        actualizar = true;
    }
    if (mejor.tiempo === null || nuevoTiempo < mejor.tiempo){
        mejor.tiempo = nuevoTiempo;
        actualizar = true;
    }

    if (actualizar){
        localStorage.setItem("mejorMemorama", JSON.stringify(mejor));
    }

    mostrarMejor();
}

function mostrarMejor(){
    let mejor = JSON.parse(localStorage.getItem("mejorMemorama"));
    if (mejor){
        spanMejor.textContent = `Mejor: ${mejor.intentos ?? "--"} intentos, ${mejor.tiempo ?? "--"}s`;
    }
}

mostrarMejor();