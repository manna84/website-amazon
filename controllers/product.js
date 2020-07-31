const express = require('express')
const router = express.Router();
const product = require("../models/product")

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
        res.redirect("/")
    }

    // else {

    //     signupModel.findOne({email:req.body.email})
    //     .then(user=>{

    //         const errors=[]

    //         if(user==null) {

    //             errors.push("Sorry, your email and/or password is incorrect");
    //             res.render("login",{
    //                 errors
    //             })

    //         } 
            
    //         else {
    //             bcrypt.compare(req.body.password, user.password)
    //             .then(isMatched=>{
    //                 if(isMatched) {
    //                     req.session.userInfo = user;
    //                     userDashboard(req,res);
    //                 }

    //                 else {
    //                     errors.push("Sorry, your email and/or password is incorrect");
    //                     res.render("login",{
    //                         errors
    //                 })
    //             }

    //             })
    //             .catch((err)=>console.log(`Error : ${err}`));
    //                 // res === true
    //         }
    //     })
    //     .catch((err)=>console.log(`Wrong email: ${err}`))
    // }
 
});

module.exports = router;