const baseTemplate = require('./letters/functions/baseTemplate')
const confirmLetterContentTemplate = require('./letters/functions/confirmLetterContentTemplate')
const resetPasswordLetterContentTemplate = require('./letters/functions/resetPasswordLetterContentTemplate')


class EmailTemplate {
    constructor(host) {
        this.host = host
    }
    
    // Функция создаёт шаблон письма с просьбой подтвердить почтовый адрес
    createConfirmLetter(confirmUrl) {
        const letterContent = confirmLetterContentTemplate(confirmUrl)
        const htmlTemplate = baseTemplate(this.host, letterContent)
        
        const textContent = `Your email address was provided when you registered on the To Do List service. Please confirm your mail address by clicking on this address: ${confirmUrl}. If you did not register for this service, please ignore this letter.`
        
        return [htmlTemplate, textContent]
    }
    
    // Функция создаёт шаблон письма со ссылкой на сброс пароля
    createResetPasswordLetter(resetUrl) {
        const letterContent = resetPasswordLetterContentTemplate(resetUrl)
        const htmlTemplate = baseTemplate(this.host, letterContent)
    
        const textContent = `Reset password request was made. Please click on this address to reset your password and provide the new one: ${resetUrl}. If you didn't forget your password, please ignore this email.`
    
        return [htmlTemplate, textContent]
    }
}

module.exports = EmailTemplate