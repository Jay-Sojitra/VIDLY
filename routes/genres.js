// reatfull api with Joi

// const express = require('express');
// const Joi = require('joi');
// const router = express.Router();



// const genres = [
//     { id: 1, name: 'Action' },
//     { id: 2, name: 'Horror' },
//     { id: 3, name: 'Romance' }
//     // { id: '4', name: 'Comedy' },
// ]

// router.get('/', (req, res) => {
//     res.send(genres);
// })
// router.get('/:id', (req, res) => {

//     const genre = genres.find(c => c.id === parseInt(req.params.id));
//     if (!genre) return res.status(404).send('Error 404 File not found ');

//     res.send(genre);
// })

// router.post('/', (req, res) => {

//     const { error } = validategenre(res.body);
//     if (error) {
//         res.status(400).send(error.details[0].send);

//     }
//     const genre = {
//         id: genres.length + 1,
//         name: req.body.name
//     };
//     genres.push(genre);
//     res.send(genre);
// })

// router.put('/:id', (req, res) => {


//     const genre = genres.find(c => c.id === parseInt(req.params.id));
//     if (!genre) return res.status(404).send('Error 404 File not found ');

//     const { error } = validategenre(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     genre.name = req.body.name;
//     res.send(genre);

// });

// router.delete('/:id', (req, res) => {

//     const genre = genres.find(c => c.id === parseInt(req.params.id));
//     if (!genre) return res.status(404).send('Error 404 File not found ');

//     const index = genres.indexOf(genre);
//     genres.splice(index, 1);

//     res.send(genre);

// });

// function validategenre(genre) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });
//     return schema.validate(genre);
// }
// **********************************************************
// restfull api with mongoose

const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');


router.get('/', asyncMiddleware(async (req, res) => {
    // if we use express-async-errors then we can remove asyncMiddleware function 
    const genres = await Genre.find().sort('name');
    res.send(genres);

}))
router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id)

    if (!genre) return res.status(404).send('Error 404 File not found ');

    res.send(genre);
})

router.post('/', auth, asyncMiddleware(async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].send);

    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
}))

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });


    if (!genre) return res.status(404).send('Error 404 File not found ');

    res.send(genre);

});

router.delete('/:id', auth, async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) return res.status(404).send('Error 404 File not found ');

    res.send(genre);

});

module.exports = router;
