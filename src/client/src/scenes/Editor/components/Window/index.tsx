import React, { useRef } from 'react';

import './styles.scss';

export const WindowUI: React.FC = () => {
    const iframeWindow = useRef<HTMLIFrameElement>(null);

    return (
        <div className="window-ui">
            <iframe
                ref={iframeWindow}
                src="http://localhost:8080/serve"
            ></iframe>
        </div>
    );
};
