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

    logoutUser: function() {
        try {
            return Api.post('/users/logout')
        } catch (e) {
            Api.processError(e)
        }
    }
}