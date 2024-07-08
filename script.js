// script.js
const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const progress = document.getElementById('progress');
const time = document.getElementById('time');
const muteUnmuteButton = document.getElementById('mute-unmute');
const volume = document.getElementById('volume');
const fullscreenButton = document.getElementById('fullscreen');

playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = 'Pause';
    } else {
        video.pause();
        playPauseButton.textContent = 'Play';
    }
});

video.addEventListener('timeupdate', () => {
    progress.value = (video.currentTime / video.duration) * 100;
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
    const totalMinutes = Math.floor(video.duration / 60);
    const totalSeconds = Math.floor(video.duration % 60).toString().padStart(2, '0');
    time.textContent = `${minutes}:${seconds} / ${totalMinutes}:${totalSeconds}`;
});

progress.addEventListener('input', () => {
    video.currentTime = (progress.value / 100) * video.duration;
});

muteUnmuteButton.addEventListener('click', () => {
    video.muted = !video.muted;
    muteUnmuteButton.textContent = video.muted ? 'Unmute' : 'Mute';
});

volume.addEventListener('input', () => {
    video.volume = volume.value;
});

fullscreenButton.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
});
