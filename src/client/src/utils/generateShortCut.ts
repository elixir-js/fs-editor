import { ExtensionType } from '@app/types';

export const generateShortCut = (extension: ExtensionType) => {
    switch (extension) {
        case ExtensionType.TS:
            return 'ts';
        case ExtensionType.JS:
            return 'js';
        default:
            return extension;
    }
};
