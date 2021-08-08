var express = require('express');
const barrFifthRequest = require('../Middlewares/barrFifthRequest');
const validateFromThirdParty = require('../Middlewares/validateFromThirdParty');
const usersController = require('../Controllers/users.controllers');

var router = express.Router();


router.post('/login', barrFifthRequest, validateFromThirdParty, usersController.login);
router.post('/register', usersController.register);
// router.get('/', getAll);
// router.get('/current', getCurrent);
// router.get('/:id', getById);
// router.put('/:id', update);
// router.delete('/:id', _delete);

module.exports = router;