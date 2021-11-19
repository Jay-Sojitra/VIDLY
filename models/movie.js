const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema}= require('./genre');

const Movie = mongoose.model('Movies',new mongoose.Schema({

    title:{
        type: String,
        require:true,
        trim: true,
        minLength:5,
        maxLength:233
    },
    genre:{
        type: genreSchema,
        require:true
    },
    numberInStock:{
        type: Number,
        require:true,
        min: 0,
        max: 255
    },
    dailyRentalRate:{
        type: Number,
        require:true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(233).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    })
    return schema.validate(movie);
}

exports.Movie= Movie;
exports.validate= validateMovie;


