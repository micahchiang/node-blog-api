import * as express from 'express';
import * as defaultRoutes from './default-routes';

let router = express.Router();

router.use('/', defaultRoutes);

export = router;