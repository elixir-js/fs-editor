import React from 'react';
import { useConsoleLogs } from '@app/hooks';
import { LogModal } from '@components/LogModal';
import { v4 as uuid4 } from 'uuid';

import './styles.scss';

export const ConsoleUI: React.FC = () => {
    const logs = useConsoleLogs();

    const LogMessages = logs.map((logMessage) => (
        <LogModal key={uuid4()} {...logMessage} />
    ));

    return (
        <div className="console">
            <code className="console__title">
                <i>console:</i>
            </code>
            {LogMessages}
        </div>
    );
};
