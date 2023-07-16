import React, {useContext, useEffect, useState} from "react";
import Map from "./Map";
import APIContext from "../context/APIContext";
import userContext from "../context/userContext"
import "./ResponsePage.css";
import {useHistory, Link} from "react-router-dom"
import UserAPI from "../API/UserAPI";
import PathfinderLogo from "../images/PathfinderLogo.png"


const ResponsePage = () => {
    const {response, mapVal, setResponse, setIsSubmitted, prompt, setPrompt, INITIAL_STATE_PROMPT, placeImg, setPlaceImg, findImage, mapErrorMsg, setMapErrorMsg} = useContext(APIContext)
    const {username,} = useContext(userContext)
    const history = useHistory();
    const userPlaceInput = prompt.promptWhere

    const [itinerarySaved, setItinerarySaved] = useState(false);
    const [iteneraryID, setIteneraryID] = useState("");


    const handleSaveItinerary = async (e) =>{
        e.preventDefault();
        try {
        let res = await UserAPI.saveItinerary(response, userPlaceInput, placeImg);
        // console.log(res, "RES FROM SAVE ITINIERY")
        if(res){
        setItinerarySaved(true)
        setIteneraryID(res.data.itinerary_id)
        // console.log(iteneraryID, "iteneraryID STATEE")
        }
        } catch (error) {
        console.error("An error occurred:", error);
        }
    }

    const handleUnSaveItinerary = async(e) =>{
        e.preventDefault();
        try{
            await UserAPI.UNsaveItinerary(iteneraryID)
            setItinerarySaved(false)
            // console.log("UNSAVE")
            setIteneraryID("")
            // console.log(iteneraryID, "iteneraryID STATEE")
        }
        catch(error){
            console.error("An error occurred:", error);
        }
    }

    const handleBack = (e) =>{
        e.preventDefault();
        setPrompt(INITIAL_STATE_PROMPT);
        setResponse("")
        setIsSubmitted(false)
        setPlaceImg("")
        setMapErrorMsg("")
        history.push("/")
    }


    useEffect( ()=>{
        findImage(userPlaceInput) 
    }
    ,[])

    
return(
    <>
        {response ? 
            <>
            <div id="GPTresult">
                {placeImg ?
                <div id="placeImgResponsediv">
                <img id="placeImgResponse" src={require(`../images/places/${placeImg}`)} alt={placeImg}></img>
                </div>
                :
                <img id="noImgResponse" src={PathfinderLogo} alt="PathfinderLogo" ></img>
                } 
                {username ?
            <>
                {itinerarySaved ?
                <form id="unsavebtnform" onSubmit={handleUnSaveItinerary}>
                    <p id="smallsavedtext" >saved!</p>
                    <button id="unsavebtn"type="submit">UnSave this itinerary!</button>
                </form>
                :
                <form id="savebtnform" onSubmit={handleSaveItinerary}>
                <button id="savebtn"type="submit">Save this itinerary! </button>
                </form>
                }
            </>
            :
            <>
            <button id="logintosave" ><Link id="loginlinkbtn"to="/login">Login </Link> to save!</button>
            </>
            }
                <form id="plananotherbtnform" onSubmit={handleBack}>
                <button id="plananotherbtn" type="submit">Plan another trip!</button>
                </form>

                <p id="yourtriptotitle"> Your trip to {userPlaceInput}</p>
                <p id="GPTresponsetext">{response}</p>
            </div>
            {mapErrorMsg ?
            <p id="mapErrorMsg">{mapErrorMsg}</p>
            :
            ""}
            <Map mapVal={mapVal} />
            </>
            : 
        <>
            <span className="loader"> <span id="airplaneicon"> &#9992; </span></span> 
            <p id="loadertext">Building Your Path...</p>
        </>
        }
    </>
)

}

export default ResponsePage;