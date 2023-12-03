import React from "react";
import { useNavigate } from 'react-router-dom';
import { UserService } from "../services/UserService";

export default function Register() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()
        UserService.registerUser(username, password).then(response => {
            navigate('/')
        }).catch((err) => {
            setPassword('')
            setUsername('')
            if (err.response) {
                setMessage(err.response.data.message)
            } else {
                setMessage(err.message)
            }
        })
    }

    return (
    <>
    <form className="Register m-4" onSubmit={ async (event) => { return await onSubmit(event) } }>
        <h2 className="text-center">Zarejestruj się w portalu <b><i>Korepetytor</i></b></h2>
        <div className="form-group m-2">
            <label htmlFor="username">nazwa użytkownika:</label>
            <input type="text" required className="form-control" id="username"
               onChange={event => { setUsername(event.target.value);}} value={ username }></input>
        </div>
        <div className="form-group m-2">
            <label htmlFor="password">hasło:</label>
            <input type="password" minLength="8" className="form-control" id="password" required
               onChange={event => { setPassword(event.target.value);}} value={ password }></input>
        </div>
        <button type="submit" className="btn btn-primary m-2 w-25">Zarejestruj się</button>
        <p>{ message }</p>
    </form>
    </>
   )
}