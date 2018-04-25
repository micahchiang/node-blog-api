import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
require('../models/blog.model');
require('../models/user.model');

// let mongoose = mongoose;

let mongoDB = process.env.MONGO_URI;

(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoDB).then(
    () => {},
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});