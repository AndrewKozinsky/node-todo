const jwt = require('jsonwebtoken');


/**
 * Функция создающая токен пользователя по переданному ID
 * @param {String} id — id пользователя
 * @returns {undefined|*}
 */
const signToken = id => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}

exports.signToken = signToken


/**
 * Функция отправляющая данные пользователя вместе с токеном доступа
 * @param user
 * @param statusCode
 * @param res
 */
const createSendToken = (user, res, statusCode = 200) => {
    const token = signToken(user.id)
    
    const cookieOptions = {
        expires: Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
    
    if(process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true
    }
    
    res.cookie('jwt', token, cookieOptions)
    
    // Уберу пароль
    user.password = undefined;
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.createSendToken = createSendToken