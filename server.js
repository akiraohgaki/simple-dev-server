import {SimpleDevServer} from './dist/simple-dev-server.js';

const server = new SimpleDevServer({
    documentRoot: process.cwd() + '/public',
    rewriteRules: [
        ['(.+\\.\\w+)$', '$1'],
        ['.*', '/index.html']
    ]
});
server.start();
