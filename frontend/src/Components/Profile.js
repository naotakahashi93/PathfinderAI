import React, { useContext, useEffect } from "react";
import userContext from "../context/userContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./Profile.css"
import PathfinderLogo from "../images/PathfinderLogo.png"


const Profile = () => {
    const {username, allSaved, getAllSaved, unSave, setAllSaved} = useContext(userContext)

    useEffect(()=>{ // function to run when username changes to get all the items that user has saved. 
        getAllSaved(username)
    }
    ,[username]
    )

    const handleUnSave = async (id) => { // a fucntion to update the items displayed on the page when user wants to remove a saved item from the page
        try{
            await unSave(id);
            const updateAllSaved = allSaved.filter(item => item.id !== id) // updated the allSaved variable to all the ones that dont equal the one that just got removed
            setAllSaved(updateAllSaved)
        }
        catch(e){
            console.error(e);
        }
    }
 

    return(
       <>
        {username 
        ?
        <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h3>Your Saved Adventures:</h3>
        <div> 
            {allSaved.map( s => (
                    <div id="savediconswrapper" key={uuidv4()}>
                    {s.placeimg ?
                    <img id="placeImgSaved" alt="placeImgSaved" src={require(`../images/places/${s.placeimg}`)}></img>
                    :
                    <img id="placeImgSaved" alt="PathfinderLogo" src={PathfinderLogo}></img>}
                    <Link to={`/${username}/saved/${s.id}`}> <p id="savedplacename">{s.place}</p></Link>
                    {/* <p id="savedtext"> {s.saved}</p> */}
                    <button id="deletesavedbtn" onClick={()=>handleUnSave(s.id)}> Delete </button>
                    </div>
            ))}
        </div>
        </>
        :
        <h3>
        Please <Link to="/login">LOGIN</Link> or <Link to="/signup">REGISTER</Link> first!
        </h3>
        }
       </>
    )
}

export default Profile;