module.exports = function(wallaby) {
    return {
        files: [
            "importmap.js",
            "src/**/*.ts",
            "node_modules/@browser-modules/dictionary/lib/**/*.js",
            "node_modules/@browser-modules/events/lib/**/*.js"
        ],
        tests: [
            "test/*.ts"
        ],
        filesWithNoCoverageCalculated: [
            'node_modules/@browser-modules/dictionary/lib/dictionary.js',
            'node_modules/@browser-modules/events/lib/**/*.js'
        ], 
        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                "module": "es2020",
                "target": "es2020",
                "sourceMap": true,
                "inlineSources": true
            })
        }
    };
}