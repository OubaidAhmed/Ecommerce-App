const path = require('path');

module.exports = {
    // ... existing webpack configurations

    resolve: {
        fallback: {
            url: require.resolve('url/'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            zlib: require.resolve('browserify-zlib'),
            stream: require.resolve('stream-browserify'),
            assert: require.resolve('assert/'),
        },
    },
};
