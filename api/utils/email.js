const nodemailer = require('nodemailer');

const sendEmail = async options => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    const mailOptions = {
        from: '"Andrew Kozinsky" <andkozinskiy@yandex.ru',
        to: options.email,
        subject: options.subject,
        html: options.html,
        text: options.text
    }
    
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;