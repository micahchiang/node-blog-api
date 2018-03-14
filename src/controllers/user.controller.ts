import * as bcrypt from 'bcrypt';
import User from '../models/user.model';
import * as passport from 'passport';
import { Request, Response, NextFunction} from 'express';
import { IVerifyOptions } from 'passport-local';

const salt = bcrypt.genSaltSync(10);

export let getUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: any, info: IVerifyOptions) => {
        if (err) return next(err);
        if (!user) {
            let err = new Error('user not found');
            return res.json(err);
        }
       req.logIn(user, (err) => {
           if (err) return next(err);
           let data  = {
               'username': user.username,
               'status': 200
           };
           res.json(data);
       })
    })(req,res,next);
    // let username = req.body.username;
    // let pw = req.body.password;
    // User.findOne({username: username}, (err, user) => {
    //     if (err) {
    //         res.json({
    //             'err': 'an error occurred',
    //             'message': err
    //         });
    //     } else if(!user) {
    //         let err = new Error('user not found');
    //         err.status = 404;
    //         return res.json(err);
    //     }
    //     bcrypt.compare(pw, user.password, (err, result) => {
    //         if (result === true) {
    //             let data = {
    //                 'username': user.username,
    //                 'status': 200
    //             };
    //             return res.json(data);
    //         } else {
    //             let err = new Error('incorrect password');
    //             err.status = 401;
    //             return res.json(err);
    //         }
    //     })
    // });
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