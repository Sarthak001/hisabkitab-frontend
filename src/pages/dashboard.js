import React, { useRef } from "react";
import DashBoardCards from "../components/dashboard.cards";
import DashBoardExpenseList from "../components/dashboard.expense.list";
import DashBoardGraph from "../components/dashboard.visual.chart";
import NavBar from "../components/navbar";
import { useRecoilValue } from 'recoil';
import { authStatus } from '../store/authstore';
import { Toast } from 'primereact/toast';




const DashBoard = () => {
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
                <div className="grid my-1 mx-2 p-2">
                    <DashBoardCards authHandler={auth} toastHandler={notify}></DashBoardCards>
                    <DashBoardExpenseList authHandler={auth} toastHandler={notify}></DashBoardExpenseList>
                    <DashBoardGraph authHandler={auth} toastHandler={notify}></DashBoardGraph>
                </div>
            </div>

        </>
    );
}

export default DashBoard;