import * as express from 'express';

let router = express.Router();

router.get('/', (req,res) => {
    res.send('hello world');
});

router.get('/admin', (req,res) => {
   // add authentication before allowing access.
});

export = router;