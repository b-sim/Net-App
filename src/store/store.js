import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        isUserAdmin: false
    },
    mutations: {
        setToken (state, token) {
            state.token = token;
            if (token) {
                state.isUserLoggedIn = true;
            } else {
                state.isUserLoggedIn = false;
            }
        },
        setUser (state, user) {
            state.user = user;
            if (user) {
                if (user.email === 'simon@mail.com') {
                    state.isUserAdmin = true;
                } else {
                    state.isUserAdmin = false;
                }
            }
        }
    },
    actions: {
        setToken({commit}, token) {
            commit('setToken', token);
        },
        setUser({commit}, User) {
            commit('setUser', User);
        }
    }
})