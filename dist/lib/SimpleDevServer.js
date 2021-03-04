import http from 'http';
import fs from 'fs';
export default class SimpleDevServer {
    constructor(config = {}) {
        this._config = Object.assign({ port: 8080, documentRoot: process.cwd(), directoryIndex: 'index.html', headers: {
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
            }, mimeTypes: {
                'txt': 'text/plain',
                'htm': 'text/html',
                'html': 'text/html',
                'js': 'text/javascript',
                'css': 'text/css',
                'xml': 'application/xml',
                'json': 'application/json',
                'svg': 'image/svg+xml',
                'gif': 'image/gif',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'png': 'image/png',
                'webp': 'image/webp',
                'ico': 'image/vnd.microsoft.icon'
            }, rewriteRules: [] }, config);
        this._server = null;
    }
    get config() {
        return this._config;
    }
    start() {
        this._server = http.createServer((request, response) => {
            console.log(request.url);
            this._handleRequest(request, response);
        });
        this._server.listen(this._config.port);
        console.log(`Server is started at port ${this._config.port}`);
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
        const path = this._resolvePath(request.url || '/');
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
        let path = url;
        if (this._config.rewriteRules.length) {
            for (const [pattern, pathname] of this._config.rewriteRules) {
                if (path.search(new RegExp(pattern)) !== -1) {
                    path = pathname;
                    break;
                }
            }
        }
        if (path.endsWith('/')) {
            path += this._config.directoryIndex;
        }
        return this._config.documentRoot + path;
    }
}
//# sourceMappingURL=SimpleDevServer.js.map