//jshint esversion: 6
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import * as Mdc from 'material-components-web/dist/material-components-web.min.js';

import Welcome from './components/Welcome';
import RoomHost from './components/RoomHost';
import ViewRoom from './components/ViewRoom';

Vue.use(VueRouter);

const routes = [
    {path: '*', component: Welcome},
    {path: '/view/:room', component: ViewRoom},
    {path: '/host', component: RoomHost}
];

const router = new VueRouter({
    routes: routes
});

Vue.prototype.$globalEventBus = new Vue();

new Vue({
    router,
    el: '#app',
    render: (h) => h(App)
});

Mdc.autoInit();
