const Router = require('express');
const router = new Router();
const authController = require('../controller/authController');
const {body} = require('express-validator')
const authMiddleware = require('../../middlewares/authMiddleware');


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:4, max: 16}),
    authController.registration) // блок регестрации и авторизации
router.post('/login', authController.login)


router.get('/auth', authMiddleware , authController.check)

router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refreshToken)


module.exports = router;