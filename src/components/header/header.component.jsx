import "./header.styles.scss";
import {useLocation, useHistory} from "react-router-dom";
import { useUserData } from "../../data/user.context";
import { useAlert } from "react-alert";
import {auth} from "../../firebase/utils"
const Header = ({effect, buttonText}) => {
    const {firstName,signedIn} = useUserData()
    const location = useLocation()
    const history = useHistory()
    const alert = useAlert()
    const showButton = () => {
        const loca = location.pathname.split("/")
        switch(loca[1]){
            case "create-article":
            case "update-article": return (
                <button className="write" onClick={effect}>{buttonText}</button>
            )
            default: return (
                <button className="write" onClick={()=>history.push("/create-article")}>Write</button>
            )   
        }
    }   
    
    const logout = () => {
        auth()
            .signOut()
            .then(() => alert.show("SignOut"));
    }

    return (
        <header className="header">
            <div className="logo-container">
               <h3 onClick={()=>history.push("/")}>Fatmug |</h3>
               {
                   signedIn ? (
                     <p>Greetings! {firstName}</p>  
                   ): null
               }
                
            </div>
            <ul className="buttons">
                <li>
                    {
                        showButton()
                    }
                </li>
                <li>
                    <button className="your-articles" onClick={()=>history.push("/my-articles")}>Your Articles</button>
                </li>
                <li>
                    {
                        signedIn ? (
                            <button className="logout" onClick={logout}>Logout</button>
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