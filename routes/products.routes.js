const { Router } = require('express');
const { check } = require('express-validator');


const { validateJWT, validateFields } = require('../middlewares')
const {createProduct, getAllProducts, getProductById, upddateProductById, deleteProductById } = require('../controllers/products.controller');
const { existsProductByName, existsProductById, existsCategorieById } = require('../helpers/dbValidator');


const router = Router();


router.post('/', [
    validateJWT,
    check("name", 'name is required').not().isEmpty(),
    check('name').custom( existsProductByName ),
    check('categorie', 'ID categorie invalid').isMongoId(),
    check('categorie').custom( existsCategorieById ),
    validateFields
    ], createProduct);

router.get('/', getAllProducts);


router.get('/:id', [

    validateJWT,
    check('id', 'The ID is required').not().isEmpty(),
    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsProductById ),
    validateFields
    ], getProductById )


router.put('/:id', [
    validateJWT,
    check('id', 'The ID is required').not().isEmpty(),
    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsProductById ),
    validateFields
], upddateProductById )



router.delete('/:id', [
    validateJWT,
    check('id', 'The ID is required').not().isEmpty(),
    check('id', 'Not is a ID valid').isMongoId(),
    check('id').custom( existsProductById ),
    validateFields
], deleteProductById )
//delete - aAdmin


module.exports = router;