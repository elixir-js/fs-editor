import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const getFileNameByExtension = (extension: string): string => {
    switch (extension) {
        case 'javascript':
            return 'main.js';
        case 'html':
            return 'index.html';
        case 'css':
            return 'style.css';
        default:
            throw new Error(
                `This server doesn't support this extension: "${extension}". Please be sure that you are providing extensions such as: "html", "css" or "javascript"!`,
            );
    }
};

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
