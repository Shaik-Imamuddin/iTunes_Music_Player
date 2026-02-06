let songs = [];
let index = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("playBtn");
const player = document.getElementById("player");
const progress = document.getElementById("progress");

async function fetchSongs() {
    const res = await fetch(
        "https://itunes.apple.com/search?term=tamil&media=music&limit=100"
    );
    const data = await res.json();

    songs = data.results.filter(song => song.previewUrl);
    loadSong();
}

function loadSong() {
    if (songs.length === 0) return;

    const song = songs[index];
    title.innerText = song.trackName + " - " + song.artistName;
    audio.src = song.previewUrl;

    cover.style.backgroundImage =
        `url(${song.artworkUrl100.replace("100x100", "300x300")})`;
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
        player.classList.add("playing");
    } else {
        audio.pause();
        playBtn.textContent = "▶";
        player.classList.remove("playing");
    }
}

function nextSong() {
    index = (index + 1) % songs.length;
    loadSong();
    audio.play();
    playBtn.textContent = "⏸";
    player.classList.add("playing");
}

function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    loadSong();
    audio.play();
    playBtn.textContent = "⏸";
    player.classList.add("playing");
}

function setVolume(val) {
    audio.volume = val;
}

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
    nextSong();
});

fetchSongs();