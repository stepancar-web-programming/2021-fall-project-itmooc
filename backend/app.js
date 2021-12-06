require('dotenv').config();
require('./src/config/database').connect();

const express = require('express');
const cors = require('cors');

const app = express();
const userRoute = require('./src/routes/userRoute');

app.use(express.json({ limit: '50mb' }));

app.use(
    cors({
        origin: '*'
    })
);

app.use('/api/v1', userRoute);

app.use('*', (req, res) => {
    res.status(404).json({
        success: 'false',
        message: 'Page not found',
        error: {
            statusCode: 404,
            message: 'Вы достигли маршрута, который не определен на этом сервере.'
        }
    });
});

module.exports = app;
