
// Находится ли сайт в режиме разработки
const isDevelopment = location.host.startsWith('localhost')


/*const serverOrigin = isDevelopment
    ? location.protocol + '//' + location.hostname + ':3000' : ''*/
const serverOrigin = ''

const browserConfig = {
    // Находится ли сайт в режиме разработки
    isDevelopment,
    // Адрес сайта
    serverOrigin
}


export default browserConfig