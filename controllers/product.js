const express = require('express')
const router = express.Router();
const product = require("../models/product");
const addProductModel = require("../models/addProduct");
const path = require("path");

router.get("/productListing",(req, res)=>{

    addProductModel.find()
    .then((product)=>{

        const filteredProduct = product.map(product=>{
            return {
                id: product._id,
                name:product.name,
                description:product.description,
                price:product.price,
                category:product.category,
                quantity:product.quantity,
                productimg:product.productimg,
                bestseller:product.bestseller

            }
        });

        res.render("productListing", {
            title : "Product Listing Page",
            data:filteredProduct
            // product : product.getAllProducts(),
            // featured : product.getFeaturedProducts()
        })
    })
    .catch((err)=>console.log(`Error: ${err}`))
   

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
        .then((user)=>{
            req.files.productimg.name = `${user._id}${path.parse(req.files.productimg.name).ext}`
            req.files.productimg.mv(`public/uploads/${req.files.productimg.name}`)
            .then(()=>{
                addProductModel.updateOne({_id:user._id},{
                    productimg: req.files.productimg.name
                })
                .then(()=>{
                    res.redirect(`/productListing`)
                })
                
            })
            .catch()

            
        })
        .catch((err)=>console.log(`Error occured while adding product: ${err}`))
        
    }

});

module.exports = router;