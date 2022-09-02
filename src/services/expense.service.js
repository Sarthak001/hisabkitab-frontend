import axios from "axios";

const API_URL = "http://192.168.1.103:8080/expense/";


const getExpenseDatalimit = async(limit,token)=>{
    try{
        let response = await axios({
            method: "get",
            url: API_URL + "getexpenses?limit=" + limit ,
            headers: { "Authorization": "Bearer " + token },
          })
        return response.data
        }catch(error){
            return(error.response.data)
        }
}


const getAllExpenses =  async (token) => {
    try{
        const response = await axios({
            method: "GET",
            url: API_URL+"getexpenses",
            headers: { "Authorization": "Bearer " + token },
        })
        return response.data
    }catch(error){
        return(error.response.data)
    }
}

const AddExpense =  async (data,token) => {
    const category = data.category.name
    const form = {...data,category: category}



    try{
        const response = await axios({
            method: "POST",
            url: API_URL+"addexpense",
            data : JSON.stringify(form),
            headers: { "Authorization": "Bearer " + token ,'Content-Type': 'application/json'},
        })
        return response.data
    }catch(error){
        return(error.response.data)
    }
}
export { getExpenseDatalimit,AddExpense ,getAllExpenses};
