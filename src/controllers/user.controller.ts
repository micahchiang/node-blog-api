import * as bcrypt from 'bcrypt';
import User from '../models/user.model';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';

const salt = bcrypt.genSaltSync(10);

export let getUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local',{session: false}, (err:Error, user:any) => {
        if(err || !user) {
            return res.status(400).json({
                message: 'login error occurred',
                body: user
            });
        }
        req.logIn(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 604800
            });
            return res.json({user, token});
        })
    })(req,res,next);
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
                'err': 'user exists',
                'status': 409
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
                        'status': 201
                    });
                }
            });
        }
    });
};