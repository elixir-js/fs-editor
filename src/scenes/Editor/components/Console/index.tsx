import React, { useEffect, useState } from 'react';
import { consoleLogService } from '@service/consoleLog';
import './styles.scss';

export const ConsoleUI: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const subscription = consoleLogService
            .getMessage()
            .subscribe((message: any) => {
                if (message) {
                    setLogs((logs) => logs.concat(message));
                    global.console.log(logs);
                } else {
                    setLogs([]);
                }
            });

        return () => subscription.unsubscribe();
    });

    return <div className="console">{logs.join('\n')}</div>;
};
