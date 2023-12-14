const express = require('express');
const router = express.Router();
const categories = require('../data');
/* GET home page. */
const dbHandler = require('../utils/Operation');
router.get('/', function(req, res, next) {
  res.render('index', { categories: categories });
  // const query = "SELECT * FROM CATEGORIES";
  // let categories = [];
  // dbHandler.executeQuery(query)
  //     .then(result => {
  //       categories = result.recordset;
  //       res.json(categories);
  //     })
  //     .catch(error => console.error("Error:", error));
});

module.exports = router;
