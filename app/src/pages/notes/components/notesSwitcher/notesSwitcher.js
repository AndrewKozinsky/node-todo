import React from 'react';
import RadioButtonsGroup from "../../../../components/formElements/radioButtonsGroup";

function NotesSwitcher() {
    
    const buttonsPropsArr = [
        {text: 'All', sign: 'check-all', counter: 2},
        {text: 'Selected', sign: 'sun', counter: 1}
    ]
    
    return (
        <div>
            <RadioButtonsGroup btnsPropsArr={buttonsPropsArr} />
        </div>
    );
}

export default NotesSwitcher;