import { useEffect, useState } from "react"
import { monthEnum } from "../Services/Enum";
import arrow from '../Ressources/arrow.png';
import axios from "axios";

export function Calendar(){
    const [date, setDate] = useState(new Date());
    const [meet, setMeet] = useState(null);
    const [viewMeet, setViewMeet] = useState(null);
    useEffect(() => {
        const fetchData = async () => setMeet(await getMeet());
        fetchData();
    }, []);
    return(
        <div className="col-8">
            {/* head */}
            <div className="row my-3">
                <div className="col-12 text-center">
                    <h1>My Calendar</h1>
                </div>
            </div>
            {/* Year */}
            <div className="row my-3 justify-content-center align-items-center">
                <div className="col-2 text-center">
                    <button className="btn" onClick={() => setDate(new Date(date.getFullYear()-1, date.getMonth(), date.getDate()))}>
                        <img src={arrow} alt="arrow" style={{transform: "rotate(90deg)"}}/>
                    </button>
                </div>
                <div className="col-8 text-center">
                    <h2>{date.getFullYear()}</h2>
                </div>
                <div className="col-2 text-center">
                    <button className="btn" onClick={() => setDate(new Date(date.getFullYear()+1, date.getMonth(), date.getDate()))}>
                        <img src={arrow} alt="arrow" style={{transform: "rotate(270deg)"}}/>
                    </button>
                </div>
            </div>
            {/* Month */}
            <div className="row my-3 justify-content-center align-items-center">
                <div className="col-2 text-center">
                    <button className="btn" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth()-1, date.getDate()))}>
                        <img src={arrow} alt="arrow" style={{transform: "rotate(90deg)"}}/>
                    </button>
                </div>
                <div className="col-8 text-center">
                    <h2>{monthEnum[date.getMonth()]}</h2>
                </div>
                <div className="col-2 text-center">
                    <button className="btn" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth()+1, date.getDate()))}>
                        <img src={arrow} alt="arrow" style={{transform: "rotate(270deg)"}}/>
                    </button>
                </div>
            </div>
            <table className="w-100 text-center">
                <thead>
                    <tr>
                        <th>Dimanche</th>
                        <th>Lundi</th>
                        <th>Mardi</th>
                        <th>Mercredi</th>
                        <th>Jeudi</th>
                        <th>Vendredi</th>
                        <th>Samedi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getCalendar(date.getMonth(), date.getFullYear()).map((week, weekI) => {
                            return (
                                <tr key={weekI}>
                                    {week.map((day, dayI) => {
                                        return (
                                            <td className={`${meet && meet.find(m => m.date.getDate() === day.getDate() && m.date.getMonth() === day.getMonth() && m.date.getFullYear() === day.getFullYear()) ? "meet" : ""}`} key={dayI} style={{
                                                color: date.getDate() === day.getDate() && date.getMonth() === day.getMonth() ? "#FFFFFF" : day.getMonth() !== date.getMonth() ? "#95b0b4" : "inherit",
                                                background: date.getDate() === day.getDate() && date.getMonth() === day.getMonth() ? "#003d45" : "unset",
                                                borderRadius: "10px"
                                            }} onClick={() => {
                                                setDate(new Date(day.getFullYear(), day.getMonth(), day.getDate()));
                                                setViewMeet(meet && meet.filter(m => m.date.getDate() === day.getDate() && m.date.getMonth() === day.getMonth() && m.date.getFullYear() === day.getFullYear()) ? meet.find(elm => elm.id === meet.filter(m => m.date.getDate() === day.getDate())[0].id) : null);
                                            }}>{day.getDate()}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {viewMeet && (<section className="row" style={{boxShadow: "0 0 4 2 rgba(195, 241, 248, 0.3)"}}>
                <div className="col-12">
                    <h3>Détails d'un rendez vous</h3>    
                </div>
                <div className="col-12 text-center">
                    <h5>{viewMeet.title}</h5>
                </div>
                <div className="col-6">
                    <p>Contenu : </p>
                    <p>{viewMeet.body}</p>
                </div>
                <div className="col-6">
                    <p>Date : </p>
                    <p>{viewMeet.date.toString()}</p>
                </div>
            </section>)}
        </div>
    )
}

function getCalendar(month, year){
    let calendar = [[], [], [], [], []];
    const date = new Date(year, month, 1);
    let week = 0;
    // Retour au début de la semaine
    for (let i = date.getDay(); i > 0; i--) {
        if (date.getDate() === 1) {
            if (month === 0) {
                date.setMonth(11);
                date.setFullYear(year-1)
            }
            else{
                date.setMonth(month-1);
            }
            date.setDate(new Date(year, month, 0).getDate());
        }
        else{
            date.setDate(date.getDate() - 1);
        }
    }
    // Incrémentation de toutes les semaines de Dimanche a Samedi
    while (week !== 5) {
        // Débug mai
        calendar[week].push(new Date(date));
        date.getDay() === 6 && (week++);
        if (isNaN(date.getDay())) {
            break;
        }
        date.setDate(date.getDate() + 1);
    }
    return calendar;
}

async function getMeet(){
    let response = await axios.get('http://localhost:3001/meet').catch(err => err.response);
    if (response.status === 200) {
        response.data = response.data.map((elm, index) => {
            elm.date = new Date(elm.date);
            return elm
        });
        return response.data;
    }
    return null;
}