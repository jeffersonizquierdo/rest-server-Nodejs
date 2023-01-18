const { response } = require("express");



const loadFile = (req, res = response) => {

    console.log(req.files);

    res.json({msg:'ok'})
}


module.exports = {
    loadFile
}