import React from 'react';
import PropTypes from 'prop-types';
import { getClassName } from '@app/utils';
import { ILogMessage, LogType } from '@app/types';
import { RecursiveNodes } from '@components/RecursiveNodes';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss';

export const LogModal: React.FC<ILogMessage> = (props) => {
    const { type, message } = props;

    const Messages = message.map((each: any) => {
        return typeof each === 'object' ? (
            RecursiveNodes({ tree: each })
        ) : (
            <code
                key={uuidv4()}
                className={getClassName('log', type, typeof each)}
            >
                {typeof each === 'string' ? `"${each}"` : each.toString()}
            </code>
        );
    });
    return (
        <div className="logs">
            <code>
                &gt;&gt;
                {type !== LogType.ERROR &&
                    message.length > 1 &&
                    `(${message.length})`}
            </code>
            {Messages}
        </div>
    );
};

LogModal.propTypes = {
    type: PropTypes.oneOf<LogType>([LogType.ERROR, LogType.WARN, LogType.LOG])
        .isRequired,
    message: PropTypes.any.isRequired,
};
