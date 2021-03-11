import "./header.styles.scss";
import {useLocation, useHistory} from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firabase/utils";

const Header = () => {
    const [signedIn, setSignedIn] = useState(false);
    
    const location = useLocation()
    const history = useHistory()
    
    useEffect(()=>{
        auth().onAuthStateChanged((user)=>{
            if (user) setSignedIn(true)
        })
    })
    return (
        <header className="header">
            <div className="logo-container">
               <h3>Fatmug |</h3>
               {
                   signedIn ? (
                     <p>Greetings! UserName</p>  
                   ): null
               }
                
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
                                <button className="write" onClick={()=>history.push("/create-article")}>Write</button>
                            )
                        )
                    }
                </li>
                <li>
                    <button className="your-articles">Your Articles</button>
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