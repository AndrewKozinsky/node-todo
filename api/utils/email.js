const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')

module.exports = class Email {
    constructor(email) {
        this.to = email
        this.from = `Andrew Kozinsky <${process.env.EMAIL_FROM}>`
    }
    
    newTransport() {
        if(process.env.NODE_ENV === 'production') {
            // Sendgrid
            return 1
        }
        
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    
    async send(subject, htmlContent, textContent) {
    
        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html: htmlContent,
            text: textContent
        }
    
        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions)
    }
    
    async sendConfirmLetter(confirmUrl) {
        const subject = 'Confirm your email for registration at ToDo'
        const html = `<p>Go to <a href="${confirmUrl}">${confirmUrl}</a> to confirm your email.</p>`
        const text = `Go to ${confirmUrl} to confirm your email.`
        
        await this.send(subject, html, text)
    }
    
    async sendResetPasswordLetter(resetUrl) {
        const subject = 'Your password reset token (valid for 10 minutes)'
        const html = `Forget your password? Go to <a href="${resetUrl}">this page</a> to change it.\n\nIf you didn't forget your password, please ignore this email.`;
        const text = `Forget your password? Go to ${resetUrl} to change it.\n\nIf you didn't forget your password, please ignore this email.`
        
        await this.send(subject, html, text)
    }
}

/*
await userEmail.sendConfirmLetter()
    await sendEmail({
        email,
        subject: 'Confirm your email for registration at ToDo',
        text: `Go to ${confirmUrl} to confirm your email.`,
        html: `<p>Go to <a href="${confirmUrl}">${confirmUrl}</a> to confirm your email.</p>`
    })
    */


// Старый код. Можно удалить.
/*const sendEmail = async options => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    
    const mailOptions = {
        from: '"Andrew Kozinsky" <andkozinskiy@yandex.ru',
        to: options.email,
        subject: options.subject,
        html: options.html,
        text: options.text
    }
    
    await transporter.sendMail(mailOptions)
}*/