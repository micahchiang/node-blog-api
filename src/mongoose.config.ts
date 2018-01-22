import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
require('./models/blog.model');
require('./models/user.model');

// let mongoose = mongoose;

let mongoDB = 'mongodb://localhost:27017/blog';

(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoDB).then(
    () => { /**The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});