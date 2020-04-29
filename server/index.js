const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/certifications', require('./routes/certifications'));

process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, function () {
    console.log(`app listening on port ${process.env.PORT}!`);
});