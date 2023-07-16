import React, { useState, useContext} from "react";
import {useHistory} from "react-router-dom"
import userContext from "../context/userContext";
import './NavBar.css'


const SignupForm = () => {

    const INITIAL_STATE =   {username: "",
                            email: "",
                            password:""
                            }

    const [signupForm, setSignupForm] = useState(INITIAL_STATE)
    const {registerUser} = useContext(userContext)
    const history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target; // extracting e.target.name and e.target.value 
        setSignupForm(signupForm =>(
            {
                ...signupForm,
                [name]: value
            }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        registerUser(signupForm)
        // console.log(signupForm)
        setSignupForm(INITIAL_STATE);
        history.push("/");
    }

    return(
       <>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <br></br>
            <input id="username" name="username"value={signupForm.username} onChange={handleChange} /> 
            <br></br>
            <label htmlFor="password">Password:</label>
            <br></br>
            <input type="password" id="password" name="password"value={signupForm.password} onChange={handleChange} /> 
            <br></br>
            <label htmlFor="email">Email:</label>
            <br></br>
            <input id="email" name="email"value={signupForm.email} onChange={handleChange} /> 
            <br></br>
       <button id="signupbtn">Sign Up!</button>
    </form>
       </>
    )
}

export default SignupForm;