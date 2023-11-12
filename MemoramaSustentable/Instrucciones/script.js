// Obtener el parrafo y el boton
var miParrafo = document.getElementById("miParrafo");
var botonReproducir = document.getElementById("reproducirBtn");

// Agregar un evento de clic al boton
botonReproducir.addEventListener("click", function() {
    // Crear un nuevo objeto de habla
    var habla = new SpeechSynthesisUtterance(miParrafo.textContent);

    // Reproducir el texto
    window.speechSynthesis.speak(habla);
});

function delay_back() {
    document.getElementById("audio-regresar").play();
    setTimeout(() => {
      location.href = "../MenuPrincipal/index.html";
    }, 1600);
}

