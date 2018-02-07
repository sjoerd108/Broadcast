<template>
<div>

    <aside id="siteWarning" class="mdc-dialog" role="alertdialog" aria-labelledby="my-mdc-dialog-label" aria-describedby="my-mdc-dialog-description">
        <div class="mdc-dialog__surface">
            <header class="mdc-dialog__header">
                <h2 id="my-mdc-dialog-label" class="mdc-dialog__header__title">Projector mode enabled</h2>
            </header>
            <section id="my-mdc-dialog-description" class="mdc-dialog__body">
                The room creator is running in projector mode. This means that you can play along using the projector game's website.
                The site will be displayed alongside the stream. Only open websites if you trust room's creator. Would you like to
                open this site? ({{ gameUrl }})
            </section>
            <footer class="mdc-dialog__footer">
                <button class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">No</button>
                <button class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">Yes</button>
            </footer>
        </div>
        <div class="mdc-dialog__backdrop"></div>
    </aside>

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
import * as Mdc from 'material-components-web/dist/material-components-web.js';
import Split from 'split.js';
import validator from 'validator';

let dialog;

export default {
    data: () => {
        return {
            gameUrl: ''
        }
    },
    props: ['stream', 'isHost', 'roomSettings'],
    mounted: function() {
        dialog = new Mdc.dialog.MDCDialog(document.querySelector('#siteWarning'));
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
        },
        roomSettings: function(settings) {
            if(settings.projectorMode) {
                this.gameUrl = settings.gameUrl;
                dialog.show();
            }
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
