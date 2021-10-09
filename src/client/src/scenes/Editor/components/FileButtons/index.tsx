import React from 'react';
import { fileButtonData } from './__mock__';

import './styles.scss';
import { FileButton } from '@app/components/FileButton';
import { v4 as uuidv4 } from 'uuid';
import { ExtensionType } from '@app/types';
import { inject } from 'mobx-react';
import { EditorDataModel } from '@app/models/editor-data';

interface IFileButtons {
    editorDataModel?: EditorDataModel;
}

export const FileButtons: React.FC<IFileButtons> = inject('editorDataModel')(
    () => {
        return (
            <div className="file-buttons">
                {fileButtonData.map((data) => (
                    <FileButton key={uuidv4()} {...data} />
                ))}
                ;
            </div>
        );
    },
);
