import React , {useRef, useState} from "react";
import { Toast } from 'primereact/toast';
import FormRegisterSteps from "../components/form.register.steps";
import FormRegister from "../components/form.register";
import FormRegisterCompelete from "../components/form.register.compelete";
import FormRegisterVerify from "../components/form.register.verfiy";

const Register = () => {
    const toast = useRef(null);
    const [formState,setFormState] = useState({
        index:0,
        isPersonalinfo : true,
        isInVerification : false,
        isCompleted : false

    });
    const [currentUser,setCurrentUser] = useState(null);

    const notify = (toastConfig)=>{
        toast.current.show({severity: toastConfig.type, summary: toastConfig.header , detail: toastConfig.desc,life: 5000});
    }

    const formRegisterState = (state,userobj)=>{
        setFormState(state);
        setCurrentUser(userobj);
    }


    return (
        <div className="flex sm:flex-column align-items-center justify-content-center bg-teal-50  min-h-screen">
        <Toast ref={toast} />
        <div className="min-w-min mb-5 sm:w-9 md:w-8 lg:w-4 xl:w-4 w-7 h-6 border-round-xl shadow-2 bg-white" >
            <div className="m-2 p-2">
            <FormRegisterSteps activeIndex={formState.index}></FormRegisterSteps>
            </div>
            {formState.isPersonalinfo && <FormRegister toasthandler={notify} statehandler={formRegisterState}></FormRegister>}
            {formState.isInVerification && <FormRegisterVerify toasthandler={notify} user={currentUser} statehandler={formRegisterState}></FormRegisterVerify>}
            {formState.isCompleted && <FormRegisterCompelete toasthandler={notify} user={currentUser} statehandler={formRegisterState}></FormRegisterCompelete>}
            
        </div>
        </div>
    );
}

export default Register;