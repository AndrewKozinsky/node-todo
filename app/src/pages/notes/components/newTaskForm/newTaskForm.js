import React, {useRef, useEffect} from 'react';
import s from './css/newTaskForm.scss'
import {useDispatch} from "react-redux";
import {formSubmit} from "./js/resources";


function NewTaskForm() {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    
    useEffect(() => {
        inputRef.current.focus()
    })
    
    // Обработчик отправки формы
    function formSubmitHandler(e) {
        formSubmit(e, inputRef, dispatch)
    }
    
    return (
        <form className={s.form} onSubmit={formSubmitHandler}>
            <input type="text" className={s.input} placeholder='A new deal' ref={inputRef}/>
        </form>
    )
}


export default NewTaskForm;