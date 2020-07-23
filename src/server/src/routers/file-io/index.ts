import * as express from 'express';
import { writeFile } from './providers/write-file';
import { readFile } from './providers/read-file';

export const router = express
    .Router()
    .get('/ping', (_req, res) => {
        res.send('Hello from IO router!');
    })
    .post('/write-file', writeFile)
    .get('/read-file/:extension', readFile);
