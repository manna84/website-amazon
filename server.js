const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');

require('dotenv').config({path:"./config/keys.env"});

const app = express();

app.engine('handlebars', exphbs(
    {
        helpers:{
            compare1:function(value, options) {
                let fix="selected"
                if(value==1||value=="Camera,photo & video") {
                    return options.fn({select:fix});
                }
            },
            compare2:function(value, options) {
                let fix="selected"
                if(value==2||value=="Cell Phone & Accessories") {
                    return options.fn({select:fix});
                }
            },
            compare3:function(value, options) {
                let fix="selected"
                if(value==3||value=="Headphones") {
                    return options.fn({select:fix});
                }
            },
            compare4:function(value, options) {
                let fix="selected"
                if(value==4||value=="Computers & Accessories") {
                    return options.fn({select:fix});
                }
            }
        }
    }

));
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

app.use(fileUpload());

app.use((req,res,next)=>{
    if(req.query.method=="PUT") {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE") {
        req.method="DELETE"
    }

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