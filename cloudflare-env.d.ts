// Augments Cloudflare.Env (from @cloudflare/workers-types) with this project's
// bindings, which are configured in vite.config.ts / .openai/hosting.json
// rather than a wrangler.toml (so `wrangler types` cannot generate this file).
declare namespace Cloudflare {
  interface Env {
    ASSETS: Fetcher;
    DB: D1Database;
    FILES: R2Bucket;
    IMAGES: ImagesBinding;
  }
}
