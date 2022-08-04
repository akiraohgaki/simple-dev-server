import http from 'http';
import fs from 'fs';
import { config } from './config.js';
export default class SimpleDevServer {
    #config;
    #server = null;
    constructor(options = {}) {
        this.#config = { ...config, ...options };
    }
    get config() {
        return this.#config;
    }
    start() {
        if (this.#server) {
            console.log('Server is already running');
        }
        else {
            this.#server = http.createServer(this.#handleRequest.bind(this));
            this.#server.listen(this.#config.port, this.#config.hostname);
            console.log(`Server started on http://${this.#config.hostname}:${this.#config.port}/`);
        }
    }
    stop() {
        if (this.#server) {
            this.#server.close();
            this.#server = null;
            console.log('Server has stopped');
        }
        else {
            console.log('Server is not running');
        }
    }
    #handleRequest(request, response) {
        const path = this.#resolvePath(request.url);
        fs.readFile(path, (error, data) => {
            if (error) {
                let statusCode = 500;
                let message = 'Internal Server Error';
                if (error.code === 'ENOENT') {
                    statusCode = 404;
                    message = 'Not Found';
                }
                response.writeHead(statusCode, {
                    ...this.#config.headers,
                    'Content-Type': 'text/plain',
                });
                response.end(message, 'utf-8');
            }
            else {
                let contentType = 'application/octet-stream';
                const ext = path.split('.').pop()?.toLowerCase();
                if (ext && ext in this.#config.mimeTypes) {
                    contentType = this.#config.mimeTypes[ext];
                }
                response.writeHead(200, {
                    ...this.#config.headers,
                    'Content-Type': contentType,
                });
                response.end(data, 'utf-8');
            }
        });
    }
    #resolvePath(url) {
        let path = url?.split('?')[0] || '/';
        if (this.#config.rewriteRules.length) {
            for (const [pattern, replacement] of this.#config.rewriteRules) {
                const regex = new RegExp(pattern);
                if (path.search(regex) !== -1) {
                    path = path.replace(regex, replacement);
                    break;
                }
            }
        }
        if (path.endsWith('/')) {
            path += this.#config.directoryIndex;
        }
        console.log(`${url}\t\t${path}`);
        return this.#config.documentRoot + path;
    }
}
