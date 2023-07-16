import React, {useState, useEffect, useContext} from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link} from "react-router-dom"
import "./PromptForm.css"
import OpenAIAPI from "../API/OpenAIAPI";
import HereMapAPI from "../API/HereMapAPI";
import ResponsePage from "./ResponsePage"
import APIContext from "../context/APIContext";
import userContext from "../context/userContext"
import LandingPageImg from "../images/LandingPageIMG1.expandedLengthened.jpg"
import SavedScreenShot from "../images/SavedScreenshot.png"
import saveThisItinerary from "../images/SaveThisItinerary.png";
import PopularPlacesIcon from "./PopularPlaceIcon"

const PromptForm = () =>{
    const {prompt, setPrompt, response, setResponse, setMapVal, isSubmitted, setIsSubmitted, setMapErrorMsg} = useContext(APIContext)
    const {username} = useContext(userContext)
    const allInterestsArray = ["Adventure and Outdoor Activities", "Wildlife and Nature", "History and Culture", "Food and Culinary Experiences", "Art and Museums", "Beaches and Relaxation", "Shopping and Markets", "Nightlife and Entertainment", "Luxury and VIP Experiences"]
    const whooptions = ['Friends','Partner','Myself (solo)','Family','Parents','Kids','Work'];    
    const [interestsArray, setInterestsArray] = useState([]) // setting a separate state to hold all interests for easier access for prompt building
    let location = []; 
    const addressPattern = /\(Address: (.*?)\)/g;   /// if you want to specfy (Address:   - /\(Address: (.*?)\)/g;
    
    if(response){
        let addressArr = response.match(addressPattern)
        // console.log(addressArr, "ADDESS ARR")
        addressArr.map(add => location.push(add.slice(10, -1)))
        // console.log(location, "LOCATION")
    }

    useEffect(() => {
        async function getResponseHERE() {
          try {
            setMapVal([]);
            for (const loc of location) {
              const res = await HereMapAPI.fetchData(loc);
              if(res.data && res.data.result && res.data.result.items && res.data.result.items[0] && res.data.result.items[0].position){
              setMapVal((mapVal) => [
                ...mapVal,
                {
                  zoom: 10,
                  lat: res.data.result.items[0].position.lat,
                  lng: res.data.result.items[0].position.lng,
                },
              ]);
            }
            else{
                setMapErrorMsg("Sorry, our map data is not loading for some of the places :(")
            }
            }
          } catch (e) {
            console.error("An error occurred:", e);
          }
        }
        getResponseHERE();
      }, [response]);
      
    //   console.log(mapVal, "COORDS");

    async function getResponse(prompt){
        let res = await OpenAIAPI.fetchData(prompt)
        setResponse(res.data.result)
        // console.log(res, "RES FFROM HOME")
    }

    const handleChange = (e) => {
        const {name, value} = e.target; // extracting e.target.name and e.target.value 
        // console.log(e.target.value, "E TARGET VAl")
        setPrompt(prompt =>(
            {
                ...prompt,
                [name]: value
            }))
    }

    const handleCheckBoxChange = (e) => {
        const {name, checked} = e.target; // extracting e.target.name and e.target.value 
        setPrompt(prompt =>( // this is for the "Undecided" checkbox
            {
                ...prompt,
                [name]: checked
            }))

        // this is for all the interets checkboxes (the "Undecided" checkbox does not have value so it doesnt run this for that)
        if(checked && e.target.value !== "on"){
            // console.log( e.target.value, "checked")
            setInterestsArray(array => [...array, e.target.value ])

            }
        else if(!checked && e.target.value !== "on"){
            // console.log( e.target.value, "UNchecked")
            setInterestsArray((array) => array.filter((value) => value !== e.target.value))

        }
        
       
        // console.log(e.target.value, "E TARGET VAl")
    }

    //////debug fucntion - delete after
    // useEffect(() => {
    //     console.log(interestsArray, "INTERESTS ARR");
    //   }, [interestsArray]);
    ////////////////

    const handleSubmit = async (e) =>{
        e.preventDefault();
        getResponse(`Write me a travel itenerary for ${prompt.promptWhere},${prompt.promptWho ? `I will be traveling with ${prompt.promptWho}`: ""}
        ${prompt.promptWhereUndecided ? "base the itenerary on suggested time": `from ${prompt.promptWhenStart} to ${prompt.promptWhenEnd} (suggestions should take into account this time of year)`}.
        Give me suggestions for specific places, put address in brackets for each place in this format "(Address:    )", 
        ${interestsArray.length ? `taking into account my interests which are ${interestsArray.join(', ')}` : ""}
        ${!interestsArray.length ?  `${prompt.promptCustomInterest ? `My interests are ${prompt.promptCustomInterest}.` : ""}` : `${prompt.promptCustomInterest ? `and ${prompt.promptCustomInterest}` : ""}`}
        ${interestsArray.includes("Food and Culinary Experiences") ? "give me restaurant recommendations ,with address in this format '(Address: [address])' ": ""}`) 
        // setPrompt(INITIAL_STATE_PROMPT);
        setInterestsArray([])
        setIsSubmitted(true);
    }

    // console.log(prompt, "PROMPT")

    return(
        <>
    {isSubmitted 
        ? 
    <ResponsePage />
        :
    <>
    <form onSubmit={handleSubmit}>
        <div id="landingpagediv">
          <img src={LandingPageImg} alt="landingpageimage"></img>
          <p id="slogantext"> Discover the future of Travel</p>
          <p id="slogansubtext">Explore the world effortlessly with PathfinderAI's smart travel planning. Personalized itineraries for unforgettable journeys. Welcome to the future of travel.</p>
          <div id="whereandwhen">
            <div id="leftDivider"></div>
              <div id="midDivider"></div>
              <table>
                <tbody>
                  <tr>
                    <th>
                      <label id="wheretext" htmlFor="promptWhere"><span className="shadowhighlight">Where </span> do you want to go?</label>
                    </th>
                    <th>
                      <p id="whentext"><span className="shadowhighlight">When </span> do you want to go?</p>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <input id="promptWhere" name="promptWhere" required value={prompt.promptWhere} onChange={handleChange} placeholder="Country and City"></input>
                    </td>
                    <td>
                      <div id="undecidedoptiondiv">
                        <input type="checkbox" id="promptWhereUndecided" name="promptWhereUndecided" checked={prompt.promptWhereUndecided} onChange={handleCheckBoxChange}></input>
                        <label htmlFor="promptWhereUndecided">Undecided</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td id="empty-cell"></td>
                    {prompt.promptWhereUndecided 
                    ?
                    <td id="empty-cell"></td>
                    : 
                    (
                      <td>
                        <div id="startenddateselect">
                          <label htmlFor="promptWhenStart">From:</label>
                          <input type="date" id="promptWhenStart" name="promptWhenStart" value={prompt.promptWhenStart} onChange={handleChange}></input>
                          <p id="arrowicon">&#8594;  </p>
                          <label htmlFor="promptWhenEnd">To:</label>
                          <input type="date" id="promptWhenEnd" name="promptWhenEnd" value={prompt.promptWhenEnd} min={prompt.promptWhenStart} onChange={handleChange}></input>
                        </div>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
          </div>

          <div id="optionalvalues">
            <p id="personalizepathtext"><span className="shadowhighlight">Personalize</span> Your Path</p>

            <div id="whotextandselection">
              <label id="whotext" htmlFor="promptWho">
                <span className="shadowhighlight">Who</span> are you travelling with?
              </label>
              <br />
              {whooptions.map((option) => {
                const value = option.charAt(0).toLowerCase() + option.slice(1);
                return (
                  <div key={uuidv4()} className="whooptions">
                    <input
                      type="radio"
                      id={value}
                      name="promptWho"
                      value={value}
                      checked={prompt.promptWho === value}
                      onChange={handleChange}
                    />
                    <label htmlFor={value}>{option}</label>
                  </div>
                );
              })}
            </div>
            <div id="interestsselectiondiv">
              <p id="intereststext">What are some of your <span className="shadowhighlight">interests</span>?</p>
                {allInterestsArray.map((interest)=>(
                    <div key={uuidv4()} className="checkbox-wrapper">
                      <img src={require(`../images/${interest.replace(/\s/g, "")}.jpg`)} alt="InterestsImg" className="checkboxImg"/>
                      <input type="checkbox"
                      className="checkbox-input"
                      id={interest.replace(/\s/g, "")} 
                      name={interest.replace(/\s/g, "")} 
                      checked={interestsArray.includes(interest)} 
                      value={interest}
                      onChange={handleCheckBoxChange}>
                      </input>
                      <label htmlFor={interest.replace(/\s/g, "")}>
                          {interest}
                      </label>
                    </div>
                  ))}
              <div className="checkbox-wrapper">
                <div id="otherinterestwrapper">
                  <label id="otherinteresttext" htmlFor="promptCustomInterest">
                      Other: 
                  </label>
                  <textarea id="promptCustomInterest" name="promptCustomInterest" value={prompt.promptCustomInterest} onChange={handleChange} placeholder="Hiking, Photography, Architecture etc.. ">
                  </textarea>
                </div>
              </div>
            </div>
            <button id="plantripbutton">Plan my trip!</button>
          </div>
          <div id="gradientdiv">
          </div>
          <div id="signuptoday"> 
              <p id="saveyouradventures">Save Your Adventures, Sign Up for Free Today!</p>
              <p id="signuptext">Elevate your travel planning with PathfinderAI. Sign up today to save your personalized itineraries, ensuring your dream trips are securely stored and easily accessible. Unleash the power of effortless travel with PathfinderAI.</p>
                  {
                    username ?
                    <Link id="gotoprofile" to="/profile">Go to your saved adventures!</Link>
                    :
                    <>
                    <Link id="signuplinkhome" to="/signup">Sign Up</Link>
                    <Link id="loginlinkhome" to="/login">Login</Link>
                    </>
                  }
              <div id="saveThisItinerary" ><img src={saveThisItinerary} alt="saveThisItinerary"></img></div>
              <div id="savedScreenShot" ><img src={SavedScreenShot} alt="savedScreenShot"></img></div>
            </div>
        </div>
    </form>

    <div id="popularplacesgradient"></div>
      <div id="popularplacesdiv">
        <p id="popularadventures">Popular Adventures</p>
        <PopularPlacesIcon img={"kyoto.jpeg"} place={"Kyoto"} placedescription={"Cultural Exploration in Kyoto, Japan for History Buffs"}/>
        <PopularPlacesIcon img={"parisfrance.jpeg"} place={"Paris"} placedescription={"Romantic Paris Escape for Couples"}/>
        <PopularPlacesIcon img={"greecemykonos.jpeg"} place={"Mykonos"} placedescription={"Vibrant Mykonos Getaway for Beach Lovers"}/>
        <PopularPlacesIcon img={"africakenya.jpeg"} place={"Kenya"} placedescription={"Kenyan Safari Expedition for Adventure Seekers"}/>
        <PopularPlacesIcon img={"dubai.jpeg"} place={"Dubai"} placedescription={"Extravagant Dubai Adventure for Luxurious Experience"}/>
      </div>
    </>
       } 
        </>
    )
}

export default PromptForm;
