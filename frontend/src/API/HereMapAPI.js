
import axios from "axios";

// let BASE_URL = "http://127.0.0.1:5000"

let BASE_URL = "https://pathfinderai.onrender.com"

class HereMapAPI {

static async fetchData(location){
  try{
    // console.log(BASE_URL, "/api/getGeocode", location)
    const res = await axios.get(`${BASE_URL}/api/getGeocode?location=${location}`)
    // console.log(res, "RES . DATA")
    return res
  }
  catch(e){
    // console.log(e, "ERROR")
    console.error(e)
  }
}
}


export default HereMapAPI;