# Security and Data Boundary

Verdent Growth OS is a private, cloud-backed content operations tool.

## Data storage

- Task content, drafts, account links, metrics, and notes are stored in Cloudflare D1.
- Uploaded documents, images, and videos are stored in a private Cloudflare R2 bucket.
- The browser stores a non-authoritative cache for temporary offline viewing.
- Writes use revision checks so an older browser session cannot silently overwrite a newer cloud revision.
- JSON backups contain the full workspace and should be handled as internal files.
- R2 files are served through private application routes rather than public bucket URLs.
- Feishu organization authentication is planned but not active until the real Verdent Feishu app credentials and tenant policy are configured.

## Do not commit

- API keys, tokens, passwords, cookies, or voice-clone credentials
- unpublished changelogs, embargoed model information, or partner material
- user prompts, source code, workspace screenshots, or personal information
- local JSON backups, raw recordings, voice files, or private design exports

## Content safety

The built-in checks are editorial guardrails, not a substitute for source quality. Publication still requires confirmed release status, public scope, claims, media redaction, partner coordination, account selection, and a final self-check.

## Reporting a problem

Use a private repository issue without including secrets or confidential source material. Describe the affected workflow, expected behavior, and a minimal sanitized example.
