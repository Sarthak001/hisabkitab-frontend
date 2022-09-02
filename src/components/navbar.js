
import { Menu } from 'primereact/menu';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { authStatus } from '../store/authstore';
import {useRecoilState} from 'recoil';


const NavBar = (props) => {
    const [auth, setAuth] = useRecoilState(authStatus);
    let navigate = useNavigate();
    const menu = useRef(null);
    const items =
        [
            {}, 
            {}
        ];

    const logouthandler = ()=>{
        
        setAuth({
            status : false,
            credentialVerified:false,
            otpVerified:false,
            userName : "",
            email : "",
            token : ""
        });
    }



    return (<>

        <div className="flex bg-white shadow-1 mb- p-3">
            <div className="flex-none flex align-items-center justify-content-center font-bold text-white">
                <img alt="logo" src="http://192.168.1.103:8080/static/expense.png" height="60px" className="ml-5"></img>;
            </div>
            <div className="flex-grow-1 flex align-items-center justify-content-center font-bold text-white"></div>
            <div className="flex-none flex align-items-center jusitfy-content-start font-bold text-white">
            <Menu model={items} popup ref={menu} id="popup_menu"/>
                <div className='mx-4'>
                    <Button onClick={(event) => menu.current.toggle(event)} icon="pi pi-bell" className="hover:bg-teal-100 p-button-rounded p-button-text mx-2"/>
                    <Button onClick={()=>{navigate("/profile")}} icon="pi pi-user-edit" className="p-button-rounded p-button-text hover:bg-teal-100 mx-2 " tooltip='View Profile' tooltipOptions={{ position: 'bottom' }} />
                    <Button onClick={logouthandler} icon="pi pi-sign-out" className="p-button-rounded p-button-text hover:bg-teal-100 hover:bg-teal-100 mx-2 " tooltip='Log Out' tooltipOptions={{ position: 'bottom' }} />
                </div>
            </div>
        </div>

    </>);
}


export default NavBar;