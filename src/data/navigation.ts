import type { Locale } from '@i18n/config';

export interface NavItem {
  key: string;
  label: Record<Locale, string>;
  href: Record<Locale, string>;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    key: 'offers',
    label: { fr: 'Offres', en: 'Solutions' },
    href: { fr: '#', en: '#' },
    children: [
      {
        key: 'retail',
        label: { fr: 'Retail', en: 'Retail' },
        href: { fr: '/fr/retail', en: '/en/retail' },
      },
      {
        key: 'franchise',
        label: { fr: 'Franchise', en: 'Franchise' },
        href: { fr: '/fr/franchise', en: '/en/franchise' },
      },
      {
        key: 'collectivity',
        label: { fr: 'Collectivit\u00E9', en: 'Collectivity' },
        href: { fr: '/fr/collectivite', en: '/en/collectivity' },
      },
    ],
  },
  {
    key: 'how-it-works',
    label: { fr: 'Comment \u00E7a marche', en: 'How it works' },
    href: { fr: '/fr/comment-ca-marche', en: '/en/how-it-works' },
  },
  {
    key: 'pricing',
    label: { fr: 'Tarifs', en: 'Pricing' },
    href: { fr: '/fr/tarifs', en: '/en/pricing' },
  },
  {
    key: 'about',
    label: { fr: '\u00C0 propos', en: 'About' },
    href: { fr: '/fr/a-propos', en: '/en/about' },
  },
  {
    key: 'contact',
    label: { fr: 'Contact', en: 'Contact' },
    href: { fr: '/fr/contact', en: '/en/contact' },
  },
];

export const legalNav: NavItem[] = [
  {
    key: 'privacy',
    label: { fr: 'Politique de confidentialit\u00E9', en: 'Privacy policy' },
    href: { fr: '/fr/mentions-legales', en: '/en/privacy-policy' },
  },
  {
    key: 'terms',
    label: { fr: 'CGU', en: 'Terms of use' },
    href: { fr: '/fr/cgu', en: '/en/terms' },
  },
  {
    key: 'cookies',
    label: { fr: 'Cookies', en: 'Cookies' },
    href: { fr: '/fr/cookies', en: '/en/cookies' },
  },
];
