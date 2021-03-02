export interface ServerConfigOptions {
    port?: number;
    documentRoot?: string;
    directoryIndex?: string;
    headers?: {
        [key: string]: string;
    };
    mimeTypes?: {
        [key: string]: string;
    };
    rewriteRules?: Array<[string, string]>;
}
export interface ServerConfig extends ServerConfigOptions {
    port: number;
    documentRoot: string;
    directoryIndex: string;
    headers: {
        [key: string]: string;
    };
    mimeTypes: {
        [key: string]: string;
    };
    rewriteRules: Array<[string, string]>;
}
