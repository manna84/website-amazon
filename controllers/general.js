const express = require('express')
const router = express.Router();
const categoryList = require("../models/catergoryList")
const bestSeller = require("../models/bestSeller")

router.get("/",(req, res)=>{

    res.render("home", {
        title : "Home Page",
        category : categoryList.getAllcategoryLists(),
        bestSellerItem : bestSeller.getAllbestSeller()
    })

});

router.get("/login",(req, res)=>{

    res.render("login", {
        title : "Login Page"
    })

});

router.post("/login",(req, res)=>{

    const errors = [];

    if (req.body.email == "") {
        errors.push("Please enter an Email...!!!")
    }

    if (req.body.password == ""){
        errors.push("Please enter a Password...!!!")
    }

    if (req.body.password.length > 0 && req.body.password.length < 6) {
        errors.push("Password must contain atleast 6 characters")
    }

    const passValid = /^(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[@#%\*\-+=~\[\]{}<>\?].*)/

    if (!req.body.password.match(passValid)) {
        errors.push("Entered password must contain at least a special character, a numeric digit, an uppercase and a lowercase letter")
    }

    if(errors.length>0) {
        res.render("login", {
            title : "Login Page", 
            errorMessages : errors
        })
    }

    else {
        res.redirect("/");
    }
 
});

router.get("/signup",(req,res)=>{

    res.render("signup", {
        title: "SignUp Page"
    })
});

router.post("/signup",(req, res)=>{

    const errors = [];


    if (req.body.name == "") {
        errors.push("Please enter a name...!!!")
    }

    const nameValid = /^(?=.*\d.*)|(?=.*[@#%\*\-+=~\[\]{}<>\?].*)/

    if (req.body.name.match(nameValid)) {
        errors.push("Name must contain only alphabets")
    }

    if (req.body.email == "") {
        errors.push("Please enter an Email...!!!")
    }

    if (req.body.password == ""){
        errors.push("Please enter a Password...!!!")
    }

    if (req.body.confirmPassword == "") {
        errors.push("Please enter to confirm Password...!!!")
    }

    if (req.body.password.length > 0 && req.body.password.length < 6) {
        errors.push("Password must contain atleast 6 characters")
    }

    const passValid = /^(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[@#%\*\-+=~\[\]{}<>\?].*)/

    if (!req.body.password.match(passValid)) {
        errors.push("Entered password must contain at least a special character, a numeric digit, an uppercase and a lowercase letter")
    }

    if (req.body.password != req.body.confirmPassword) {
        errors.push("Passwords are not matching")
    }
    

    if(errors.length>0) {
        res.render("signup", {
            title: "SignUp Page",
            errorMessages : errors
        })
    }

    else {
        // res.redirect("/");
        const {name, email} = req.body;
        // console.log(req.body)

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey("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");
        const msg = {
            to: 'mannasingh84@gmail.com',
            from: `${email}`,
            subject: 'Welcome to the Amazon family',
            text: `Hi ${name}`,
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
            sgMail.send(msg)

            .then(() => {
                res.redirect("/");
            })
            .catch(err => {
                console.log(`Error ${err}`);
            })

    }

});

module.exports = router;