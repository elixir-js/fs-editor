import React from 'react';
import { useConsoleLogs } from '@app/hooks';
import { LogModal } from '@components/LogModal';
import { v4 as uuid4 } from 'uuid';

import './styles.scss';

export const ConsoleUI: React.FC = () => {
    const logs = useConsoleLogs();

    // console.log('Here are the logs', logs);

    return (
        <div className="console">
            <code className="console__title">
                <i>console:</i>
            </code>
            {logs.length
                ? logs.map((logMessage) => (
                      <LogModal key={uuid4()} {...logMessage} />
                  ))
                : null}
        </div>
    );
};
