import axios from "axios";


// let BASE_URL = "http://127.0.0.1:5000"

let BASE_URL = "https://pathfinderai.onrender.com/"
// console.log(BASE_URL, "BASE_URL")

class UserAPI {

  static async registerUser(signUpData){
    try{
      // console.log(BASE_URL, "/signup", signUpData)
      const res = await axios.post(`${BASE_URL}/signup`, signUpData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // console.log(res, "RES . DATA")
      return res
    }
    catch(e){
      // console.log(e, "ERROR")
      console.error(e)
    }
  }


  static async loginUser(loginData){
    try{
      // console.log(BASE_URL, "/login", loginData)
      const res = await axios.post(`${BASE_URL}/login`, loginData)
      // console.log(res, "RES . DATA")
      return res
    }
    catch(e){
      // console.log(e, "ERROR")
      console.error(e)
    }
  }

  static async logoutUser(){
    try{
      // console.log(BASE_URL, "/logout")
      const res = await axios.get(`${BASE_URL}/logout`)
      // console.log(res, "RES . DATA")
      return res
    }
    catch(e){
      // console.log(e, "ERROR")
      console.error(e)
    }
  }

  
static async saveItinerary(response, place, placeimg){
    try{
    // console.log("hitting saveItinerary(response) in UserAPI")
      const res = await axios.post(`${BASE_URL}/save`, {response, place, placeimg})
      // console.log(res, "saveItinerary RES")
      return res
    }
    catch(e){
      // console.log(e, "ERROR")
      console.error(e)
    }
  }

static async UNsaveItinerary(id){
    try{
    // console.log("hitting UNSAVE in UserAPI FRONT END")
      const res = await axios.post(`${BASE_URL}/unsave/${id}`)
      // console.log(res, "unsaved RES")
      return res
    }
    catch(e){
      // console.log(e, "ERROR")
      console.error(e)
    }
  }


static async getAllSaved(username){
  try{
  // console.log("GETTING ALL SAVED")
    const res = await axios.post(`${BASE_URL}/${username}/saveditinerary`)
    // console.log(res, "SAVEDDD")
    return res
  }
  catch(e){
    // console.log(e, "ERROR")
    console.error(e)
  }
}

static async getSavedByID(id){
  try{
    const res = await axios.get(`${BASE_URL}/saveditinerary/${id}`)
    // console.log(res, "SAVED BY IDDD")
    return res
  }
  catch(e){
    console.error(e)
  }
}



}


export default UserAPI;