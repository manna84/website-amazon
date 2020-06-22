const express = require("express");
const exphbs = require('express-handlebars');

const product = require("./models/product")
const categoryList = require("./models/catergoryList")
const bestSeller = require("./models/bestSeller")

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.get("/",(req, res)=>{

    res.render("home", {
        title : "Home Page",
        category : categoryList.getAllcategoryLists(),
        bestSellerItem : bestSeller.getAllbestSeller()
    })

});

app.get("/productListing",(req, res)=>{

    res.render("productListing", {
        title : "Product Listing Page",
        product : product.getAllProducts(),
        featured : product.getFeaturedProducts()
    })

});

app.get("/login",(req, res)=>{

    res.render("login", {
        title : "Login Page"
    })

});

app.get("/signup",(req,res)=>{
    res.render("signup", {
        title: "SignUp Page"
    })
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is running");
})