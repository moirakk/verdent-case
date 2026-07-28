import { env } from "cloudflare:workers";
import { json } from "@/app/api/json";

const WORKSPACE_ID = "verdent-primary";
const MAX_PAYLOAD_BYTES = 8 * 1024 * 1024;

type WorkspacePayload = {
  version: number;
  tasks: unknown[];
  accounts: unknown[];
};

async function ensureSchema() {
  await env.DB.batch([
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS workspace_state (
        id TEXT PRIMARY KEY NOT NULL,
        payload TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        updated_by TEXT,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `),
    env.DB.prepare(`
      CREATE INDEX IF NOT EXISTS workspace_state_updated_at_idx
      ON workspace_state(updated_at)
    `),
  ]);
}

function actorFrom(request: Request) {
  return (
    request.headers.get("x-verdent-user-email") ??
    request.headers.get("oai-authenticated-user-email") ??
    "workspace-owner"
  );
}

function isWorkspacePayload(value: unknown): value is WorkspacePayload {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<WorkspacePayload>;
  return (
    typeof candidate.version === "number" &&
    Array.isArray(candidate.tasks) &&
    Array.isArray(candidate.accounts)
  );
}

export async function GET() {
  try {
    await ensureSchema();
    const row = await env.DB.prepare(
      "SELECT payload, revision, updated_by, updated_at FROM workspace_state WHERE id = ?",
    )
      .bind(WORKSPACE_ID)
      .first<{
        payload: string;
        revision: number;
        updated_by: string | null;
        updated_at: string;
      }>();

    if (!row) {
      return json({
        workspace: null,
        revision: 0,
        updatedAt: null,
        updatedBy: null,
      });
    }

    return json({
      workspace: JSON.parse(row.payload),
      revision: row.revision,
      updatedAt: row.updated_at,
      updatedBy: row.updated_by,
    });
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load the cloud workspace",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as {
      workspace?: unknown;
      baseRevision?: number;
    };
    if (!isWorkspacePayload(body.workspace)) {
      return json(
        { error: "Invalid workspace payload" },
        { status: 400 },
      );
    }

    const payload = JSON.stringify(body.workspace);
    if (new TextEncoder().encode(payload).byteLength > MAX_PAYLOAD_BYTES) {
      return json(
        { error: "Workspace data is too large" },
        { status: 413 },
      );
    }

    await ensureSchema();
    const current = await env.DB.prepare(
      "SELECT revision FROM workspace_state WHERE id = ?",
    )
      .bind(WORKSPACE_ID)
      .first<{ revision: number }>();
    const currentRevision = current?.revision ?? 0;
    const baseRevision = body.baseRevision ?? 0;

    if (currentRevision !== baseRevision) {
      return json(
        {
          error: "Workspace changed on another device",
          code: "REVISION_CONFLICT",
          revision: currentRevision,
        },
        { status: 409 },
      );
    }

    const nextRevision = currentRevision + 1;
    const actor = actorFrom(request);
    const writeResult = current
      ? await env.DB.prepare(`
          UPDATE workspace_state
          SET
            payload = ?,
            revision = ?,
            updated_by = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ? AND revision = ?
        `)
          .bind(
            payload,
            nextRevision,
            actor,
            WORKSPACE_ID,
            baseRevision,
          )
          .run()
      : await env.DB.prepare(`
          INSERT OR IGNORE INTO workspace_state (
            id, payload, revision, updated_by, updated_at
          ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        `)
          .bind(
            WORKSPACE_ID,
            payload,
            nextRevision,
            actor,
          )
          .run();

    if (writeResult.meta.changes !== 1) {
      const latest = await env.DB.prepare(
        "SELECT revision FROM workspace_state WHERE id = ?",
      )
        .bind(WORKSPACE_ID)
        .first<{ revision: number }>();
      return json(
        {
          error: "Workspace changed on another device",
          code: "REVISION_CONFLICT",
          revision: latest?.revision ?? currentRevision,
        },
        { status: 409 },
      );
    }

    return json({
      ok: true,
      revision: nextRevision,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save the cloud workspace",
      },
      { status: 500 },
    );
  }
}
