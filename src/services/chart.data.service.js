import axios from "axios";

const API_URL = "http://192.168.1.103:8080/expense/";


const getChartData = async(queryparams,token)=>{
    try{
        let response = await axios({
            method: "GET",
            params: queryparams,
            url: API_URL + "getchartdata",
            headers: { "Authorization": "Bearer " + token },
          })
        return response.data
        }catch(error){
            return(error.response.data)
        }
}
const getCardData = async(token)=>{
    try{
        let response = await axios({
            method: "GET",
            url: API_URL + "getcarddata",
            headers: { "Authorization": "Bearer " + token },
          })
        return response.data
        }catch(error){
            return(error.response.data)
        }
}



export {getChartData,getCardData};
