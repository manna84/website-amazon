const express = require('express')
const router = express.Router();
const categoryList = require("../models/catergoryList")
const bestSeller = require("../models/bestSeller")
const signupModel = require("../models/signup");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/auth.js");
const userDashboard = require("../middleware/authorization.js");

router.get("/",(req, res)=>{

    res.render("home", {
        title : "Home Page",
        category : categoryList.getAllcategoryLists(),
        bestSellerItem : bestSeller.getAllbestSeller()
    })

});


router.get("/dashboard",(req, res)=>{

    res.render("dashboard", {
        title : "Welcome Page"
    })

});

router.get("/logout",(req, res)=>{

    req.session.destroy();
    res.redirect("/login")

});

router.get("/login",(req, res)=>{

    res.render("login", {
        title : "Login Page"
    })

});

// router.get("/profile",isAuthenticated,(req, res)=>{

//     res.render("/dashboard")

// });

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

    let noRefreshLogin = {
        email : req.body.email,
        password : req.body.password,
    }

    if(errors.length>0) {
        res.render("login", {
            title : "Login Page", 
            errorMessages : errors,
            retainData : noRefreshLogin
        })
    }

    else {

        signupModel.findOne({email:req.body.email})
        .then(user=>{

            const errors=[]

            if(user==null) {

                errors.push("Sorry, your email and/or password is incorrect");
                res.render("login",{
                    errors
                })

            } 
            
            else {
                bcrypt.compare(req.body.password, user.password)
                .then(isMatched=>{
                    if(isMatched) {
                        req.session.userInfo = user;
                        userDashboard(req,res);
                    }

                    else {
                        errors.push("Sorry, your email and/or password is incorrect");
                        res.render("login",{
                            errors
                    })
                }

                })
                .catch((err)=>console.log(`Error : ${err}`));
                    // res === true
            }
        })
        .catch((err)=>console.log(`Wrong email: ${err}`))
    }
 
});

router.get("/admin-dashboard",isAuthenticated,(req, res)=>{

    res.render("admin-dashboard", {
        title : "Welcome Page"
    })

});

// router.get("/admin-dashboard/:id",isAuthenticated,(req, res)=>{

//     addProductModel.findById(req.params.id)
//     .then((user)=>{
//         const {productimg} = user;
//         res.render("admin-dashboard", {
//             title : "Welcome Page",
//             productimg
//         })
//     })
//     .catch((err)=>console.log(`Error: ${err}`))

// });

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

    if (req.body.lastName == "") {
        errors.push("Please enter your Last name...!!!")
    }

    if (req.body.lastName.match(nameValid)) {
        errors.push("Last name must contain only alphabets")
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

    let noRefreshSignup = {
        name : req.body.name,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
    }
    
    if(errors.length>0) {
        res.render("signup", {
            title: "SignUp Page",
            errorMessages : errors,
            retainData : noRefreshSignup
        })
    }

    else {
        signupModel.findOne({email:req.body.email})
        .then(user => {

            const errors=[];
            const {name, email, lastName,password} = req.body;

            if(user==null) {

                const newUser = {
                    name:name,
                    lastName:lastName,
                    email:email,
                    password:password
                }

                const signup = new signupModel(newUser);

                signup.save()
                .then(()=>{

                    const sgMail = require('@sendgrid/mail');
                    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
                    const msg = {
                        to: 'mannasingh84@gmail.com',
                        from: `${email}`,
                        subject: 'Welcome to the Amazon family',
                        html: `Hi ${name} ${lastName} <br><h1>Welcome to Amazon</h1><br><br><p>Subscribe today and enjoy 12 weeks of Kindle for only $6—a savings of 50%.<br>Read award-winning writing on politics and international affairs, culture and entertainment, business and technology—in print and online.</p><br><h4>Regards<br>Amazon Marketing Team</h4>`,
                };
                        sgMail.send(msg)
                        .then(() => {
                            res.redirect(`/dashboard`)
                        })
                })
                .catch(err=>console.log(`Error happened when inserting in DB: ${err}`))
            }

            else {
                errors.push("Sorry, this email already exist");
                res.render("signup",{
                    errors
                })
            }

        })
        .catch(err=>console.log(`Error occured: ${err}`))
    }

});

module.exports = router;