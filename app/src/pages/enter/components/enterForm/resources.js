import * as Yup from "yup";
import {Form} from "formik";
import FieldsDividerWrapper from "../../../../components/formContainers/fieldsDividerWrapper";
import TextInput from "../../../../components/formElements/textInput";
import Button from "../../../../components/formElements/button";
import {setUser} from "../../../../store/actions";
import React from "react";


// Начальные значения полей формы
export const initialValues = {
    email: '',
    password: ''
}

// Проверка полей формы
export const validationSchema = Yup.object({
    email: Yup.string()
        .required('This field is required')
        .email('Invalid email address'),
    password: Yup.string()
        .required('This field is required')
        .min(4, 'Must be 4 characters or more')
})


/**
 * Функция возвращает отрисовываемую форму
 * @param {Object} formik — объект с со свойствами и методами возаращаемыми библиотекой Formik
 * @param {Function} setServerErr — функция показывающая и скрывающая текст ошибки от сервера.
 * В этой функции она постоянно будет запускаться в значении null
 * чтобы после любого изменения формы текст ошибки сервера бы скрывался.
 * @returns {*}
 */
export function createForm(formik, setServerErr) {
    
    // Если форму отправили, то заблокировать поля ввода
    let isDisabled = formik.isSubmitting
    
    return (
        <Form onChange={() => setServerErr(null)}>
            <FieldsDividerWrapper indent='2'>
                <TextInput label='Email' type='email' name='email' disabled={isDisabled} autoComplete="email" />
            </FieldsDividerWrapper>
            
            <FieldsDividerWrapper indent='2'>
                <TextInput label='Password' type='password' name='password' disabled={isDisabled} autoComplete="current-password" />
            </FieldsDividerWrapper>
            
            <SubmitBtn formik={formik} />
        </Form>
    )
}

/**
 * Функция возвращает кнопку отправки формы
 * @param {Object} formik — объект с со свойствами и методами возаращаемыми библиотекой Formik
 * @returns {*}
 */
function SubmitBtn({formik}) {
    
    // Атрибуты кнопки
    const attrs = {
        text: 'Submit',
        type: 'submit'
    }
    
    // Если в форме есть ошибки или
    // форму еще не заполняли или
    // форму уже отправили,
    // то блокировать кнопку отправки
    if(!formik.isValid || !formik.dirty || formik.isSubmitting) {
        attrs.disabled = true
    }
    
    // Если форму отправили, то показать крутилку
    // чтобы уведомить пользователя об ожидании ответа сервера
    if(formik.isSubmitting) {
        attrs.sign = 'spinner'
    }
    
    return <Button {...attrs} />
}

/**
 * Обработчик отправки формы
 * @param {Object} values — объект с введёнными значениями в поля формы
 * @param {Function} setServerErr — функция куда нужно передать текст ошибки отданной сервером.
 * @param {Function} dispatch — диспатчер экшен-функции.
 */
export async function onSubmitHandler(values, setServerErr, dispatch) {
    
    // По какому адресу буду делать запрос на вход пользователя
    // TODO Когда загрузишь на сервер, то тут будет ошибка
    //  потому что нужно заменить адрес на настоящий. Пока не знаю как это сделать.
    const apiUrl = `http://localhost:3000/api/v1/users/login`
    
    // Параметры запроса
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(values)
    }
    
    // Сделаю запрос на сервер и полученные данные помещу в serverRes
    const serverRes = await fetch(apiUrl, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    /*
    В serverRes будет или объект с успехом:
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6...",
        "data": {
            "user": {
                "name": "Andrew Kozinsky",
                "email": "andkozinskiy@yandex.ru",
            }
        }
    }
    Или объект с ошибкой про неверные данные от пользователя:
    {
        "status": "fail",
        "error": {
            "statusCode": 400,
            "status": "fail",
            "isOperational": true
        },
        "message": "Please provide email and password.",
    }
    Или 500 ошибка если данные вообще не переданы (пользователю удалось отправить форму без проверки на клиенте)
    {
        "status": "error",
        "error": {
            "statusCode": 500,
            "status": "error",
            "isOperational": true
        },
        "message": "Incorrect email or password",
    }
    */
    
    // Если успешный ответ
    if(serverRes.status === 'success') {
        // console.log(serverRes);
        // Получить данные пользователя
        const userData = serverRes.data.user
        
        // Поставить их в Хранилище
        dispatch(setUser(userData.name, userData.email))
    }
    // В противном случае передать текст ошибки функции показывающую ошибку.
    else {
        setServerErr(serverRes.message)
    }
}