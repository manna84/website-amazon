const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const generalController = require("./controllers/general");
const productController = require("./controllers/product");

app.use("/", generalController);
app.use("/productListing", productController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is running");
})