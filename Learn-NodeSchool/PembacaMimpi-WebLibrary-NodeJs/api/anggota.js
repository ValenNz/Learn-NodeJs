const {
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete
} = require('../controller/anggotaController');
const router = require('express').Router();
const {checkToken} = require("../auth/token_validation")

router.post('/', checkToken,controllerAdd);
router.get('/', checkToken,controllerGet);
router.get('/id', checkToken,controllerGetId);
router.patch('/',checkToken, controllerUpdate);
router.delete('/', checkToken,controllerDelete);

module.exports = router; 