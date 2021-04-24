#!/usr/bin/env node

import SimpleDevServer from './lib/SimpleDevServer.js';

const server = new SimpleDevServer({
    documentRoot: process.argv[2] ? process.argv[2] : process.cwd()
});
server.start();
