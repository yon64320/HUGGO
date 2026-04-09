import { defaultLocale, locales, slugs } from './config';
import type { Locale } from './config';

/**
 * Extracts the locale from a URL path.
 * If the first segment is a known locale, returns it; otherwise returns the default locale.
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

// Translation cache to avoid repeated dynamic imports
const translationCache: Record<string, Record<string, unknown>> = {};

/**
 * Loads a translation namespace for a given locale.
 * Uses dynamic imports to load JSON files from the locale directories.
 */
async function loadNamespace(
  locale: Locale,
  namespace: string
): Promise<Record<string, unknown>> {
  const cacheKey = `${locale}/${namespace}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    // Dynamic import of JSON translation files
    const translations = await import(`./${locale}/${namespace}.json`);
    translationCache[cacheKey] = translations.default ?? translations;
    return translationCache[cacheKey];
  } catch {
    console.warn(`Translation file not found: ${locale}/${namespace}.json`);
    return {};
  }
}

/**
 * Translation lookup with dot notation.
 * Example: t('fr', 'common', 'nav.home') returns the French translation for nav.home
 */
export async function t(
  locale: Locale,
  namespace: string,
  key: string
): Promise<string> {
  const translations = await loadNamespace(locale, namespace);
  const keys = key.split('.');
  let result: unknown = translations;

  for (const k of keys) {
    if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation key not found: ${locale}/${namespace}/${key}`);
      return key;
    }
  }

  if (typeof result === 'string') {
    return result;
  }

  console.warn(`Translation key "${key}" did not resolve to a string in ${locale}/${namespace}`);
  return key;
}

/**
 * Builds a localized URL path for a given page.
 * For the default locale (fr), the locale prefix is omitted.
 * Example: getLocalizedPath('en', 'retail') => '/en/retail'
 * Example: getLocalizedPath('fr', 'retail') => '/retail'
 */
export function getLocalizedPath(locale: Locale, page: string): string {
  const slug = slugs[page]?.[locale] ?? page;

  if (!slug) {
    return `/${locale}/`;
  }

  return `/${locale}/${slug}/`;
}

/**
 * Generates alternate links for all locales for a given page.
 * Useful for hreflang meta tags and language switchers.
 */
export function getAlternateLinks(
  currentPage: string
): Array<{ locale: Locale; href: string }> {
  return locales.map((locale) => ({
    locale,
    href: getLocalizedPath(locale, currentPage),
  }));
}
