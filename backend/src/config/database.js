const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .catch((error) => {
            console.log('Database connection failed. Exiting now...');
            console.error(error);
            process.exit(1);
        });
};
