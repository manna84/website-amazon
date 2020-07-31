const express = require('express')
const router = express.Router();
const product = require("../models/product");
const addProductModel = require("../models/addProduct");

router.get("/productListing",(req, res)=>{

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

router.post("/addProduct",(req, res)=>{

    const errors = [];

    if (req.body.name == "") {
        errors.push("Please enter Product Name...!!!")
    }

    if (req.body.price == ""){
        errors.push("Please enter Product Price...!!!")
    }

    const priceValid = /^(?=.*[a-z].*)|(?=.*[A-Z].*)|(?=.*[@#%\*\-+=~\[\]{}<>\?].*)/

    if (req.body.price.match(priceValid)) {
        errors.push("Price must contain only digits")
    }

    if (req.body.description == ""){
        errors.push("Please enter Product Description...!!!")
    }

    if (req.body.category == "Select Category"){
        errors.push("Please select Product Category...!!!")
    }

    if (req.body.quantity == "Select Quantity"){
        errors.push("Please select Product quantity...!!!")
    }


    let noRefreshProduct = {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        category : req.body.category,
        quantity : req.body.quantity,
        bestseller : req.body.bestseller
    }

    if(errors.length>0) {
        res.render("addProduct", {
            title : "Add Products", 
            errorMessages : errors,
            retainData : noRefreshProduct
        })
    }

    else {
        const newProduct = {
            name : req.body.name,
            price : req.body.price,
            description : req.body.description,
            category : req.body.category,
            quantity : req.body.quantity,
            bestseller : req.body.bestseller
        }

        const product = new addProductModel(newProduct);
        product.save()
        .then(()=>{
            res.redirect("/")
        })
        .catch((err)=>console.log(`Error occured while adding product: ${err}`))
        
    }

});

module.exports = router;