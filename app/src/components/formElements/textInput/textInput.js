import React from 'react'
import './css/textInput.scss'


function TextInput(props) {
    const {
        label, // Подпись к полю ввода
        type = 'text', // Тип поля. Принимаются любые значения допустимые для <input>
        placeholder, // Текстозаполнитель
        value,
        disabled = false, // Заблокировано ли поле ввода
    } = props
    
    let [labelEl, id] = createLabel(label);
    
    let cls = 'text-input'
    if(type === 'search') cls += ' text-input--search'
    
    return <>
        {labelEl}
        <input
        type={type}
        value={value}
        id={id}
        className={cls}
        placeholder={placeholder}
        disabled={disabled} />
    </>
}

function createLabel(label) {
    if(!label) return [null, undefined]
    
    const randomStr = 'key-' + Math.round( (Math.random() * 10000) )
    
    const labelEl = <label className='input-label' htmlFor={randomStr}>{label}</label>
    
    return [labelEl, randomStr]
}


export default TextInput