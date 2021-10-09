import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { ExtensionType } from '@app/types';
import { generateShortCut } from '@app/utils';
import { EditorDataModel } from '@app/models/editor-data';

import './styles.scss';

interface IFileButton {
    extension: ExtensionType;
    name: string;
    editorDataModel?: EditorDataModel;
}

export const FileButton: React.FC<IFileButton> = inject('editorDataModel')(
    (props) => {
        const { extension, name } = props;
        const {
            extension: originExtension,
            updateExtension,
        } = props.editorDataModel as EditorDataModel;

        const handleClick = (extension: ExtensionType) => {
            updateExtension(extension);
        };

        const classNames = classnames([
            'file-button',
            {
                'file-button--active': extension === originExtension,
            },
        ]);

        return (
            <div
                onClick={() => handleClick(extension)}
                key={uuidv4()}
                className={classNames}
            >
                {name}.{generateShortCut(extension)}
            </div>
        );
    },
);

FileButton.propTypes = {
    extension: PropTypes.oneOf([
        ExtensionType.CSS,
        ExtensionType.HTML,
        ExtensionType.JS,
    ]).isRequired,
    name: PropTypes.string.isRequired,
};
