import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { getOptVerified } from '../services/register.service';


const FormRegisterVerify = (props) => {
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    const [formData, setFormData] = useState({
        email:"",
        otp: "",
        user:"",
    })
    console.log(props)
    useEffect(() => {
        setFormData({...formData,email:props.user.email,user:props.user.user})
      }, []);

    useEffect(()=>{
        if(formData.otp && formData.email){
            setDisable(false)
        }else{
            setDisable(true)
        }
    },[formData])
    const submithandler = async () => {
        setLoading(true);
        const response = await getOptVerified({...formData})
            if(response.status === true){
                setTimeout(()=>{
                props.statehandler({
                    index: 2,
                    isPersonalinfo: false,
                    isInVerification: false,
                    isCompleted: true
                }, props.user)},1000)
                return
            }
            props.toasthandler({type:"error",header:"Invaild Verification Code",desc:response.message})
            setLoading(false);
            }

    return (<>
        <div className="flex justify-content-center card">
            <div className="formgrid grid w-10 p-2">
                <div className="field col-12 my-1 text-center p-ripple">
                    <Ripple />
                    <i className='pi pi-check-circle bg-teal-400 m-2 p-2 border-round-xl text-white shadow-2' style={{ 'fontSize': '3em' }}></i>
                </div>
                <div className="field col-12 my-1">
                    <span className='w-full text-xl text-bold my-2'>{`Enter the verification code that was sent on ${props.user.email}`}</span>
                </div>
                <div className="field col-12 my-3">
                    <span className="w-full p-float-label">
                        <InputText keyfilter="int"  id="verificationCode" className="w-full" value={formData.otp} onChange={(e) => setFormData({ ...formData, otp: e.target.value })} />
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

export default FormRegisterVerify;