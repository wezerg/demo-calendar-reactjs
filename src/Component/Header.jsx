import { Link } from "react-router-dom";

export function Header(){
    return (
        <header>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid justify-content-end">
                    <Link to={"/"}>
                        <span className="navbar-brand mb-0 h1">Calendar React JS</span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}