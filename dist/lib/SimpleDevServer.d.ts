import type { ServerConfig } from './types.js';
export default class SimpleDevServer {
    private _config;
    private _server;
    constructor(config?: Partial<ServerConfig>);
    get config(): ServerConfig;
    start(): void;
    stop(): void;
    private _handleRequest;
    private _resolvePath;
}
