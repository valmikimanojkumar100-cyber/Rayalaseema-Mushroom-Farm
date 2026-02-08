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
