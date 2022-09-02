import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { authStatus } from '../store/authstore';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { getLoginOtpVerified } from '../services/auth.service';


const FormLoginVerify = (props) => {
    let navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authStatus);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    const [formData, setFormData] = useState({
        otp: "",
    })

    useEffect(() => {
        if (formData.otp) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [formData])
    const submithandler = async () => {
        setLoading(true);
        const response = await getLoginOtpVerified(formData.otp, auth.email, auth.userName)
        setTimeout(() => {
            if (response.status === true) {
                props.toasthandler({ type: "success", header: "User Successfully Verified", desc: `Good To Go...` })
                setAuth({ ...auth, status: true, otpVerified: true, token: response.token })
                setTimeout(() => navigate("../dashboard", { replace: true }), 2000)
                return
            }
            props.toasthandler({ type: "error", header: "Invaild Verification Code", desc: response.message })
            setFormData({...formData,otp:""})
            setLoading(false);
        }, 2000)
    }
    return (<>
        <div className="flex justify-content-center card">
            <div className="formgrid grid w-10 p-2">
                <div className="field col-12 my-1 text-center p-ripple">
                    <Ripple />
                    <i className='pi pi-check-circle bg-teal-400 m-2 p-2 border-round-xl text-white shadow-2' style={{ 'fontSize': '3em' }}></i>
                </div>
                <div className="field col-12 my-1">
                    <span className='w-full text-xl text-bold my-2'>{`Enter the verification code that was sent on ${auth.email}`}</span>
                </div>
                <div className="field col-12 my-3">
                    <span className="w-full p-float-label">
                        <InputText keyfilter="int" id="verificationCode" className="w-full" value={formData.otp} onChange={(e) => setFormData({ ...formData, otp: e.target.value })} />
                        <label htmlFor="verificationCode">Enter verification Code</label>
                    </span>
                </div>
                <div className="field col-12 mb-4">
                    <Button disabled={disable} loading={loading} onClick={submithandler} className="w-full" label='Verify'></Button>
                </div>
            </div>
        </div>
    </>);
}

export default FormLoginVerify;