import {Api} from './Api'

export const LessonService = {

    signUpForLesson: async function(offerId, startDate, endDate) {
        try {
            const res = await Api.post('/lessons/signup', {offerId: offerId, dateStart: startDate, dateEnd: endDate})
            return res.data.message
        } catch(err) {
            Api.processError(err)
        }
    },

    getStudentLessons: async function() {
        try {
            const res = await Api.get('/lessons/student')
            return res.data
        } catch(err) {
            Api.processError(err)
        }
    },

    getTutorLessons: async function() {
        try {
            const res = await Api.get('/lessons/tutor')
            return res.data
        } catch(err) {
            Api.processError(err)
        }
    },

    cancelStudentLesson: async function(lessonId) {
        try {
            const res = await Api.post('/lessons/student/cancel', {lessonId: lessonId})
            return res.data.message
        } catch(e) {
            Api.processError(e)
        }
    }

}
