<template>
<div>
    <div class="mdc-select" role="listbox">
        <div class="mdc-select__surface" tabindex="0">
            <div class="mdc-select__label">Pick what you want to broadcast</div>
            <div class="mdc-select__selected-text"></div>
            <div class="mdc-select__bottom-line"></div>
        </div>
        <div class="mdc-simple-menu mdc-select__menu">
            <ul class="mdc-list mdc-simple-menu__items">
                <li v-for="screen in screens" class="mdc-list-item" role="option" tabindex="0">
                    {{screen.name}}
                </li>
            </ul>
        </div>
    </div>
    <div class="img-wrapper">
        <img :src="thumbnail">
    </div>
</div>
</template>

<script>
import * as Mdc from 'material-components-web/dist/material-components-web.js';

const desktopCapturer = require('electron').desktopCapturer;

export default {
    data: () => {
        return {
            screens: [],
            thumbnail: null
        }
    },
    mounted: function() {
        desktopCapturer.getSources({
            types: ['screen', 'window']
        }, (error, sources) => {
            console.log(sources);
            this.screens = sources;
        });
        const select = new Mdc.select.MDCSelect(document.querySelector('.mdc-select'));
        select.listen('MDCSelect:change', () => {
            let selected = this.screens[select.selectedIndex];
            this.thumbnail = selected.thumbnail.toDataURL();
            this.$emit('sourceSelect', selected);
        });
    }
}
</script>

<style scoped>
.img-wrapper {
    width: 100%;
}

img {
    margin-top: 24px;
}

.mdc-select {
    width: 100%;
    float: left;
}
</style>
