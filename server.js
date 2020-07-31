const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

require('dotenv').config({path:"./config/keys.env"});

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const generalController = require("./controllers/general");
const productController = require("./controllers/product");

app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true
  }))

app.use((req,res,next)=>{
    res.locals.user= req.session.userInfo;
    next();
})

app.use("/", generalController);
app.use("/", productController);

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB`);
})
.catch(err=>console.log(`Error occured connecting db ${err}`));

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Server is running");
})