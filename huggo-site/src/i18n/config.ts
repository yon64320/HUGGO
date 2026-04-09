export const defaultLocale = 'fr' as const;
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

// Localized slugs mapping
export const slugs: Record<string, Record<Locale, string>> = {
  home: { fr: '', en: '' },
  retail: { fr: 'retail', en: 'retail' },
  franchise: { fr: 'franchise', en: 'franchise' },
  collectivity: { fr: 'collectivite', en: 'collectivity' },
  'how-it-works': { fr: 'comment-ca-marche', en: 'how-it-works' },
  pricing: { fr: 'tarifs', en: 'pricing' },
  about: { fr: 'a-propos', en: 'about' },
  contact: { fr: 'contact', en: 'contact' },
};
