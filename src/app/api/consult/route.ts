import { sendConsultEmail } from "@/lib/email/consult";
import { hasOversizedBody, isSameOrigin, jsonError } from "@/lib/http";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { consultSchema } from "@/lib/validations/consult";

const MAX_BODY_BYTES = 8_000;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return jsonError("Запрос отклонён.", 403);
  }

  if (hasOversizedBody(request, MAX_BODY_BYTES)) {
    return jsonError("Слишком большое сообщение.", 413);
  }

  const ip = getClientIp(request);
  const limited = rateLimit(`consult:${ip}`, 5, 60 * 60 * 1000);
  if (!limited.ok) {
    return jsonError("Слишком много заявок. Попробуйте позже.", 429, {
      retryAfterSec: limited.retryAfterSec,
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError("Некорректный формат запроса.", 400);
  }

  const parsed = consultSchema.safeParse(payload);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fields[key]) {
        fields[key] = issue.message;
      }
    }
    return jsonError("Проверьте поля формы.", 422, { fields });
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const turnstile = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!turnstile.ok) {
    return jsonError(turnstile.error, 400, {
      fields: { turnstileToken: turnstile.error },
    });
  }

  try {
    await sendConsultEmail(parsed.data);
  } catch (error) {
    console.error("[consult] email failed", error instanceof Error ? error.message : "unknown");
    return jsonError("Не удалось отправить заявку. Попробуйте позже.", 502);
  }

  return Response.json({ ok: true });
}
