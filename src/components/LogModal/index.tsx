import React from 'react';
import { ILogMessage, LogType } from '@app/types';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { RecursiveNodes } from '@components/RecursiveNodes';

import './styles.scss';

export const LogModal: React.FC<ILogMessage> = (props): any => {
    const { type, message } = props;
    const typeofMessage = `log--${typeof message}`;

    global.console.log(typeof message);

    const classNames = classnames(['log', type, typeofMessage]);
    return (
        <code className={classNames}>
            {message.map((item: any) =>
                typeof item === 'object' ? (
                    RecursiveNodes(item)
                ) : (
                    <code>{item.toString()}</code>
                ),
            )}
        </code>
    );
};

LogModal.propTypes = {
    type: PropTypes.oneOf<LogType>([LogType.ERROR, LogType.WARN, LogType.LOG])
        .isRequired,
    message: PropTypes.any.isRequired,
};
