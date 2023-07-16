import React from "react";
import "./PopularPlacesIcon.css"
import { useHistory } from "react-router-dom";


const PopularPlacesIcon = ({img, place, placedescription}) =>{
    const history = useHistory();

    const handleClick = () => {
      history.push(`/popular/${place}`);
    };

    return(
        <>
        <div id="popplaceicon" onClick={handleClick} className="zoom-in-effect">
            <img id="popplaceimg" alt="popularplaceimg" src={require(`../images/places/${img}`)}></img>
            <p id="popplacename">{place}</p>
            <br></br>
            <div id="placedescriptiongradient"></div>
            <div id="placedescriptiondiv">
                <p id="placedescriptiontext">{placedescription}</p>
            </div>
        </div>
        </>
    )
}

export default PopularPlacesIcon;