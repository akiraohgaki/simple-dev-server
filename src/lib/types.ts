export interface SimpleDevServerConfig {
  hostname: string;
  port: number;
  documentRoot: string;
  directoryIndex: string;
  rewriteRules: Array<[string, string]>;
  headers: Record<string, string>;
  mimeTypes: Record<string, string>;
}

export type SimpleDevServerOptions = Partial<SimpleDevServerConfig>;
