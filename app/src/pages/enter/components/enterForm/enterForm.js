import React, {useState} from 'react'
import { Formik} from "formik";
import {Link, Redirect} from "react-router-dom";
import s from './css/form.scss'
import FormHeader from "../../../../components/formElements/formHeader";
import Error from "../../../../components/formElements/error";
import {useDispatch, useSelector} from "react-redux";
import {
    initialValues,
    validationSchema,
    createForm,
    onSubmitHandler
} from "./resources";


// Форма регистрации нового пользователя
function EnterForm() {
    
    const dispatch = useDispatch()
    
    // Если сервер сообщит об ошибке, то вызову setServerErr()
    // и занесу текст ошибки в serverErrText. А если там будет ошибка, то в serverError
    // будет сообщение об ошибке, которое будет показано ниже формы.
    let [serverErrText, setServerErr] = useState(null)
    let serverError = serverErrText
        ? <Error text={serverErrText} indent='1' />
        : null
    
    // Получу имя пользователя чтобы понять зарегистрирован ли он
    const {name} = useSelector(store => store.user)

    // Если имя пользователя есть, то отправить на страницу заметок
    if(name) return <Redirect to='/notes'/>
    
    
    // Отрисовываемая форма
    return (
        <div>
            <FormHeader text='Log in' />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => onSubmitHandler(values, setServerErr, dispatch)}
            >
                { formik => createForm(formik, setServerErr) }
            </Formik>
            
            {serverError}
    
            <div className={s.bottomPart}>
                <p>Are you a new user? <Link to='/reg'>Sign up.</Link></p>
                <p>Don't remember password? <Link to='/password-reset'>Reset password.</Link></p>
            </div>
        </div>
    )
}


export default EnterForm