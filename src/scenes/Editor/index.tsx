import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Console = require('console-emitter');

// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as ts from 'typescript';

export const Editor: React.FC = () => {
    const [code, setCode] = React.useState('// type your code...');
    const console = new Console();
    const consoleEl = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const logme = (...args: any) => {
            global.console.log(args);
            consoleEl.current!.innerText += `\n${args[0] || ''}`;
        };

        console.on('log', logme);
    }, []);

    const options = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        // cursorStyle: 'line',
        automaticLayout: false,
    };

    const editorDidMount = (editor: any, monaco: any) => {
        editor.focus();
    };

    const onChange = (newValue: any, e: any) => {
        const { outputText, diagnostics } = ts.transpileModule(newValue, {
            compilerOptions: { module: ts.ModuleKind.CommonJS },
        });

        global.console.log(newValue);
        // setHistory([]);
        consoleEl.current!.innerHTML = '';

        try {
            eval(outputText);
        } catch (e) {
            consoleEl.current!.innerText = e.toString();
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
            <div ref={consoleEl}></div>
        </>
    );
};
