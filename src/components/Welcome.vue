<template>
<div class="container">
    <h1 class="mdc-typography--title">Welcome to Broadcast</h1>
    <p class="mdc-typography--subheading1">A quick and easy way to get a screenshare going. This makes it easy to play projector based games over the internet like Kahoot or Jackbox Games.</p>

    <button @click="hostRoom" class="mdc-button mdc-button--raised" data-mdc-auto-init="MDCRipple">Start a screenshare</button>

    <p>Or join an existing room using a room ID:</p>
    <div id="url" class="mdc-text-field" data-mdc-auto-init="MDCTextField">
        <input type="text" v-model="roomId" class="mdc-text-field__input">
        <label class="mdc-text-field__label" for="my-text-field">Room ID</label>
        <div class="mdc-text-field__bottom-line"></div>
    </div>
    <button @click="viewRoom" class="mdc-button mdc-button--raised" data-mdc-auto-init="MDCRipple">Join room</button>

    <aside id="my-mdc-dialog" class="mdc-dialog" role="alertdialog" aria-labelledby="my-mdc-dialog-label" aria-describedby="my-mdc-dialog-description">
        <div class="mdc-dialog__surface">
            <header class="mdc-dialog__header">
                <h2 id="my-mdc-dialog-label" class="mdc-dialog__header__title">Before you proceed...</h2>
            </header>
            <section id="my-mdc-dialog-description" class="mdc-dialog__body">
                Broadcast uses a peer-to-peer solution to stream someones screen to anyone joining the room. While this is great at eliminating the latency that other streaming services with a server in the middle have, it does expose your IP address to anyone joining
                the room. Do you still wish to proceed?
            </section>
            <footer class="mdc-dialog__footer">
                <button class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">No</button>
                <button @click="accept" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">Yes</button>
            </footer>
        </div>
        <div class="mdc-dialog__backdrop"></div>
    </aside>

</div>
</template>

<style scoped>
h1,
p {
    color: white;
}

.container {
    margin-left: 24px;
    margin-right: 24px;
}
</style>

<script>
import * as Mdc from 'material-components-web/dist/material-components-web.js';
import validator from 'validator';

let dialog;

export default {
    name: 'app',
    data: () => {
        return {
            roomId: '',
            routeAfterAccept: null,
        }
    },
    mounted: function() {
        dialog = new Mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));
        this.$globalEventBus.$emit('changeTitle', 'Broadcast - welcome');
    },
    methods: {
        hostRoom: function() {
            this.routeAfterAccept = '/host'
            dialog.show();
        },
        viewRoom: function() {
            let roomId = validator.escape(this.roomId);
            if (roomId.length === 36) {
                this.routeAfterAccept = '/view/' + roomId;
                dialog.show();
            } else {
                alert('Invalid room ID supplied!');
                return;
            }
        },
        accept: function() {
            this.$router.push(this.routeAfterAccept);
        }
    }
}
</script>
