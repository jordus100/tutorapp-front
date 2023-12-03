import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:4000'
})

export const UserService = {

    registerUser: function(username, password) {
        return api.post('/users/register', {
            username: username,
            password: password
        })
    },

    loginUser: function(username, password) {
        return api.post('/users/login', {
            username: username,
            password: password
        }, {withCredentials: true})
    },

    logoutUser: function(username, password) {

    }
}