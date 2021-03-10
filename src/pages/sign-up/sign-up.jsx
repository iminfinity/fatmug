import "./sign-up.styles.scss";

import {useState} from "react";

const SignUpPage = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        alert("submitted")
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
                placeholder="Password"               
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