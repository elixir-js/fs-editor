import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as ts from 'typescript';

export const Editor: React.FC = () => {
    const [code, setCode] = React.useState('// type your code...');

    const options = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        // cursorStyle: 'line',
        automaticLayout: false,
    };

    const editorDidMount = (editor: any, monaco: any) => {
        console.log('editorDidMount', editor);
        console.log(1, editor.getModel().uri.toString());
        editor.focus();
    };

    const onChange = (newValue: any, e: any) => {
        console.log('onChange', newValue, e);
        const { outputText, diagnostics } = ts.transpileModule(newValue, {
            compilerOptions: { module: ts.ModuleKind.CommonJS },
        });

        console.log(eval(outputText));
    };
    return (
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
    );
};
