import React, {useEffect} from "react";
import { TutoringOfferService } from "../services/TutoringOfferService";
import {TutoringOffer} from "../model/TutoringOfferModel";

export default function AddTutoringOffer() {
    const [description, setDescription] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [timeFrom, setTimeFrom] = React.useState()
    const [timeUntil, setTimeUntil] = React.useState()
    const [weekdays, setWeekdays] = React.useState({})
    const [subjects, setSubjects] = React.useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSubjects = await TutoringOfferService.getSubjects()
                setSubjects(fetchedSubjects)
                setSubject(fetchedSubjects[0])
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    }, []);

    const weekdayNames = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela']
    const weekdaysCheckboxes = weekdayNames.map((weekdayName) => {
        return {
            name: weekdayName,
            setValue: (value) => {
                setWeekdays((prev) => {
                    prev[weekdayName] = value
                    return prev
                })
            },
            value: weekdays[weekdayName]
        }
    })

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            let checkedWeekdays = []
            for (const [weekday, isChecked] of Object.entries(weekdays)) {
                if(isChecked) {
                    checkedWeekdays.push(weekday)
                }
            }
            const tutoringOffer = new TutoringOffer(description, location, subject, price, timeFrom, timeUntil, checkedWeekdays)
            const res = await TutoringOfferService.postOffer(tutoringOffer)
            setMessage(res)
        } catch(err) {
            if (err.response) {
                setMessage(err.response.data.message)
            } else {
                setMessage(err.message)
            }
        }
    }

    return (
    <form className="AddTutoringOffer m-4"
          onSubmit={ async (event) => { return await onSubmit(event) } }>
        <h2 className="text-center">Dodaj ofertę korepetycji</h2>
        <div className="form-group m-2">
            <label htmlFor="description" className="mb-1">Opis:</label>
            <textarea required className="form-control" id="description"
               onChange={event => { setDescription(event.target.value);}} value={ description }></textarea>
        </div>
        <div className="form-group m-2">
            <label htmlFor="subject" className="me-2">Przedmiot:</label>
            <select required id="subject"
                    onChange={event => { setSubject(event.target.value);}} value={subject}>
                { subjects.map(subject => {
                    return (<option value={subject}>{subject}</option>)
                })}
            </select>
        </div>
        <div className="form-group m-2">
            <label htmlFor="price" className="me-2">Cena za godzinę:</label>
            <input required type="number" id="price" min="0"
               onChange={event => { setPrice(event.target.value);}} value={ price }></input>
            <span className="ms-1">zł</span>
        </div>
        <div className="form-group m-2">
            <label htmlFor="location" className="mb-1">Lokalizacja:</label>
            <input type="text" required className="form-control" id="location"
               onChange={event => { setLocation(event.target.value);}} value={ location }></input>
        </div>
        <div className="form-group m-2">
            <label htmlFor="timeFrom" className="me-2">Dostępność od godziny:</label>
            <input className="text-center" required type="number" id="timeFrom" min="0" max="23"
               onChange={event => { setTimeFrom(event.target.value);}} value={ timeFrom }></input>
            <span>:00</span>
        </div>
        <div className="form-group m-2">
            <label htmlFor="timeUntil" className="me-2">do godziny:</label>
            <input className="text-center" required type="number" id="timeUntil" min="0" max="23"
               onChange={event => { setTimeUntil(event.target.value);}} value={ timeUntil }></input>
            <span>:00</span>
        </div>
        <div className="form-group m-2">
            <p>w dniach tygodnia:</p>
            { weekdaysCheckboxes.map(checkbox => {
                return (
                    <>
                    <label htmlFor={checkbox.name} className="me-1">{ checkbox.name }</label>
                    <input className="me-2" type="checkbox" id={checkbox.name} value={ checkbox.value }
                    onChange={event => { checkbox.setValue(event.target.checked);}}></input>
                    </>
                )
            })}
        </div>
        <button type="submit" className="btn btn-primary m-2 w-25">Zamieść ofertę</button>
        <p>{ message }</p>
    </form>
    )
}