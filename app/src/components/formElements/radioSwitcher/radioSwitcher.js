import React from 'react'
import Button from "../button";
import './css/radioSwitcher.scss'


function RadioSwitcher(props) {
    // В values будет массив с настройками кнопок
    let { values = [], current = 1 } = props
    current *= 1
    
    
    const buttons = values.map( (btnProps, i) => {
        const btnPropsFixed = {...btnProps}
        if(current - 1 === i) btnPropsFixed.mode1 = true
        
        return <Button {...btnPropsFixed} key={i} />
    })
    
    return <div className='radio-switcher'>
        {buttons}
    </div>
}


export default RadioSwitcher