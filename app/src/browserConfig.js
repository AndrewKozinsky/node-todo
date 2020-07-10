
// Находится ли сайт в режиме разработки
const isDevelopment = location.host.startsWith('localhost')

const serverOrigin = isDevelopment
    ? location.protocol + '//' + location.hostname + ':3000'
    : location.protocol + location.host

export default {
    // Находится ли сайт в режиме разработки
    isDevelopment,
    // Адрес сайта
    serverOrigin
}