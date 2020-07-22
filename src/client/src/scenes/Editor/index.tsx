import * as ts from 'typescript';
import MonacoEditor from 'react-monaco-editor';
import React, { useEffect, useState } from 'react';
import { LogType } from '@app/types';
import { ConsoleUI } from './components/Console';
import { WindowUI } from './components/Window';
import { consoleLogService } from '@service/consoleLog';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Console = require('console-emitter');

import './styles.scss';

export const Editor: React.FC = () => {
    const [code] = useState('// type your code...');
    const console = new Console();

    useEffect(() => {
        window.addEventListener('message', (e) => {
            if (e.origin === 'http://localhost:3000') console.log(e.data);
        });

        const logHandler = (...args: any) => {
            consoleLogService.sendMessage({
                type: LogType.LOG,
                message: args,
            });
        };

        console.on('log', logHandler);

        return () => {
            window.removeEventListener('message', () => '');
        };
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

    const onChange = async (newValue: string) => {
        const { outputText } = ts.transpileModule(newValue, {
            compilerOptions: { module: ts.ModuleKind.CommonJS },
        });

        consoleLogService.clearMessages();
        const iframe = document.querySelector('iframe');

        try {
            await axios.post('http://localhost:3000/writeFile', {
                outputText,
            });

            iframe!.src = iframe!.src;
        } catch (e) {
            //
        }
    };

    return (
        <div className="fs-editor">
            <div className="fs-editor__view">
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
            </div>
            <WindowUI />
        </div>
    );
};
