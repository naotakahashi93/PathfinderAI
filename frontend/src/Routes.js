import React, { useContext }  from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import SignupForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import PromptForm from "./Components/PromptForm";
import userContext from "./context/userContext";
import Profile from "./Components/Profile";
import SavedPage from "./Components/SavedPage";
import PopularPlacesItinerary from "./Components/PopularPlacesItinerary"

const Routes = () => {
   
    const {username} = useContext(userContext)
    
    return(
      <Switch>
        <Route exact path="/">
            <PromptForm/> 
        </Route>

        <Route exact path="/signup">
        {username 
            ?
            <>
            <Redirect to="/" />
            </>
            :
            <SignupForm/>
            }
        </Route>

        <Route exact path="/login">
            {username 
            ?
            <>
            <Redirect to="/" />
            </>
            :
            <LoginForm/>
            }
        </Route>

        <Route exact path="/profile">
            {username 
            ?
            <>
            <Profile />
            </>
            :
            <Redirect to="/" />
            }
        </Route>

        <Route exact path="/:username/saved/:itineraryid">
            {username 
            ?
            <>
            <SavedPage />
            </>
            :
            <Redirect to="/" />
            }
        </Route>


        <Route exact path="/popular/:place">
            <PopularPlacesItinerary/>
        </Route>

      </Switch>
    )
}

export default Routes;