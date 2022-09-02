import React, { useState } from "react";
import { Button } from 'primereact/button';
import DialogAddExpense from "./detail.dialog.addexpense";
import DialogFilter from "./detail.dialog.filter";





const DetailToolbar = (props) => {
    const [addExpenseDialog, setAddExpenseDialog] = useState(false);
    const [filterDialog, setFilterDialog] = useState(false);
    const [position, setPosition] = useState('center');
    const dialogFuncMap = {
        'addExpenseDialog': setAddExpenseDialog,
        'filterDialog': setFilterDialog,
    }
    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }



    return (
        <>
            <div className="flex flex-row flex-wrap p-2">
                <div className="flex flex-1 "></div>
                <div className="flex flex-1 justify-content-end">
                    <Button icon='pi pi-filter' label="Sort Expense" className="p-button-text mr-1 hover:bg-teal-100" onClick={() => onClick('filterDialog', 'top')} />
                    <DialogFilter position={position} dialogFuncMap={dialogFuncMap} displayResponsive={filterDialog}  ></DialogFilter>
                    <Button icon='pi pi-plus' label="Add Expense" className="p-button-text mr-4 hover:bg-teal-100" onClick={() => onClick('addExpenseDialog', 'top')} />
                    <DialogAddExpense toasthandler={props.toasthandler} position={position} dialogFuncMap={dialogFuncMap} displayResponsive={addExpenseDialog} ></DialogAddExpense>
                </div>
            </div>
        </>
    );

}

export default DetailToolbar;