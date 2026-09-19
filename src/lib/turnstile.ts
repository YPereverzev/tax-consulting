type TurnstileResult =
  | { ok: true }
  | { ok: false; error: string };

export async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { ok: false, error: "Проверка антиспама не настроена." };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip !== "unknown") {
    body.set("remoteip", ip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  if (!response.ok) {
    return { ok: false, error: "Не удалось проверить антиспам. Попробуйте ещё раз." };
  }

  const data = (await response.json()) as { success?: boolean };

  if (!data.success) {
    return { ok: false, error: "Подтвердите, что вы не робот, и отправьте форму снова." };
  }

  return { ok: true };
}
