const { User } = require('../models/user');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// router.get('/:id', async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     res.send(user);
// });

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    // if(user) return res.status(400).send('user is already registered');
    if (!user) return res.status(400).send('Invalide email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalide email or password');

    const token = user.generateAuthToken();
    res.send(token);
    // user = new User(_.pick(req.body,['name', 'email', 'password']));
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);

    // await user.save();
    // res.send(_.pick(user,['_id','name', 'email']));
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(233).required().email(),
        password: Joi.string().min(8).max(2000).required()
    })
    return schema.validate(req);
};


module.exports = router;
