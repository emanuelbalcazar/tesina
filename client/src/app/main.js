// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import store from '../store/index';
import router from '../router/index';
import VuesticPlugin from 'vuestic-ui/src/components/vuestic-plugin';
import VueClipboard from 'vue-clipboard2';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import '../i18n/index';
import { ColorThemePlugin } from 'vuestic-ui/src/services/ColorThemePlugin'
import VueCookies from 'vue-cookies';
import VueDatePicker from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

// Dialogs
import VModal from 'vue-js-modal'
Vue.use(VModal, { clickToClose: false })

// VUE CONFIGURATIONS...
// global configuration for axios.
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

// set token on header authorization
axios.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer " + VueCookies.get("token");
    store.commit('setLoading', true)
    return config;
}, error => Promise.reject(error)
);

axios.interceptors.response.use(
    response => {
        store.commit('setLoading', false);
        return response;
    },
    error => {
        store.commit('setLoading', false);
        return Promise.reject(error);
    }
);

// VUE IMPORTS...
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(VuesticPlugin);
Vue.use(VueClipboard);
Vue.use(ColorThemePlugin);
Vue.use(VueCookies);
// options: You can set lang by default
Vue.use(VueDatePicker, {
    lang: 'es'
});

// set default config
VueCookies.config('2h');

// ROUTER...
router.beforeEach((to, from, next) => {
    let hasToken = !!VueCookies.get('token');

    if (to.name == 'login' && hasToken) {
        return next({ name: 'dashboard' });
    }

    if ((to.name != 'login' && to.name != 'signup' && to.name != 'recover-password') && !hasToken) {
        return next({ name: 'login' });
    } else {
        store.commit('setLoading', true)
        return next()
    }
});

router.afterEach((to, from) => {
    store.commit('setLoading', false);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
