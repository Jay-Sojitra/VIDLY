const winston = require('winston');
const mongoose = require('mongoose');

mocdule.exports = function(){
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conncted to mongodb...'))
    // .catch(err => console.error('Error connecting to mongodb...'));
}
