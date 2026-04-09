export interface PricingFeature {
  name: Record<'fr' | 'en', string>;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: Record<'fr' | 'en', string>;
  description: Record<'fr' | 'en', string>;
  features: PricingFeature[];
  highlighted?: boolean; // for the "popular" tier
  cta: Record<'fr' | 'en', string>;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'essentiel',
    name: { fr: 'Essentiel', en: 'Essentials' },
    description: {
      fr: "L'indispensable pour vendre sur WhatsApp.",
      en: 'Everything you need to sell on WhatsApp.',
    },
    features: [
      {
        name: { fr: 'Commande conversationnelle par WhatsApp', en: 'Conversational ordering via WhatsApp' },
        included: true,
      },
      {
        name: { fr: 'Panier et paiement intégré (Contodeo)', en: 'Integrated basket and payment (Contodeo)' },
        included: true,
      },
      {
        name: { fr: 'QR code Click & Collect', en: 'QR code Click & Collect' },
        included: true,
      },
      {
        name: { fr: 'Suivi de commande en temps réel', en: 'Real-time order tracking' },
        included: true,
      },
      {
        name: { fr: 'Historique des commandes', en: 'Order history' },
        included: true,
      },
      {
        name: { fr: 'Fiches clients automatiques', en: 'Automatic customer profiles' },
        included: true,
      },
    ],
    cta: { fr: 'Demander un devis', en: 'Request a quote' },
  },
  {
    id: 'smart',
    name: { fr: 'Smart', en: 'Smart' },
    description: {
      fr: "L'intelligence qui fait la différence.",
      en: 'The intelligence that makes the difference.',
    },
    highlighted: true,
    features: [
      {
        name: { fr: 'Tout le palier Essentiel', en: 'Everything in Essentials' },
        included: true,
      },
      {
        name: { fr: 'Recommandations produits (vente additionnelle et croisée)', en: 'Product recommendations (upsell and cross-sell)' },
        included: true,
      },
      {
        name: { fr: 'Mémoire client : "Comme d\'habitude ?" en un message', en: 'Customer memory: "The usual?" in one message' },
        included: true,
      },
      {
        name: { fr: 'Push promotions (déstockage, nouveautés)', en: 'Promotional push (clearance, new items)' },
        included: true,
      },
      {
        name: { fr: 'Relance automatique des paniers abandonnés', en: 'Automatic abandoned cart follow-up' },
        included: true,
      },
    ],
    cta: { fr: 'Demander un devis', en: 'Request a quote' },
  },
  {
    id: 'marketing',
    name: { fr: 'Marketing', en: 'Marketing' },
    description: {
      fr: 'Anticipez la demande. Ciblez vos clients.',
      en: 'Anticipate demand. Target your customers.',
    },
    features: [
      {
        name: { fr: 'Tout le palier Smart', en: 'Everything in Smart' },
        included: true,
      },
      {
        name: { fr: 'Bannières publicitaires générées par IA', en: 'AI-generated promotional banners' },
        included: true,
      },
      {
        name: { fr: 'Modèle prédictif : croisement météo et événements locaux', en: 'Predictive model: weather + local event crossover' },
        included: true,
      },
      {
        name: { fr: "Ciblage client par comportement d'achat", en: 'Customer targeting by purchase behavior' },
        included: true,
      },
      {
        name: { fr: "Demande automatique d'avis Google", en: 'Automatic Google review request' },
        included: true,
      },
    ],
    cta: { fr: 'Demander un devis', en: 'Request a quote' },
  },
  {
    id: 'analytics',
    name: { fr: 'Analytics (add-on)', en: 'Analytics (add-on)' },
    description: {
      fr: 'Les données pour piloter.',
      en: 'The data to steer.',
    },
    features: [
      {
        name: { fr: "Chiffre d'affaires détaillé par canal HUGGO", en: 'Detailed revenue by HUGGO channel' },
        included: true,
      },
      {
        name: { fr: 'Panier moyen et taux de conversion', en: 'Average basket and conversion rate' },
        included: true,
      },
      {
        name: { fr: 'Heures de commande (optimisation planning)', en: 'Order hours (planning optimization)' },
        included: true,
      },
      {
        name: { fr: 'Performance des campagnes promotionnelles', en: 'Campaign performance' },
        included: true,
      },
      {
        name: { fr: 'Recommandations de mise en avant produits', en: 'Product promotion recommendations' },
        included: true,
      },
    ],
    cta: { fr: 'Demander un devis', en: 'Request a quote' },
  },
];
