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
    
    // Получу имя пользователя и статус токена авторизации
    const {name, authTokenStatus} = useSelector(state => state.user)
    
    // Переменная где будет хранится сообщение об ошибке с сервера
    let [serverErrText, setServerErr] = useState(null)
    
    // Переменная где будет храниться уведомление
    const [notification, setNotification] = useState(null)
    
    // Если сервер сообщит об ошибке, то будет вызван setServerErr() и в serverErrText занеётся текст ошибки.
    // А ошибка есть, то она будет отрисована
    let serverError = serverErrText
        ? <Error text={serverErrText} indent='3' />
        : null
    
    // Если authTokenStatus равен нулю, то не понятно есть ли в браузере токен и верен ли он. Поэтому проверю.
    if(authTokenStatus === 0) {
        checkToken().then((status) => {
            dispatch( setAuthTokenStatus(status) )
        })
    }
    
    // Если токен действителен или в Хранилище есть имя пользователя, то сделать переадресацию на страницу заметок.
    if(authTokenStatus === 2 || name) return <Redirect to='/notes'/>
    
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
            
            {serverError}
    
            <div className={s.bottomPart}>
                <p>Do you have an account? <Link to='/enter'>Sign in.</Link></p>
            </div>
        </div>
    )
}


export default RegForm