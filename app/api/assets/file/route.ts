import { env } from "cloudflare:workers";

export async function GET(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) {
      return Response.json({ error: "id is required" }, { status: 400 });
    }

    const row = await env.DB.prepare(`
      SELECT object_key, file_name, content_type
      FROM assets
      WHERE id = ?
    `)
      .bind(id)
      .first<{
        object_key: string;
        file_name: string;
        content_type: string;
      }>();

    if (!row) {
      return Response.json({ error: "Asset not found" }, { status: 404 });
    }

    const object = await env.FILES.get(row.object_key);
    if (!object) {
      return Response.json({ error: "Asset file not found" }, { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("content-type", row.content_type);
    headers.set(
      "content-disposition",
      `inline; filename*=UTF-8''${encodeURIComponent(row.file_name)}`,
    );
    headers.set("etag", object.httpEtag);
    headers.set("cache-control", "private, max-age=300");
    return new Response(object.body, { headers });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to read asset" },
      { status: 500 },
    );
  }
}
