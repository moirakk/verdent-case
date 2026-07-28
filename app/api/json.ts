/**
 * Response.json() 默认 Content-Type 是 `application/json`（不带 charset），
 * 浏览器直接打开接口时会猜错编码导致中文乱码。此 helper 在其基础上补上
 * `charset=utf-8`，其余行为与 Response.json 完全一致。
 */
export function json(data: unknown, init?: ResponseInit) {
  const response = Response.json(data, init);
  response.headers.set("content-type", "application/json; charset=utf-8");
  return response;
}
