# Security and Data Boundary

Verdent Growth OS is a private, local-first content operations tool.

## Data storage

- Task content, drafts, account links, metrics, and notes are stored in browser `localStorage` by default.
- The application does not enable a remote database or object storage by default.
- Browser origins are isolated. Changing the hostname or port creates a separate local storage space.
- JSON backups contain the full workspace and should be handled as internal files.

## Do not commit

- API keys, tokens, passwords, cookies, or voice-clone credentials
- unpublished changelogs, embargoed model information, or partner material
- user prompts, source code, workspace screenshots, or personal information
- local JSON backups, raw recordings, voice files, or private design exports

## Content safety

The built-in checks are editorial guardrails, not security or product approval. Publication still requires confirmation of release status, public scope, claims, media redaction, partner coordination, and final PM approval.

## Reporting a problem

Use a private repository issue without including secrets or confidential source material. Describe the affected workflow, expected behavior, and a minimal sanitized example.
