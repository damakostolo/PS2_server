const Router = require('express');
const router = new Router();
const userController = require('../controller/userController');


router.get('/user', userController.getAll)
router.get('/user/:id', userController.getOne)

router.post('/user', userController.create)

router.put('/user/:id', userController.update)

router.delete('/user/:id', userController.delete)

module.exports = router;