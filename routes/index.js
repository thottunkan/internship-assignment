var express = require('express');
var router = express.Router();
var productHelper = require("../helpers/productHelpers")

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    res.render('index', { normal:true,title: 'index',products:products });  
  })
  
});

module.exports = router;
