import { LogType } from '@app/types';

export const getLogType = (type: string): LogType => {
    switch (type) {
        case LogType.WARN:
            return LogType.WARN;
        case LogType.ERROR:
            return LogType.ERROR;
        case LogType.LOG:
            return LogType.LOG;
        default:
            throw new Error(
                'Invalid log type. Please provide the right log type!',
            );
    }
};
