import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true, // process.env.NODE_ENV !== 'production',
    getters: {
        config: state => state.app.config,
        palette: state => state.app.config.palette,
        isLoading: state => state.app.isLoading,
        getUser: state => state.app.auth.user,
        isAuthenticated: state => !!state.app.auth.token,
        authStatus: state => state.app.auth.status
    },
    modules: {
        app,
    },
    state: {},
    mutations: {}
});

Vue.use(VuexI18n.plugin, store);

export default store;
