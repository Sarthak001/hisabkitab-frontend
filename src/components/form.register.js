import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { getRegister } from '../services/register.service';




const FormRegister = (props) => {
    const header = <h6>Pick a password</h6>;
    const footer = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );
    const [loading1, setLoading1] = useState(false);
    const [disable, setDisable] = useState(true)
    const [formData, setFormData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dateOfBirth: "",
    })
    useEffect(() => {
        if (formData.email && formData.firstName && formData.lastName && formData.password && formData.userName && formData.dateOfBirth) {
            setDisable(false)
        } else {
            setDisable(true)
        }

    }, [formData])
    const submitHandler = async () => {
        setLoading1(true);
        const response = await getRegister(formData)
        setTimeout(function () {
            if (response.status === true) {
                setLoading1(false);
                props.toasthandler({ type: "info", header: "User Verification", desc: "user verification under process" })
                setFormData({
                    userName: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    dateOfBirth: "",
                })
                props.statehandler({
                    index: 1,
                    isPersonalinfo: false,
                    isInVerification: true,
                    isCompleted: false
                }, { "email": response.email, "user": response.userName })
                return
            }
            setLoading1(false);
            props.toasthandler({ type: "error", header: "Something went wrong", desc: response.message })
            setFormData({
                userName: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                dateOfBirth: "",
            })
        }, 500)
    }
    return (<>
        <div className="flex justify-content-center card">
            <div className="formgrid grid w-10 p-2">
                <div className="field col-12 my-1 text-center p-ripple">
                    <Ripple />
                    <i className='pi pi-user-plus bg-teal-400 m-2 p-2 border-round-xl text-white shadow-2' style={{ 'fontSize': '3em' }}></i>
                </div>
                <div className="field col-12 my-3">
                    <span className="w-full p-float-label p-input-icon-right">
                        <i className="pi pi-user" />
                        <InputText required={true} keyfilter="alphanum" className="w-full" id="userName" value={formData.userName} onChange={(e) => { setFormData({ ...formData, userName: e.target.value }); }} />
                        <label htmlFor="UserName">Username</label>
                    </span>
                </div>
                <div className="field col my-3">
                    <span className="w-full p-float-label">
                        <InputText required={true} keyfilter="alpha" className="w-full" id="firstName" value={formData.firstName} onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); }} />
                        <label htmlFor="firstName">FirstName</label>
                    </span>
                </div>
                <div className="field col my-3">
                    <span className="w-full p-float-label">
                        <InputText required={true} keyfilter="alpha" className="w-full" id="lastName" value={formData.lastName} onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }); }} />
                        <label htmlFor="lastName">LastName</label>
                    </span>
                </div>
                <div className="field col-12 my-3">
                    <span className="w-full p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText keyfilter="email" className="w-full" id='email' value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); }} />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>
                <div className="field col-12 my-3">
                    <span className="w-full p-float-label">
                        <Password required={true} id='password' inputClassName='w-full' className="w-full" header={header} footer={footer} toggleMask value={formData.password} onChange={(e) => { setFormData({ ...formData, password: e.target.value }); }} />
                        <label htmlFor="password">Password</label>
                    </span>
                </div>
                <div className="field col-12 my-3">
                    <span className="w-full p-float-label">
                        <Calendar required={true} className="w-full" id="icon" showIcon value={formData.dateOfBirth} onChange={(e) => { setFormData({ ...formData, dateOfBirth: e.target.value }); }} />
                        <label htmlFor="icon">D.O.B</label>
                    </span>
                </div>
                <div className="field col-12 mb-4">
                    <Button disabled={disable} onClick={submitHandler} className="w-full" label='Register New Account!' loading={loading1}></Button>
                </div>
            </div>
        </div>


    </>);
}

export default FormRegister;