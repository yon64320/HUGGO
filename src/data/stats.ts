export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: Record<'fr' | 'en', string>;
}

export const stats: Stat[] = [
  {
    value: 15,
    suffix: 'M',
    label: {
      fr: 'de commandes traitées',
      en: 'orders processed',
    },
  },
  {
    value: 30,
    suffix: '%',
    prefix: '+15 à +',
    label: {
      fr: 'de panier moyen vs app mobile',
      en: 'average basket vs mobile app',
    },
  },
  {
    value: 60,
    suffix: '%',
    label: {
      fr: 'de clientèle digitalisée en 3 mois',
      en: 'customer base digitized in 3 months',
    },
  },
  {
    value: 0,
    suffix: '%',
    label: {
      fr: 'de commission sur vos ventes',
      en: 'commission on your sales',
    },
  },
];
