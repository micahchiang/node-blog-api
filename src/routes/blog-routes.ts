import * as express from 'express';
import * as blog from '../controllers/blog.controller';

let router = express.Router();

// read
router.get('/entries', (req,res) => {

});

// create
router.post('/create', blog.addEntry);

export = router;

