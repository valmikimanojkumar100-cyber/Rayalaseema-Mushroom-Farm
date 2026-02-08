/** Minimal Node types for vite.config.ts so it type-checks without requiring node_modules. */
declare module "path" {
  export function resolve(...paths: string[]): string;
  export function dirname(p: string): string;
}
declare module "node:path" {
  export function resolve(...paths: string[]): string;
  export function dirname(p: string): string;
}
declare module "node:url" {
  export function fileURLToPath(url: URL | string): string;
}

// Vite environment variable typings used in the config and app
interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_RAZORPAY_KEY?: string;
  readonly GEMINI_API_KEY?: string;
  // add other VITE_ variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
