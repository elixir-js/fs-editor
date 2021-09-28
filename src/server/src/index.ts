import cors from 'cors';
import * as path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routers';
import * as Boom from '@hapi/boom';

const app = express();

app.use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/ping', (_, res) => res.send('the server is working!'))
    .use('/static', express.static(path.resolve(__dirname, '../../files')))
    .use('/', router)
    .use((_req, _res, next) => next(Boom.notFound('Endpoint not found')))
    // eslint-disable-next-line
    .use(
        (
            error: any,
            _req: express.Request,
            res: express.Response,
            _next: express.NextFunction,
        ) => {
            if (error.isBoom) {
                sendError(res, error);
            } else {
                console.error(error.stack || error);
                sendError(res, Boom.internal());
            }
        },
    );

function sendError(res: express.Response, error: Boom.Boom): void {
    res.status(error.output.statusCode).json(error.output.payload);
}

if (!module.parent) {
    const port = process.env.NODEJS_PORT || 8080;

    console.log(port);

    app.listen(port, () => {
        console.info(`Application started on port ${port}`);
    });
}
