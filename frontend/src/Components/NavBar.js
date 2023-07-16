import React, { useContext} from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'
import userContext from "../context/userContext";
import pathFinderLogo from "../images/PathfinderAI_LogoUpscaledNoBG.png";
import {useHistory} from "react-router-dom";
import APIContext from "../context/APIContext";

function NavBar() {
  const {setIsSubmitted, setResponse, setPlaceImg, setMapErrorMsg} = useContext(APIContext)
  const {username, logoutUser} = useContext(userContext)
  const history = useHistory();
//   console.log(loggedInUser, "LOGGED IN USER")

  const handleBack = (e) =>{
    e.preventDefault();
    setResponse("")
    setIsSubmitted(false)
    setPlaceImg("")
    setMapErrorMsg("")
    history.push("/")
  }

  return (
    <div id="bardiv">
        {username
        ? 
      <>
        <NavLink id="pathfinderlogo" exact to="/" onClick={handleBack} >
          <img src={pathFinderLogo} alt="PathfinderLogo"></img>
        </NavLink>
        <div id="menudiv" >
        <NavLink to="/profile" > 
            PROFILE
        </NavLink>
        <NavLink to="/" onClick={logoutUser}> 
           <button id="logoutlink"> LOGOUT ({username}) </button>
        </NavLink>
        </div> 
      </>
      : 
      <>
        <NavLink id="pathfinderlogo" exact to="/"  >
          <img src={pathFinderLogo} alt="PathfinderLogo"></img>
        </NavLink>
        <div id="menudiv" >
        <NavLink to="/login" > 
            LOGIN
        </NavLink>
        <NavLink to="/signup"> 
            SIGN UP
        </NavLink>
        </div> 
      </>
        }
      
    </div>
  );
}

export default NavBar;
