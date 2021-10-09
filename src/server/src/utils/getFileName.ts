export const getFileNameByExtension = (extension: string): string => {
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
