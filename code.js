var params = new URLSearchParams(location.search);
var url = params.get("v");

var sourceelem = document.createElement("source");
sourceelem.setAttribute("src", url);
document.querySelector("video").appendChild(sourceelem);
// prevent focus
document.querySelector("video").addEventListener("focus", function() {
    this.blur();
});
/*document.querySelector("input[type=range]").addEventListener("focus", function() {
    this.blur();
});*/

var sliderBar = document.querySelector("input[type=range]");
var videoTag = document.querySelector("video");
var playBtn = document.querySelector("#pausePlay");
var fullScreenBtn = document.querySelector("#fullScreen");
videoTag.addEventListener("loadeddata", function() {
    sliderBar.setAttribute("min", 0); sliderBar.setAttribute("max", Math.floor(videoTag.duration));
    sliderBar.setAttribute("step", 0.001);
    sliderBar.addEventListener("input", function() {
        videoTag.currentTime = this.value;
    });

    var startTime = params.get("s");
    if (startTime) {
        videoTag.currentTime = parseFloat(startTime);
        sliderBar.value = videoTag.currentTime;
    }
    
    var myInterval
    var playVid = function() {
        myInterval = setInterval(function() { sliderBar.value = videoTag.currentTime; }, 1000 / 60);
        videoTag.play();
    };
    var pauseVid = function() {
        clearInterval(myInterval);
        videoTag.pause();
    };
    playBtn.addEventListener("change", function() {
        if (this.checked) playVid();
        else pauseVid();
    });
    videoTag.addEventListener("ended", function() {
        pauseVid();
        playBtn.checked = false;
    });
    var openFullscreen = function() {
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        } else if (document.body.webkitRequestFullscreen) { /* Safari */
            document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) { /* IE11 */
            document.body.msRequestFullscreen();
        }
    };
    var closeFullscreen = function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    };
    fullScreenBtn.addEventListener("change", function() {
        if (!this.checked) closeFullscreen();
        else openFullscreen();
    });
    document.body.addEventListener("fullscreenchange", function() {
        if (document.webkitIsFullScreen) {
            fullScreenBtn.checked = true;
        }
        else {
            fullScreenBtn.checked = false;
        }
    });
});