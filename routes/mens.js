const express = require('express');
const router = express.Router();
const dbHandler = require('../utils/Operation');
router.get('/', function (req, res, next){
    const query = "SELECT * FROM MENS";
    let arrMens = [];
    dbHandler.executeQuery(query)
        .then(result => {
            arrMens = result.recordset;
            // res.send(arrMens);
            res.render("mens", {arrMens: arrMens});
        })
        .catch(error => console.error("Error:", error));
});
module.exports = router;