const ApiError = require("../../errors/ApiErrors");
const authService = require("../service/authService");

class AuthController {


    async registration(req, res, next) {
        try {
            const {login, email , password} = req.body;

            const userData = await authService.registration(login, email, password, next);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

            res.status(200).json({userData})

        } catch (err) {
            next(err)
        }
    }

    async login (req, res, next) {
        try {
            // Ну как нужно как ну нах не надо
        } catch (err) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            // Ну как нужно как ну нах не надо
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

    async refresh (req, res, next) {
        try {
            // Ну как нужно как ну нах не надо
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthController();