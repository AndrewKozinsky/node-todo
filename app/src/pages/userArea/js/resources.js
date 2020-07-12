import browserConfig from '../../../browserConfig'
import {setUser} from "../../../store/actions";




/**
 * Обработчик отправки формы
 * @param {Function} dispatch — диспатчер экшен-функции.
 */
export async function setUserDataToStore(dispatch) {
    
    // По какому адресу буду делать запрос на получение данных пользователя
    const {serverOrigin, isDevelopment} = browserConfig
    const apiUrl = serverOrigin + '/api/v1/users/me'
    
    // Параметры запроса
    const options = { method: 'GET' }
    
    if(isDevelopment) {
        options.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('authToken')}
    }
    
    // Сделаю запрос на сервер и полученные данные помещу в serverRes
    const serverRes = await fetch(apiUrl, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    
    
    /* Если всё верно, то в serverRes будет объект с успехом:
    {
        "status": "success",
        "data": {
            "user": {
                "email": "andkozinskiy@yandex.ru",
                "name": "Andrew Kozinsky"
            }
        }
    }*/
    if(serverRes.status === 'success') {
        // Получить данные пользователя
        const {name, email} = serverRes.data.user
        
        // Поставить их в Хранилище
        dispatch( setUser(name, email) )
    }
}