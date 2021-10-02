var parent = window.parent;
console.log = (...args) => {
    parent.postMessage(args, 'http://localhost:9000');
};

window.onerror = function (msg) {
    console.log(msg);

    return false;
};
