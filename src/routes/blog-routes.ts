import * as express from 'express';
import * as blog from '../controllers/blog.controller';

let router = express.Router();

// read
router.get('/entries', blog.getEntries);

// create
router.post('/entries', blog.addEntry);

export = router;

