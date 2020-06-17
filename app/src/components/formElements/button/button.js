import React from 'react'
import './css/button.scss'


function Button(props) {
    const {
        text = `Text don't pass`, // Текст на кнопке
        disabled = false // Заблокирована ли кнопка
    } = props
    
    return <button className='btn' disabled={disabled}>{text}</button>
}

export default Button