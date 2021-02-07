params = new URLSearchParams(location.search);
url = params.get("uri");

sourceelem = document.createElement("source");
sourceelem.setAttribute("src", url);
document.querySelector("video").appendChild(sourceelem);
// prevent focus
document.querySelector("video").addEventListener("focus", function() {
    this.blur();
});
document.querySelector("input[type=range]").addEventListener("focus", function() {
    this.blur();
});

sliderBar = document.querySelector("input[type=range]");
videoTag = document.querySelector("video");
playBtn = document.querySelector("#pausePlay");
fullScreenBtn = document.querySelector("#fullScreen");
videoTag.addEventListener("loadeddata", function() {
    sliderBar.setAttribute("min", 0); sliderBar.setAttribute("max", videoTag.duration);
    sliderBar.setAttribute("step", 0.01);
    sliderBar.addEventListener("input", function() {
        videoTag.currentTime = this.value;
    });
    playVid = function() {
        myInterval = setInterval(function() { sliderBar.value = videoTag.currentTime; }, 20);
        playBtn.src = "pause.png";
        videoTag.play();
    };
    pauseVid = function() {
        clearInterval(myInterval);
        playBtn.src = "play.png";
        videoTag.pause();
    };
    pausePlay.addEventListener("click", function() {
        if (videoTag.paused) {
            playVid();
        }
        else {
            pauseVid();
        }
    });
    videoTag.addEventListener("ended", pauseVid);
    fullscreened = false;
    openFullscreen = function() {
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        } else if (document.body.webkitRequestFullscreen) { /* Safari */
            document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) { /* IE11 */
            document.body.msRequestFullscreen();
        }
    };
    closeFullscreen = function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    };
    fullScreenBtn.addEventListener("click", function() {
        if (!fullscreened) {
            fullscreened = true;
            openFullscreen();
        }
        else {
            fullscreened = false;
            closeFullscreen();
        }
    });
    document.body.addEventListener("fullscreenchange", function() {
        if (!fullscreened) {
            fullScreenBtn.src = "fullscreen.png";
        }
        else {
            fullScreenBtn.src = "exitfullscreen.png";
        }
    });
});