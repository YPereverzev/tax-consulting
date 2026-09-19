import { Resend } from "resend";
import { ru } from "@/lib/i18n/messages/ru";
import type { ConsultInput } from "@/lib/validations/consult";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml(input: ConsultInput) {
  const labels = ru.form;
  const rows: Array<[string, string]> = [
    [labels.name, input.name],
    [labels.email, input.email],
    [labels.phone, input.phone],
    [labels.clientType, labels.clientTypes[input.clientType]],
    [labels.companySize, labels.companySizes[input.companySize]],
    [labels.topic, labels.topics[input.topic]],
    [labels.message, input.message],
  ];

  const table = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;color:#5c564c;vertical-align:top;width:160px">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;color:#1c1915;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Georgia,serif;background:#f4efe6;padding:24px">
      <table style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #d9d0c3" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:20px 24px;border-bottom:1px solid #d9d0c3">
            <p style="margin:0;letter-spacing:0.16em;text-transform:uppercase;font-size:12px;color:#b45a32">Yuri Dmitriev</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#1c1915">Новая заявка на консультацию</h1>
          </td>
        </tr>
        ${table}
      </table>
    </div>
  `;
}

export async function sendConsultEmail(input: ConsultInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONSULT_TO_EMAIL;
  const labels = ru.form;

  if (!apiKey || !from || !to) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email is not configured");
    }

    console.info("[consult] development fallback, email not sent", {
      name: input.name,
      email: input.email,
      topic: input.topic,
      companySize: input.companySize,
    });
    return { delivered: false as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `Заявка: ${labels.topics[input.topic]} — ${input.name}`,
    html: buildEmailHtml(input),
    text: [
      `${labels.name}: ${input.name}`,
      `${labels.email}: ${input.email}`,
      `${labels.phone}: ${input.phone}`,
      `${labels.clientType}: ${labels.clientTypes[input.clientType]}`,
      `${labels.companySize}: ${labels.companySizes[input.companySize]}`,
      `${labels.topic}: ${labels.topics[input.topic]}`,
      "",
      input.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }

  return { delivered: true as const };
}
