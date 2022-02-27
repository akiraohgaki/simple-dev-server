#!/usr/bin/env node
import { SimpleDevServer } from './index.js';
const server = new SimpleDevServer({
    documentRoot: process.argv[2] ?? process.cwd()
});
server.start();
