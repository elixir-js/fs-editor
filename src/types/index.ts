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

export type RecursiveType<T> = T extends any[]
    ? {
          [K in keyof T]: RecursiveType<T[K]>;
      }[number]
    : T extends Promise<any>
    ? T
    : T extends Record<string, unknown>
    ? {
          [K in keyof T]: T[K] extends (infer Y)[]
              ? RecursiveType<Y>
              : T[K] extends Promise<any>
              ? T[K]
              : T[K] extends Record<string, unknown>
              ? RecursiveType<T[K]>
              : T[K];
      }[keyof T]
    : T;
