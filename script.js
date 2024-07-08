// script.js
const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const progress = document.getElementById('progress');
const time = document.getElementById('time');
const muteUnmuteButton = document.getElementById('mute-unmute');
const volume = document.getElementById('volume');
const fullscreenButton = document.getElementById('fullscreen');
const tooltip = document.getElementById('tooltip');

playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        video.pause();
        playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
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

progress.addEventListener('mousemove', (e) => {
    const rect = progress.getBoundingClientRect();
    const pos = (e.pageX - rect.left) / rect.width;
    tooltip.style.left = `${pos * 100}%`;
    const hoverTime = pos * video.duration;
    const hoverMinutes = Math.floor(hoverTime / 60);
    const hoverSeconds = Math.floor(hoverTime % 60).toString().padStart(2, '0');
    tooltip.textContent = `${hoverMinutes}:${hoverSeconds}`;
    tooltip.style.display = 'block';
});

progress.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
});

muteUnmuteButton.addEventListener('click', () => {
    video.muted = !video.muted;
    muteUnmuteButton.innerHTML = video.muted ? '<i class="fa fa-volume-mute"></i>' : '<i class="fa fa-volume-up"></i>';
});

volume.addEventListener('input', () => {
    video.volume = volume.value;
});

fullscreenButton.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } 
