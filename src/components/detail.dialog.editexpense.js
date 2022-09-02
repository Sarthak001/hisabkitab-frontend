import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { AddExpense } from '../services/expense.service';

const DialogEditExpense = (props) => {
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true)
    const [formData, setFormData] = useState({
        expenditureDate: null,
        amount: 0,
        name: "",
        desc: "",
        category:{name:""},
    })

    useEffect(()=>{
        const dateParts = props.data.expenditureDate.split("-");
        const dateObj = new Date(dateParts[2],dateParts[1]-1,dateParts[0])
        setFormData({
            expenditureDate:dateObj,
            amount: props.data.amount,
            name: props.data.name,
            desc: props.data.desc,
            category:{name:props.data.category},
        })
        
    },[props.data])

    useEffect(() => {
        if (formData.expenditureDate && formData.amount && formData.name && formData.category) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [formData])

    const submitHandler = async () => {
        setLoading(true)
        const response = await AddExpense(formData,props.auth.token)
        if (response.status === true) {
            props.toasthandler({ type: "success", header: "Expense Added Successfully", desc: response.message })
            setLoading(false)
            setFormData({
                expenditureDate: null,
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
            expenditureDate: null,
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

    const editCategories = [
        { name: 'Utilites'},
        { name: 'Healthcare'},
        { name: 'Food'},
        { name: 'entertainment & fun'},
        { name: 'miscellaneous'}
    ]

    return (<>
        <Dialog header="Edit Expense" position={props.position} visible={props.displayResponsive} onHide={() => onHide('editExpenseDialog')} breakpoints={{ '960px': '75vw' }} style={{ width: '35vw' }} >
            <div className="flex justify-content-center card">
                <div className="formgrid grid w-12 p-2">
                <div className="field col-12 my-3">
                        <span className="w-full">
                        <Dropdown value={formData.category} options={editCategories} onChange={(e) => { setFormData({ ...formData, category: e.value }); }} optionLabel="name" placeholder="Select a Category" className='w-5' />
                        </span>
                    </div>
                    <div className="field col-12 my-3">
                        <span className="w-full p-float-label">
                            <Calendar dateFormat="dd/mm/yy" maxDate={new Date()} required className="w-full" id="icon" showIcon value={formData.expenditureDate} onChange={(e) =>{setFormData({ ...formData, expenditureDate: e.value });console.log(e)}} />
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
                            <InputText required className="w-full" id="Name" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); }} />
                            <label htmlFor="Name">Name</label>
                        </span>
                    </div>
                    <div className="field col-12 my-3">
                        <span className="w-full p-float-label">
                        <InputTextarea rows={5} cols={30} required className="w-full" id="Description" value={formData.desc} onChange={(e) => { setFormData({ ...formData, desc: e.target.value }); }} autoResize />
                            <label htmlFor="Description">Description</label>
                        </span>
                    </div>
                    <div className="flex justify-content-end field col-12 mb-2">
                        <Button disabled={disable} onClick={submitHandler} className="mx-2" label='Add Expense' loading={loading}></Button>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => onHide('editExpenseDialog')} className="p-button-text mx-2 hover:bg-teal-100" />
                    </div>
                </div>
            </div>
        </Dialog>
    </>)
}


export default DialogEditExpense;