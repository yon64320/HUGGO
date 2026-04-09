import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitForm } from '../../lib/form';
import type { FormData as SubmitFormData } from '../../lib/form';

/* -----------------------------------------------------------------------
   Bilingual labels (kept inline to avoid an async i18n dependency in a
   client-only React island)
   ----------------------------------------------------------------------- */

const labels = {
  fr: {
    name: 'Nom',
    namePlaceholder: 'Votre nom complet',
    company: 'Entreprise',
    companyPlaceholder: 'Nom de votre entreprise',
    email: 'Email',
    emailPlaceholder: 'vous@exemple.fr',
    phone: 'Téléphone',
    phonePlaceholder: '+33 6 12 34 56 78',
    message: 'Message',
    messagePlaceholder: 'Comment pouvons-nous vous aider ?',
    commerceType: 'Type de commerce',
    commerceTypePlaceholder: 'Sélectionnez un type',
    commerceTypes: {
      bakery: 'Boulangerie',
      restaurant: 'Restaurant',
      retail: 'Commerce de détail',
      other: 'Autre',
    },
    networkSize: 'Taille du réseau',
    networkSizePlaceholder: 'Nombre de points de vente',
    networkSizes: {
      '1-5': '1 à 5 points de vente',
      '6-20': '6 à 20 points de vente',
      '21-50': '21 à 50 points de vente',
      '50+': 'Plus de 50 points de vente',
    },
    submit: 'Envoyer',
    submitting: 'Envoi en cours...',
    successTitle: 'Message envoyé !',
    successMessage:
      'Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.',
    errorTitle: 'Erreur',
    errorMessage:
      "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
    required: 'Ce champ est requis',
    invalidEmail: 'Adresse email invalide',
    sendAnother: 'Envoyer un autre message',
  },
  en: {
    name: 'Name',
    namePlaceholder: 'Your full name',
    company: 'Company',
    companyPlaceholder: 'Your company name',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    phone: 'Phone',
    phonePlaceholder: '+33 6 12 34 56 78',
    message: 'Message',
    messagePlaceholder: 'How can we help you?',
    commerceType: 'Commerce type',
    commerceTypePlaceholder: 'Select a type',
    commerceTypes: {
      bakery: 'Bakery',
      restaurant: 'Restaurant',
      retail: 'Retail',
      other: 'Other',
    },
    networkSize: 'Network size',
    networkSizePlaceholder: 'Number of locations',
    networkSizes: {
      '1-5': '1 to 5 locations',
      '6-20': '6 to 20 locations',
      '21-50': '21 to 50 locations',
      '50+': 'More than 50 locations',
    },
    submit: 'Send',
    submitting: 'Sending...',
    successTitle: 'Message sent!',
    successMessage:
      'Thank you for your message. Our team will get back to you shortly.',
    errorTitle: 'Error',
    errorMessage: 'Something went wrong. Please try again.',
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    sendAnother: 'Send another message',
  },
} as const;

/* -----------------------------------------------------------------------
   Types
   ----------------------------------------------------------------------- */

interface FormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  commerceType?: string;
  networkSize?: string;
  /** Honeypot — hidden from real users */
  website: string;
}

interface Props {
  locale: 'fr' | 'en';
  formType: 'merchant' | 'distributor';
}

/* -----------------------------------------------------------------------
   Component
   ----------------------------------------------------------------------- */

export default function ContactForm({ locale, formType }: Props) {
  const t = labels[locale];
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      commerceType: '',
      networkSize: '',
      website: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Honeypot check — bots will fill the hidden field
    if (values.website) {
      // Silently pretend success
      setStatus('success');
      return;
    }

    setStatus('submitting');

    const payload: SubmitFormData = {
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      message: values.message || undefined,
      type: formType,
    };

    if (formType === 'merchant' && values.commerceType) {
      payload.commerceType = values.commerceType;
    }
    if (formType === 'distributor' && values.networkSize) {
      payload.networkSize = values.networkSize;
    }

    const result = await submitForm(payload);

    if (result.success) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
    }
  };

  /* -- Success state -- */
  if (status === 'success') {
    return (
      <div
        className="rounded-2xl border border-green-primary/20 bg-green-primary/5 p-8 text-center"
        role="alert"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-primary/10">
          <svg
            className="h-8 w-8 text-green-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
          {t.successTitle}
        </h3>
        <p className="mb-6 text-[var(--text-secondary)]">{t.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="inline-flex items-center rounded-lg bg-green-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-primary"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  /* -- Shared input classes -- */
  const inputBase =
    'w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 transition focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 focus:outline-none';
  const errorInput = 'border-red-500 focus:border-red-500 focus:ring-red-500/20';
  const labelClass = 'mb-1.5 block text-sm font-medium text-[var(--text-primary)]';
  const errorMsg = 'mt-1 text-xs text-red-500';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      {/* Honeypot — visually hidden, tab-unreachable */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register('website')}
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          {t.name} <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder={t.namePlaceholder}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={`${inputBase} ${errors.name ? errorInput : ''}`}
          {...register('name', { required: t.required })}
        />
        {errors.name && (
          <p id="contact-name-error" className={errorMsg} role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="contact-company" className={labelClass}>
          {t.company} <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-company"
          type="text"
          placeholder={t.companyPlaceholder}
          aria-required="true"
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? 'contact-company-error' : undefined}
          className={`${inputBase} ${errors.company ? errorInput : ''}`}
          {...register('company', { required: t.required })}
        />
        {errors.company && (
          <p id="contact-company-error" className={errorMsg} role="alert">
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          {t.email} <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder={t.emailPlaceholder}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={`${inputBase} ${errors.email ? errorInput : ''}`}
          {...register('email', {
            required: t.required,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t.invalidEmail,
            },
          })}
        />
        {errors.email && (
          <p id="contact-email-error" className={errorMsg} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          {t.phone} <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          placeholder={t.phonePlaceholder}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          className={`${inputBase} ${errors.phone ? errorInput : ''}`}
          {...register('phone', { required: t.required })}
        />
        {errors.phone && (
          <p id="contact-phone-error" className={errorMsg} role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Merchant-specific: Commerce type */}
      {formType === 'merchant' && (
        <div>
          <label htmlFor="contact-commerce-type" className={labelClass}>
            {t.commerceType}
          </label>
          <select
            id="contact-commerce-type"
            className={inputBase}
            {...register('commerceType')}
          >
            <option value="">{t.commerceTypePlaceholder}</option>
            {Object.entries(t.commerceTypes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Distributor-specific: Network size */}
      {formType === 'distributor' && (
        <div>
          <label htmlFor="contact-network-size" className={labelClass}>
            {t.networkSize}
          </label>
          <select
            id="contact-network-size"
            className={inputBase}
            {...register('networkSize')}
          >
            <option value="">{t.networkSizePlaceholder}</option>
            {Object.entries(t.networkSizes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t.message}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder={t.messagePlaceholder}
          className={inputBase}
          {...register('message')}
        />
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div
          className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          <strong>{t.errorTitle}:</strong> {t.errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' && (
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {status === 'submitting' ? t.submitting : t.submit}
      </button>
    </form>
  );
}
