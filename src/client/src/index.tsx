import React, { useEffect } from 'react';
import * as appModels from '@app/models';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { RouterApp } from './router';

import { consoleLogService } from '@service/consoleLog';
import { getLogType } from '@utils/getLogType';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Console = require('console-emitter');

import './style.scss';

const App: React.FC = () => {
    const console = new Console();

    useEffect(() => {
        window.addEventListener('message', ({ origin, data: message }) => {
            if (origin === 'http://localhost:8080') {
                console.log(message);
            }
        });

        const logHandler = (message: { type: string; content: string[] }) => {
            const { type: prevType, content } = message;
            try {
                const type = getLogType(prevType);

                consoleLogService.sendMessage({
                    type,
                    message: content,
                });
            } catch (e) {
                // Something is here
            }
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
