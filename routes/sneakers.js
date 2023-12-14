const express = require('express');
const router = express.Router();
const dbHandler = require('../utils/Operation');
router.get('/', function (req, res, next){
    const query = "SELECT * FROM SNEAKERS";
    let arrSneakers = [];
    dbHandler.executeQuery(query)
        .then(result => {
            arrSneakers = result.recordset;
            // res.send(arrSneakers);
            res.render("sneaker", {arrSneakers: arrSneakers});
        })
        .catch(error => console.error("Error:", error));
});
module.exports = router;