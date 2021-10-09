import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { getFileNameByExtension } from '../../../utils/getFileName';

export const writeFile = (req: Request, res: Response) => {
    const { extension } = req.body;

    try {
        const filename = getFileNameByExtension(extension);

        fs.writeFile(
            path.resolve(__dirname, `../../../../../../files/${filename}`),
            req.body.outputText,
            function (err) {
                if (err) {
                    return console.log(err);
                }
                res.send(`Success`);
            },
        );
    } catch ({ message }) {
        console.log(message);
    }
};
