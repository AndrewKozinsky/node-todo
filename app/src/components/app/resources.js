import browserConfig from "../../browserConfig";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/actions";


function getUserCredentials() {
    // Нахожусь в режиме разработки?
    const {isDevelopment} = browserConfig
    
    // Если нахожусь в режиме разработке, то посмотреть наличие токена в LocalStorage
    if(isDevelopment) {
        getTokenFromLocalStorage()
    }
}

async function getTokenFromLocalStorage() {
    // Получу токен из LocalStorage
    const token = localStorage.getItem('authToken')
    
    // Если токен есть, то отправить запрос на получение данных пользователя
    if(token) {
        // Параметры запроса
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        }
    
        const {serverOrigin} = browserConfig
        const apiUrl = serverOrigin + '/api/v1/users/login'
        
        const serverRes =
            await fetch(apiUrl, options)
                .then(data => data.json())
                .then(json => json)
    
        console.log(serverRes);
    }
    
    
    // Автоматически войду
    // const dispatch = useDispatch()
    // dispatch(setUser(userData.name, userData.email))
}

export {
    getUserCredentials
}

