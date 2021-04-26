#!/usr/bin/env node
var _a;
import SimpleDevServer from './lib/SimpleDevServer.js';
const server = new SimpleDevServer({
    documentRoot: (_a = process.argv[2]) !== null && _a !== void 0 ? _a : process.cwd()
});
server.start();
//# sourceMappingURL=simple-dev-server-cli.js.map