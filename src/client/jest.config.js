module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/$1',
        '\\.(css|scss)$': '<rootDir>/styleMock.js',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
        'css',
        'scss',
    ],
};
