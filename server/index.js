const express = require('express');

const app = express();

process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, function () {
    console.log(`app listening on port ${process.env.PORT}!`);
});