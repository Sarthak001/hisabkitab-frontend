import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';








const DialogFilter = (props) => {

    const onHide = (name) => {
        props.dialogFuncMap[`${name}`](false);
    }



    return (<>
        <Dialog header="Filter Expense" position={props.position} visible={props.displayResponsive} onHide={() => onHide('filterDialog')} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }}>

        </Dialog>
    </>)
}


export default DialogFilter;