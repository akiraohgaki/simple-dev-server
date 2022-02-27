import type { SimpleDevServerConfig, SimpleDevServerOptions } from './types.js';
export default class SimpleDevServer {
    private _config;
    private _server;
    constructor(options?: SimpleDevServerOptions);
    get config(): SimpleDevServerConfig;
    start(): void;
    stop(): void;
    private _handleRequest;
    private _resolvePath;
}
