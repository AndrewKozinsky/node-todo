import React, {useState} from 'react'
import { Formik} from "formik";
import {Link, Redirect, useParams} from "react-router-dom";
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
function ResetPasswordForm() {
    
    const dispatch = useDispatch()
    
    let { token } = useParams();
    
    // Получу имя пользователя и статус токена авторизации
    const {name, authTokenStatus} = useSelector(state => state.user)
    
    // Переменная где будет хранится сообщение об ошибке с сервера
    let [serverErrText, setServerErr] = useState(null)
    
    // Нужно ли делать переадресацию на страницу заметок
    const [goToNotes, setGoToNotes] = useState(false)
    
    if(goToNotes) {
        console.log('YYYES');
        return <Redirect to='/notes'/>
    }
        
        
        // Если сервер сообщит об ошибке, то будет вызван setServerErr() и в serverErrText занеcётся текст ошибки.
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
    if(authTokenStatus === 2 || name) return <Redirect to='/notes' />
    
    
    // Отрисовываемая форма
    return (
        <div>
            <FormHeader text='Password Reset' />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => onSubmitHandler(values, setServerErr, token, dispatch, setGoToNotes)}
            >
                { formik => createForm(formik, setServerErr) }
            </Formik>
            
            {serverError}
        </div>
    )
}


export default ResetPasswordForm