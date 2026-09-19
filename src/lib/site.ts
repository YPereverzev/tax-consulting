export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH || process.env.PAGES_BASE_PATH || "";
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function getContactEmail() {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined;
}

export function getContactPhone() {
  return process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || undefined;
}
