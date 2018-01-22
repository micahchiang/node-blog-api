import * as bcrypt from 'bcrypt';
import User from '../models/user.model';

const salt = bcrypt.genSaltSync(10);

export let getUser = (req, res) => {
    let username = req.body.username;
    let pw = bcrypt.hashSync(req.body.password, salt);

    User.findOne({username: username, password: pw}, (err, user) => {
        if (err) {
            console.log(`Error retrieving user: ${err}`);
            return;
        }
        return res.json(user);
    });
}

export let createUser = (req, res) => {
    let username = req.body.username;
    let pw = bcrypt.hashSync(req.body.password, salt);

    User.findOne({username: username}, (err, user) => {
        if (err) {
            console.log(`Error retrieving user: ${err}`);
            res.json({
                'err': 'an error occurred',
                'message': err
            });
            return;
        } else if (user) {
            console.log(`User exists: ${user}`);
            res.json({
                'err': 'user exists'
            });
            return;
        } else {
            let user = new User({username: username, password: pw});
            user.save((err) => {
                if (err) {
                    console.log(`Error saving user ${err}`);
                    res.json({err: err});
                } else {
                    res.json({
                        'message': 'user successfully created',
                        'status': '200'
                    });
                }
            });
        }
    });
}