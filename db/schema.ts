import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const workspaceState = sqliteTable("workspace_state", {
  id: text("id").primaryKey(),
  payload: text("payload").notNull(),
  revision: integer("revision").notNull().default(1),
  updatedBy: text("updated_by"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const assets = sqliteTable("assets", {
  id: text("id").primaryKey(),
  taskId: text("task_id").notNull(),
  category: text("category").notNull().default("source"),
  fileName: text("file_name").notNull(),
  contentType: text("content_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  objectKey: text("object_key").notNull().unique(),
  isFinal: integer("is_final", { mode: "boolean" }).notNull().default(false),
  uploadedBy: text("uploaded_by"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
