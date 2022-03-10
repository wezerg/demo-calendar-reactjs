import { Link } from "react-router-dom";
import calendarImg from '../Ressources/calendar.png';
import dateImg from '../Ressources/rendezvous.png';

export function Aside(){
    return (
        <aside>
            <ul>
                <li>
                    <Link to={'/'}>
                        <img src={calendarImg} alt="calendar" />    
                    </Link>
                </li>
                <li className="mt-4">
                    <Link to={'/rdv'}>
                        <img src={dateImg} alt="rendezvous" />    
                    </Link>
                </li>
            </ul>
        </aside>
    )
}