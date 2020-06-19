const express = require("express");
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.get("/",(req, res)=>{

    res.render("home", {
        title : "Home Page"
    })

});

app.get("/productListing",(req, res)=>{

    res.render("productListing", {
        title : "Product Listing Page"
    })

});



const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("Server is running");
})