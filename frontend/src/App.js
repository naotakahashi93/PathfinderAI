import './App.css';
import React, { useState } from 'react';
import Routes from "./Routes";
import NavBar from './Components/NavBar';
import userContext from "./context/userContext"
import APIContext from "./context/APIContext"
import UserAPI from './API/UserAPI';
import {useHistory} from "react-router-dom"
import placesArr from "./images/places/_placesArr";

function App() {
  const today = new Date().toISOString().split('T')[0];
  const history = useHistory();

  const [username, setUsername] = useState(() => { 
    let value = (localStorage.getItem("username") || null)// getting the state of the item we have in local storage or set it to null
    return value
})


  const INITIAL_STATE_PROMPT =   {promptWhere: "",
  promptWhereUndecided: false,
  promptWhenStart: today, 
  promptWhenEnd: today,
  promptWho: "",
  promptCustomInterest: ""
  }

  const [prompt, setPrompt] = useState(INITIAL_STATE_PROMPT)
  const [response, setResponse] = useState()
  const [mapVal, setMapVal] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allSaved, setAllSaved] = useState([]);
  const [placeImg, setPlaceImg] = useState("")
  const [mapErrorMsg, setMapErrorMsg] = useState("")


async function registerUser(data){
  let res = await UserAPI.registerUser(data)
  // console.log(res, "RES FROM APP COMPONENT REGISTERED")
  if(res){
  loginUser({username: data.username, 
            password: data.password})
  }
}

async function loginUser(data){
  let res = await UserAPI.loginUser(data)
  // console.log(res, "LOGIN USER FORNTEND RES")
  if(res){
    setUsername(res.data.username)
    setErrorMessage("")
    localStorage.setItem("username", res.data.username);
    return res
  }
  else{
    setErrorMessage("Invalid credentials")
  }
  // setUsername(res.data.username)
  //  setUserDetails(returntoken.userDetails)
  // //  JoblyApi.token = returntoken.token
  // localStorage.setItem("username", res.data.username);
  // localStorage.setItem("token", returntoken.token);
  // localStorage.setItem("userDeets", JSON.stringify(returntoken.userDetails))
}

async function logoutUser(e){
  e.preventDefault();
  await UserAPI.logoutUser()
  setResponse("")
  setIsSubmitted(false)
  localStorage.clear()
  setUsername(null)
  history.push("/")
}

async function getAllSaved(username){
  let res = await UserAPI.getAllSaved(username)
  // console.log(res.data.all_saved_itinerary, "RES FROM SAVED")
  let allSavedItinerary = res.data.all_saved_itinerary; 
  // console.log(allSavedItinerary, "allSavedItineraryYYYYY")
  setAllSaved(allSavedItinerary);
}

const unSave = async(iteneraryID) =>{
  try{
      await UserAPI.UNsaveItinerary(iteneraryID)
      // console.log("UNSAVE",iteneraryID )
  }
  catch(error){
      console.error("An error occurred:", error);
  }
}

const findImage = (userPlaceInput) => {

  const normalizedUserInput = userPlaceInput.toLowerCase();

  const placeImg = 
  placesArr.find((file) => file.includes(normalizedUserInput))||
  placesArr.find((file) => normalizedUserInput.split(" ").some((word) => file.includes(word)))
  ;
  if(placeImg){
      setPlaceImg(`${placeImg}.jpeg`)
  }
  else setPlaceImg("")
  // console.log(userPlaceInput, "USER INPJUT", placeImg, "PLACE IMG NAME")
}

  return (
    <div className="App">
      <userContext.Provider value={{username,
                                    registerUser,
                                    loginUser,
                                    logoutUser,
                                    errorMessage,
                                    setErrorMessage,
                                    allSaved,
                                    getAllSaved,
                                    unSave,
                                    setAllSaved
                                  }}> 
        <APIContext.Provider value ={{today, 
                                    INITIAL_STATE_PROMPT,
                                    mapVal, 
                                    setMapVal,
                                    response,
                                    setResponse,
                                    prompt, 
                                    setPrompt,
                                    isSubmitted, 
                                    setIsSubmitted,
                                    findImage,
                                    setPlaceImg,
                                    placeImg,
                                    mapErrorMsg, 
                                    setMapErrorMsg}}>
        <NavBar/>
        <Routes/>
        </APIContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
