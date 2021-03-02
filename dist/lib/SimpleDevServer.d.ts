import { ServerConfig, ServerConfigOptions } from './types.js';
export default class SimpleDevServer {
    private _config;
    private _server;
    constructor(config?: ServerConfigOptions);
    get config(): ServerConfig;
    start(): void;
    stop(): void;
    private _handleRequest;
    private _resolvePath;
}
