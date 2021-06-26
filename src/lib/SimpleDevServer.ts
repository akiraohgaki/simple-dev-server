import type { ServerConfig } from './types.js';

import http from 'http';
import fs from 'fs';
import { defaultConfig } from './config.js';

export default class SimpleDevServer {

  private _config: ServerConfig;

  private _server: http.Server | null;

  constructor(config: Partial<ServerConfig> = {}) {
    this._config = { ...defaultConfig, ...config };

    this._server = null;
  }

  get config(): ServerConfig {
    return this._config;
  }

  start(): void {
    if (this._server) {
      console.log('Server is already running');
    }
    else {
      this._server = http.createServer(this._handleRequest.bind(this));
      this._server.listen(this._config.port, this._config.hostname);

      console.log(`Server started on http://${this._config.hostname}:${this._config.port}/`);
    }
  }

  stop(): void {
    if (this._server) {
      this._server.close();
      this._server = null;

      console.log('Server has stopped');
    }
    else {
      console.log('Server is not running');
    }
  }

  private _handleRequest(request: http.IncomingMessage, response: http.ServerResponse): void {
    const path = this._resolvePath(request.url);

    fs.readFile(path, (error, data) => {
      if (error) {
        let statusCode = 500;
        let message = 'Internal Server Error';

        if (error.code === 'ENOENT') {
          statusCode = 404;
          message = 'Not Found';
        }

        response.writeHead(statusCode, {
          ...this._config.headers,
          'Content-Type': 'text/plain'
        });
        response.end(message, 'utf-8');
      }
      else {
        let contentType = 'application/octet-stream';

        const ext = path.split('.').pop()?.toLowerCase();
        if (ext && ext in this._config.mimeTypes) {
          contentType = this._config.mimeTypes[ext];
        }

        response.writeHead(200, {
          ...this._config.headers,
          'Content-Type': contentType
        });
        response.end(data, 'utf-8');
      }
    });
  }

  private _resolvePath(url?: string): string {
    let path = url?.split('?')[0] || '/';

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
