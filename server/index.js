const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT = process.env.PORT || 3000;

const expressSwagger = require('express-swagger-generator')(app);

expressSwagger({
    swaggerDefinition: {
        info: { description: 'Certification Server', title: 'Swagger', version: '1.0.0' },
        host: `localhost:${port}`,
        basePath: '/api',
        produces: [
            "application/json",
        ]
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
})

app.use(bodyParser.json());

app.use('/api/certifications', require('./routes/certifications'));

app.listen(port, function () {
    console.log(`app listening on port ${port}!`);
});