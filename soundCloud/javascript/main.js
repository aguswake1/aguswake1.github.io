/* 1. Search */

document.querySelector("input").addEventListener("keydown", (e) => {
    const search = document.querySelector("input").value;
    if (e.key == "Enter") {
        SoundCloudAPI.getTrack(search);
    }
});

document.querySelector(".js-submit").addEventListener("click", () => {
    const search = document.querySelector("input").value;
    SoundCloudAPI.getTrack(search);
});

/* 2. Query SoundCloud API */

var SoundCloudAPI = {};

SoundCloudAPI.init = function () {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(song) {
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: song
    }).then(function(tracks) {
        // promise --> if there is any track, then u show it on a card
        SoundCloudAPI.renderTrack(tracks);

    });
}


/* 3. Display the cards */
SoundCloudAPI.renderTrack = function (tracks) {

    const searchResults = document.querySelector(".search-results");
    searchResults.innerHTML = "";

    tracks.forEach(element => {
        console.log(element)
        // creating elements
        var card = document.createElement("div");
        var imageDiv = document.createElement("div");
        var img = document.createElement("img");
        var content = document.createElement("div");
        var header = document.createElement("div");
        var song = document.createElement("a");
        var button = document.createElement("div");
        var icon = document.createElement("i");
        var add = document.createElement("span");


        // adding attributes
        card.classList.add("card");
        imageDiv.classList.add("image");
        img.classList.add("image_img");
        img.src = element.artwork_url || 'http://lorempixel.com/100/100/abstract/';
        content.classList.add("content");
        header.classList.add("header");
        song.href = element.permalink_url;
        song.innerHTML = element.title;
        song.target = "_blank";
        button.classList.add("ui", "bottom", "attached", "button", "js-button");
        icon.classList.add("add", "icon");
        add.innerHTML = "Add to playlist";


        // appending child
        searchResults.appendChild(card);
        card.appendChild(imageDiv);
        imageDiv.appendChild(img);
        card.appendChild(content);
        content.appendChild(header);
        header.appendChild(song);
        card.appendChild(button);
        button.appendChild(icon);
        button.appendChild(add);

        // event
        button.addEventListener('click', function () {
            SoundCloudAPI.playMusic(element.permalink_url);
        });
    });
}

/* 4. Add to playlist and play */
SoundCloudAPI.playMusic = function (url) {
    SC.oEmbed(url, {
        auto_play: true
    }).then(function(embed){
        var display = document.querySelector(".js-playlist");
        var box = document.createElement('div');
        box.innerHTML = embed.html;
        // for multiple songs at the sime time, |insert box before the first child of display|
        display.insertBefore(box, display.firstChild);
        localStorage.setItem("key", display.innerHTML);
    });
}

var display = document.querySelector(".js-playlist");
display.innerHTML = localStorage.getItem("key");

// deleting playlist songs
var resetLocalStorage = document.querySelector("button");
resetLocalStorage.addEventListener("click", function () {
    localStorage.removeItem("key");
    location.replace("./index.html");
})