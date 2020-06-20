import React from 'react'
import './css/error.scss'


function Error(props) {
    const {
        text = `Error message didn't passed` // Текст ошибки
    } = props
    
    
    return <p className='error' >{text}</p>
}


export default Error