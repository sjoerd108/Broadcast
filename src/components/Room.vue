<template>
<div>
    <div id="leftPane" class="split split-horizontal">
        <div class="videoWrapper">
            <video id="video" class="videoElement" autoplay></video>
        </div>
    </div>
    <div id="rightPane" class="split split-horizontal">
        <webview class="game"></webview>
    </div>
</div>
</template>

<script>
import Split from 'split.js';

export default {
    props: ['stream', 'isHost'],
    mounted: function() {
        Split(['#leftPane', '#rightPane'], {
            sizes: [80, 20],
            gutterSize: 8,
            cursor: 'col-resize'
        });
        let video = document.getElementById('video');
        video.muted = this.isHost;
    },
    watch: {
        stream: function(stream) {
            console.log(stream);
            let video = document.getElementById('video');
            video.srcObject = stream;
        }
    }
}
</script>

<style scoped>

.videoElement {
    transform: translate(-50%, -50%);
    position: absolute;
    vertical-align: middle;
    margin: auto;
    height: auto;
    width: auto;
    top: 50%;
    left: 50%;
    max-height: 100%;
    max-width: 100%;
    z-index: 3;
}

.videoWrapper {
    position: relative;
    height: 100%;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background: black;
}

.game {
    width: 100%;
    height: 100%;
}
</style>
