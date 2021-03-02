import http from 'http';
import fs from 'fs';
import {ServerConfig, ServerConfigOptions} from './types.js';

export default class SimpleDevServer {

    private _config: ServerConfig;

    private _server: http.Server | null;

    constructor(config: ServerConfigOptions = {}) {
        this._config = {
            port: 8080,
            documentRoot: process.cwd(),
            directoryIndex: 'index.html',
            headers: {
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
            },
            mimeTypes: {
                'html': 'text/html',
                'js': 'text/javascript',
                'css': 'text/css',
                'json': 'application/json',
                'svg': 'image/svg+xml',
                'jpg': 'image/jpeg',
                'png': 'image/png'
            },
            rewriteRules: [],
            ...config
        };

        this._server = null;
    }

    get config(): ServerConfig {
        return this._config;
    }

    start(): void {
        this._server = http.createServer((request, response) => {
            console.log(request.url);
            this._handleRequest(request, response);
        });
        this._server.listen(this._config.port);

        console.log(`Server is started at port ${this._config.port}`);
    }

    stop(): void {
        if (this._server) {
            this._server.close();
            this._server = null;

            console.log('Server has stopped');
        }
    }

    private _handleRequest(request: http.IncomingMessage, response: http.ServerResponse): void {
        const path = this._resolvePath(request.url);

        fs.readFile(path, (error, data) => {
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

                response.writeHead(statusCode, {
                    ...this._config.headers,
                    'Content-Type': 'text/plain'
                });
                response.end(message, 'utf-8');
            }
            else {
                const ext = path.split('.').pop()?.toLowerCase() ?? '';
                const contentType = this._config.mimeTypes[ext] ?? 'application/octet-stream';

                response.writeHead(200, {
                    ...this._config.headers,
                    'Content-Type': contentType
                });
                response.end(data, 'utf-8');
            }
        });
    }

    private _resolvePath(url?: string): string {
        let path = url ?? '/';

        if (path) {
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
        }

        return this._config.documentRoot + path;
    }

}