import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { getFileNameByExtension } from '../../../utils/getFileName';

export const readFile = (req: Request, res: Response) => {
    const { extension } = req.params;
    try {
        const filename = getFileNameByExtension(extension);

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
    } catch ({ message }) {
        console.log(message);
    }
};
