const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    name:
    {
        type:String,
        required:true
    },

    lastName:
    {
        type:String,
        required:true
    },

    email:
    {
        type:String,
        required:true
    },

    password:
    {
        type:String,
        required:true
    },

    dateCreated:
    {
        type:Date,
        default:Date
    }

});

const signupModel = mongoose.model('signup', signupSchema);

module.exports = signupModel;