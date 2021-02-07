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
});