import { Subject } from 'rxjs';

const subject = new Subject();

export const consoleLogService = {
    sendMessage: (message: string) => subject.next(message),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable(),
};
