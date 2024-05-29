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

    var progressBar = document.getElementById("progress-bar");
    var loadingOverlay = document.querySelector(".loading-overlay");

    // Function to toggle play/pause state
    function togglePlayPause() {
        if (video.paused || video.ended) {
            video.play();
            overlay.classList.add("playing");
        } else {
            video.pause();
            overlay.classList.remove("playing");
        }
    }

    // Event listener for play/pause button click
    playPauseButton.addEventListener("click", togglePlayPause);

    // Event listener for video click
    video.addEventListener("click", togglePlayPause);

    // Event listener for mute button click
    muteButton.addEventListener("click", function() {
        video.muted = !video.muted;
        if (video.muted) {
            muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    // Event listener for seek bar input
    seekBar.addEventListener("input", function() {
        var time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
    });

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function() {
        var value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
        currentTimeSpan.textContent = formatTime(video.currentTime);
        durationSpan.textContent = formatTime(video.duration);
    });

    // Update the video volume
    volumeBar.addEventListener("input", function() {
        video.volume = volumeBar.value;
    });

    // Fullscreen mode
    fullscreenButton.addEventListener("click", function() {
        var videoContainer = document.getElementById("video-container");
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) { // Firefox
            videoContainer.mozRequestFullScreen();
        } else if (videoContainer.webkitRequestFullscreen) { // Chrome and Safari
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { // IE/Edge
            videoContainer.msRequestFullscreen();
        }
    });

    // Show overlay when video starts or pauses
    video.addEventListener("play", function() {
        overlay.style.opacity = 1;
        setTimeout(function() {
            overlay.style.opacity = 0;
        }, 1500); // Adjust the duration of the overlay appearance before fading out
    });

    video.addEventListener("pause", function() {
        overlay.style.opacity = 1;
        setTimeout(function() {
            overlay.style.opacity = 0;
        }, 1500); // Adjust the duration of the overlay appearance before fading out
    });

    // Update the overlay icon when video ends
    video.addEventListener("ended", function() {
        overlay.classList.remove("playing");
    });

    // Stop video when space bar is pressed
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            togglePlayPause();
        }
    });

    // Format time in minutes and seconds
    function formatTime(seconds) {
        var min = Math.floor(seconds / 60);
        var sec = Math.floor(seconds % 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        return min + ":" + sec;
    }

    video.addEventListener("loadedmetadata", function() {
        var duration = video.duration;
        progressBar.max = duration;
    });

    video.addEventListener("progress", function() {
        var bufferedEnd = video.buffered.end(0);
        var duration = video.duration;
        if (duration > 0) {
            progressBar.value = (bufferedEnd / duration) * 100;
        }
    });

    video.addEventListener("timeupdate", function() {
        var currentTime = video.currentTime;
        progressBar.value = currentTime;
    });

    video.addEventListener("waiting", function() {
        loadingOverlay.style.display = "block";
    });

    video.addEventListener("playing", function() {
        loadingOverlay.style.display = "none";
    });
});
