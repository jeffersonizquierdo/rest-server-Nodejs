const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, putUser, postUser, deleteUser, patchUser} = require('../controllers/users.controller');
const { isRoleValid, existsEmail, existsUserById } = require('../helpers/dbValidator');
const { validateFields } = require('../middlewares/validateFields');


const router = Router();


router.get('/', getUsers);



router.post('/', [

    check('email', 'The email is invalid').isEmail(),
    check('email').custom( existsEmail ),
    check('password', 'The password must have a minimum of 6 characters').isLength( {min: 6 }),
    check('name', 'The name is required').not().isEmpty(),
    check('role').custom( isRoleValid ),
    validateFields
] ,postUser)


router.put('/:id', [

    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsUserById ),
    check('role').custom( isRoleValid ),
    validateFields
], putUser);


router.delete('/:id', [
    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
],deleteUser);

router.patch('/', patchUser);


module.exports = router;