import React from "react";
import {Link} from "react-router-dom";
import {GlobalStateContext} from "../services/GlobalStateProvider";
import {useContext} from "react";
import {UserService} from "../services/UserService";

export default function LoginBtns() {
    const [ user, saveUser, unsetUser ] = useContext(GlobalStateContext);

    const onLogoutClick = async (event) => {
        event.preventDefault()
        UserService.logoutUser().then(() => {
            unsetUser()
        }).catch(e => {
            console.log(e)
        })
    }

    let buttons
    if (user.username) {
        buttons = (
            <>
            <Link className="w-100" to=''>
                <button className="btn btn-secondary w-100">{user.username}</button>
            </Link>
            <Link className="w-100" to='/'>
                <button className="btn btn-secondary mt-2 w-100"
                onClick={ async (event) => { return await onLogoutClick(event) } }>Wyloguj się</button>
            </Link>
            </>
        )
    } else {
        buttons = (
            <>
            <Link className="w-100" to='/login'>
                <button className="btn btn-secondary w-100">Zaloguj się</button>
            </Link>
            <Link className="w-100" to='/register'>
                <button className="btn btn-secondary mt-2 w-100">Zarejestruj się</button>
            </Link>
            </>
        )
    }
    return (
       <div className="LoginBtns col align-self-center">
           <div className="float-end btn-group-vertical w-50">
               {buttons}
           </div>
       </div>
    )
}