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
import {checkToken} from "../../js/checkToken";
import {setAuthTokenStatus} from "../../../../store/actions";


// Форма регистрации нового пользователя
function ResetPasswordForm() {
    
    const dispatch = useDispatch()
    
    // Получу из адресной строки токен сброса пароля
    let { token } = useParams();
    
    // Сообщение об ошибке с сервера
    let [serverErr, setServerErr] = useState(null)
    
    // Нужно ли делать переадресацию на страницу заметок
    const [goToNotes, setGoToNotes] = useState(false)
    
    if(goToNotes) {
        return <Redirect to='/notes'/>
    }
    
    
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
            
            {serverErr}
        </div>
    )
}


export default ResetPasswordForm