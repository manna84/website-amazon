const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addProductSchema = new Schema({
    name:
    {
        type:String,
        required:true
    },

    price:
    {
        type:Number,
        required:true
    },

    description:
    {
        type:String,
        required:true
    },

    category:
    {
        type:String,
        required:true
    },

    quantity:
    {
        type:String,
        required:true
    },

    bestseller:
    {
        type:String,
        required:true
    },

    productimg:
    {
        type:String
    },

    dateCreated:
    {
        type:Date,
        default:Date.now()
    },

});


const addProductModel = mongoose.model('addProduct', addProductSchema);

module.exports = addProductModel;