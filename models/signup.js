const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const signupSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },

    lastName:
    {
        type: String,
        required: true
    },

    email:
    {
        type: String,
        required: true
    },

    password:
    {
        type: String,
        required: true
    },

    dateCreated:
    {
        type: Date,
        default: Date.now()
    },

    type:
    {
        type: String,
        default: "User"
    }

});

signupSchema.pre("save", function (next) {

    bcrypt.genSalt(10)
        .then((salt) => {

            bcrypt.hash(this.password, salt)
                .then((encryptPassword) => {

                    this.password = encryptPassword;
                    next()

                })
                .catch((err) => console.log(`Error occured hashing: ${err}`))
        })
        .catch((err) => console.log(`Error occured encrypting: ${err}`))
})


const signupModel = mongoose.model('signup', signupSchema);

module.exports = signupModel;