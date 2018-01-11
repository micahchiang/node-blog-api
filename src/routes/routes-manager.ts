import * as express from 'express';
import * as pageRoutes from './page-routes';
import * as blogRoutes from './blog-routes';

let router = express.Router();

router.use('/', pageRoutes);
router.use('/api', blogRoutes);

export = router;