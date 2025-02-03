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
            
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 дней
            });


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
            
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                secure: true,
                sameSite: 'none'
            });
            
            return res.status(200).json({userData})
        } catch (err) {
            next(err)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            console.log(token);
            res.clearCookie("refreshToken");
            return res.json({token})
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
            
            if(!refreshToken){
                return res.status(201)
            }

            const userData = await authService.refresh(refreshToken)

            res.cookie("refreshToken",
                userData.refreshToken,
                {maxAge: 24*60*60*1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'},

                );

            return res.status(200).json({userData})
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = new AuthController();