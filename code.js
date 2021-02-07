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
    pausePlay.addEventListener("click", function() {
        if (videoTag.paused) {
            myInterval = setInterval(function() { sliderBar.value = videoTag.currentTime; }, 20);
            playBtn.style.backgroundImage = "url(pause.png)";
            videoTag.play();
        }
        else {
            clearInterval(myInterval);
            playBtn.style.backgroundImage = "url(play.png)";
            videoTag.pause();
        }
    });
    videoTag.addEventListener("ended", function() {
        clearInterval(myInterval);
        playBtn.style.backgroundImage = "url(play.png)";
        videoTag.pause();
    });
});