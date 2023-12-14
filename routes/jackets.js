const express = require('express');
const router = express.Router();
const dbHandler = require('../utils/Operation');
router.get('/', function (req, res, next){
    const query = "SELECT * FROM JACKETS";
    let arrJackets = [];
    dbHandler.executeQuery(query)
        .then(result => {
            arrJackets = result.recordset;
            // res.send(arrJackets);
            res.render("jackets", {arrJackets: arrJackets});
        })
        .catch(error => console.error("Error:", error));
});
module.exports = router;