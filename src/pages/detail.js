import React, { useRef } from "react";
import DetailExpense from "../components/detail.expense";
import DetailToolbar from "../components/detail.toolbar";
import NavBar from "../components/navbar";
import { Toast } from 'primereact/toast';
import {useRecoilValue} from 'recoil';
import { authStatus } from '../store/authstore';



const ExpenseDetails = () => {
    const auth = useRecoilValue(authStatus);
    const toast = useRef(null);

    const notify = (toastConfig) => {
        toast.current.show({ severity: toastConfig.type, summary: toastConfig.header, detail: toastConfig.desc, life: 3000 });
    }

    return (<>

        <div className="flex flex-column bg-teal-50 min-h-screen">
            <Toast ref={toast} />
            <NavBar toasthandler={notify}></NavBar>
            <DetailToolbar toasthandler={notify}></DetailToolbar>
            <DetailExpense toasthandler={notify} authHandler={auth}></DetailExpense>
        </div>

    </>);
}

export default ExpenseDetails;