import * as express from 'express';
import * as defaultRoutes from './default-routes';
import * as driveRoutes from './drive-routes';

let router = express.Router();

router.use('/', defaultRoutes);
router.use('/drive', driveRoutes);

export = router;