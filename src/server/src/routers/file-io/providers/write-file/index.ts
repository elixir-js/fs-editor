import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export const writeFile = (req: Request, res: Response) => {
    const { extension } = req.body;
    const filename = extension === 'javascript' ? 'main.js' : 'index.html';

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
};
