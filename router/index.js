const Router = require('express');
const router = new Router();
const GameRouter = require('../Game/router/index');

router.use(GameRouter)

module.exports = router;