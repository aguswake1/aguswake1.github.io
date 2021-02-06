/**
 * Abstracción de barra lateral
 * @constant barraLateral
 * @type {object}
*/
const barraLateral = document.querySelector(".js-playlist");
/**
* Solicitud a la API para la reproducción de la canción seleccionada
*
* @param {String} - url - URL de la canción para reproducir
*/
SoundCloudAPI.playMusic = (url) => {

    SC.oEmbed(url, {
        auto_play: true
    }).then((embed) => {

        //Agregado de nuevas tarjetas dinámicamente a la columna lateral izquierda
        barraLateral.innerHTML += 
        `
        <div>
            ${embed.html}
        </div>
        `;

        //Se actualiza el registro local de la playlist con las canciones que el cliente seleccionó
        localStorage.setItem("playlist", barraLateral.innerHTML);
    });
};
