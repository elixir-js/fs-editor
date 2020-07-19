import * as ts from 'typescript';
import React, { useEffect, useState } from 'react';
import { ConsoleUI } from './components/Console';
import MonacoEditor from 'react-monaco-editor';
import { consoleLogService } from '@service/consoleLog';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Console = require('console-emitter');

export const Editor: React.FC = () => {
    const [code] = useState('// type your code...');
    const console = new Console();

    useEffect(() => {
        const logme = (...args: any) => {
            consoleLogService.sendMessage(args.join(', '));
        };

        console.on('log', logme);
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
        const { outputText } = ts.transpileModule(newValue, {
            compilerOptions: { module: ts.ModuleKind.CommonJS },
        });

        consoleLogService.clearMessages();

        try {
            eval(outputText);
        } catch (e) {
            consoleLogService.clearMessages();
            consoleLogService.sendMessage(e.toString());
        }
    };
    return (
        <>
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
        </>
    );
};
