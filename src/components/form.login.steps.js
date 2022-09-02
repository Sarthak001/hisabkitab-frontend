import React, { useState } from 'react';
import { Steps } from 'primereact/steps';

const FormLoginSteps = (props) => {
    const items = [
        {
            label: 'Enter Credentails',
        },
        {
            label: 'OTP Verification',
        },
    ];

    return (
        <Steps model={items} activeIndex={props.activeIndex}/>
    );
}

export default FormLoginSteps;
