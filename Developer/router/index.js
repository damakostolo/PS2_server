const Router = require('express');
const router = new Router();
const developerController = require('../controller/developerController');


router.get('/developer', developerController.getAll)
router.get('/developer/:id', developerController.getOne)

router.post('/developer', developerController.create)

router.put('/developer/:id', developerController.update)

router.delete('/developer/:id', developerController.delete)

module.exports = router;