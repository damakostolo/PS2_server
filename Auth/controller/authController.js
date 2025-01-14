const ApiError = require("../../errors/ApiErrors");
const authService = require("../service/authService");
const {validationResult} = require("express-validator");

class AuthController {


    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return next(ApiError.badRequest('Помилка валідації', errors.array())); // валидация помилок на Пошту та Пароль
            }

            const {login, email , password} = req.body;

            const userData = await authService.registration(login, email, password, next);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            return res.status(200).json({userData})

        } catch (err) {
            next(err)
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await authService.login(email, password, next)
            if(!userData){
                return res.status(401)
            }
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.status(200).json({userData})
        } catch (err) {
            next(err)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookie;
            const token = await userService.logout(refreshToken);
            res.clearCokie("refreshToken");
        } catch (err) {
            next(err)
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (err) {
            next(err)
        }
    }

    async refreshToken (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(refreshToken)

            const userData = await authService.refresh(refreshToken)
            console.log(userData)

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            return res.status(200).json({userData})
        } catch (err) {
            next(err)
        }
    }

    async check (req, res, next) {
        const {id} = req.query;
        if(!id){
            return next(ApiError.badRequest('Не знайдено Id'))
        }
        res.json(id)
    }
}

module.exports = new AuthController();