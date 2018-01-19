import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    password: String
});

let User = mongoose.model('User', UserSchema);

export default User;