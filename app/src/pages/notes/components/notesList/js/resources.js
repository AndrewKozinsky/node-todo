import axios from 'axios'
import browserConfig from "../../../../../browserConfig";


export async function getNotesFromServer() {
    
    // По какому адресу буду делать запрос на вход пользователя
    const {serverOrigin, isDevelopment} = browserConfig
    const apiUrl = serverOrigin + '/api/v1/myNotes?page=1'
    
    // Возьму токен из LocalStorage
    const locStrToken = localStorage.getItem('authToken')
    let headers
    if(locStrToken && isDevelopment) {
        headers = { 'Authorization': 'Bearer ' + locStrToken }
    }
    
    let serverRes = await axios({
        method: 'get',
        headers,
        url: apiUrl
    })
    return serverRes.data.data.notes
    
    
    
    /*return new Promise((resolve, reject) => {
        resolve([
            {
                text: '22 Сделай программу на Реакте и Ноде где задачи были бы написаны огромным шрифтом. Думаю это будет выглядеть интересно.',
                important: false
            },
            {
                text: 'Может вместо видео делать текстовые статьи?',
                important: true
            },
        ])
    })*/
}