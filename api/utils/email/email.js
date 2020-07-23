const nodemailer = require('nodemailer')
const sendpulse = require('sendpulse-api')
const EmailTemplate = require('./emailTemplate')


module.exports = class Email {
    constructor(email, host) {
        this.to = email // На какой адрес отправлять письмо
        this.from = process.env.EMAIL_FROM // От кого письмо
        this.host = host // Домен сайта
    }
    
    // Функция отправляет письмо с просьбой подтвердить почтовый адрес
    async sendConfirmLetter(confirmUrl) {
        const subject = 'Confirm your email for registration at ToDo'
        const [html, text] = new EmailTemplate(this.host).createConfirmLetter(confirmUrl)
        this.send(subject, html, text)
    }
    
    // Функция отправляет письмо со ссылкой на сброс пароля
    async sendResetPasswordLetter(resetUrl) {
        const subject = 'Your password reset token (valid for 10 minutes)'
        const [html, text] = new EmailTemplate(this.host).createResetPasswordLetter(resetUrl)
        this.send(subject, html, text)
    }
    
    // Общая функция отправки письма.
    // В зависимости от режима сервера отправляет письма либо на mailtrap.io либо на реальный адрес
    send(subject, htmlContent, textContent) {
        
        // Режим работы сервера
        const mode = process.env.NODE_ENV
        
        if(mode === 'development') {
            this.sendFakeEmail(subject, htmlContent, textContent)
        }
        else if(mode === 'production') {
            this.sendRealEmail(subject, htmlContent, textContent)
        }
    }
    
    // Функция отправляющая письма на mailtrap.io
    async sendFakeEmail(subject, html, text) {
        // Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text
        }
    
        // Create a transport
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        
        // 3) Send email
        await transport.sendMail(mailOptions)
    }
    
    // Функция отправляющая письма на реальный адрес пользователя
    sendRealEmail(subject, html, text) {
        const userId = process.env.SENDPULSE_API_USER_ID
        const secret = process.env.SENDPULSE_API_SECRET
        const tokenStorage = process.env.SENDPULSE_TOKEN_STORAGE
        
        sendpulse.init(userId, secret, tokenStorage, (token) => {
        
            // Функция сообщающая результат отправки письма
            // В неё первым аргументом попадёт объект отчёта об отправке
            function answerGetter(data) { }
        
            let email = {
                html,
                text,
                subject,
                'from' : {
                    'name' : 'To Do App',
                    'email' : this.from
                },
                'to' : [
                    { "email" : this.to }
                ]
            };
        
            sendpulse.smtpSendMail(answerGetter, email);
        })
    }
}