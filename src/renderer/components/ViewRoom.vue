<template>
<room :stream="stream" :roomSettings="roomSettings" :isHost="false" class="room"></room>
</template>

<script>
import Room from './Room';

import Peer from 'peerjs';
import UuidV4 from 'uuid/v4'

export default {
    data: () => {
        return {
            stream: null,
            roomSettings: null
        }
    },
    components: {
        Room
    },
    mounted: function() {
        let self = this;
        let roomId = this.$route.params.room;
        self.$globalEventBus.$emit('changeTitle', 'Broadcast - connecting...');
        console.log('Connecting with: ' + roomId);

        let peer = new Peer(UuidV4().toUpperCase(), {
            host: 'sjoerddal.nl',
            secure: true,
            port: 9000,
            debug: 3
        });

        peer.on('open', () => {
            console.log('Connection open!');
            let dataConnection = peer.connect(roomId);
            dataConnection.on('error', () => {
                alert('That room ID does not exist.');
                self.$router.push('/');
            });
            dataConnection.on('data', (data) => {
                if(data.roomSettings) {
                    self.roomSettings = data.roomSettings;
                }
            });
        });

        peer.on('call', (mediaConnection) => {
            mediaConnection.answer(null);
            mediaConnection.on('stream', (stream) => {
                self.$globalEventBus.$emit('changeTitle', 'Broadcast - Room: ' + roomId);
                self.stream = stream;
            });
            mediaConnection.on('close', () => {
                alert('Host has stopped streaming.');
                self.$router.push('/');
            });
        });
    }
}
</script>
