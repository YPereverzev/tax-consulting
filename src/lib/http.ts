export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function jsonError(
  error: string,
  status: number,
  extra?: Record<string, unknown>,
) {
  return Response.json({ ok: false, error, ...extra }, { status });
}

export function hasOversizedBody(request: Request, maxBytes: number) {
  const length = request.headers.get("content-length");
  if (!length) return false;
  const size = Number(length);
  return Number.isFinite(size) && size > maxBytes;
}
