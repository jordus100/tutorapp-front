import {Api} from './Api'

export const TutoringOfferService = {

    getSubjects: async function() {
        const res = await Api.get('/offers/subjects')
        if(res.status !== 200) {
            throw Error(res.data)
        } else {
            return JSON.parse(res.data)
        }
    },

    postOffer: async function(tutoringOffer) {
        const res = await Api.post('/offers/post', tutoringOffer)
        if(res.status !== 200) {
            throw Error(res.data)
        } else {
            return res.data.message
        }
    },

    getAllOffers: async function() {
        try {
            return (await Api.get('/offers')).data
        } catch (e) {
            throw Error(e.message)
        }
    },

    signUpForLesson: async function(offerId, date) {
        try {
            const res = await Api.post('/offers/signup', {offerId: offerId, date: date})
            return res.data.message
        } catch(err) {
            if (err.response) {
                throw Error(err.response.data.message)
            } else {
                throw Error(err.message)
            }
        }
    }
}
