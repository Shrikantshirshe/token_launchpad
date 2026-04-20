/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LAUNCHPAD_CONTRACT_ID: string
  readonly VITE_NETWORK_PASSPHRASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
