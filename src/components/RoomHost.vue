<template>
<div>
    <room-setup v-show="inSetup" @setupDone="initStream"></room-setup>
    <room :stream="stream" :isHost="true" class="room" v-show="!inSetup"></room>
</div>
</template>

<script>
import RoomSetup from './RoomSetup.vue';
import Room from './Room.vue';
import Peer from 'peerjs';
import GUM from '../js/GUM.js';
import UuidV4 from 'uuid/v4'

export default {
    name: 'room-host',
    data: () => {
        return {
            inSetup: true,
            stream: null,
            roomId: null,
            roomSettings: null
        }
    },
    components: {
        RoomSetup,
        Room
    },
    methods: {
        initStream: function(params) {
            this.inSetup = false;
            this.roomSettings = params;

            GUM.getStream(params.fps, params.screenId, params.audio, (stream) => {
                this.stream = stream;
                this.broadcastStream(stream)
            }, console.error);
        },
        broadcastStream: function(stream) {
            let self = this;
            let roomId = UuidV4().toUpperCase();
            console.log('Registering with RoomId: ' + roomId);

            let peer = new Peer(roomId, {
                host: 'sjoerddal.nl',
                secure: true,
                port: 9000,
                debug: 3
            });

            peer.on('open', () => {
                console.log('Connection open!');
            });

            peer.on('connection', (dataConnection) => {
                dataConnection.on('open', () => {
                    console.log('Sending settings...');
                    dataConnection.send(self.roomSettings);
                });
                peer.call(dataConnection.peer, this.stream);
            });
        }
    }
}
</script>

<style scoped>
.room {
    height: 100%;
}
</style>
