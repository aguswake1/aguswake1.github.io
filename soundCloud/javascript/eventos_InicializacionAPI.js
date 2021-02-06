
/**
 * Instancia SoundCloudAPI que hereda los metodos de la API de SoundCloud
 * @constant SoundCloudAPI
 * @instance
 * @type {object}
*/
const SoundCloudAPI = {};

/**
 * Una vez que el navegador cargó el objeto se invoca la inicialización de la API de SoundCloud
 *
 * @param none
 * @listens window#onload - Namespace: window
 *                          Evento: onload
 */
window.onload = () => {

    /**
     * Inicialización de la API de SoundCloud con el client ID
     * @param none
     */
    SoundCloudAPI.init();

    //La idea es que la playlist se cargue ni bien termina de generarse el DOM
    barraLateral.innerHTML = localStorage.getItem("playlist");
};

/**
 * Inicialización de la API de SoundCloud con el client ID
 * @param none
 */
SoundCloudAPI.init = () => {

    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
};



/**
 * Abstracción de barra de navegación
 * @constant barraDeBusqueda
 * @type {object}
*/
const barraDeBusqueda = document.querySelector("input");

/**
 * Detección de tecla Enter presionada
 *
 * @param {KeyboardEvent} - teclaPresionada - Objeto que contiene información relevante sobre la tencla presionada
 * @listens document#keydown - Namespace: document
 *                             Evento: keydown
 */
barraDeBusqueda.addEventListener("keydown", (teclaPresionada) => {

    teclaPresionada.key == "Enter" ? SoundCloudAPI.getTrack(barraDeBusqueda.value) : undefined;
});



/**
 * Detección de click sobre lupa de busqueda
 *
 * @param {mouseEvent}
 * @listens document#click - Namespace: document
 *                           Evento: click
 */
document.querySelector(".js-submit").addEventListener("click", () => {

    SoundCloudAPI.getTrack(barraDeBusqueda.value);
});



/**
 * Abstracción del boton de borrado de playlist
 * @constant botonResetPlaylist
 * @type {object}
*/
const botonResetPlaylist = document.querySelector("button");

/**
 * Evento para el borrado del registro local de la playlist
 *
 * @param {mouseEvent}
 * @listens document#click - Namespace: document
 *                           Evento: click
 */
botonResetPlaylist.addEventListener("click", () => {

    localStorage.removeItem("playlist");
    location.replace("./index.html");
});