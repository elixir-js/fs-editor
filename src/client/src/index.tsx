import React, { useEffect } from 'react';
import * as appModels from '@app/models';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { RouterApp } from './router';
import { LogType } from '@app/types';
import { consoleLogService } from '@service/consoleLog';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Console = require('console-emitter');

import './style.scss';

const App: React.FC = () => {
    const console = new Console();

    useEffect(() => {
        window.addEventListener('message', (e) => {
            if (e.origin === 'http://localhost:8080') console.log(e.data);
        });

        const logHandler = (...args: any) => {
            global.console.log(args);
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

    return (
        <Provider {...appModels}>
            <RouterApp />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
