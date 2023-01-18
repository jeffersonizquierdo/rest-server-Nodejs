const { Router } = require('express');
const { check } = require('express-validator');


const { createCategorie, 
        getCategorieById, 
        getAllCategories, 
        updateCategorie,
        deleteCategorie
    } = require('../controllers/categories.controlles');
const { validateJWT, validateFields, isAdministrator } = require('../middlewares');
const { existsCategorieById } = require('../helpers/dbValidator');


const router = Router();

/**{{url}}api/categories */
// All categories
router.get('/', getAllCategories );

//get categorie for id
router.get('/:id', [
    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsCategorieById ),
    validateFields
],  getCategorieById);


// create Categorie
router.post('/', [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        validateFields
    ], createCategorie);


//update categorie for id
router.put('/:id', [
    validateJWT,
    check('id', 'The ID is required').not().isEmpty(),
    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsCategorieById ),
    check('name', 'body is null').not().isEmpty(),
    validateFields
], updateCategorie );

//delete - aAdmin
router.delete('/:id', [
    validateJWT,
    isAdministrator,
    check('id', 'The ID is required').not().isEmpty(),
    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsCategorieById ),
    validateFields
], deleteCategorie );



module.exports = router;