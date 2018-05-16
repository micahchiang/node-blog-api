import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import User from '../models/user.model';
import { Request, Response, NextFunction} from 'express';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user:any) => {
        if(err) return done(err);
        if(!user) {
            return done(null, false, {message: `username ${username} not found`});
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return done(err);
                }
                if(result === true) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: `incorrect username or password`});
                }
            });
        }
    })
}));




export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next();
    res.json({msg: 'succes', status: 200});
};