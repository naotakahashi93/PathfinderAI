
import axios from "axios";


// let BASE_URL = "http://127.0.0.1:5000"

let BASE_URL = "https://pathfinderai.onrender.com/"
class OpenAIAPI {

static async fetchData(prompt){
 
  try{
    // console.log(BASE_URL, "/api/getAns", prompt, "PROMpT")
    const res = await axios.post(`${BASE_URL}/api/getAns`, {prompt: prompt})
    // console.log(res, "RES . DATA")
    return res
  }
  catch(e){
    // console.log(e, "ERROR")
    console.error(e)
  }

}

}


export default OpenAIAPI;