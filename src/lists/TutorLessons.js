import React, {useEffect} from "react"
import {LessonService} from "../services/LessonService";
import TutoringOfferComponent from "../components/TutoringOfferComponent";

export default function TutorLessons() {
    const [tutorLessons, setTutorLessons] = React.useState([])

    useEffect(() => {
        LessonService.getTutorLessons().then(fetchedTutorLessons => {
            fetchedTutorLessons.sort((lessonA, lessonB) => lessonA.dateStart > lessonB.dateEnd)
            const tutorLessons = fetchedTutorLessons.map(lesson => {
                lesson.dateStart = new Date(lesson.dateStart)
                return lesson
            })
            setTutorLessons(tutorLessons)
        }).catch(e => console.log(e))
    }, []);

    return (
        <>
        <h1 className="text-center m-4">Zapisy na twoje korepetycje</h1>
        {tutorLessons.map(offer => {
            if(!offer.lessons[0]) return
            else return (
                <>
                <div className="mb-3">
                    <div className="container p-2 w-100 border border-primary">
                        <TutoringOfferComponent tutoringOffer={offer}></TutoringOfferComponent>
                    </div>
                    {offer.lessons.map(lesson => {
                        return (
                        <div className="container p-2 w-100 border border-secondary">
                            <div className="row">
                                <div className="col text-center">
                                    Uczeń:<br/>
                                    {lesson.username}
                                </div>
                                <div className="col text-center">
                                    Termin:<br/>
                                    {
                                        new Date(lesson.dateStart).toLocaleString('pl-PL', {
                                            year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                                    })}
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
                </>
            )
        })}
        </>
    )
}
