const{
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete,
    controllerLogin
} = require('../controller/petugasController');
const router = require('express').Router();
const {checkToken} = require("../auth/token_validation")

router.post('/', controllerAdd);
router.get('/', checkToken,controllerGet);
router.get('/id', checkToken,controllerGetId);
router.patch('/', checkToken,controllerUpdate);
router.delete('/', checkToken,controllerDelete);
router.post('/login', controllerLogin);

module.exports = router 