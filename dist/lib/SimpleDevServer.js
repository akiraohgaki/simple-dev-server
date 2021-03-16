import http from 'http';
import fs from 'fs';
import { defaultConfig } from './config.js';
export default class SimpleDevServer {
    constructor(config = {}) {
        this._config = Object.assign(Object.assign({}, defaultConfig), config);
        this._server = null;
    }
    get config() {
        return this._config;
    }
    start() {
        if (this._server) {
            console.log('Server is already running');
        }
        else {
            this._server = http.createServer(this._handleRequest.bind(this));
            this._server.listen(this._config.port, this._config.hostname);
            console.log(`Server started on http://${this._config.hostname}:${this._config.port}/`);
        }
    }
    stop() {
        if (this._server) {
            this._server.close();
            this._server = null;
            console.log('Server has stopped');
        }
        else {
            console.log('Server is not running');
        }
    }
    _handleRequest(request, response) {
        const path = this._resolvePath(request.url);
        fs.readFile(path, (error, data) => {
            var _a;
            if (error) {
                let statusCode = 0;
                let message = '';
                if (error.code === 'ENOENT') {
                    statusCode = 404;
                    message = 'Not Found';
                }
                else {
                    statusCode = 500;
                    message = 'Internal Server Error';
                }
                response.writeHead(statusCode, Object.assign(Object.assign({}, this._config.headers), { 'Content-Type': 'text/plain' }));
                response.end(message, 'utf-8');
            }
            else {
                let contentType = 'application/octet-stream';
                const ext = (_a = path.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                if (ext && ext in this._config.mimeTypes) {
                    contentType = this._config.mimeTypes[ext];
                }
                response.writeHead(200, Object.assign(Object.assign({}, this._config.headers), { 'Content-Type': contentType }));
                response.end(data, 'utf-8');
            }
        });
    }
    _resolvePath(url) {
        let path = (url === null || url === void 0 ? void 0 : url.split('?')[0]) || '/';
        if (this._config.rewriteRules.length) {
            for (const [pattern, replacement] of this._config.rewriteRules) {
                const regex = new RegExp(pattern);
                if (path.search(regex) !== -1) {
                    path = path.replace(regex, replacement);
                    break;
                }
            }
        }
        if (path.endsWith('/')) {
            path += this._config.directoryIndex;
        }
        console.log(`${url}\t\t${path}`);
        return this._config.documentRoot + path;
    }
}
//# sourceMappingURL=SimpleDevServer.js.map