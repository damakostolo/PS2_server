const Router = require('express');
const router = new Router();
const GameController = require('../controller/GameController');
const checkRole = require('../../middlewares/checkRoleMiddleware');

router.get('/game', GameController.getAll)
router.get('/game/:id', GameController.getOne)
router.get('/gameCount', GameController.getCount)


router.post('/gameSearch', GameController.getGameName)

router.post('/game',GameController.create)

router.put('/game/:id', checkRole('ADMIN'),GameController.update)

router.delete('/game/:id', checkRole('ADMIN'),GameController.delete)

module.exports = router;