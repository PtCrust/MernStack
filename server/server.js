require('dotenv').config();

const express = require('express');
const workOutsRouter = require('./routes/workouts');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');

const app = express();
// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/workouts', workOutsRouter);
app.use('/api/user', userRouter);

// Connect to Mongoose URI
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // App listeners wont be called until the app is connected to the Mongoose server
        app.listen(process.env.PORT, () => {
            console.log(`Connected to db & listening on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.error(err)
    });

