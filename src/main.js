//jshint esversion: 6
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import * as Mdc from 'material-components-web/dist/material-components-web.min.js';

import Welcome from './components/Welcome.vue';
import RoomHost from './components/RoomHost.vue';
import ViewRoom from './components/ViewRoom.vue';

Vue.use(VueRouter);

const routes = [
    {path: '*', component: Welcome},
    {path: '/view/:room', component: ViewRoom},
    {path: '/host', component: RoomHost}
];

const router = new VueRouter({
    routes: routes
});

new Vue({
    router,
    el: '#app',
    render: (h) => h(App)
});

Mdc.autoInit();
