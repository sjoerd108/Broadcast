<template>
<div class="container">
    <div class="setup-wrapper">

        <p>Minimum framerate: {{ fps }}</p>

        <!-- slider -->
        <div class="mdc-slider mdc-slider--discrete mdc-slider--display-markers" tabindex="0" role="slider" aria-valuemin="5" data-step="5" aria-valuemax="60" aria-valuenow="30" aria-label="Select Value">
            <div class="mdc-slider__track-container">
                <div class="mdc-slider__track" style="transform: scaleX(0.454545);"></div>
                <div class="mdc-slider__track-marker-container"></div>
            </div>
            <div class="mdc-slider__thumb-container" style="transform: translateX(367.273px) translateX(-50%);">
                <div class="mdc-slider__pin">
                    <span class="mdc-slider__pin-value-marker"></span>
                </div>
                <svg class="mdc-slider__thumb" width="21" height="21">
                            <circle cx="10.5" cy="10.5" r="7.875"></circle>
                        </svg>
                <div class="mdc-slider__focus-ring"></div>
            </div>
        </div>

        <!-- checkbox audio -->
        <div class="mdc-form-field">
            <div class="mdc-checkbox">
                <input v-model="audio" v-bind:class="{ 'mdc-checkbox--disabled': !isAudioSupported}" type="checkbox" class="mdc-checkbox__native-control" />
                <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                            <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white"d="M1.73,12.91 8.1,19.28 22.79,4.59"/></svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                </div>
            </div>
            <label for="my-checkbox">Include desktop audio (Windows only)</label>
        </div>

        <!-- checkbox projector mode-->
        <div class="mdc-form-field">
            <div class="mdc-checkbox">
                <input @click="toggleProjectorMode" v-model="projectorMode" type="checkbox" class="mdc-checkbox__native-control" />
                <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                            <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white"d="M1.73,12.91 8.1,19.28 22.79,4.59"/></svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                </div>
            </div>
            <label for="my-checkbox">Enable projector games mode</label>
        </div>

        <!-- textfield -->
        <div id="url" class="mdc-text-field mdc-text-field--disabled" data-mdc-auto-init="MDCTextField">
            <input type="text" v-model="gameUrl" class="mdc-text-field__input">
            <label class="mdc-text-field__label" for="my-text-field">Projector game URL (e.g. https://kahoot.it/)</label>
            <div class="mdc-text-field__bottom-line"></div>
        </div>

        <source-picker @sourceSelect="onScreenSelected" class="picker"></source-picker>

        <button @click="onDone" class="mdc-button mdc-button--raised" data-mdc-auto-init="MDCRipple">Done</button>
    </div>
</div>
</template>

<script>
import SourcePicker from './SourcePicker';

import * as Mdc from 'material-components-web/dist/material-components-web';

const os = require('os');

let dialog;
let slider;

export default {
    data: () => {
        return {
            fps: 30,
            projectorMode: false,
            gameUrl: '',
            screenId: null,
            audio: true,
            isAudioSupported: false
        }
    },
    components: {
        SourcePicker
    },
    created: function() {
        console.log(os.platform());
        if(os.platform() === 'win32') {
            this.isAudioSupported = true;
        } else {
            this.audio = false;
        }
        this.$globalEventBus.$emit('changeTitle', 'Broadcast - setup');
    },
    mounted: function() {
        slider = new Mdc.slider.MDCSlider(document.querySelector('.mdc-slider'));
        slider.listen('MDCSlider:input', () => {
            this.fps = slider.value;
        });
        Mdc.autoInit();
    },
    methods: {
        toggleProjectorMode: function() {
            document.getElementById('url').MDCTextField.disabled = this.projectorMode;
        },
        onDone: function(event) {
            if (this.screenId === null) {
                alert('You need to select something to broadcast!');
                return;
            }
            this.$emit('setupDone', {
                fps: this.fps,
                gameUrl: this.gameUrl,
                projectorMode: this.projectorMode,
                screenId: this.screenId,
                audio: this.audio
            })
        },
        onScreenSelected: function(screen) {
            this.screenId = screen.id;
        }
    }
}
</script>


<style scoped>
p {
    color: white;
}

button {
    margin-top: 24px;
}

.container {
    padding-top: 24px;
}

.setup-wrapper {
    margin-left: 5%;
    width: 90%;
}

.mdc-text-field {
    width: 100%;
}

.picker {
    margin-top: 24px;
    width: 100%;
}
</style>
