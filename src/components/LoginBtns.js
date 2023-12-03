import {Link} from "react-router-dom";

export default function LoginBtns() {
   return (
       <div className="LoginBtns col align-self-center">
           <div className="float-end btn-group-vertical w-50">
               <Link className="w-100" to='/login'>
                   <button className="btn btn-secondary w-100">Zaloguj się</button>
               </Link>
               <Link className="w-100" to='/register'>
                   <button className="btn btn-secondary mt-2 w-100">Zarejestruj się</button>
               </Link>
           </div>
       </div>
   )
}