import * as express from 'express';
import * as cors from 'cors';
import * as router from './routes/routes-manager';
import * as bodyparser from 'body-parser';
import * as logger from 'morgan';

class App {

    public express;
    public routes;

    constructor() {
        this.express = express();
        this.loadMiddleware();
        this.loadRoutes();
    }

    private loadRoutes() {
        this.routes = router;
        this.express.use('/', this.routes);
    }

    private loadMiddleware() {
        this.express.use(cors());
        this.express.use(bodyparser.json());
        this.express.use(bodyparser.urlencoded({extended: true}));
        this.express.use(logger('dev'));
    }
}

export default new App().express;


