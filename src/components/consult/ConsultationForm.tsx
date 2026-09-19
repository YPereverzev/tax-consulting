"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { useForm } from "react-hook-form";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import {
  consultFieldOrder,
  createConsultSchema,
  type ConsultInput,
} from "@/lib/validations/consult";

const fieldClass =
  "min-h-12 w-full border border-line bg-white px-3 text-ink outline-none transition-colors placeholder:text-ink-muted/70";
const labelClass = "text-sm font-medium text-ink";
const errorClass = "text-sm text-copper";

function focusFormErrors() {
  document.getElementById("form-errors")?.focus();
}

type ApiSuccess = { ok: true };
type ApiError = {
  ok: false;
  error: string;
  fields?: Partial<Record<keyof ConsultInput, string>>;
};

export function ConsultationForm({
  nonce,
  locale,
  dict,
  privacyHref,
}: {
  nonce?: string;
  locale: Locale;
  dict: Dictionary["form"];
  privacyHref: string;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const schema = createConsultSchema(dict.errors);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ConsultInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: undefined,
      turnstileToken: "",
      website: "",
      locale,
    },
  });

  const errorEntries = consultFieldOrder
    .map((field) => (errors[field]?.message ? [field, errors[field]?.message] : null))
    .filter((entry): entry is [keyof ConsultInput, string] => Boolean(entry));

  async function onSubmit(values: ConsultInput) {
    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      const data = (await response.json()) as ApiSuccess | ApiError;

      if (!response.ok || !data.ok) {
        const failed = data as ApiError;
        if (failed.fields) {
          for (const [field, message] of Object.entries(failed.fields)) {
            setError(field as keyof ConsultInput, { type: "server", message });
          }
        }
        setError("root", {
          type: "server",
          message: failed.error || dict.genericError,
        });
        queueMicrotask(() => focusFormErrors());
        return;
      }

      reset({ locale });
    } catch {
      setError("root", {
        type: "server",
        message: dict.networkError,
      });
      queueMicrotask(() => focusFormErrors());
    }
  }

  function onInvalid() {
    queueMicrotask(() => focusFormErrors());
  }

  if (isSubmitSuccessful) {
    return (
      <div
        className="border border-line bg-white px-6 py-10"
        role="status"
        aria-live="polite"
      >
        <p className="text-xs tracking-[0.18em] text-copper uppercase">
          {dict.successKicker}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-ink">{dict.successTitle}</h2>
        <p className="mt-4 max-w-xl text-ink-muted leading-7">{dict.successText}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="border border-line bg-white p-5 sm:p-8"
      aria-describedby={errorEntries.length || errors.root ? "form-errors" : undefined}
    >
      {errorEntries.length > 0 || errors.root ? (
        <div
          id="form-errors"
          tabIndex={-1}
          className="mb-6 border border-copper/40 bg-copper/5 px-4 py-3"
          role="alert"
        >
          <p className="font-medium text-ink">{dict.checkForm}</p>
          {errors.root?.message ? (
            <p className="mt-2 text-sm text-copper">{errors.root.message}</p>
          ) : (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a className="text-copper underline" href={`#field-${field}`}>
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}

      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id="name"
          label={dict.name}
          error={errors.name?.message}
        >
          <input
            id="field-name"
            className={fieldClass}
            autoComplete="name"
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
          />
        </Field>

        <Field id="email" label={dict.email} error={errors.email?.message}>
          <input
            id="field-email"
            className={fieldClass}
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
          />
        </Field>

        <Field id="phone" label={dict.phone} error={errors.phone?.message}>
          <input
            id="field-phone"
            className={fieldClass}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={dict.phonePlaceholder}
            {...register("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "error-phone" : undefined}
          />
        </Field>

        <Field
          id="clientType"
          label={dict.clientType}
          error={errors.clientType?.message}
        >
          <select
            id="field-clientType"
            className={fieldClass}
            defaultValue=""
            {...register("clientType")}
            aria-invalid={Boolean(errors.clientType)}
            aria-describedby={errors.clientType ? "error-clientType" : undefined}
          >
            <option value="" disabled>
              {dict.select}
            </option>
            {Object.entries(dict.clientTypes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field
          id="companySize"
          label={dict.companySize}
          error={errors.companySize?.message}
        >
          <select
            id="field-companySize"
            className={fieldClass}
            defaultValue=""
            {...register("companySize")}
            aria-invalid={Boolean(errors.companySize)}
            aria-describedby={errors.companySize ? "error-companySize" : undefined}
          >
            <option value="" disabled>
              {dict.select}
            </option>
            {Object.entries(dict.companySizes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="topic" label={dict.topic} error={errors.topic?.message}>
          <select
            id="field-topic"
            className={fieldClass}
            defaultValue=""
            {...register("topic")}
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? "error-topic" : undefined}
          >
            <option value="" disabled>
              {dict.select}
            </option>
            {Object.entries(dict.topics).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field id="message" label={dict.message} error={errors.message?.message} hint={dict.messageHint}>
          <textarea
            id="field-message"
            className={`${fieldClass} min-h-36 py-3`}
            {...register("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : "hint-message"}
          />
        </Field>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="field-consent"
          className="mt-1 h-5 w-5 accent-forest"
          type="checkbox"
          {...register("consent")}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "error-consent" : undefined}
        />
        <label htmlFor="field-consent" className="text-sm leading-6 text-ink">
          {dict.consentBefore}
          <a className="underline decoration-copper underline-offset-4" href={privacyHref}>
            {dict.consentLink}
          </a>
          {dict.consentAfter}
        </label>
      </div>
      {errors.consent ? (
        <p id="error-consent" className={`mt-2 ${errorClass}`}>
          {errors.consent.message}
        </p>
      ) : null}

      <div className="mt-6" id="field-turnstileToken">
        {siteKey ? (
          <Turnstile
            siteKey={siteKey}
            options={{ theme: "light", language: locale, appearance: "always" }}
            scriptOptions={nonce ? { nonce } : undefined}
            onSuccess={(token) =>
              setValue("turnstileToken", token, { shouldValidate: true })
            }
            onExpire={() => setValue("turnstileToken", "")}
            onError={() => setValue("turnstileToken", "")}
            aria-label={dict.turnstile}
          />
        ) : (
          <p className="text-sm text-copper">{dict.turnstileMissing}</p>
        )}
        <input type="hidden" {...register("turnstileToken")} />
        {errors.turnstileToken ? (
          <p className={`mt-2 ${errorClass}`}>{errors.turnstileToken.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex min-h-12 min-w-48 items-center justify-center bg-forest px-6 text-sm font-medium text-paper hover:bg-forest-hover disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? dict.submitting : dict.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className={labelClass} htmlFor={`field-${id}`}>
        {label}
      </label>
      {children}
      {hint ? (
        <p id="hint-message" className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`error-${id}`} className={errorClass}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
