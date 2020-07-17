import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

export const Editor: React.FC = () => {
    const [code, setCode] = React.useState('// type your code...');
    const options = {
        selectOnLineNumbers: true,
    };

    const editorDidMount = (editor: any, monaco: any) => {
        console.log('editorDidMount', editor);
        editor.focus();
    };

    const onChange = (newValue: any, e: any) => {
        console.log('onChange', newValue, e);
    };
    return (
        <MonacoEditor
            width="800"
            height="600"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
        />
    );
};
