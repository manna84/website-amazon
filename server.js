const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')

const product = require("./models/product")
const categoryList = require("./models/catergoryList")
const bestSeller = require("./models/bestSeller")

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is running");
})