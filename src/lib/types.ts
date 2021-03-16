export interface ServerConfig {
    port: number;
    documentRoot: string;
    directoryIndex: string;
    rewriteRules: Array<[string, string]>;
    headers: {[key: string]: string};
    mimeTypes: {[key: string]: string};
}
