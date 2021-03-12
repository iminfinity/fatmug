import "./header.styles.scss";
import {useLocation, useHistory} from "react-router-dom";
import { useUserData } from "../../data/user.context";

const Header = ({effect, buttonText}) => {
    const {firstName, lastName,signedIn} = useUserData()
    const location = useLocation()
    const history = useHistory()
    
    const showButton = () => {
        switch(location.pathname){
            case "/create-article": return (
                    <button className="write" onClick={effect}>{buttonText}</button>
                )
            case "/":
            case "/my-articles": return (
                <button className="write" onClick={()=>history.push("/create-article")}>Write</button>
            )
            default: return (
                <button className="write" onClick={effect}>{buttonText}</button>
            )   
        }
    }

    return (
        <header className="header">
            <div className="logo-container">
               <h3 onClick={()=>history.push("/")}>Fatmug |</h3>
               {
                   signedIn ? (
                     <p>Greetings! {firstName} {lastName}</p>  
                   ): null
               }
                
            </div>
            <ul className="buttons">
                <li>
                    {
                        showButton()
                        // location.pathname === "/create-article" ? (
                        //     <button className="write" onClick={effect}>{buttonText}</button>
                        // ):(
                        //     location.pathname === "/" ? (
                        //         <button className="write" onClick={()=>history.push("/create-article")}>Write</button>
                        //     ):(
                        //         <button className="write" onClick={effect}>{buttonText}</button>
                        //     )
                        // )
                    }
                </li>
                <li>
                    <button className="your-articles" onClick={()=>history.push("/my-articles")}>Your Articles</button>
                </li>
                <li>
                    {
                        signedIn ? (
                            <button className="logout">Logout</button>
                        ): (
                            <button className="logout">Signin</button>
                        )
                    }
                   
                </li>
            </ul>
        </header>
    )
}

export default Header;