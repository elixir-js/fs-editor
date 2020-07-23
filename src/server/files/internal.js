var parent = window.parent;
console.log = (...args) => {
    parent.postMessage(args, 'http://localhost:9000');
};
