import React, { useEffect, useState } from 'react';
import { useConsoleLogs } from '@app/hooks';
import { LogModal } from '@components/LogModal';

import './styles.scss';

export const ConsoleUI: React.FC = () => {
    const logs = useConsoleLogs();

    global.console.log(11, logs);

    return (
        <div className="console">
            {logs.length
                ? logs.map((logMessage) => (
                      <LogModal key={logMessage.message} {...logMessage} />
                  ))
                : null}
        </div>
    );
};
