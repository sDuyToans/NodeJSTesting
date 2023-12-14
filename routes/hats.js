const express = require('express');
const router = express.Router();
const dbHandler = require('../utils/Operation');
router.get('/', function (req, res, next){
    const query = "SELECT * FROM HATS";
    let arrHats = [];
    dbHandler.executeQuery(query)
        .then(result => {
            arrHats = result.recordset;
            // res.send(arrHats); //send data to vue js file
            res.render("hats", {arrHats: arrHats}); //render ejs file
        })
        .catch(error => console.error("Error:", error));
});
module.exports = router;