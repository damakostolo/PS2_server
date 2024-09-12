const Router = require('express');
const router = new Router();
const genreController = require('../controller/genreController');


router.get('/genre', genreController.getAll)
router.get('/genre/:id', genreController.getOne)

router.post('/genre', genreController.create)

router.put('/genre/:id', genreController.update)

router.delete('/genre', genreController.delete)

module.exports = router;