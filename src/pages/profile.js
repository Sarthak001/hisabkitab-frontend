import React, { useRef } from "react";
import NavBar from "../components/navbar";
import { Toast } from 'primereact/toast';
import UserData from "../components/profile.user.data";
import {useRecoilValue} from 'recoil';
import { authStatus } from '../store/authstore';


const Profile = () => {
    const auth = useRecoilValue(authStatus);
    const toast = useRef(null);

    const notify = (toastConfig) => {
        toast.current.show({ severity: toastConfig.type, summary: toastConfig.header, detail: toastConfig.desc, life: 3000 });
    }
    return (
        <>
            <div className="flex flex-column bg-teal-50 min-h-screen">
                <Toast ref={toast} />
                <NavBar></NavBar>
                <UserData toastHandler={notify} authHandler={auth}></UserData>
            </div>
        </>
    );
}

export default Profile;