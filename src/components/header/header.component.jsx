import "./header.styles.scss";
import {useLocation} from "react-router-dom";

const Header = () => {
    const location = useLocation()
    return (
        <header className="header">
            <div className="logo-container">
               <h3>Fatmug |</h3>
                <p>Greetings! UserName</p>
            </div>
            <ul className="buttons">
                <li>
                    {
                        location.pathname === "/create-article" ? (
                            <button className="write">Publish</button>
                        ):(
                            location.pathname === "/update-article" ? (
                                <button className="write">Update</button>
                            ):(
                                <button className="write">Write</button>
                            )
                        )
                    }
                </li>
                <li>
                    <button className="your-articles">Your Articles</button>
                </li>
                <li>
                    <button className="logout">Logout</button>
                </li>
            </ul>
        </header>
    )
}

export default Header;