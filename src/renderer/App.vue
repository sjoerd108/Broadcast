<template>
<div id="app" class="mdc-theme--dark">
    <toolbar></toolbar>
    <router-view class="router-view"></router-view>
    <snackbar></snackbar>
</div>
</template>

<script>
import Toolbar from './components/Toolbar';
import Snackbar from './components/Snackbar';

export default {
    name: 'app',
    components: {
        Toolbar,
        Snackbar
    }
}
</script>

<style scoped>
.router-view {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 64px;
    right: 0;
}
</style>
