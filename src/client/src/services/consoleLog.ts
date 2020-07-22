import { Subject } from 'rxjs';
import { ILogMessage, LogType } from '@app/types';

const subject = new Subject<ILogMessage>();

export const consoleLogService = {
    sendMessage: (logMessage: ILogMessage) => subject.next(logMessage),
    clearMessages: () => subject.next({ type: LogType.CLEAR, message: '' }),
    getMessage: () => subject.asObservable(),
};
