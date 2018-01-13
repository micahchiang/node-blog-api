import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let BlogSchema = new Schema({
    date: String,
    title: String,
    entry: String
});

let BlogModel = mongoose.model('BlogModel', BlogSchema);

export default BlogModel;