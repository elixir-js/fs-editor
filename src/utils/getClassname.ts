import clsasnames from 'classnames';

export const getClassName = (...args: string[]): string => {
    const [prefix, type, valueType] = args;

    return clsasnames([type, `${prefix}--${valueType}`]);
};
