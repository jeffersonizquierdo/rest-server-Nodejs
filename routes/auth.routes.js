const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login', [
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'Email invalid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    check('password', 'The password must have minimun 8 characters').isLength( {min : 8} ),
    validateFields
], login);


router.post('/google', [

    check('id_token', 'ID token is required').not().isEmpty(),
    validateFields
], googleSingIn );


module.exports = router;