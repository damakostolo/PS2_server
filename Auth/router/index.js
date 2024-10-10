const Router = require('express');
const router = new Router();
const authController = require('../controller/authController');


router.post('/registration', authController.registration) // блок регестрации и авторизации
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)


module.exports = router;