const cartas = document.querySelectorAll('.carta');
const barajarBtn = document.getElementById('barajar');
let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false;
let puntaje = 50;

cartas.forEach(carta => {
  carta.addEventListener('click', voltearCarta);
});

cartas.forEach(carta => {
  carta.addEventListener('Enter', voltearCarta);
});

barajarBtn.addEventListener('click', barajarCartas);

function voltearCarta() {
  if (bloqueo) return;
  if (this === primeraCarta) return;

  this.classList.add('volteada');

  reproducirAudio(this);

  if (!primeraCarta) {
    primeraCarta = this;
    return;
  }

  segundaCarta = this;
  setTimeout(comprobarCoincidencia, 500);
}

function comprobarCoincidencia() {
  const nombreAudio = primeraCarta.dataset.audio;

  // Comprobar si se volteo las cartas iguaeles si es asi sumar
  if (primeraCarta.dataset.valor === segundaCarta.dataset.valor) {
    sumarPuntos(20); // Suma puntos cuando las cartas coinciden
  } else {
    restarPuntos(5); // Resta puntos cuando las cartas no coinciden
  }

  const coincidencia = primeraCarta.dataset.valor === segundaCarta.dataset.valor;
  coincidencia ? desactivarCartas() : volverCartas();
}

function sumarPuntos(puntos) {
  puntaje += puntos;
  actualizarPuntaje();
}

function restarPuntos(puntos) {
  puntaje -= puntos;
  actualizarPuntaje();
}

function actualizarPuntaje() {
  // Actualiza el elemento HTML donde mostrar el puntaje
  const puntajeElement = document.getElementById('puntaje'); // Debes tener un elemento con el id 'puntaje' en tu HTML
  puntajeElement.textContent = `Puntaje: ${puntaje}`;
}


function desactivarCartas() {
  primeraCarta.removeEventListener('click', voltearCarta);
  segundaCarta.removeEventListener('click', voltearCarta);
  resetearCartas();

  // Verificar si todas las cartas estan desactivadas (ganar el juego)
  if (document.querySelectorAll('.carta:not(.volteada)').length === 0) {
    alert('¡Ganaste el juego!');
    var audio = new Audio("../Audios/Audios2/GanasteElJuego.mp3");
    audio.play();
  }
}

function volverCartas() {
  bloqueo = true;
  setTimeout(() => {
    primeraCarta.classList.remove('volteada');
    segundaCarta.classList.remove('volteada');
    resetearCartas();
  }, 1000);
}

function resetearCartas() {
  [primeraCarta, segundaCarta] = [null, null];
  bloqueo = false;
}

// Modificado

document.addEventListener('keydown', function(event) {
  const focusedCard = document.activeElement;

  if (event.key === 'Enter') {
    if (!bloqueo && focusedCard.classList.contains('carta')) {
      voltearCarta.call(focusedCard);
    }
  }
});

function barajarCartas() {
    cartas.forEach(carta => {
      carta.classList.remove('volteada');
      carta.addEventListener('click', voltearCarta);
    });
  
    const cartasArray = Array.from(cartas);
    cartasArray.sort(() => Math.random() - 0.5);
  
    cartasArray.forEach((carta, index) => {
      carta.style.order = index;
      carta.setAttribute('tabindex', carta.style.order + 1);
    });

    // Audio barajear cartas
    var audio = new Audio("../Audios/Audios2/LasCartasFueronBa.mp3");
    audio.play();
    // Restablecer puntaje a 50
    puntaje = 50;
    const puntajeElement = document.getElementById('puntaje');
    puntajeElement.textContent = `Puntaje: ${puntaje}`;
}

barajarCartas();

// Audio

function reproducirAudio(carta) {
  // Obtener el elemento de audio de la carta y reproducirlo
  const audioCarta = carta.querySelector('.audio-carta');
  if (audioCarta) {
     audioCarta.play();
  }
}

function delay_back() {
  document.getElementById("audio-regresar").play();
  setTimeout(() => {
    location.href = "../MenuPrincipal/index.html";
  }, 1600);

  

  /*
  // Boton regresar
  document.getElementById("Regresar").onclick = function() {

    // Cambio de menu al principal
    location.href = "../MenuPrincipal/index.html";
  };
  */
}