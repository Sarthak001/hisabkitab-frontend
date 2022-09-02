import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { FileUpload } from 'primereact/fileupload';
import { getUserDetails } from '../services/user.details.service';

const UserData = (props) => {
    const [loading1, setLoading1] = useState(false);
    const [disable, setDisable] = useState(true)
    const [userDetails, setUserDetails] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        budget: "",
    })
    useEffect(() => {
        if (userDetails.email && userDetails.userName && userDetails.firstName && userDetails.lastName) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [userDetails])
    const submitHandler = () => { }
    const onBasicUploadAuto = () => {
        props.toastHandler({type:"info",header:"Upload status",desc:`File uploaded successfully`})
    }
    const getData = async ()=>{
        const response = await getUserDetails(props.authHandler.token)
        if (response.status === 200) {
            setUserDetails({...userDetails,userName:response.userName,firstName:response.firstName,lastName:response.lastName,email:response.email,budget:response.budget})
            return
        }
        props.toastHandler({type:"error",header:"Something went wrong",desc:`Try again after some time`})
    }
    const addHeaders =(event)=> {
        event.xhr.setRequestHeader("Authorization", "Bearer " + props.authHandler.token);
    }

    useEffect(()=>{
        getData()
    },[])

    return (<>
        <div className='flex flex-row justify-content-center p-4'>
            <div className='shadow-2 border-round-lg bg-white w-5 md:w-5 sm:w-10'>
                <div className="formgrid grid m-2 p-2 ">
                    <div className="field col-4 my-3 text-center">
                        <div className='flex flex-column w-full justify-content-center align-items-center'>
                        <Image className='my-1' src={`http://192.168.1.44:8080/static/${userDetails.userName}.jpg`} alt="Image" width='150px' height='150px' />
                        <span className='my-2 text-bold'>Upload a Profile picture</span>
                        <FileUpload id='file' name="file" onBeforeSend={addHeaders} mode="basic" url={`http://192.168.1.44:8080/expense/uploadimage`} accept="image/jpg" maxFileSize={1000000} onUpload={onBasicUploadAuto} auto chooseLabel="Browse" />
                        </div>
                    </div>
                    <div className="field col-8 my-3">
                        <div className="formgrid grid ">
                            <div className="field col-12">
                                <span className="w-full p-float-label p-input-icon-right">
                                    <i className="pi pi-user" />
                                    <InputText required={true} keyfilter="alphanum" className="w-full" id="userName" value={userDetails.userName} readOnly />
                                    <label htmlFor="UserName">Username</label>
                                </span>
                            </div>
                            <div className="field col my-3">
                                <span className="w-full p-float-label">
                                    <InputText required={true} keyfilter="alpha" className="w-full" id="firstName" value={userDetails.firstName} onChange={(e) => { setUserDetails({ ...userDetails, firstName: e.target.value }); }} />
                                    <label htmlFor="firstName">FirstName</label>
                                </span>
                            </div>
                            <div className="field col my-3">
                                <span className="w-full p-float-label">
                                    <InputText required={true} keyfilter="alpha" className="w-full" id="lastName" value={userDetails.lastName} onChange={(e) => { setUserDetails({ ...userDetails, lastName: e.target.value }); }} />
                                    <label htmlFor="lastName">LastName</label>
                                </span>
                            </div>
                            <div className="field col-12 my-3">
                                <span className="w-full p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText keyfilter="email" className="w-full" id='email' value={userDetails.email} onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }); }} />
                                    <label htmlFor="email">Email</label>
                                </span>
                            </div>
                            <div className="field col-12 mb-4">
                                <Button disabled={disable} onClick={submitHandler} className="w-full" label='Update details' loading={loading1}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);


}


export default UserData;