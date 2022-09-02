import React , {useEffect, useRef, useState} from "react";
import { Toast } from 'primereact/toast';
import FormLogin from "../components/form.login";
import FormLoginSteps from "../components/form.login.steps";
import FormLoginVerify from "../components/form.login.verfiy.";
import { useNavigate } from "react-router-dom";
import {useRecoilValue} from 'recoil';
import { authStatus } from "../store/authstore";



const Login = () => {
    const auth = useRecoilValue(authStatus)
    let navigate = useNavigate();

    useEffect(()=>{
        if(auth.status){
            navigate("../dashboard", { replace: true });
        }
    },[])

    const toast = useRef(null);
    const [formState,setFormState] = useState({
        index:0,
        CredentialWindow : true,
        isInVerification : false,
    });

    const notify = (toastConfig)=>{
        toast.current.show({severity: toastConfig.type, summary: toastConfig.header , detail: toastConfig.desc,life: 5000});
    }

    const formLoginState = (state)=>{
        setFormState(state)
    }
    return (
        <>
        <div className="flex sm:flex-column align-items-center justify-content-center bg-teal-50  min-h-screen">
        <Toast ref={toast} />
        <div className="min-w-min sm:w-9 md:w-8 lg:w-4 xl:w-4 w-7 border-round-xl shadow-2 bg-white" >
            <div className="m-2 p-2">
                <FormLoginSteps activeIndex={formState.index}></FormLoginSteps>
            </div>
            {formState.CredentialWindow && <FormLogin toasthandler={notify} statehandler={formLoginState}></FormLogin>}
            {formState.isInVerification && <FormLoginVerify toasthandler={notify}  statehandler={formLoginState}></FormLoginVerify>}
            
        </div>
        </div>
        </>      
    );
}

export default Login;