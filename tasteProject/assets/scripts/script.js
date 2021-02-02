// Cambio animación cuando se cierra cada blog.
let regresar = document.querySelectorAll(".volver");

regresar.forEach(function(volver){
    volver.addEventListener("click", function(ev){
        ev.preventDefault();
        let content = document.querySelector(".content");

        content.classList.remove("animate__fadeInDown");
        content.classList.remove("animate__animated");

        content.classList.add("animate__fadeOutUp");
        content.classList.add("animate__animated");

        // Antes de volver al home doy tiempo para que se ejecute la animación.
        setTimeout(function (){
            location.href = "/index.html";
        },350)
        return false;
    });
});


