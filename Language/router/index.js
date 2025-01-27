const Router = require('express');
const router = new Router();
const languageController = require('../controller/languageController');
const checkRole = require('../../middlewares/checkRoleMiddleware');


router.get('/language', languageController.getAll)
router.get('/language/:id', languageController.getOne)

router.post('/language', checkRole('ADMIN'), languageController.create)

router.put('/language/:id', checkRole('ADMIN'), languageController.update)

router.delete('/language/:id', checkRole('ADMIN') , languageController.delete)

module.exports = router;