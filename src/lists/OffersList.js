import React, {useEffect} from "react";
import {TutoringOfferService} from "../services/TutoringOfferService";
import TutoringOfferComponent from "../components/TutoringOfferComponent";
import {Link} from "react-router-dom";

export default function OffersList() {
    const [tutoringOffers, setTutoringOffers] = React.useState([])
    const [subjects, setSubjects] = React.useState([])
    const [subject, setSubject] = React.useState('')
    const [allTutoringOffers, setAllTutoringOffers] = React.useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offers = await TutoringOfferService.getAllOffers()
                setTutoringOffers(offers)
                setAllTutoringOffers([...offers])
                const fetchedSubjects = await TutoringOfferService.getSubjects()
                setSubjects(fetchedSubjects)
                setSubject(fetchedSubjects[0])
            } catch(e) {
                console.log(e)
            }
        }
        fetchData()
    }, []);

    const onFilterClick = () => {
        setTutoringOffers(allTutoringOffers.filter(offer => offer.subject === subject))
    }

    return (
    <>
        <h1 className="text-center m-4">Oferta korepetycji</h1>
        <div className="container my-2 w-100">
            <select required id="subject"
                    onChange={event => { setSubject(event.target.value);}} value={subject}>
                { subjects.map(subject => {
                    return (<option value={subject}>{subject}</option>)
                })}
            </select>
            <button onClick={onFilterClick} className="btn btn-secondary ms-1">Filtruj</button>
        </div>
        {tutoringOffers.map(offer => {
            return (
            <div className="container p-2 w-100 border border-secondary">
                <div className="row">
                    <div className="col-10">
                        <TutoringOfferComponent tutoringOffer={offer}></TutoringOfferComponent>
                    </div>
                    <div className="col">
                        <Link to="/offers/signup" state={{tutoringOffer: offer}}>
                            <button className="btn btn-primary w-100">Zapisz się</button>
                        </Link>
                    </div>
                </div>
            </div>
            )
        })}
    </>)
}