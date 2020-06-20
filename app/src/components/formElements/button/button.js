import React from 'react'
import './css/button.scss'
import './css/spinner.scss'


function Button(props) {
    const {
        tag,
        text = `Text didn't pass`, // Текст на кнопке
        href,
        mode1,
        mode2,
        sign, // Значёк на кнопке. Значения: person, exit, check-all, sun, close, spinner
        counter, // Счётчик на кнопке
        disabled = false, // Заблокирована ли кнопка
    } = props
    
    // Тег элемента
    const Tag = tag === 'a' ? 'a' : 'button'
    
    // Формирование классов
    let cls = 'btn'
    if(mode1) cls += ' btn--mode-1'
    if(mode2) cls += ' btn--mode-2'
    
    const signEl = createSign(sign)
    const counterEl = <span className='btn__counter'>{counter}</span>
    
    return <Tag className={cls} href={href} disabled={disabled}>
        {signEl} {text} {counterEl}
    </Tag>
}


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
    
    return <span className={cls} />
}

function createSpinner() {
    return (
        <div className="loadingio-spinner-rolling-1en6plzu7rki">
            <div className="ldio-b2caqbeydll">
                <div />
            </div>
        </div>
    )
}

export default Button