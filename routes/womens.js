const express = require('express');
const router = express.Router();
const dbHandler = require('../utils/Operation');
router.get('/', function (req, res, next){
    const query = "SELECT * FROM WOMENS";
    let arrWomens = [];
    dbHandler.executeQuery(query)
        .then(result => {
            arrWomens = result.recordset;
            // res.send(arrWomens);
            res.render("womens", {arrWomens: arrWomens});
        })
        .catch(error => console.error("Error:", error));
});
module.exports = router;