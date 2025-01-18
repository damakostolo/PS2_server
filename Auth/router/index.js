const Router = require('express');
const router = new Router();
const authController = require('../controller/authController');
const {body} = require('express-validator')


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:4, max: 16}),
    authController.registration) // блок регестрации и авторизации

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min:4, max: 16}), 
    authController.login)

router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refreshToken)

router.post('/logout', authController.logout)


module.exports = router;