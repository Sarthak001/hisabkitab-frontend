import axios from "axios";

const API_URL = "http://192.168.1.103:8080/expense/";


const getUserDetails = async(token)=>{
    try{
        let response = await axios({
            method: "get",
            url: API_URL + "getuserdetail" ,
            headers: { "Authorization": "Bearer " + token },
          })
        return response.data
        }catch(error){
            return(error.response.data)
        }
}

export {getUserDetails}
