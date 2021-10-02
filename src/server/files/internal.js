const parent = window.parent;

console.log = (...content) => {
    logInterceptor('log', content);
};

console.error = (...content) => {
    logInterceptor('log--error', content);
};

console.warn = (...content) => {
    logInterceptor('log--warn', content);
};

window.onerror = function (msg) {
    console.error(msg);

    return false;
};

const logInterceptor = (type, content) => {
    parent.postMessage(
        {
            type,
            content,
        },
        'http://localhost:9000',
    );
};
