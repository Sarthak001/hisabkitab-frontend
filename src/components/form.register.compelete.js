import React, {useEffect} from 'react';
import { Ripple } from 'primereact/ripple';
import { useNavigate } from "react-router-dom";


const FormRegisterCompelete = (props) => {
    let navigate = useNavigate();
    const completehandler = async()=>{
        setTimeout(()=>{
            props.toasthandler({type:"success",header:"User Registration Successful",desc:`Email:${props.user.email}`})
            setTimeout(()=>{
                props.statehandler({
                    index:0,
                    isPersonalinfo : true,
                    isInVerification : false,
                    isCompleted : false},null) 
                navigate("../login", { replace: true });
            },2000)
        },2000)

    }

    useEffect(() => {
        completehandler();
      });



    return (<>
        <div className="flex justify-content-center card">
            <div className="formgrid grid w-10 p-2">
                <div className="field col-12 my-1 text-center p-ripple">
                <Ripple />
                <i className='pi pi-check-circle bg-teal-400 m-2 p-2 border-round-xl text-white shadow-2'style={{'fontSize': '3em'}}></i>
                </div>
                <span className='my-2 text-xl text-bold'>{`User ${props.user.user} Successfully got registered.You will be shortly redirected to the login page. Bubyee!`}</span>
            </div>
        </div>


    </>);
}

export default FormRegisterCompelete;