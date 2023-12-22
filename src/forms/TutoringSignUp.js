import React from "react";
import {useLocation} from "react-router-dom";
import TutoringOfferComponent from "../components/TutoringOfferComponent";
import DayTimePicker from '@mooncake-dev/react-day-time-picker'
import {WeekdayNamesMapping} from "../model/TutoringOfferModel";
import {LessonService} from "../services/LessonService";

export default function TutoringSignUp() {
    const [message, setMessage] = React.useState('')
    const [isScheduling, setIsScheduling] = React.useState(false)
    const [isScheduled, setIsScheduled] = React.useState(false)
    const [scheduleErr, setScheduleErr] = React.useState('')

    const location = useLocation()
    const { tutoringOffer } = location.state
    const timeSlotMins = 60

    const lessonTimesValidator = (slotTime) => {
        if(!tutoringOffer.weekdays.includes(WeekdayNamesMapping[slotTime.getDay()])) return false
        const workTimeStart = new Date(
            slotTime.getFullYear(),
            slotTime.getMonth(),
            slotTime.getDate(),
            tutoringOffer.timeFrom
        )
        const workTimeEnd = new Date(
            slotTime.getFullYear(),
            slotTime.getMonth(),
            slotTime.getDate(),
            tutoringOffer.timeUntil
        )
        return slotTime >= workTimeStart && slotTime <= workTimeEnd-1;
    }

    const onScheduledClick = async (scheduledDate) => {
        try {
            setScheduleErr('')
            setIsScheduling(true)
            const lessonEndDate = new Date(
                scheduledDate.getFullYear(),
                scheduledDate.getMonth(),
                scheduledDate.getDate(),
                scheduledDate.getHours() + 1
            )
            const res = await LessonService.signUpForLesson(tutoringOffer._id, scheduledDate, lessonEndDate)
            setIsScheduled(true)
            setMessage(res)
        } catch (e) {
            setMessage(e.message)
        } finally {
            setIsScheduling(false)
        }
    }

    return (
    <>
        <h1 className="text-center m-4">Zapisz się na korepetycje</h1>
        <TutoringOfferComponent tutoringOffer={tutoringOffer}></TutoringOfferComponent>
        <div className="time-slot-picker">
            <DayTimePicker timeSlotSizeMinutes={timeSlotMins} timeSlotValidator={lessonTimesValidator} onConfirm={onScheduledClick}
            isLoading={isScheduling} isDone={isScheduled} err={scheduleErr}></DayTimePicker>
        </div>
        <p className="text-center m-4">{message}</p>
    </>
    )
}