const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    async sendActivationMail(to, link, login) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
<body>
    <div class="container">
        <div class="header">
            <h1>Добро пожаловать в PS2_STORE!</h1>
        </div>
        <div class="content">
            <p>Привет, <strong>${login}</strong>!</p>
            <p>Спасибо за регистрацию на нашем сайте видеоигр. Пожалуйста, активируйте свой аккаунт, нажав на кнопку ниже.</p>
            <p>Для активации аккаунта нажмите на кнопку:</p>
            <a href=${link} class="btn">Активировать аккаунт</a>
            <p>Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.</p>
        </div>
        <div class="footer">
            <p>© 2024 VideoGame. Все права защищены.</p>
        </div>
    </div>
</body>
                `
        })
    }
}

module.exports = new MailService();