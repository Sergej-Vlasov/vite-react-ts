interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_GRAPHQL_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
