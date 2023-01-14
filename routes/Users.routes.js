const { Router } = require('express');
const { check } = require('express-validator');

//controllers
const { getUsers, putUser, postUser, deleteUser, patchUser} = require('../controllers/users.controller');
//helpers
const { isRoleValid, existsEmail, existsUserById } = require('../helpers/dbValidator');
//middlewares
// const { validateFields } = require('../middlewares/validateFields');
// const validateJWT = require('../middlewares/validateJWT');
// const { validateRoles, hasRole } = require('../middlewares/validateRoles');
// optimizacion de imports
const {validateFields,
        validateJWT, 
        isAdministrator, 
        hasRole} = require('../middlewares');


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
    validateJWT,
    //isAdministrator,
    hasRole('DEVELOPER_ROLE', 'USER_ROLE'),
    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
],deleteUser);

router.patch('/', patchUser);


module.exports = router;