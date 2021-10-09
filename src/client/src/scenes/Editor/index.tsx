import axios from 'axios';
import * as ts from 'typescript';
import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import MonacoEditor from 'react-monaco-editor';

import { WindowUI } from './components/Window';
import { ConsoleUI } from './components/Console';
import { FileButtons } from './components/FileButtons';

import { useUpdateCode } from '@app/hooks';
import { ExtensionType } from '@app/types';
import { EditorDataModel } from '@app/models/editor-data';
import { consoleLogService } from '@service/consoleLog';

import './styles.scss';

interface IEditor {
    editorDataModel?: EditorDataModel;
}

export const Editor: React.FC<IEditor> = inject('editorDataModel')(
    observer((props) => {
        const { extension } = props.editorDataModel as EditorDataModel;
        const [code, setCode] = useState('// type your code...');

        useUpdateCode(extension, setCode);

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
            const iframe = document.querySelector('iframe');
            consoleLogService.clearMessages();

            if (extension === ExtensionType.TS) {
                newValue = ts.transpileModule(newValue, {
                    compilerOptions: { module: ts.ModuleKind.CommonJS },
                }).outputText;
            }

            try {
                await axios.post('http://localhost:8080/io/write-file', {
                    outputText: newValue,
                    extension,
                });

                iframe!.src = iframe!.src;
            } catch (e) {
                //
            }
        };

        console.log(extension);

        return (
            <div className="fs-editor">
                <div className="fs-editor__view">
                    <div className="editor__files">
                        <FileButtons />
                    </div>
                    <MonacoEditor
                        width="800"
                        height="600"
                        language={extension}
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
    }),
);
