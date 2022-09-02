import axios from "axios";

const API_URL = "http://192.168.1.103:8080/";


const getRegister = async(data)=>{
    const fdata = JSON.stringify(data)
    try{
        let response = await axios({
            method: "POST",
            url: API_URL + "register" ,
            data: fdata,
            headers : {'Content-Type': 'application/json'}
          })
        return response.data
        }
        catch{
            console.log("ERRORRRRRR")
        }
    }

    const getOptVerified = async(data)=>{
        const fdata = JSON.stringify(data)
        try{
            let response = await axios({
                method: "POST",
                url: API_URL + "registerotp" ,
                data: fdata,
                headers : {'Content-Type': 'application/json'}
              })
            return response.data
            }
            catch{
                console.log("ERRORRRRRR")
            }
        }


export { getRegister,getOptVerified };
