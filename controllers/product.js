const express = require('express')
const router = express.Router();
// const product = require("../models/product");
const addProductModel = require("../models/addProduct");
const isAuthenticated = require("../middleware/auth.js");
const path = require("path");


router.get("/productListing", (req, res) => {

    addProductModel.find()
        .then((product) => {

            const filteredProduct = product.map(product => {
                return {
                    id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    quantity: product.quantity,
                    productimg: product.productimg,
                    bestseller: product.bestseller

                }
            });

            res.render("productListing", {
                title: "Product Listing Page",
                data: filteredProduct
                // product : product.getAllProducts(),
                // featured : product.getFeaturedProducts()
            })
        })
        .catch((err) => console.log(`Error: ${err}`))


});

router.get("/addProduct", isAuthenticated, (req, res) => {

    res.render("addProduct", {
        title: "Add Products"
    })

});

router.post("/addProduct", (req, res) => {

    const errors = [];

    if (req.body.name == "") {
        errors.push("Please enter Product Name...!!!")
    }

    if (req.body.price == "") {
        errors.push("Please enter Product Price...!!!")
    }

    const priceValid = /^(?=.*[a-z].*)|(?=.*[A-Z].*)|(?=.*[@#%\*\-+=~\[\]{}<>\?].*)/

    if (req.body.price.match(priceValid)) {
        errors.push("Price must contain only digits")
    }

    if (req.body.description == "") {
        errors.push("Please enter Product Description...!!!")
    }

    if (req.body.category == "Select Category") {
        errors.push("Please select Product Category...!!!")
    }

    if (req.body.quantity == "Select Quantity") {
        errors.push("Please select Product quantity...!!!")
    }

    if (req.files.productimg == 0)  {
        errors.push("asdasdads")
    }

    let noRefreshProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        bestseller: req.body.bestseller
    }

    const imgValid = /^(?:.jpg|.png|.svg|.jpeg)/
    const fileExt = `${path.parse(req.files.productimg.name).ext}`
    if (!fileExt.match(imgValid)) {
        errors.push("Please check file extension")
    }

    


    // if (req.files.productimg = isNull) {
    //     errors.push("Please upload a Product Image")
    // }

    if (errors.length > 0) {
        res.render("addProduct", {
            title: "Add Products",
            errorMessages: errors,
            retainData: noRefreshProduct
        })
    }

    else {
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            quantity: req.body.quantity,
            bestseller: req.body.bestseller
        }

        const product = new addProductModel(newProduct);
        product.save()
            .then((user) => {
                req.files.productimg.name = `${user._id}${path.parse(req.files.productimg.name).ext}`
                req.files.productimg.mv(`public/uploads/${req.files.productimg.name}`)
                    .then(() => {
                        addProductModel.updateOne({ _id: user._id }, {
                            productimg: req.files.productimg.name
                        })
                            .then(() => {
                                res.redirect(`/admin-productListing`)
                            })
                    })

            })
            .catch((err) => console.log(`Error occured while adding product: ${err}`))

    }

});

router.get("/admin-productListing", isAuthenticated, (req, res) => {

    addProductModel.find()
        .then((product) => {

            const filteredProduct = product.map(product => {
                return {
                    id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    quantity: product.quantity,
                    productimg: product.productimg,
                    bestseller: product.bestseller

                }
            });

            res.render("admin-productListing", {
                title: "Admin Products",
                data: filteredProduct
            })
        })
        .catch((err) => console.log(`Error: ${err}`))


});

router.get("/edit/:id", (req, res) => {

    addProductModel.findById(req.params.id)
        .then((product) => {
            const { _id, name, description, price, category, quantity, bestseller, productimg } = product;

            res.render("edit-productListing", {
                title: "Update Products",
                _id,
                name,
                price,
                description,
                category,
                quantity,
                bestseller
            })

        })
        .catch((err) => console.log(`Error: ${err}`))



});

router.put("/update/:id", (req, res) => {

    const product = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        bestseller: req.body.bestseller
    }

    addProductModel.updateOne({ _id: req.params.id }, product)
        .then(() => {
            res.redirect("/admin-productListing")
        })
        .catch((err) => console.log(`Error: ${err}`))

});

router.delete("/delete/:id", (req, res) => {

    addProductModel.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect("/admin-productListing")
        })
        .catch((err) => console.log(`Error: ${err}`))
})

router.get("/product-detail/:id", (req, res) => {
    addProductModel.findById(req.params.id)
        .then((product) => {
            const { _id, name, description, price, category, quantity, bestseller, productimg } = product;

            res.render("product-detail", {
                title: "View Product",
                _id,
                name,
                price,
                description,
                category,
                quantity,
                bestseller,
                productimg
            })

        })
        .catch((err) => console.log(`Error: ${err}`))
})

router.get("/cart/:id", (req, res) => {
    addProductModel.findById(req.params.id)
        .then((product) => {
            const { _id, name, description, price, category, quantity, bestseller, productimg } = product;

            res.render("cart", {
                title: "Cart",
                _id,
                name,
                price,
                description,
                category,
                quantity,
                bestseller,
                productimg
            })

        })
        .catch((err) => console.log(`Error: ${err}`))
})

module.exports = router;