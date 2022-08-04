import type { SimpleDevServerConfig } from './types.js';

export const config: SimpleDevServerConfig = {
  hostname: '0.0.0.0',
  port: 8080,
  documentRoot: process.cwd(),
  directoryIndex: 'index.html',
  rewriteRules: [],
  headers: {
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
  },
  mimeTypes: {
    // Text
    'txt': 'text/plain',
    'htm': 'text/html',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    // Font
    'eot': 'application/vnd.ms-fontobject',
    'ttf': 'font/ttf',
    'otf': 'font/otf',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    // Image
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
    // Audio and Video
    'wav': 'audio/wav',
    'ogg': 'application/ogg',
    'oga': 'audio/ogg',
    'ogv': 'video/ogg',
    'weba': 'audio/webm',
    'webm': 'video/webm',
    // Application data format
    'json': 'application/json',
    'xml': 'application/xml',
  },
};
