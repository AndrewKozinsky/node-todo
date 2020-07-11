import browserConfig from "../../../browserConfig";


async function checkToken() {
    
    // Возьму токен из LocalStorage
    const locStrToken = localStorage.getItem('authToken')
    
    // Параметры запроса
    let options = {
        method: 'POST'
    }
    
    if(locStrToken && browserConfig.isDevelopment) {
        options.headers = { 'Authorization': 'Bearer ' + locStrToken }
    }
    
    const {serverOrigin} = browserConfig
    const apiUrl = serverOrigin + '/api/v1/users/checkToken'
    
    const serverRes = await fetch(apiUrl, options)
            .then(data => data.json())
            .then(json => json)
    
    return serverRes ? 2 : 1
}

export { checkToken }