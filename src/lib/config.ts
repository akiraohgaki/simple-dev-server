import type {ServerConfig} from './types.js';

export const defaultConfig: ServerConfig = {
    port: 8080,
    documentRoot: process.cwd(),
    directoryIndex: 'index.html',
    rewriteRules: [],
    headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
    },
    mimeTypes: {
        'txt': 'text/plain',
        'htm': 'text/html',
        'html': 'text/html',
        'js': 'text/javascript',
        'css': 'text/css',
        'xml': 'application/xml',
        'json': 'application/json',
        'svg': 'image/svg+xml',
        'gif': 'image/gif',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'webp': 'image/webp',
        'ico': 'image/vnd.microsoft.icon'
    }
};
