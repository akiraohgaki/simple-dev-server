import type { SimpleDevServerConfig, SimpleDevServerOptions } from './types.js';
export default class SimpleDevServer {
    #private;
    constructor(options?: SimpleDevServerOptions);
    get config(): SimpleDevServerConfig;
    start(): void;
    stop(): void;
}
