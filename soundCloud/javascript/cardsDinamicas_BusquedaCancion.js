/**
 * Petición a la API de SoundCloud para obtener información relacionada a la canción solicitada por el cliente 
 *
 * @param {string} - song - URL de la canción solicitada por el cliente
 */
SoundCloudAPI.getTrack = (song) => {

    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {

        q: song

    }).then((tracks) => {

        // promise --> if there is any track, then u show it on a card
        SoundCloudAPI.renderTrack(tracks);
    });
}



/**
* Detección de click para la agregar una canción a la playlist
*
* @param {String} - urlSong - URL de la canción seleccionada
* @listens document#click - Namespace: document
*                           Evento: click
*/
const reproducirCancion = (urlSong) => {
    
    /**
    * Solicitud a la API para la reproducción de la canción seleccionada
    *
    * @param {Object} - element.permalink_url - Permalink (URL) de la canción, disponible para reproducir
    */
    SoundCloudAPI.playMusic(urlSong);
}



/**
 * Template para la generación dinámica de cards con la información relevante de la canción
 *
 * @param {string} - imgUrl - URL de la imagen de cover de la tarjeta (Se previene la falta de imagen con una de default)
 * @param {string} - permaLink - Permalink (URL) de la canción, disponible para reproducir
 * @param {string} - titleSong - Titulo de la canción
 */
const cardForging = (imgUrl = 'http://lorempixel.com/100/100/abstract/', permaLink , titleSong) => {

    return `

        <div class="card">

            <div class="image">
                <img class="card_img" src="${imgUrl==null?"http://lorempixel.com/100/100/abstract/":imgUrl}">
            </div>

            <div class="content">
                <div class="header">
                    <a href="${permaLink}" target="_blank">${titleSong}</a>
                </div>
            </div>

            <div class="ui bottom attached button js-button" onClick="reproducirCancion('${permaLink}')">
                <i class="add icon"></i>
                <span>Add to playlist</span>
            </div>

        </div>
        
    `;
}



/**
 * Respuesta de la API de SoundCloud con información de la canción solicitada por el cliente
 *
 * @param {object} - tracks - Lista con las canciones que SoundClound encontró coincidentes con la petición
 */
SoundCloudAPI.renderTrack = (tracks) => {

    /**
     * Abstracción del tablero de las tarjetas
     * @constant searchResults
     * @type {object}
    */
    const searchResults = document.querySelector(".search-results");
    
    searchResults.innerHTML = ""; //Se limpia el tablero por cada nueva busqueda

    tracks.forEach( (element) => {

        //Agregado de nuevas tarjetas dinámicamente
        searchResults.innerHTML+= cardForging(element.artwork_url, element.permalink_url, element.title);
    });

}