const Router = require('express');
const router = new Router();
const languageController = require('../controller/languageController');


router.get('/language', languageController.getAll)
router.get('/language/:id', languageController.getOne)

router.post('/language', languageController.create)

router.put('/language/:id', languageController.update)

router.delete('/language/:id', languageController.delete)

module.exports = router;