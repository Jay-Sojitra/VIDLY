// restfull api with Joi
// const express = require('express');
// const app = express();
// const genres = require('./routes/genres');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api/genres', genres);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`listening on port ${port}...`));

// *********************************************************************

// restfull api with Mongoose
const winston = require('winston');
const express = require('express');
const app = express();


require('express-async-errors');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

winston.add(winston.transprots.File, { filename: 'logfile.log' });

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening on port ${port}...`));



