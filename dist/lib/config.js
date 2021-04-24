export const defaultConfig = {
    hostname: 'localhost',
    port: 8080,
    documentRoot: process.cwd(),
    directoryIndex: 'index.html',
    rewriteRules: [
        ['(.+\\.\\w+)$', '$1'],
        ['.*', '/index.html']
    ],
    headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
    },
    mimeTypes: {
        'txt': 'text/plain',
        'htm': 'text/html',
        'html': 'text/html',
        'css': 'text/css',
        'js': 'application/javascript',
        'eot': 'application/vnd.ms-fontobject',
        'ttf': 'font/ttf',
        'otf': 'font/otf',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'svg': 'image/svg+xml',
        'ico': 'image/vnd.microsoft.icon',
        'gif': 'image/gif',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'jfif': 'image/jpeg',
        'pjpeg': 'image/jpeg',
        'pjp': 'image/jpeg',
        'png': 'image/png',
        'apng': 'image/apng',
        'webp': 'image/webp',
        'avif': 'image/avif',
        'wav': 'audio/wav',
        'ogg': 'application/ogg',
        'oga': 'audio/ogg',
        'ogv': 'video/ogg',
        'weba': 'audio/webm',
        'webm': 'video/webm',
        'json': 'application/json',
        'xml': 'application/xml'
    }
};
//# sourceMappingURL=config.js.map