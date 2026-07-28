import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";

export async function GET(request: Request) {
  try {
    const user = await getChatGPTUser();
    if (!user) {
      return Response.json(
        { error: "未登录，请先通过 ChatGPT 认证" },
        { status: 401 },
      );
    }
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) {
      return Response.json({ error: "id is required" }, { status: 400 });
    }

    const row = await env.DB.prepare(`
      SELECT object_key, file_name, content_type, size_bytes
      FROM assets
      WHERE id = ?
    `)
      .bind(id)
      .first<{
        object_key: string;
        file_name: string;
        content_type: string;
        size_bytes: number;
      }>();

    if (!row) {
      return Response.json({ error: "Asset not found" }, { status: 404 });
    }

    const headers = new Headers();
    headers.set("content-type", row.content_type);
    headers.set("content-length", String(row.size_bytes));
    headers.set(
      "content-disposition",
      `inline; filename*=UTF-8''${encodeURIComponent(row.file_name)}`,
    );
    headers.set("cache-control", "private, max-age=300");

    if (row.object_key.startsWith("chunked|")) {
      const [, prefix, countValue] = row.object_key.split("|");
      const chunkCount = Number(countValue);
      if (!prefix || !Number.isInteger(chunkCount) || chunkCount < 1) {
        return Response.json({ error: "Invalid chunked asset metadata" }, { status: 500 });
      }
      let chunkIndex = 0;
      const stream = new ReadableStream<Uint8Array>({
        async pull(controller) {
          if (chunkIndex >= chunkCount) {
            controller.close();
            return;
          }
          const object = await env.FILES.get(`${prefix}/chunk-${chunkIndex}`);
          if (!object) {
            controller.error(new Error(`Asset chunk ${chunkIndex} not found`));
            return;
          }
          controller.enqueue(new Uint8Array(await object.arrayBuffer()));
          chunkIndex += 1;
        },
      });
      headers.set("etag", `"${row.object_key.replace(/[^a-z0-9]/gi, "-")}"`);
      return new Response(stream, { headers });
    }

    const object = await env.FILES.get(row.object_key);
    if (!object) {
      return Response.json({ error: "Asset file not found" }, { status: 404 });
    }
    object.writeHttpMetadata(headers);
    headers.set("content-type", row.content_type);
    headers.set("content-length", String(row.size_bytes));
    headers.set("etag", object.httpEtag);
    return new Response(object.body, { headers });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to read asset" },
      { status: 500 },
    );
  }
}
