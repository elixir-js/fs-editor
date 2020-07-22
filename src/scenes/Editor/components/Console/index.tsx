import React, { useEffect, useState } from 'react';
import { useConsoleLogs } from '@app/hooks';
import { LogModal } from '@components/LogModal';

import './styles.scss';

export const ConsoleUI: React.FC = () => {
    const logs = useConsoleLogs();

    return (
        <div className="console">
            <code className="console__title">
                <i>console:</i>
            </code>
            {logs.length
                ? logs.map((logMessage) => (
                      <LogModal key={logMessage.message} {...logMessage} />
                  ))
                : null}
        </div>
    );
};
