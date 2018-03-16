import * as bcrypt from 'bcrypt';
import User from '../models/user.model';
import * as passport from 'passport';
import { Request, Response, NextFunction} from 'express';

const salt = bcrypt.genSaltSync(10);

export let getUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local',{session: false}, (err:Error, user:any) => {
        if (err) {
            return res.json(err);
        }
        if (!user) {
            return res.json({
                status: 404,
                msg: 'user does not exist'
            });
        }
        req.logIn(user,(err) => {
            if (err) {
                return next(err);
            }
            return res.json({
                status: 200,
                msg: 'login success'
            });
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