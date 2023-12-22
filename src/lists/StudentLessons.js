import React, {useEffect} from "react"
import {LessonService} from "../services/LessonService";
import TutoringOfferComponent from "../components/TutoringOfferComponent";

export default function StudentLessons() {
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

    return (
    <>
    <h1 className="text-center m-4">Zaplanowane korepetycje:</h1>
    {studentLessons.map(lesson => {
        return (
        <div className="container p-2 w-100 border border-secondary">
            <div className="row">
                <div className="col-10">
                        <TutoringOfferComponent tutoringOffer={lesson.offer[0]}></TutoringOfferComponent>
                </div>
                <div className="col">
                    Termin:<br/>
                    {
                        lesson.dateStart.toLocaleString('pl-PL', {
                        year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                </div>
            </div>
        </div>
        )
    })}
    </>
    )
}
