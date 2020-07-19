export enum LogType {
    ERROR = 'log--error',
    LOG = 'log',
    WARN = 'log--warn',
    CLEAR = 'log--clean',
}

export interface ILogMessage {
    type: LogType;
    message: any;
}
