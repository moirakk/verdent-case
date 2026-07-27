import { env } from "cloudflare:workers";

const MAX_FILE_BYTES = 100 * 1024 * 1024;
const validCategories = new Set([
  "source",
  "brief",
  "design",
  "final-image",
  "video-source",
  "published",
]);

async function ensureSchema() {
  await env.DB.batch([
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS assets (
        id TEXT PRIMARY KEY NOT NULL,
        task_id TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'source',
        file_name TEXT NOT NULL,
        content_type TEXT NOT NULL,
        size_bytes INTEGER NOT NULL,
        object_key TEXT NOT NULL UNIQUE,
        is_final INTEGER NOT NULL DEFAULT 0,
        uploaded_by TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `),
    env.DB.prepare(`
      CREATE INDEX IF NOT EXISTS assets_task_id_idx ON assets(task_id)
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

function cleanFileName(value: string) {
  const normalized = value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}._ -]+/gu, "-")
    .replace(/\s+/g, "-")
    .slice(0, 120);
  return normalized || "asset";
}

export async function GET(request: Request) {
  try {
    const taskId = new URL(request.url).searchParams.get("taskId")?.trim();
    if (!taskId) {
      return Response.json({ error: "taskId is required" }, { status: 400 });
    }

    await ensureSchema();
    const result = await env.DB.prepare(`
      SELECT
        id,
        task_id AS taskId,
        category,
        file_name AS fileName,
        content_type AS contentType,
        size_bytes AS sizeBytes,
        is_final AS isFinal,
        uploaded_by AS uploadedBy,
        created_at AS createdAt
      FROM assets
      WHERE task_id = ?
      ORDER BY created_at DESC
    `)
      .bind(taskId)
      .all();

    return Response.json({ assets: result.results });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to load assets" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const taskId = String(form.get("taskId") ?? "").trim();
    const requestedCategory = String(form.get("category") ?? "source");
    const category = validCategories.has(requestedCategory)
      ? requestedCategory
      : "source";

    if (!(file instanceof File) || !taskId) {
      return Response.json(
        { error: "taskId and file are required" },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_BYTES) {
      return Response.json(
        { error: "File exceeds the 100 MB upload limit" },
        { status: 413 },
      );
    }

    await ensureSchema();
    const id = crypto.randomUUID();
    const objectKey = `${taskId}/${id}-${cleanFileName(file.name)}`;
    await env.FILES.put(objectKey, file.stream(), {
      httpMetadata: { contentType: file.type || "application/octet-stream" },
      customMetadata: { taskId, category },
    });

    try {
      await env.DB.prepare(`
        INSERT INTO assets (
          id, task_id, category, file_name, content_type, size_bytes,
          object_key, is_final, uploaded_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
      `)
        .bind(
          id,
          taskId,
          category,
          file.name,
          file.type || "application/octet-stream",
          file.size,
          objectKey,
          actorFrom(request),
        )
        .run();
    } catch (error) {
      await env.FILES.delete(objectKey);
      throw error;
    }

    return Response.json(
      {
        asset: {
          id,
          taskId,
          category,
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          sizeBytes: file.size,
          isFinal: false,
          uploadedBy: actorFrom(request),
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to upload asset" },
      { status: 500 },
    );
  }
}
