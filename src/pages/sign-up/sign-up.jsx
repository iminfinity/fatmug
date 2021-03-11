import "./sign-up.styles.scss";

import {useState} from "react";
import {signup, auth} from "../../firabase/utils";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";
const SignUpPage = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const alert = useAlert()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await signup(email, password);
            alert.show("Sign in success");
            auth().onAuthStateChanged((user)=>{
                if (user){
                    axios.post(`https://floating-bayou-25144.herokuapp.com/add-new-user/${user.uid}`,{
                        firstName,
                        lastName
                    })
                }
            })
            history.push("/")
          } catch (error) {
            alert.error("Error signing in, try again")
            setPassword("")
        }
    }
    return (
        <main className="sign-up-page"> 
        <form onSubmit={handleSubmit}>
            <h4>Sign up</h4>
            <input 
                type="text"
                value={firstName}
                onChange={(event)=> setFirstName(event.target.value)}
                placeholder="First Name"
                required
            />
            <input 
                type="text" 
                value={lastName}
                onChange={(event)=> setLastName(event.target.value)} 
                placeholder="Last Name"               
                required
            />
            <input 
                type="email"
                value={email}
                onChange={(event)=> setEmail(event.target.value)}
                placeholder="Email"
                required
            />
            <input 
                type="password" 
                value={password}
                onChange={(event)=> setPassword(event.target.value)} 
                placeholder="Password"               
                required
            />
            <button type="submit" className="submit-button">Submit</button>
        </form>
    </main>
    )
}

export default SignUpPage