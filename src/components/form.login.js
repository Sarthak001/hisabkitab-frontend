import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { getcredentialsverified } from '../services/auth.service';
import { authStatus } from '../store/authstore';
import { useRecoilState } from 'recoil';


const FormLogin = (props) => {
    const [auth, setAuth] = useRecoilState(authStatus);
    const [disable, setDisable] = useState(true)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    useEffect(() => {
        if (formData.email && formData.password) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [formData])

    const submithandler = async () => {
        setLoading(true);
        const response = await getcredentialsverified(formData)
        if (response.status === true) {
            setLoading(false);
            props.toasthandler({ type: "success", header: "Credentials Verification", desc: response.message })
            setTimeout(()=>props.toasthandler({ type: "info", header: "User Verification", desc: "user verification under process" }),500)
            setFormData({
                email: "",
                password: "",
            })
            setAuth({ ...auth, credentialVerified: true, userName: response.username, email: response.email })
            setTimeout(()=> props.statehandler({ index: 1, CredentialWindow: false, isInVerification: true, }),1000)
            return
        }
            setLoading(false);
            props.toasthandler({ type: "error", header: "Something went wrong", desc: response.message })
            setFormData({
                email: "",
                password: "",
            })
    }
    return (<>
        <div className="flex justify-content-center card">
            <div className="formgrid grid w-10 p-2">
                <div className="field col-12 my-1 text-center p-ripple">
                    <Ripple />
                    <i className='pi pi-sign-in bg-teal-400 m-2 p-2 border-round-xl text-white shadow-2' style={{ 'fontSize': '3em' }}></i>
                </div>
                <div className="field col-12 my-3">
                    <span className="w-full p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText keyfilter="email" className="w-full" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <label htmlFor="inputtext">Email</label>
                    </span>
                </div>
                <div className="field col-12 my-3">
                    <span className="w-full p-float-label">
                        <Password inputClassName='w-full' className="w-full" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} feedback={false} toggleMask />
                        <label htmlFor="inputtext">Password</label>
                    </span>
                </div>
                <div className="field col-12 mb-4">
                    <Button onClick={submithandler} disabled={disable} className="w-full" label='Login' loading={loading}></Button>
                </div>
            </div>
        </div>


    </>);
}

export default FormLogin;