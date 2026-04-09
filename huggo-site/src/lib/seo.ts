import type { Locale } from '../i18n/config';

/**
 * Generates Organization JSON-LD schema for HUGGO.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HUGGO',
    url: 'https://www.huggo.app',
    logo: 'https://www.huggo.app/images/logo-huggo.svg',
    description:
      'HUGGO transforme WhatsApp en canal de vente automatisé pour les commerçants de proximité. Assistant IA, 0% commission, opérationnel en quelques minutes.',
    sameAs: [
      'https://www.linkedin.com/company/huggo-app',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
  };
}

/**
 * Generates WebSite JSON-LD schema.
 */
export function generateWebSiteSchema(locale: Locale) {
  const names: Record<Locale, string> = {
    fr: 'HUGGO — Commande WhatsApp commerçants',
    en: 'HUGGO — WhatsApp Ordering for Retailers',
  };

  const descriptions: Record<Locale, string> = {
    fr: 'Transformez WhatsApp en canal de vente pour votre commerce. Assistant IA 24/7, 0% commission.',
    en: 'Turn WhatsApp into a sales channel for your store. AI assistant 24/7, 0% commission.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: names[locale],
    description: descriptions[locale],
    url: `https://www.huggo.app${locale === 'fr' ? '' : `/${locale}`}`,
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'HUGGO',
    },
  };
}

/**
 * Generates BreadcrumbList JSON-LD schema.
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates Product JSON-LD schema for the HUGGO service.
 */
export function generateProductSchema(locale: Locale) {
  const names: Record<Locale, string> = {
    fr: 'HUGGO — Assistant IA WhatsApp pour commerçants',
    en: 'HUGGO — WhatsApp AI Assistant for Retailers',
  };

  const descriptions: Record<Locale, string> = {
    fr: 'Assistant IA personnalisé sur WhatsApp : commande conversationnelle, panier synchronisé, 0% commission, opérationnel en quelques minutes.',
    en: 'Personalized AI assistant on WhatsApp: conversational ordering, synchronized basket, 0% commission, live in minutes.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: names[locale],
    description: descriptions[locale],
    brand: {
      '@type': 'Brand',
      name: 'HUGGO',
    },
    url: `https://www.huggo.app${locale === 'fr' ? '' : `/${locale}`}`,
    category: 'Software',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://www.huggo.app${locale === 'fr' ? '/tarifs' : '/en/pricing'}`,
    },
  };
}

/**
 * Generates FAQPage JSON-LD schema.
 */
export function generateFAQSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
