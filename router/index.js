const Router = require('express');
const router = new Router();

const AuthRouter = require('../Auth/router/index');
const UserRouter = require('../User/router/index');
const GameRouter = require('../Game/router/index');
const GenreRouter = require('../Genre/router/index');
const LanguageRouter = require('../Language/router/index');

router.use(AuthRouter)
router.use(UserRouter)
router.use(GameRouter)
router.use(GenreRouter)
router.use(LanguageRouter)


module.exports = router;