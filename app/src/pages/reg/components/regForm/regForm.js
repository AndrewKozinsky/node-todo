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
} from "./js/resources";
import {checkToken} from "../../../main/js/checkToken";
import {setAuthTokenStatus} from "../../../../store/actions";


// Форма регистрации нового пользователя
function RegForm() {
    
    const dispatch = useDispatch()
    
    // Сообщение об ошибке с сервера
    let [serverErr, setServerErr] = useState(null)
    
    // Уведомление
    const [notification, setNotification] = useState(null)
    
    // Если есть уведомление, то отрисовать уведомленин.
    if(notification) return notification
    
    
    // Отрисовываемая форма
    return (
        <div>
            <FormHeader text='Sign up' />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => onSubmitHandler(values, setServerErr, setNotification, dispatch)}
            >
                { formik => createForm(formik, setServerErr) }
            </Formik>
            
            {serverErr}
    
            <div className={s.bottomPart}>
                <p>Do you have an account? <Link to='/enter'>Sign in.</Link></p>
            </div>
        </div>
    )
}


export default RegForm