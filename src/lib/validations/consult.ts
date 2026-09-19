import { z } from "zod";
import type { Dictionary } from "@/lib/i18n/dictionary";

export const clientTypes = ["einzel", "gmbh", "other"] as const;
export const companySizes = ["1-4", "5-50", "51-500"] as const;
export const topics = [
  "declaration",
  "regime",
  "audit",
  "planning",
  "other",
] as const;

const phoneDigits = /^\+?[0-9][\d\s()/.-]{7,19}$/;

export function createConsultSchema(errors: Dictionary["form"]["errors"]) {
  return z.object({
    name: z.string().trim().min(2, errors.name).max(80, errors.name),
    email: z.string().trim().pipe(z.email(errors.email)),
    phone: z
      .string()
      .trim()
      .min(8, errors.phone)
      .max(20, errors.phone)
      .regex(phoneDigits, errors.phone),
    clientType: z.enum(clientTypes, { error: errors.clientType }),
    companySize: z.enum(companySizes, { error: errors.companySize }),
    topic: z.enum(topics, { error: errors.topic }),
    message: z.string().trim().min(20, errors.message).max(2000, errors.message),
    consent: z.literal(true, { error: errors.consent }),
    turnstileToken: z.string().min(1, errors.turnstileToken),
    website: z.string().max(200).optional(),
    locale: z.enum(["ru", "de"]).optional(),
  });
}

export const consultSchema = createConsultSchema({
  name: "Name",
  email: "Email",
  phone: "Phone",
  clientType: "Client type",
  companySize: "Company size",
  topic: "Topic",
  message: "Message",
  consent: "Consent",
  turnstileToken: "Turnstile",
});

export type ConsultInput = z.infer<typeof consultSchema>;

export const consultFieldOrder = [
  "name",
  "email",
  "phone",
  "clientType",
  "companySize",
  "topic",
  "message",
  "consent",
  "turnstileToken",
] as const;
