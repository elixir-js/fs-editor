import * as ts from 'typescript';
import MonacoEditor from 'react-monaco-editor';
import React, { useEffect, useState } from 'react';
import { LogType } from '@app/types';
import { ConsoleUI } from './components/Console';
import { WindowUI } from './components/Window';
import { consoleLogService } from '@service/consoleLog';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Console = require('console-emitter');

export const Editor: React.FC = () => {
    const [code] = useState('// type your code...');
    const console = new Console();

    useEffect(() => {
        const logHandler = (...args: any) => {
            global.console.log(123, args);
            consoleLogService.sendMessage({
                type: LogType.LOG,
                message: args,
            });
        };

        console.on('log', logHandler);
    }, []);

    const options = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        automaticLayout: false,
    };

    const editorDidMount = (editor: any) => {
        editor.focus();
    };

    const onChange = (newValue: string) => {
        newValue = newValue.replace(
            /console\.log\((.*)\)/g,
            (_, values: string) => `console.log([${values}])`,
        );

        const { outputText } = ts.transpileModule(newValue, {
            compilerOptions: { module: ts.ModuleKind.CommonJS },
        });

        consoleLogService.clearMessages();

        try {
            eval(outputText);
        } catch (e) {
            consoleLogService.sendMessage({
                type: LogType.ERROR,
                message: [e.toString()],
            });
        }
    };

    return (
        <div className="fs-editor">
            <MonacoEditor
                width="800"
                height="600"
                language="typescript"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={onChange}
                editorDidMount={editorDidMount}
            />
            <ConsoleUI />
            <WindowUI></WindowUI>
        </div>
    );
};
