import { useEffect, useState } from 'react';
import { consoleLogService } from '@service/consoleLog';
import { ILogMessage, LogType } from '@app/types';

export const useConsoleLogs = (): ILogMessage[] => {
    const [logs, setLogs] = useState<ILogMessage[]>([]);

    useEffect(() => {
        const subscription = consoleLogService
            .getMessage()
            .subscribe((logMessage: ILogMessage) => {
                if (logMessage.type !== LogType.CLEAR) {
                    setLogs((logs) => logs.concat(logMessage));
                } else {
                    setLogs([]);
                }
            });

        return () => subscription.unsubscribe();
    });

    return logs;
};
