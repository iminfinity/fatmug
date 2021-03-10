import "./sign-in.styles.scss";

import {useState} from "react";

import {ReactComponent as Key} from "../../assets/key.svg";
import {ReactComponent as User} from "../../assets/user.svg";

const SignInPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        alert("submitted")
    }
    return (
        <main className="sign-in-page"> 
            <form onSubmit={handleSubmit}>
                <h4>Log in</h4>
                <div className="input-container">
                    <input 
                        type="email"
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)}
                        placeholder="Email"
                    />
                    <User />
                </div>

                <div className="input-container">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(event)=> setPassword(event.target.value)} 
                        placeholder="Password"               
                    />
                    <Key />
                </div>
       
                <div className="buttons-container">
                    <button>Forgot Password?</button>
                    <button>Not a member yet? Sign up</button>
                </div>
                <button type="submit" className="submit-button">Sign in</button>
            </form>
        </main>
    )
}

export default SignInPage