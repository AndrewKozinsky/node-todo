const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const crypto = require('crypto')
const User = require('../mongooseModels/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const {createSendToken} = require('./authToken');


// Функция проверяющая правильность токена. Токен передаётся в заголовке запроса.
exports.checkToken = async (req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken
    }
    
    // Если токен не передан, то возвратить false
    if(!token) return res.status(200).json(false)
    
    // Расшифрую JWT и получу payload
    const decoded = await promisify( jwt.verify )(token, process.env.JWT_SECRET)
    
    // Получить пользователя
    const currentUser = await User.findById(decoded.id)
    
    // Если пользователь не найден, то вернуть false
    if(!currentUser) return res.status(200).json(false)
    
    // Если пароль изменён, то вернуть false
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return res.status(200).json(false)
    }
    
    // Если все проверки прошли мимо, то вернуть true —— токен верен
    return res.status(200).json(true)
}

/**
 * Функция отправляющая письмо со ссылкой подтверждения почты
 * @param {Object} req — объект запроса от клиента
 * @param {String} email — почта пользователю, которую он должен подтвердить
 * @param {String} confirmToken — токен подтверждения почты
 * @returns {Promise<void>}
 */
async function sendEmailAddressConfirmLetter(req, email, confirmToken) {
    const confirmUrl = `${req.protocol}://${req.get('host')}/api/v1/users/confirmEmail/${confirmToken}`;
    
    const userEmail = new Email(email)
    await userEmail.sendConfirmLetter(confirmUrl)
    
    // TODO Реализуй отправку на настоящую почту.
}
exports.sendEmailAddressConfirmLetter = sendEmailAddressConfirmLetter

// Функция защищающая маршрут от неавторизованных пользователей.
// Если пользователь отправил токен, то программа запускает следующий middleware.
// Если не отправил, то выбрасывает ошибку.
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken
    }
    
    
    // Если токен не передан, то бросить ошибку
    if(!token) {
        return next(
            new AppError('You are not logged in! Please log in to to get access', 401)
        )
    }
    
    // Расшифрую JWT и получу payload
    const decoded = await promisify( jwt.verify )(token, process.env.JWT_SECRET);
    
    // Получить пользователя
    const currentUser = await User.findById(decoded.id).select('+password')
    
    // Проверить существование пользователя
    if(!currentUser) {
        return next(
            new AppError('The user belonging to this token does not longer exists.', 401)
        )
    }
    
    // Проверю что пароль не изменён
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        )
    }
    
    // Поставить в req.user данные пользователя
    req.user = currentUser;
    
    next();
})


// Обработчик регистрации пользователя
exports.signUp = catchAsync(async (req, res, next) => {
    
    // Токен подтверждения почты
    const emailConfirmToken = crypto.randomBytes(32).toString('hex')
    
    // Создать нового пользователя
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        emailConfirmToken: emailConfirmToken,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    
    // Отправлю письмо с подтверждением почты
    await sendEmailAddressConfirmLetter(req, req.body.email, emailConfirmToken)
    
    // Убрать пароль и токен подтверждения почты.
    newUser.password = undefined;
    newUser.emailConfirmToken = undefined;
    newUser.__v = undefined;
    
    // Отправить данные пользователя
    createSendToken(newUser, res)
})


// Обработчик подтверждения почты пользователя
exports.confirmEmail = catchAsync(async (req, res, next) => {
    
    // Найду пользователя с таким же токеном подтверждения почты
    const user = await User.findOneAndUpdate(
        {emailConfirmToken: req.params.token},
        {emailConfirmToken: undefined},
        {new: true}
    )
    
    // Если пользователь не найден, то вернуть ошибочный ответ
    if(!user) {
        return next(
            new AppError('There are not user with this email token.', 400)
        )
    }
    
    // Уберу свойство emailConfirmToken у объекта с данными пользователя
    delete user.emailConfirmToken
    
    // Отправить данные пользователя и токен доступа к страницам
    createSendToken(user, res)
})


// Вход пользователя
exports.logIn = catchAsync(async (req, res, next) => {
    
    // Получу почту и пароль из тела запроса
    let {email, password} = req.body;
    
    // Если почту или пароль не передали, то попросить их ввести и завершить функцию
    if(!email || !password) {
        return next(
            new AppError('Please provide email and password.', 400)
        )
    }
    
    // Получу данные пользователя
    const user = await User.findOne({email}).select('+password -__v')
    
    // Если пользователь не найден или пароли не совпадают, то бросить ошибку.
    if(!user || !await user.correctPassword(password, user.password)) {
        return next(
            new AppError('Incorrect email or password', 400)
        )
    }
    
    // Если в данных пользователя в поле emailConfirmToken есть строка,
    // то значит пользователь еще не подтвердил почту. Попросить чтобы подтвердил.
    if(user.emailConfirmToken) {
        return next(
            new AppError('Please, confirm your email.', 403)
        )
    }
    
    // Отправить данные пользователя
    createSendToken(user, res)
})

// Выход пользователя
exports.logOut = (req, res, next) => {
    res.cookie('authToken', 'loggedout', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true
    })
    
    res.status(200).json({
        status: 'success'
    })
}

// Функция повторно отправляет письмо со ссылкой подтверждения почты.
exports.sendAnotherEmailLetter = catchAsync(async (req, res, next) => {
    // Найду пользователя по переданной почте
    const user = await User.findOne({email: req.body.email})
    
    if(!user) {
        return next(
            new AppError('There are not user with provided email.', 400)
        )
    }
    
    // Если письмо уже подтверждено, то его подтверждать не нужно. Брошу ошибку.
    if(!user.emailConfirmToken) {
        return next(
            new AppError('The email has already confirmed.', 400)
        )
    }
    
    // Отправлю письмо с подтверждением почты
    await sendEmailAddressConfirmLetter(req, req.body.email, user.emailConfirmToken)
    
    // Отправить данные пользователя
    res.status(200).json({
        status: 'success',
        data: null
    })
})


// Функция создаёт токен сброса пароля, ставит в ссылку изменения пароля и отправляет на почту пользователя.
exports.forgotPassword = catchAsync(async (req, res, next) => {
    
    // Получу данные пользователя
    const user = await User.findOne({email: req.body.email})
    
    if(!user) {
        return next(
            new AppError('There is no user with this email address', 404)
        )
    }
    
    // Создать токен сброса
    const resetToken = user.createPasswordResetToken()
    
    await user.save({
        validateBeforeSave: false
    })
    
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    
    try {
        const userEmail = new Email(user.email)
        await userEmail.sendResetPasswordLetter(resetUrl)
        
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Email has been sent!'
            }
        })
    }
    catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save({
            validateBeforeSave: false
        })
        
        next(
            new AppError('There was an error sending the email. Try again later', 500)
        )
    }
})

// Функция меняет пароль взамен забытого
exports.resetPassword = catchAsync(async (req, res, next) => {
    // Зашифрую пароль потому что в БД он хранится зашифрованным
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')
    
    // Найду пользователя по токену смены пароля
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    })
    
    if(!user) {
        next(
            new AppError('Token is invalid or has expired', 400)
        )
    }
    
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save();
    
    createSendToken(user, res)
})


