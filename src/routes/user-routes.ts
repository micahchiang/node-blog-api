import * as express from 'express';
import * as user from '../controllers/user.controller';

let router = express.Router();

router.post('/login', user.getUser);

router.post('/create', user.createUser);

export = router;