import * as bcrypt from 'bcrypt';
import User from '../models/user.model';

const salt = bcrypt.genSaltSync(10);

export let getUser = (req, res) => {
    let username = req.body.username;
    let pw = req.body.password;
    User.findOne({username: username}, (err, user) => {
        if (err) {
            return;
        } else if(!user) {
            let err = new Error('user not found');
            err.status = 401;
            return res.json(err);
        }
        bcrypt.compare(pw, user.password, (err, result) => {
            if (result === true) {
                let data = {
                    'username': user.username,
                    'status': 200
                };
                return res.json(data);
            } else {
                let err = new Error('incorrect password');
                err.status = 400;
                return res.json(err);
            }
        })
    });
};

export let createUser = (req, res) => {
    let username = req.body.username;
    let pw = bcrypt.hashSync(req.body.password, salt);

    User.findOne({username: username}, (err, user) => {
        if (err) {
            res.json({
                'err': 'an error occurred',
                'message': err
            });
            return;
        } else if (user) {
            res.json({
                'err': 'user exists'
            });
            return;
        } else {
            let user = new User({username: username, password: pw});
            user.save((err) => {
                if (err) {
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
};