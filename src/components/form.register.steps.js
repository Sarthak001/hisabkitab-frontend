import React, { useState } from 'react';
import { Steps } from 'primereact/steps';

const FormRegisterSteps = (props) => {
    const items = [
        {
            label: 'Personal Info',
        },
        {
            label: 'Verification',
        },
        {
            label: 'Confirmation',
        }
    ];

    return (
        <Steps model={items} activeIndex={props.activeIndex}/>
    );
}

export default FormRegisterSteps;
