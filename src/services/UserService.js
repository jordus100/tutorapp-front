import { Api } from './Api'
export const UserService = {

    registerUser: function(username, password) {
        return Api.post('/users/register', {
            username: username,
            password: password
        })
    },

    loginUser: function(username, password) {
        return Api.post('/users/login', {
            username: username,
            password: password
        })
    },

    logoutUser: function(username, password) {

    }
}