import axios from "axios";

const API_URL = "http://192.168.1.103:8080/";


const getcredentialsverified = async (data) => {
    const fdata = JSON.stringify(data)
    try {
        let response = await axios({
            method: "POST",
            url: API_URL + "login",
            data: fdata,
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    }
    catch (error) {
        return error.response.data
    }
}

const getLoginOtpVerified = async (otp, email, user) => {
    const fdata = JSON.stringify({ email: email, otp: otp, user: user })
    try {
        let response = await axios({
            method: "POST",
            url: API_URL + "loginotp",
            data: fdata,
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    }
    catch (error) {
        return error.response.data
    }
}

export { getcredentialsverified, getLoginOtpVerified };
