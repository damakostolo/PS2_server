const Router = require('express');
const router = new Router();
const GameRouter = require('../Game/router/index');
const GenreRouter = require('../Genre/router/index');

router.use(GameRouter)
router.use(GenreRouter)

module.exports = router;