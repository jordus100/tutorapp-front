import React from "react";

export default function TutoringOfferComponent({ tutoringOffer }) {
    return (
        <div className="container w-100">
            <div className="row">
                <div className="col text-center">
                    Korepetytor:<br/>
                    { tutoringOffer.username }
                </div>
                <div className="col text-center">
                    Przedmiot:<br/>
                    { tutoringOffer.subject }
                </div>
                <div className="col text-center">
                    Cena:<br/>
                    { tutoringOffer.price } zł/h
                </div>
                <div className="col text-center">
                    Lokalizacja:<br/>
                    { tutoringOffer.location }
                </div>
                <div className="col-2 text-center">
                    Dostępność:<br/>
                    od { tutoringOffer.timeFrom } do {tutoringOffer.timeUntil}<br/>
                    w: { tutoringOffer.weekdays.map(day => {
                    return (
                        <span>{day} </span>
                    )})}
                </div>
                <div className="col-4">
                    Opis:<br/>
                    { tutoringOffer.description }
                </div>
            </div>
        </div>
    )
}