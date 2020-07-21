const nodemailer = require('nodemailer')
const sendpulse = require('sendpulse-api')
// const htmlToText = require('html-to-text')


module.exports = class Email {
    constructor(email) {
        this.to = email
        this.from = `Andrew Kozinsky <${process.env.EMAIL_FROM}>`
    }
    
    async sendConfirmLetter(confirmUrl) {
        const subject = 'Confirm your email for registration at ToDo'
        const html = `<p>Go to <a href="${confirmUrl}">${confirmUrl}</a> to confirm your email.</p>`
        const text = `Go to ${confirmUrl} to confirm your email.`
        
        this.send(subject, html, text)
    }
    
    async sendResetPasswordLetter(resetUrl) {
        const subject = 'Your password reset token (valid for 10 minutes)'
        const html = `Forget your password? Go to <a href="${resetUrl}">this page</a> to change it.\n\nIf you didn't forget your password, please ignore this email.`;
        const text = `Forget your password? Go to ${resetUrl} to change it.\n\nIf you didn't forget your password, please ignore this email.`
        
        this.send(subject, html, text)
    }
    
    send(subject, htmlContent, textContent) {
        
        const mode = process.env.NODE_ENV
        if(mode === 'production') {
            this.sendFakeEmail(subject, htmlContent, textContent)
        }
        else if(mode === 'development') {
            this.sendRealEmail(subject, htmlContent, textContent)
        }
    }
    
    async sendFakeEmail(subject, htmlContent, textContent) {
        // Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html: htmlContent,
            text: textContent
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
    
    sendRealEmail(subject, html, text) {
        sendpulse.init(
            process.env.SENDPULSE_API_USER_ID,
            process.env.SENDPULSE_API_SECRET,
            process.env.SENDPULSE_TOKEN_STORAGE,
            function(token) {
        
            function answerGetter(data) {
                // console.log(data);
            }
        
            let email = {
                html,
                text,
                subject,
                'from' : {
                    'name' : 'Andrew Kozinsky',
                    'email' : this.from
                },
                'to' : [
                    {
                        "email" : this.to
                    },
                ]
            };
        
            sendpulse.smtpSendMail(answerGetter, email);
        })
    }
}




/*
sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function(token) {
    
    var answerGetter = function(data) {
        console.log(data);
    }
    
    var email = {
        "html" : "<h1>Hello again</h1>",
        "text" : "Example text",
        "subject" : "Example subject",
        "from" : {
            "name" : "Alex",
            "email" : "mail@andrewkozinsky.ru"
        },
        "to" : [
            {
                "name" : "Piter",
                "email" : "andkozinskiy@yandex.ru"
            },
        ]
    };
    
    sendpulse.smtpSendMail(answerGetter, email);
})*/
