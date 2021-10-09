export enum LogType {
    ERROR = 'log--error',
    LOG = 'log',
    WARN = 'log--warn',
    CLEAR = 'log--clean',
}

export enum ExtensionType {
    HTML = 'html',
    CSS = 'css',
    JS = 'javascript',
    TS = 'typescript',
}

export interface ILogMessage {
    type: LogType;
    message: any;
}
