const{
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete
} = require('../controller/peminjamanController');
const router = require('express').Router();

router.post('/', controllerAdd);
router.get('/', controllerGet);
router.get('/id', controllerGetId);
router.patch('/', controllerUpdate);
router.delete('/', controllerDelete);

module.exports = router 