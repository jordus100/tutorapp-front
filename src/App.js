import './App.scss';
import LoginBtns from "./components/LoginBtns";
import {Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <div className="row mt-2">
          <div className="col">
          </div>
          <div className="col text-center">
            <h1 className="display-1">Korepetytor</h1>
          </div>
          <LoginBtns />
        </div>
        <div className="container-fluid mt-4">
          <div className="row justify-content-between mx-2">
            <Link className="col mx-2" to="/offers">
              <button className="btn btn-primary w-100 text-light">
                Przeglądaj listę korepetycji
              </button>
            </Link>
            <Link className="col mx-2" to="/offers/post">
              <button className="btn btn-primary w-100 text-light">
                Zamieść ofertę korepetycji
              </button>
            </Link>
            <Link className="col mx-2" to="/lessons/student">
              <button className="btn btn-primary w-100 text-light">
                Twoje korepetycje
              </button>
            </Link>
            <Link className="col mx-2" to="/lessons/tutor">
              <button className="btn btn-primary w-100 text-light">
                Zapisy na twoje korepetycje
              </button>
            </Link>
          </div>
          <p className="lead mt-4 mx-4">
            <b><i>Korepetytor</i></b> to platforma łącząca korepetytorów i ich uczniów. <br></br>
            Nie musisz decydować się na jedną, czy drugą rolę, możesz tutaj zamieszczać swoje oferty, jak i jednocześnie zapisywać się na korepetycje u innych.<br></br>
            Zarejetruj się i już teraz korzystaj z pełni oferty!
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
