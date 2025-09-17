const tablero = document.getElementById('tablero').style.gridTemplateColumns = `repeat(${n}, 80px)`;
const mensaje = document.getElementById('mensaje');
let primeraCarta = null;
let segundaCarta = null;
let bloquear = false;
let paresEncontrados = 0;
let paresTotales = 0;
const imagenesDisponibles = {};

function iniciarJuego(tamaño){
    tablero.innerHTML = "";
    mensaje.textContent = "";
    primeraCarta = null;
    segundaCarta = null;
    bloquear = false;
    paresEncontrados = 0;
    tablero.style.gridTemplateColumns = `repeat(${tamaño}, 80px)`;
    tablero.style.gridTemplateRows = `repeat(${tamaño}, 80px)`;
    paresTotales = (tamaño*tamaño)/2;
    const seleccionadas = imagenesDisponibles.slice(0, paresTotales);
    let cartas = [...seleccionadas, ...seleccionadas];
    cartas.sort(()=> Math.random()- 0.5);
    cartas.forEach(src => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.innerHTML = `
            <div class="caraFrente"></div>
            <div class="caraAtras"><img src="${src}" alt="imagen"></div>
        `;
        carta.addEventListener('click', ()=> voltearCarta(carta, src));
        tablero.appendChild(carta);
    });
}

function voltearCarta(carta, src){
    if (bloquear || carta.classList.contains('volteada')) return;
    carta.classList.add('volteada');
    if (!primeraCarta){
        primeraCarta = {carta, src};
    }else if (!segundaCarta){
        segundaCarta = {carta, src};
        bloquear = true;
        if (primeraCarta.src === segundaCarta.src){
            paresEncontrados++;
            primeraCarta = null;
            segundaCarta = null;
            bloquear = false;
            if(paresEncontrados===paresTotales){
                mensaje.textContent = "¡Felicidades, ganaste en un tablero!" + (Math.sqrt(paresTotales*2)) + "x" + (Math.sqrt(paresTotales*2)) + "!";
            }
        }else{
            setTimeout(()=>{
                primeraCarta.carta.classList.remove('volteada');
                segundaCarta.carta.classList.remove('volteada');
                primeraCarta = null;
                segundaCarta = null;
                bloquear = false;
            }, 1000);
        }
    }
}
iniciarJuego(4);