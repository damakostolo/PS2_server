const {User} = require("../../models/models")
const ApiError = require("../../errors/ApiErrors");
const passwordService = require("./passwordService");
const mailService = require("./mailService")
const tokenService = require("./tokenService");
const UserDto = require("../dtos/UserDto");
const uuid = require('uuid');


class authService {

    async registration(login, email, password, next) {  // будем шифровать пароли
        try {
            const candidateLogin = await User.findOne({where: {login}}) // проверяем наличие пользывателя с таким ником

            if(candidateLogin){
                return next(ApiError.badRequest('Пользыватель с этим ником уже существует'))
            }

            const candidateEmail = await User.findOne({where: {email}}) // проверяем наличие пользывателя с таким email

            if(candidateEmail){
                return next(ApiError.badRequest('Пользыватель с такой почтой уже существуе'))
            }

            const passwordCrypto = await passwordService.crypto(password); // создание шифра пароля

            const activationLink = uuid.v4(); // создание сыллки для активации


            const user = await User.create({login: login ,email: email, password: passwordCrypto, activatedLink: activationLink, isActivated: false}); // тут создание юзера не посредственно

            await mailService.sendActivationMail(email , `${process.env.API_URL}` + '/ps2/activate/' + `${activationLink}`, user.login); // отправка письма с активацией

            const userDto = new UserDto(user) // получаем всю нужную инфу от юзера
            console.log({...userDto});

            const tokens = tokenService.generateToken({...userDto}); // генерация токенов, база



            tokenService.saveToken(user.id, tokens.refreshToken, User); // сохраняем нашему позьзывателю рефреш токен

            return {...tokens ,user: userDto};

        }catch (err){
            next(err);
        }
    }

    async activate(activatedLink) {
        const user = await User.findOne({where: {activatedLink}})
        if(!user){
            return next('Користувач не знайден');
        }
        await User.update(
            { isActivated: true }, {
            where: {activatedLink}
        });
    }

}

module.exports = new authService();