import React, {useEffect} from "react"
import {LessonService} from "../services/LessonService";
import TutoringOfferComponent from "../components/TutoringOfferComponent";

export default function StudentLessons() {
    const [message, setMessage] = React.useState('')
    const [studentLessons, setStudentLessons] = React.useState([])

    useEffect(() => {
        LessonService.getStudentLessons().then(fetchedStudentLessons => {
            fetchedStudentLessons.sort((lessonA, lessonB) => lessonA.dateStart > lessonB.dateEnd)
            const studentLessons = fetchedStudentLessons.map(lesson => {
                lesson.dateStart = new Date(lesson.dateStart)
                return lesson
            })
            setStudentLessons(studentLessons)
        }).catch(e => console.log(e))
    }, []);

    function onCancelLessonClicked(lesson) {
        LessonService.cancelStudentLesson(lesson._id).then(message => {
            setMessage(message)
            window.location.reload(false)
        }).catch(e => console.log(e))
    }

    return (
    <>
    <h1 className="text-center m-4">Zaplanowane korepetycje:</h1>
    {studentLessons.map(lesson => {
        return (
        <div className="container p-2 w-100 border border-secondary">
            <div className="row">
                <div className="col-9">
                        <TutoringOfferComponent tutoringOffer={lesson.offer[0]}></TutoringOfferComponent>
                </div>
                <div className="col">
                    Termin:<br/>
                    {
                        lesson.dateStart.toLocaleString('pl-PL', {
                        year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                </div>
                <div className="col">
                    <button className="btn btn-primary w-100" onClick={() => onCancelLessonClicked(lesson)}>Wypisz się</button>
                </div>
            </div>
        </div>
        )
    })}
    <p className="text-center">{message}</p>
    </>
    )
}
