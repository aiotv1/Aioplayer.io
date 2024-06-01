document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("video");
    var overlay = document.getElementById("overlay");
    var playPauseButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");
    var currentTimeSpan = document.getElementById("current-time");
    var durationSpan = document.getElementById("duration");
    var fullscreenButton = document.getElementById("fullscreen");
    var settingsButton = document.getElementById("settings");
    var progressBar = document.getElementById("progress-bar");
    var loadingOverlay = document.querySelector(".loading-overlay");
    var contextMenu = document.getElementById("context-menu");
    var seekTooltip = document.getElementById("seek-tooltip");

    // Function to toggle play/pause state
    function togglePlayPause() {
        if (video.paused || video.ended) {
            video.play();
            overlay.style.opacity = 1;
            overlay.classList.add("playing");
            setTimeout(function() {
                overlay.style.opacity = 0;
            }, 1000);
        } else {
            video.pause();
            overlay.style.opacity = 1;
            overlay.classList.remove("playing");
            setTimeout(function() {
                overlay.style.opacity = 0;
            }, 1000);
        }
    }

    // Function to update play/pause button icon
    function updatePlayPauseButton() {
        if (video.paused || video.ended) {
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    // Function to update the seek bar
    function updateSeekBar() {
        var value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
        currentTimeSpan.textContent = formatTime(video.currentTime);
    }

    // Function to update the volume bar
    function updateVolumeBar() {
        volumeBar.value = video.volume;
        if (video.muted) {
            muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    // Function to format time in hh:mm:ss
    function formatTime(time) {
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time - (hours * 3600)) / 60);
        var seconds = Math.floor(time - (hours * 3600) - (minutes * 60));
        if (hours > 0) {
            return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        } else {
            return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        }
    }

    // Play/pause button click event
    playPauseButton.addEventListener("click", togglePlayPause);
    video.addEventListener("play", updatePlayPauseButton);
    video.addEventListener("pause", updatePlayPauseButton);
    video.addEventListener("timeupdate", updateSeekBar);

    // Seek bar change event
    seekBar.addEventListener("input", function() {
        var time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
    });

    // Mute button click event
    muteButton.addEventListener("click", function() {
        video.muted = !video.muted;
        updateVolumeBar();
    });

    // Volume bar change event
    volumeBar.addEventListener("input", function() {
        video.volume = volumeBar.value;
        video.muted = volumeBar.value === "0";
        updateVolumeBar();
    });

    // Fullscreen button click event
    fullscreenButton.addEventListener("click", function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    });

    // Show/Hide volume bar on hover
    muteButton.addEventListener("mouseenter", function() {
        volumeBar.style.display = "block";
    });
    muteButton.addEventListener("mouseleave", function() {
        volumeBar.style.display = "none";
    });

    // Show seek tooltip on hover
    seekBar.addEventListener("mousemove", function(e) {
        var rect = seekBar.getBoundingClientRect();
        var pos = (e.pageX - rect.left) / seekBar.offsetWidth;
        var time = video.duration * pos;
        seekTooltip.style.left = `${e.pageX - rect.left}px`;
        seekTooltip.textContent = formatTime(time);
        seekTooltip.style.display = "block";
    });

    seekBar.addEventListener("mouseleave", function() {
        seekTooltip.style.display = "none";
    });

    // Display loading overlay while buffering
    video.addEventListener("waiting", function() {
        loadingOverlay.style.display = "block";
    });

    video.addEventListener("canplay", function() {
        loadingOverlay.style.display = "none";
    });

    video.addEventListener("progress", function() {
        if (video.buffered.length > 0) {
            var bufferedEnd = video.buffered.end(video.buffered.length - 1);
            var duration = video.duration;
            if (duration > 0) {
                progressBar.value = (bufferedEnd / duration) * 100;
            }
        }
    });

    // Right-click context menu
    video.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.display = "block";
    });

    document.addEventListener("click", function() {
        contextMenu.style.display = "none";
    });

    document.getElementById("context-play-pause").addEventListener("click", function() {
        togglePlayPause();
    });

    document.getElementById("context-mute").addEventListener("click", function() {
        video.muted = !video.muted;
        updateVolumeBar();
    });

    document.getElementById("context-fullscreen").addEventListener("click", function() {
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

    // Show video duration
    video.addEventListener("loadedmetadata", function() {
        durationSpan.textContent = formatTime(video.duration);
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", function(e) {
        switch (e.key) {
            case " ":
            case "k":
                togglePlayPause();
                break;
            case "m":
                video.muted = !video.muted;
                updateVolumeBar();
                break;
            case "f":
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
                break;
            case "ArrowLeft":
                video.currentTime -= 5;
                break;
            case "ArrowRight":
                video.currentTime += 5;
                break;
            case "ArrowUp":
                video.volume = Math.min(video.volume + 0.1, 1);
                updateVolumeBar();
                break;
            case "ArrowDown":
                video.volume = Math.max(video.volume - 0.1, 0);
                updateVolumeBar();
                break;
        }
    });
});
