const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../mongooseModels/user');


/**
 * Функция создающая токен пользователя по переданному ID
 * @param {String} id — id пользователя
 * @returns {undefined|*}
 */
const signToken = id => {
    // console.log('User id is', user);
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}


/**
 * Функция отправляющая данные пользователя вместе с токеном доступа
 * @param user
 * @param statusCode
 * @param res
 */
const createSendToken = (user, res, statusCode = 200) => {
    const token = signToken(user._id)
    
    // Если нахожусь в режиме публикации, то к ответу добавить куку с токеном
    if(process.env.NODE_ENV === 'production') {
        const cookieOptions = {
            expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true
        }
    
        res.cookie('authToken', token, cookieOptions)
    }
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: {
                name: user.name,
                email: user.email
            }
        }
    })
}


module.exports.createSendToken = createSendToken
