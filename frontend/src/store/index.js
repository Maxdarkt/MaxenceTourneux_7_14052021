import { createStore } from 'vuex'
const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

const store = createStore({
    state: {
        status: '',
        user: {
            id: -1,
            token: '',
            username: '',
            email: '',
            admin: '',
        },

    },
    getters: {

    },
    mutations: {
        setStatus: function(state, status) {
            state.status = status;
        },
        logUser: function(state, data) {
            state.user.id = data.data.id,
            state.user.username = data.data.username,
            state.user.email = data.data.email,
            state.user.admin = data.data.admin,
            state.user.token = data.token,
            instance.defaults.headers.common['Authorization'] = data.token
            // console.log(data.data)
            // console.log(data.token)
            //console.log('Bearen :'+instance.defaults.headers.common['Authorization'])
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos
        },
        clearStore: function (state) {
            state.status = '',
            state.user.id = -1,
            state.user.username = '',
            state.user.email = '',
            state.user.admin = '',
            state.user.token = ''
        },
    },
    actions: {
        login: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('auth/login', userInfos)
                .then(function (response) {
                    commit('setStatus', 'loading')
                    commit('logUser', response.data)
                    resolve(response)
                })
                .catch(function (error) {
                    commit('setStatus', 'error_login');
                    reject(error)
                });
            })
        },
        createAccount: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('auth/signup', userInfos)
                .then(function (response) {
                    commit('setStatus', 'created');
                    resolve(response)
                })
                .catch(function (error) {
                    commit('setStatus', 'error_create');
                    reject(error)
                });
            })
        },
        logout: ({ commit }) => {
            commit('clearStore')
        },
        delete: ({ commit }, userInfos) => {
            return new Promise((resolve, reject) => {
                instance.post('auth/delete', userInfos)
                .then(function (response) {
                    commit('setStatus', '');
                    commit('clearStore');
                    resolve(response)
                })
                .catch(function (error) {
                    commit('setStatus', 'error_create');
                    reject(error)
                });
            })
        },
    }
})

export default store