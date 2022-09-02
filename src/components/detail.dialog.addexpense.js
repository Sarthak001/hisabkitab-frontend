import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { AddExpense } from '../services/expense.service';
import {useRecoilValue} from 'recoil';
import { authStatus } from '../store/authstore';

const DialogAddExpense = (props) => {
    const auth = useRecoilValue(authStatus);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true)
    const [formData, setFormData] = useState({
        expenditureDate: "",
        amount: "",
        name: "",
        desc: "",
        category:"",
    })
    useEffect(() => {
        if (formData.expenditureDate && formData.amount && formData.name && formData.category) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [formData])

    const submitHandler = async () => {
        setLoading(true)
        const response = await AddExpense(formData,auth.token)
        if (response.status === true) {
            props.toasthandler({ type: "success", header: "Expense Added Successfully", desc: response.message })
            setLoading(false)
            setFormData({
                expenditureDate: "",
                amount: "",
                name: "",
                desc: "",
                category:"",
            })
            props.dialogFuncMap[`addExpenseDialog`](false);
            return
        }
        setLoading(false)
        setFormData({
            expenditureDate: "",
            amount: "",
            name: "",
            desc: "",
            category:"",
        })
        props.toasthandler({ type: "error", header: "Something Went Wrong", desc: response.message })
        props.dialogFuncMap[`addExpenseDialog`](false);

    }

    const onHide = (name) => {
        props.dialogFuncMap[`${name}`](false);
    }

    const categories = [
        { name: 'Utilites'},
        { name: 'Healthcare'},
        { name: 'Food'},
        { name: 'Entertainment & fun' },
        { name: 'Miscellaneous'}
    ]

    return (<>
        <Dialog header="Add Expense" position={props.position} visible={props.displayResponsive} onHide={() => onHide('addExpenseDialog')} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} >
            <div className="flex justify-content-center card">
                <div className="formgrid grid w-10 p-2">
                <div className="field col-12 my-3">
                        <span className="w-full">
                        <Dropdown value={formData.category} options={categories} onChange={(e) => { setFormData({ ...formData, category: e.target.value}); }} optionLabel="name" placeholder="Select a Category" className='w-5' />
                        </span>
                    </div>
                    <div className="field col-12 my-3">
                        <span className="w-full p-float-label">
                            <Calendar maxDate={new Date()} required={true} className="w-full" id="icon" showIcon value={new Date(formData.expenditureDate)} onChange={(e) => { setFormData({ ...formData, expenditureDate: e.target.value }); }} />
                            <label htmlFor="icon">Expenditure Date</label>
                        </span>
                    </div>
                    <div className="field col-12 my-3">
                        <span className="w-full p-float-label p-input-icon-right">
                            <i className="pi pi-dollar" />
                            <InputText keyfilter="money" className="w-full" id='amount' value={formData.amount} onChange={(e) => { setFormData({ ...formData, amount: e.target.value }); }} />
                            <label htmlFor="amount">Amount</label>
                        </span>
                    </div>
                    <div className="field col-12 my-3">
                        <span className="w-full p-float-label">
                            <InputText required={true} className="w-full" id="Name" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); }} />
                            <label htmlFor="Name">Name</label>
                        </span>
                    </div>
                    <div className="field col-12 my-3">
                        <span className="w-full p-float-label">
                        <InputTextarea rows={5} cols={30} required={true} className="w-full" id="Description" value={formData.desc} onChange={(e) => { setFormData({ ...formData, desc: e.target.value }); }} autoResize />
                            <label htmlFor="Description">Description</label>
                        </span>
                    </div>

                    <div className="flex justify-content-end field col-12 mb-2">
                        <Button disabled={disable} onClick={submitHandler} className="mx-2" label='Add Expense' loading={loading}></Button>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => onHide('addExpenseDialog')} className="p-button-text mx-2 hover:bg-teal-100" />
                    </div>
                </div>
            </div>
        </Dialog>
    </>)
}
export default DialogAddExpense;