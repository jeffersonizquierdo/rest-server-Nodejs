const { Router, response } = require('express');
const { check } = require('express-validator');
const { loadFile } = require('../controllers/uploads.controller');

const { validateFields } = require('../middlewares/validateFields');

const router = Router();


router.post('/', loadFile);


router.post('/upload', function(req, res = response) {
    console.log( 'object', req.files); // the uploaded file object
    res.json('ok')
});


module.exports = router;