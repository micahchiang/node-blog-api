import * as mongoose from 'mongoose';
require('./models/blog.model');

// let mongoose = mongoose;

let mongoDB = 'mongodb://127:0.0.1/blog';

mongoose.connect(mongoDB);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));