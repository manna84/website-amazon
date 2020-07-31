const express = require('express')
const router = express.Router();
const product = require("../models/product")

router.get("/",(req, res)=>{

    res.render("productListing", {
        title : "Product Listing Page",
        product : product.getAllProducts(),
        featured : product.getFeaturedProducts()
    })

});

router.get("/addProduct",(req, res)=>{

    res.render("addProduct", {
        title : "Add Products"
    })

});



module.exports = router;