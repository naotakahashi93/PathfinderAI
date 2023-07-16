import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import "./SavedPage.css"



const SavedPage = () => {

    const history = useHistory();
    const {itineraryid} = useParams()
    const [savedtext, setSavedText] = useState("")
    // console.log(savedtext, "SAVED TEXXT STTE")

    useEffect( ()=>{
        async function getSavedByID(){
            let res = await UserAPI.getSavedByID(itineraryid)
            setSavedText(res.data.saved_itinerary)
        }
        getSavedByID()
    },[])


  const handleBack = (e) =>{
    e.preventDefault();
    history.push("/profile")
  }

    
return(
<>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <p id="savedtext">
    {savedtext}
    <br></br>
    <button onClick={handleBack} id="backtosaved">Back to saved trips</button>
    </p>
</>
        
)

}

export default SavedPage;