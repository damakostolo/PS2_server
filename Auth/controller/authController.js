const ApiError = require("../errors/ApiErrors");
const {User} = require("../../models/models")
const passwordService = require("../service/passwordService");

class AuthController {


    async register(req, res, next) {
        try {
            const {login, email , password} = req.params;

            const candidateLogin = User.findOne({where: {login}}) // проверяем наличие пользывателя с таким ником

            if(candidateLogin){

            }

            const candidateEmail = User.findOne({where: {email}}) // проверяем наличие пользывателя с таким email

            if(candidateEmail){

            }

            const passwordCrypto = await passwordService.crypto(password); // создание шифра пароля

            const user = await User.create({})

            res.status(200).json({user})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async login (req, res, next) {
        try {
            // Ну как нужно как ну нах не надо
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async logout (req, res, next) {
        try {
            // Ну как нужно как ну нах не надо
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async activate (req, res, next) {
        try {
            // Ну как нужно как ну нах не надо
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async refresh (req, res, next) {
        try {
            // Ну как нужно как ну нах не надо
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new AuthController();