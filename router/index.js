const Router = require('express');
const router = new Router();
const GameRouter = require('../Game/router/index');
const GenreRouter = require('../Genre/router/index');
const LanguageRouter = require('../Language/router/index');
const DeveloperRouter = require('../Developer/router/index');

router.use(GameRouter)
router.use(GenreRouter)
router.use(LanguageRouter)
router.use(DeveloperRouter)


module.exports = router;