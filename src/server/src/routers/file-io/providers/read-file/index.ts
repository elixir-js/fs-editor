import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export const readFile = (req: Request, res: Response) => {
    const extension = req.params.extension;
    const filename = extension === 'javascript' ? 'main.js' : 'index.html';

    fs.readFile(
        path.resolve(__dirname, `../../../../../../files/${filename}`),
        'utf8',
        function (err, data) {
            if (err) {
                return console.log(err);
            }

            res.send(data);
        },
    );
};
