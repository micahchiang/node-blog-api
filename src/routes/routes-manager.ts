import * as express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
    res.send('hello world');
});

router.get('/api', (req,res) => {
    res.send('accessing api');
})

export = router;