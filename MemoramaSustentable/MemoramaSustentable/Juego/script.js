const cartas = document.querySelectorAll('.carta');
const barajarBtn = document.getElementById('barajar');
let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false;

cartas.forEach(carta => {
  carta.addEventListener('click', voltearCarta);
});

barajarBtn.addEventListener('click', barajarCartas);

function voltearCarta() {
  if (bloqueo) return;
  if (this === primeraCarta) return;

  this.classList.add('volteada');

  if (!primeraCarta) {
    primeraCarta = this;
    return;
  }

  segundaCarta = this;
  comprobarCoincidencia();
}

function comprobarCoincidencia() {
  const coincidencia = primeraCarta.dataset.valor === segundaCarta.dataset.valor;
  coincidencia ? desactivarCartas() : volverCartas();
}

function desactivarCartas() {
  primeraCarta.removeEventListener('click', voltearCarta);
  segundaCarta.removeEventListener('click', voltearCarta);
  resetearCartas();

  // Verificar si todas las cartas están desactivadas (ganar el juego)
  if (document.querySelectorAll('.carta:not(.volteada)').length === 0) {
    alert('¡Ganaste el juego!');
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

function barajarCartas() {
    // Desactivar todas las cartas
    cartas.forEach(carta => {
      carta.classList.remove('volteada');
      carta.addEventListener('click', voltearCarta);
    });
  
    cartas.forEach(carta => {
      const aleatorio = Math.floor(Math.random() * 8);
      carta.style.order = aleatorio;
    });
  }

barajarCartas();

document.getElementById("Regresar").onclick = function() {
  location.href = "../MenuPrincipal/index.html";
};