function delay_back() {
    document.getElementById("audio-regresar").play();
    setTimeout(() => {
      location.href = "../MenuPrincipal/index.html";
    }, 1600);
}

