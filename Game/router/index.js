const Router = require('express');
const router = new Router();
const GameController = require('../controller/GameController');


router.get('/game', GameController.getAll)
router.get('/game/:id', GameController.getOne)

router.get('/gameGenre/:id', GameController.getGameGenre)

router.post('/game', GameController.create)

router.put('/game/:id', GameController.update)

router.delete('/game/:id', GameController.delete)

module.exports = router;