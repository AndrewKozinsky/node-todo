import React from 'react'
import { Link } from "react-router-dom";
import './css/button.scss'
import './css/spinner.scss'


function Button(props) {
    const {
        text = `Text didn't pass`, // Текст на кнопке
        i,
        counter, // Счётчик на кнопке
        disabled = false, // Заблокирована ли кнопка
    } = props
    
    const attrs = {}
    
    // Тип кнопки
    attrs.type = props.type ? props.type : 'button'
    if(props.href) delete attrs.type
    
    // Формирование классов
    let cls = 'btn'
    if(props.mode1) cls += ' btn--mode-1'
    if(props.mode2) cls += ' btn--mode-2'
    attrs.className = cls
    
    // Аттрибут href
    if(props.href) attrs.to = props.href
    
    // Аттрибут disabled
    if(disabled) attrs.disabled = true
    
    if(i) attrs.key = i
    
    // Контент
    const signEl = createSign(props.sign)
    const counterEl = <span className='btn__counter' key='b'>{counter}</span>
    const innerContent = [signEl, text, counterEl]
    
    
    return  props.tag === 'a'
        ? <Link {...attrs}>{innerContent}</Link>
        : <button {...attrs}>{innerContent}</button>
}

// type —- значёк на кнопке. Значения: person, exit, check-all, sun, close, spinner
function createSign(type) {
    if(!type) return null
    if(type === 'spinner') return createSpinner()
    
    let cls = 'btn__sign ';
    
    switch (type) {
        case 'person':
            cls += 'btn__sign--person'
            break
        case 'exit':
            cls += 'btn__sign--exit'
            break
        case 'check-all':
            cls += 'btn__sign--check-all'
            break
        case 'sun':
            cls += 'btn__sign--sun'
            break
        case 'close':
            cls += 'btn__sign--close'
            break
    }
    
    return <span className={cls} key='a' />
}

function createSpinner() {
    return (
        <div className='btnSpinnerWrapper' key='h'>
            <div className='btnSpinner'>
                <div />
            </div>
        </div>
    )
}

export default Button