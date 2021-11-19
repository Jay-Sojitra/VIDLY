const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 233
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 2000,

    },
    isAdmin: Boolean
});

userschema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userschema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
        email: Joi.string().min(5).max(233).required().email(),
        password: Joi.string().min(8).max(2000).required()
    })
    return schema.validate(user);
};


exports.User = User;
exports.validate = validateUser;
