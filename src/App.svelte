<script>
    var urlParams = new URLSearchParams(location.search);
    var vidRL = urlParams.get("v"); // https%3A%2F%2Fwww.w3schools.com%2Fhtml%2Fmov_bbb.mp4
    var videoElement;

    export let name;
</script>

<video bind:this={vidRL}>
    <source src={vidRL} type="video/mp4" />
    <track kind="captions" />
</video>

<br />
<button on:click={function() {
    if (videoElement.paused) videoElement.play();
    else videoElement.pause();
}}>play/pause</button>

<br />
<input
    type="range"
    min={0}
    max={videoElement.duration}
    bind:value={videoElement.currentTime}
    />

<style>

</style>