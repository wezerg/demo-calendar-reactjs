import axios from "axios";
import { useState } from "react";

export function RendezVous(){
    const [error, setError] = useState(null);
    return(
        <div className="col-8">
            {/* head */}
            <div className="row my-3">
                <div className="col-12 text-center">
                    <h1>Créer un nouveau rendez-vous</h1>
                </div>
            </div>
            {/* form */}
            <div className="row my-3">
                <div className="col-12">
                    <form action="POST" onSubmit={(ev) => sendForm(ev, setError)}>
                        <label htmlFor="" className="form-text">Date <span style={{color: "red"}}>*</span></label>
                        <input className="form-control mb-3" type="date" name="date"/>
                        <label htmlFor="" className="form-text">Titre <span style={{color: "red"}}>*</span></label>
                        <input className="form-control mb-3" type="text" name="title"/>
                        <label htmlFor="" className="form-text">Corps <span style={{color: "red"}}>*</span></label>
                        <textarea className="form-control mb-3" name="body"cols="30" rows="10"></textarea>
                        <p className="text-center mb-0" style={{color: "red"}}>{error}</p>
                        <button type="submit" className="btn btn-success w-100 mt-1">Créer rendez-vous</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

async function sendForm(e, setError){
    e.preventDefault();
    const date = e.target[0].value;
    const title = e.target[1].value;
    const body = e.target[2].value;
    const data = {date, title, body};
    if (date && title && body) {
        let response = await axios.post("http://localhost:3001/meet", data).catch(err => err.response);
        switch (response.status) {
            case 201:
                window.location.href = "http://localhost:3000";
                break;
            default:
                setError("Une erreur s'est produite lors de la création de votre rendez-vous.");
                break;
        }
    }
    else{
        setError('Un des champs est vide');
    }

}