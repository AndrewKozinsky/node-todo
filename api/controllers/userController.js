const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../mongooseModels/user');
const authToken = require('./authToken');


/**
 * Функция получает объект и возвращает объект с разрешёнными свойствами
 * @param {Object} obj — исходный объект
 * @param {Array} allowedFields — массив с именами разрешённых свойств
 * @returns {Object} — функция возвращает объект с разрешёнными свойствами
 */
const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) {
            newObj[el] = obj[el]
        }
    })
    
    return newObj;
}

exports.changeMyEmail = catchAsync(async (req, res, next) => {
    const newEmail = req.body.email;
    
    if(!newEmail) {
        return next(
            new AppError(`Cannot change email because it didn't pass.`, 400)
        )
    }
    
    const user = await User.findOneAndUpdate(
        {email: req.user.email},
        {email: newEmail},
        {new: true}
    )
    
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})

// Функция отправляет данные пользователя по его токену
exports.getMe = catchAsync(async (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        data: {
            user: {
                email: req.user.email,
                name: req.user.name
            }
        }
    })
})


// Функция обновляет данные пользователя
exports.updateMe = catchAsync(async (req, res, next) => {
    // Если передают пароль или почту, то ответить, что этот маршрут не для изменения пароля и почты
    if(req.body.password || req.body.passwordConfirm || req.body.email) {
        return next(
            new AppError('This route is not for password or email update. Please use suitable route.', 400)
        )
    }

    // Отфильтрую данные чтобы получить только разрешённые для изменения свойства.
    // Пока разрешно только менять имя.
    const filteredBody = filterObj(req.body, 'name')
    
    
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {new: true, runValidators: true}
    ).select('-emailConfirmToken -passwordChangedAt -__v -_id')
    
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})

// Функция изменения пароля текущего пользователя, который помнит свой пароль
exports.updateMyPassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    
    if(!await user.correctPassword(req.body.passwordCurrent, user.password)) {
        return next(
            new AppError('Your current password is wrong', 401)
        )
    }
    
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    
    // Соханить пароль в базе данных
    await user.save()
    
    // Сотру пароли чтобы они не попали в возвращаемый результат
    user.password = undefined;
    user.passwordConfirm = undefined;
    
    authToken.createSendToken(user, res)
})

// Функция удаляет пользователя
exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(
        req.user.id
    )
    
    res.status(204).json({
        status: 'success',
        data: null
    })
})
