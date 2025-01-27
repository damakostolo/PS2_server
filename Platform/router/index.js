const Router = require('express');
const router = new Router();
const platformController = require('../controller/platformController');
const checkRole = require('../../middlewares/checkRoleMiddleware');


router.get('/platform', platformController.getAll)
router.get('/platform/:id', platformController.getOne)

router.post('/platform', checkRole('ADMIN'), platformController.create)

router.put('/platform/:id', checkRole('ADMIN'), platformController.update)

router.delete('/platform/:id', checkRole('ADMIN'), platformController.delete)

module.exports = router;