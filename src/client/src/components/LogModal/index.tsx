import React from 'react';
import PropTypes from 'prop-types';
import { getClassName } from '@app/utils';
import { ILogMessage, LogType } from '@app/types';
import { RecursiveNodes } from '@components/RecursiveNodes';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss';

export const LogModal: React.FC<ILogMessage> = (props) => {
    const { type, message } = props;

    return (
        <div className="logs">
            <code>
                &gt;
                {type !== LogType.ERROR &&
                    message.length > 1 &&
                    `(${message.length})`}
            </code>
            {message.map((item: any) =>
                typeof item === 'object' ? (
                    RecursiveNodes({ tree: item })
                ) : (
                    <code
                        key={uuidv4()}
                        className={getClassName('log', type, typeof item)}
                    >
                        {typeof item === 'string'
                            ? `"${item}"`
                            : item.toString()}
                    </code>
                ),
            )}
        </div>
    );
};

LogModal.propTypes = {
    type: PropTypes.oneOf<LogType>([LogType.ERROR, LogType.WARN, LogType.LOG])
        .isRequired,
    message: PropTypes.any.isRequired,
};
