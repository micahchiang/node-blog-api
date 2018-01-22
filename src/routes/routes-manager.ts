import * as express from 'express';
import * as pageRoutes from './page-routes';
import * as blogRoutes from './blog-routes';
import * as userRoutes from './user-routes';

let router = express.Router();

router.use('/', pageRoutes);
router.use('/api', blogRoutes);
router.use('/admin', userRoutes);

export = router;