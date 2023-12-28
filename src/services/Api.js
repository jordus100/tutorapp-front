import axios from "axios";
export const Api = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true
})

Api.processError = (err) => {
    if (err.response.data.message) {
        throw Error(err.response.data.message)
    } else {
        throw Error(err.message)
    }
}
