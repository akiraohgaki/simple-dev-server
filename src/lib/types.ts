export interface ServerConfig {
    port: number;
    documentRoot: string;
    directoryIndex: string;
    headers: {[key: string]: string};
    mimeTypes: {[key: string]: string};
    rewriteRules: Array<[string, string]>;
}
