import React, { useState, useContext } from "react";
import {useHistory} from "react-router-dom"
import userContext from "../context/userContext";
import './NavBar.css'


const LoginForm = () => {

    const history = useHistory();
    const INITIAL_STATE =   {
                            username: "",
                            password:""
                            }

    const [loginForm, setLoginForm] = useState(INITIAL_STATE)
    const {loginUser, errorMessage} = useContext(userContext)

    const handleChange = (e) => {
        const {name, value} = e.target; // extracting e.target.name and e.target.value 
        setLoginForm(loginForm =>(
            {
                ...loginForm,
                [name]: value
            }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = await loginUser(loginForm);
        // console.log(success, "SUCESSSSSSSS")
        if (success) {
          history.push("/");
        }
      };

    return(
       <>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
             <br></br>
            <input id="username" name="username"value={loginForm.username} onChange={handleChange} /> 
            <br></br>
            <label htmlFor="password">Password:</label>
            <br></br>
            <input type="password" id="password" name="password"value={loginForm.password} onChange={handleChange} /> 
            <br></br>
       <button id="loginbtn">Login!</button>
    </form>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
       </>
    )
}

export default LoginForm;