/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_SERVER_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
