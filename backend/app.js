const express = require('express');
const path = require('path');

const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" })
}

// Routes import
const userRoute = require('./routes/userRoute');
const errorMiddleware = require('./middlewares/error');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// cors cofiguration
if (process.env.NODE_ENV !== "PRODUCTION") {
    app.use(require('cors')({
        origin: process.env.FRONTEND_URL,
        optionsSuccessStatus: 200,
    }))
}

app.use('/api/v1', userRoute);

// error middileware
app.use(errorMiddleware)


module.exports = app;