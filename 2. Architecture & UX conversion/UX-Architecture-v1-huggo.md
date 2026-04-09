# UX Architecture v1 — HUGGO

> **Projet** : Site vitrine premium HUGGO
> **Version** : v1.0
> **Date** : 2026-04-09
> **Statut** : READY FOR COPY — validation requise avant Gate 3 & Gate 4

---

## A) SITE ARCHITECTURE (Sitemap + Navigation)

### Sitemap v1

```
huggo.{tld}/
├── / (Accueil)
├── /retail
├── /franchise
├── /collectivity
├── /how-it-works (Comment ça marche)
├── /pricing (Tarifs)
├── /about (À propos)
├── /contact (Contact / Démo)
├── /legal (placeholder — hors scope initial)
├── /privacy (placeholder — hors scope initial)
└── /blog (placeholder — hors scope initial, architecture extensible)
```

**Bilingue FR/EN** : chaque page existe en deux versions. Structure d'URL recommandée :

```
huggo.{tld}/fr/         →  Accueil FR
huggo.{tld}/en/         →  Home EN
huggo.{tld}/fr/retail   →  Retail FR
huggo.{tld}/en/retail   →  Retail EN
…etc.
```

La langue par défaut est le français (`/fr/`). Le basculement FR/EN est accessible depuis la navigation globale (toggle ou dropdown, jamais un menu déroulant profond). Chaque page pointe vers sa version miroir via `hreflang`.

### Rôle de chaque page

| Page | Rôle | KPI principal |
|------|------|--------------|
| **Accueil** | Convert + Orient | Taux de clic CTA "Demander une démo" depuis la page d'accueil |
| **Retail** | Convince | Taux de navigation Retail → Tarifs ou Retail → Contact |
| **Franchise** | Convince | Taux de soumission formulaire "Contact commercial" depuis cette page |
| **Collectivity** | Convince | Taux de soumission formulaire "Contact commercial" depuis cette page |
| **Comment ça marche** | Inform + Clarify | Scroll > 75% (compréhension produit) + taux de sortie vers Tarifs/Contact |
| **Tarifs** | Convert | Taux de clic CTA "Demander un devis" |
| **À propos** | Reassure | Temps passé sur page + taux de navigation vers Contact |
| **Contact / Démo** | Convert | Taux de soumission formulaire (KPI primaire du site : 50 démos/mois) |

### Principes de navigation

**Header (sticky, toutes pages)** :

- Logo HUGGO (lien accueil)
- Liens principaux : Retail · Franchise · Collectivity · Comment ça marche · Tarifs · À propos
- CTA "Demander une démo" (bouton primaire, toujours visible)
- Toggle FR/EN
- Pas de mega-menu, pas de dropdown : navigation plate à 1 niveau

**Mobile** : hamburger menu → même structure, CTA "Demander une démo" toujours visible hors menu.

**Footer (toutes pages)** :

- Logo HUGGO
- Liens : toutes les pages + Contact + Mentions légales (placeholder) + Politique de confidentialité (placeholder)
- Mention "HUGGO, filiale d'Atidgo" (texte discret, pas de logo Atidgo)
- Coordonnées (email, téléphone — `[À FOURNIR]`)
- Bouton WhatsApp (rappel du flottant)

**Ce qui est masqué** :

- Blog (pas dans le scope, lien ajouté quand le blog existe)
- Espace client / dashboard (hors périmètre)
- Toute référence à Events
- Pages légales tant qu'elles ne sont pas rédigées

**Profondeur max** : 1 niveau. Aucune sous-page. Si du contenu additionnel est nécessaire (ex: case study PDF), il est accessible via téléchargement direct ou ancre sur la page concernée, pas via une sous-page.

### Pages support

| Page | Statut | Note |
|------|--------|------|
| Contact / Démo | Active | Double formulaire : commerçant (démo) + distributeur (contact) |
| Mentions légales | Placeholder | URL réservée, contenu hors scope initial |
| Politique de confidentialité | Placeholder | URL réservée, contenu hors scope initial |
| Blog | Placeholder | URL réservée, architecture extensible, pas de contenu initial |

### Éléments globaux (toutes pages)

| Élément | Comportement |
|---------|-------------|
| **Bouton WhatsApp flottant** | Sticky bas-droite, toutes pages, toutes tailles d'écran. Ouvre WhatsApp avec numéro pré-rempli `[À FOURNIR]`. Z-index supérieur à tout sauf modals. |
| **Header sticky** | Se compacte au scroll (logo + CTA restent visibles). Navigation complète au top, condensée au scroll. |
| **CTA "Demander une démo"** | Présent dans le header (sticky), dans le hero de chaque page, en fin de chaque page (pré-footer CTA band). Minimum 2 occurrences par page. |
| **Toggle langue** | Accessible depuis le header, bascule vers la version miroir de la page courante. |

---

## B) DECISION JOURNEYS

### Parcours primaire — Commerçant individuel

```
ENTRÉE
  │
  ├─ Directe (URL / Google "commande whatsapp commerçant")
  │     → Accueil (hero)
  │
  ├─ SEO (requête verticale "commande whatsapp boulangerie")
  │     → Page verticale (Retail)
  │
  └─ Référence (bouche-à-oreille, partenaire)
        → Accueil ou Contact directement

PARCOURS PRINCIPAL :
  Hero (promesse + bifurcation "Je suis commerçant")
    → Bénéfices chiffrés (0% commission, +15-30% panier, 24/7)
      → Comment ça marche (4 étapes onboarding en quelques minutes)
        → Fonctionnalités par palier (Essentiel → Smart → Marketing → Analytics)
          → Social proof (15M commandes, chiffres adoption, logos partenaires)
            → Tarifs (paliers sans prix, CTA "Demander un devis")
              → Formulaire démo
```

**Durée estimée** : 2-4 pages visitées avant conversion. Le commerçant type est pressé, peu technophile, et décide vite si ça lui parle.

### Parcours primaire — Distributeur / Réseau

```
ENTRÉE
  │
  ├─ Directe (contact commercial, salon, réseau)
  │     → Accueil (hero) ou Franchise/Collectivity
  │
  └─ Recherche proactive ("solution whatsapp réseau franchise")
        → Franchise ou Collectivity

PARCOURS PRINCIPAL :
  Hero (bifurcation "Je suis distributeur/réseau")
    → Chiffres d'impact (15M commandes, 3 distributeurs CHR, scalabilité)
      → Déploiement réseau (multi-points, analytics, gestion centralisée)
        → Verticale pertinente (Franchise ou Collectivity)
          → Formulaire contact commercial dédié
```

**Durée estimée** : 2-3 pages. Le distributeur cherche la preuve de scale et un interlocuteur commercial.

### Parcours alternatifs

| Entrée | Parcours | Sortie attendue |
|--------|----------|----------------|
| Google "commande whatsapp boulangerie" → Retail | Retail → Comment ça marche → Tarifs → Contact | Formulaire démo |
| Google "digitalisation commerce rural" → Collectivity | Collectivity → Comment ça marche → Contact | Formulaire contact |
| Google "huggo" (brand search) → Accueil | Accueil → parcours commerçant OU distributeur | Formulaire démo ou contact |
| Lien partenaire HubRise → Accueil | Accueil → Comment ça marche → Contact | Formulaire démo |
| Bouche-à-oreille → Contact direct | Contact | Formulaire démo (conversion directe) |

### Point de bifurcation

Le hero de la page d'accueil DOIT permettre au visiteur de s'auto-identifier en 3 secondes :

- **Option A (recommandée)** : deux CTA distincts dans le hero — "Je suis commerçant — Demander une démo" (CTA primaire) + "Je suis distributeur/réseau — Nous contacter" (CTA secondaire, style différencié)
- **Option B** : sous-titre orientant + navigation par verticale visible dès le hero (Retail / Franchise / Collectivity)
- **Anti-pattern** : NE PAS forcer un choix binaire en modal ou en page interstitielle. La bifurcation doit être naturelle, pas bloquante.

Le header offre en permanence les deux parcours via les liens Retail (commerçant) et Franchise/Collectivity (distributeur).

### Points de friction identifiés et réductions

| Point de friction | Risque | Réduction |
|-------------------|--------|-----------|
| "C'est quoi exactement ?" — produit mal compris | Le visiteur repart sans comprendre ce que fait HUGGO | Hero = promesse ultra-claire (1 phrase) + visuel smartphone 3D montrant une conversation WhatsApp. Section "Comment ça marche" accessible en 1 clic depuis le hero. |
| "C'est pour moi ou pas ?" — doute sur la cible | Le commerçant ne se reconnaît pas, le distributeur cherche une entrée pro | Bifurcation visible dans le hero. Verticales dans la navigation. Chaque verticale parle le langage de sa cible. |
| "Combien ça coûte ?" — prix non affichés | Le visiteur quitte parce qu'il ne trouve pas de prix | Page Tarifs = paliers par fonctionnalités avec valeur perçue AVANT le CTA "Demander un devis". Justifier l'absence de prix : "Tarification adaptée à votre activité et votre volume". |
| "C'est fiable ?" — pas de témoignages | Crédibilité insuffisante pour un produit inconnu | Compenser par des chiffres vérifiables (15M commandes, 3 distributeurs CHR), logos partenaires tech (Google Cloud, HubRise), et emplacements réservés pour témoignages futurs. |
| "C'est compliqué à mettre en place ?" — peur de la tech | Le commerçant non-technophile abandonne | Section "Comment ça marche" en 4 étapes visuelles simples. Preuve : "opérationnel le jour même". Placement stratégique de cette section tôt dans le parcours. |
| Formulaire de démo à 5 champs — friction modérée | Drop potentiel sur le formulaire | 5 champs max obligatoires (pas de champ superflu). Promesse post-soumission claire : "Nous vous rappelons sous 24h". Bouton WhatsApp comme alternative zéro-friction. |

---

## C) PAGE SPECS v1

---

### PAGE : ACCUEIL (/)

**Intent** : première impression, compréhension immédiate du produit, orientation vers le bon parcours (commerçant ou distributeur)
**Audience** : tous visiteurs (commerçants, distributeurs, partenaires, curieux)
**Objectif de conversion** : CTA démo cliqué ou navigation vers une verticale/tarifs
**KPI** : taux de clic CTA "Demander une démo" + taux de navigation vers pages verticales

**CTA primaire** : "Demander une démo"
**CTA secondaire** : "Je suis distributeur/réseau — Nous contacter"

**Hiérarchie de message** :

- **H1** : promesse primaire (placeholder — candidat : "Vos clients commandent par WhatsApp. Vous encaissez sans commission.")
- **Sous-titre** : mécanisme en 1 phrase (placeholder — "Un assistant IA personnalisé sur WhatsApp pour votre commerce, opérationnel en quelques minutes")
- **3 preuves** : 15M commandes · 0% commission · opérationnel en quelques minutes

#### Sections (dans l'ordre)

| # | Section | Job | Contenu attendu | Preuve requise |
|---|---------|-----|-----------------|----------------|
| 1 | **Hero** | Clarify + Convert | H1 promesse + sous-titre + smartphone 3D interactif (affichant une conversation WhatsApp) + 2 CTA (commerçant : "Demander une démo" / distributeur : "Nous contacter") + baseline "You chat, You go!" | — |
| 2 | **Chiffres clés** | Prove | 3-4 métriques en gros (15M commandes, +15-30% panier moyen, 60% digitalisation en 3 mois, 0% commission) | Preuves #1, #4, #5, #6 |
| 3 | **Logo bar partenaires** | Prove | Barre défilante horizontale, logos HubRise (~50) en B&W, CSS-only | Preuve #13 |
| 4 | **Bénéfices clés** | Clarify | 3-4 blocs : canal direct 0% commission / assistant IA 24/7 / onboarding en minutes / panier synchronisé 360° — chaque bloc = icône + headline + 1 phrase + preuve chiffrée | Preuves #1, #3, #4, #5 |
| 5 | **Verticales** | Orient | 3 cards : Retail / Franchise / Collectivity — chaque card = headline + 1 phrase + CTA "Découvrir" pointant vers la page verticale | — |
| 6 | **Comment ça marche (résumé)** | Clarify | 4 étapes en version condensée (1 ligne chacune) + CTA "En savoir plus" vers /how-it-works | Preuve #5 (onboarding rapide) |
| 7 | **Social proof** | Prove | Bloc témoignage (placeholder — emplacement réservé pour témoignage futur) + logos partenaires tech (Google Cloud, Orisha, Centrale Paris, Contodeo) | Preuves #8, #10, #11, #12, #14 (placeholder) |
| 8 | **Mascotte HUGGO** | Reassure | Visuel mascotte + message d'engagement court (placeholder — "Besoin d'aide ? Contactez-nous directement sur WhatsApp.") — sert de pont visuel vers le bouton WhatsApp flottant | Preuve #22 |
| 9 | **Pré-footer CTA** | Convert | Bande CTA pleine largeur : headline de clôture (placeholder — "Prêt à augmenter votre chiffre d'affaires ?") + CTA "Demander une démo" + CTA secondaire "Nous contacter" | — |

#### FAQ objections (Accueil)

1. "Mes clients ne sont pas technophiles, ils n'utiliseront jamais ça." → preuve #6 (60% digitalisation clientèle non-technophile)
2. "WhatsApp c'est personnel, pas pour commander." → preuve #1 (15M commandes traitées)
3. "C'est cher, j'ai déjà un site." → preuve #4 (+15-30% panier moyen, 0% commission)
4. "Je ne suis pas informaticien." → preuve #5 (onboarding en quelques minutes)

#### SEO structurel v0

- **Title** : "HUGGO — Commande WhatsApp pour commerçants | 0% commission, assistant IA 24/7"
- **Meta description** : "Transformez WhatsApp en canal de vente automatisé pour votre commerce. Assistant IA personnalisé, 0% commission, opérationnel en quelques minutes. Demandez une démo."
- **H1** : promesse primaire (1 seul H1)
- **H2** : chiffres clés, bénéfices, verticales, comment ça marche, social proof
- **Liens internes** : vers Retail, Franchise, Collectivity, Comment ça marche, Tarifs, Contact

#### Anti-template

- **INTERDIT** : slider/carousel hero (1 hero statique avec smartphone 3D, pas de slides multiples)
- **INTERDIT** : section "Nos valeurs" vide (les valeurs se prouvent par les chiffres et la section RSE sur la page À propos)
- **INTERDIT** : galerie de screenshots sans contexte (tout visuel doit servir une preuve ou un mécanisme)
- **INTERDIT** : vidéo en autoplay dans le hero (la vidéo démo va sur /how-it-works)

---

### PAGE : RETAIL (/retail)

**Intent** : convaincre un commerçant individuel que HUGGO est LA solution pour son commerce
**Audience** : commerçants individuels (boulanger, restaurateur, traiteur, épicier, caviste, bar, déco, habillement)
**Objectif de conversion** : navigation vers Tarifs ou Contact
**KPI** : taux Retail → Tarifs + taux Retail → Contact

**CTA primaire** : "Demander une démo"
**CTA secondaire** : "Voir les paliers" (lien vers /pricing)

**Hiérarchie de message** :

- **H1** : promesse spécifique retail (placeholder — "Votre assistant IA sur WhatsApp : commandes, paiements, fidélisation — sans commission")
- **Sous-titre** : mécanisme (placeholder — "HUGGO s'adapte à votre commerce et prend les commandes 24h/24 par WhatsApp")
- **3 preuves** : +15-30% panier moyen · 0% commission · 60% digitalisation en 3 mois

#### Sections (dans l'ordre)

| # | Section | Job | Contenu attendu | Preuve requise |
|---|---------|-----|-----------------|----------------|
| 1 | **Hero retail** | Clarify + Convert | H1 retail + sous-titre + visuel contextuel (screenshot conversation WhatsApp d'un boulanger/restaurateur) + CTA "Demander une démo" | Preuve #17 (screenshots) |
| 2 | **Problème / douleur** | Clarify | 3 douleurs commerçant : commissions plateforme (20-30%), pic d'activité ingérable, digitalisation complexe — présentées comme des faits reconnaissables, pas comme du pathos | — |
| 3 | **HUGGO comme réponse** | Clarify | 3-4 bénéfices mappés aux douleurs : 0% commission, assistant 24/7, onboarding en minutes, panier synchronisé | Preuves #3, #4, #5 |
| 4 | **Fonctionnalités par palier** | Clarify | 4 paliers : Essentiel / Smart / Marketing / Analytics — chaque palier = nom + liste de fonctionnalités clés + icône. Présentation progressive (de base à avancé). PAS DE PRIX. CTA "Demander un devis" sous chaque palier. | — |
| 5 | **Panier synchronisé 360°** | Prove | Explication visuelle : WhatsApp ↔ borne ↔ caisse ↔ site web ↔ paiement. Diagramme ou animation montrant la synchronisation temps réel. | Preuve #1 (opérationnel), preuve #11 (Orisha), preuve #13 (HubRise) |
| 6 | **Résultats chiffrés** | Prove | 3 métriques en gros : +15-30% panier moyen, 60% digitalisation en 3 mois, 15M commandes traitées | Preuves #1, #4, #6 |
| 7 | **Témoignage commerçant** | Prove | Placeholder — emplacement réservé pour témoignage futur (photo + citation + nom/métier/ville) | Preuve #14 (à fournir) |
| 8 | **Objection handling** | Reduce risk | 3-4 objections les plus fréquentes des commerçants, traitées en format question/réponse concis | Preuves #1, #4, #5, #6 |
| 9 | **Pré-footer CTA** | Convert | "Prêt à essayer ?" + CTA "Demander une démo" + "Voir les tarifs" | — |

#### FAQ objections (Retail)

1. "Mes clients préfèrent venir en boutique." → HUGGO renforce le lien boutique : pré-commande, click & collect, "comme d'habitude" en 1 message. Pas de désintermédiation.
2. "J'utilise déjà Deliveroo/UberEats." → HUGGO = canal direct pour la clientèle régulière. 0% commission vs 20-30%. Les deux coexistent.
3. "Je ne suis pas informaticien." → Preuve #5 : onboarding en quelques minutes, photo de la carte, synchro caisse automatique.
4. "Mes clients n'ont pas WhatsApp." → 95% de pénétration WhatsApp en France. Pas d'app à télécharger, pas de compte à créer.
5. "Et si ça ne marche pas ?" → `[GARANTIE / PÉRIODE D'ESSAI À FOURNIR]`

#### SEO structurel v0

- **Title** : "HUGGO Retail — Assistant WhatsApp pour commerçants | Commandes, paiements, fidélisation"
- **Meta description** : "HUGGO transforme WhatsApp en canal de vente pour votre commerce de proximité. Panier synchronisé, 0% commission, opérationnel en quelques minutes."
- **H1** : promesse retail (1 seul)
- **H2** : douleurs, bénéfices, paliers, 360°, résultats, témoignage, FAQ
- **Liens internes** : vers Comment ça marche, Tarifs, Contact, Franchise (cross-link), Collectivity (cross-link)

#### Anti-template

- **INTERDIT** : tableau comparatif nommant les concurrents (différenciation implicite uniquement)
- **INTERDIT** : liste de fonctionnalités plate sans hiérarchie (les paliers structurent la progression)
- **INTERDIT** : section "Ils nous font confiance" sans logos ni témoignages réels (utiliser les chiffres + logos partenaires tech en attendant les témoignages)

---

### PAGE : FRANCHISE (/franchise)

**Intent** : convaincre un responsable réseau / franchise que HUGGO se déploie à l'échelle
**Audience** : directeurs franchise, responsables réseau, distributeurs CHR
**Objectif de conversion** : soumission formulaire contact commercial
**KPI** : taux de soumission formulaire contact depuis cette page

**CTA primaire** : "Nous contacter" (formulaire contact commercial)
**CTA secondaire** : "Demander une démo"

**Hiérarchie de message** :

- **H1** : promesse réseau (placeholder — "Déployez HUGGO sur tout votre réseau. Un assistant IA par point de vente.")
- **Sous-titre** : scalabilité (placeholder — "Gestion centralisée, analytics réseau, personnalisation par franchisé")
- **3 preuves** : 3 distributeurs CHR actifs · 15M commandes · déploiement multi-points opérationnel

#### Sections (dans l'ordre)

| # | Section | Job | Contenu attendu | Preuve requise |
|---|---------|-----|-----------------|----------------|
| 1 | **Hero franchise** | Clarify + Convert | H1 réseau + sous-titre + visuel (dashboard réseau ou carte multi-points — placeholder) + CTA "Nous contacter" | — |
| 2 | **Problématique réseau** | Clarify | 3 enjeux réseau : déploiement hétérogène, analytics fragmentés, expérience client non uniforme | — |
| 3 | **HUGGO pour les réseaux** | Clarify | 3 réponses : déploiement simultané multi-points, analytics consolidés par réseau, personnalisation par point de vente (menu, horaires, promos locales) | Preuve #3 (3 distributeurs CHR) |
| 4 | **Fonctionnalités réseau** | Clarify | Liste des capacités réseau : onboarding batch, gestion centralisée, reporting consolidé, personnalisation locale, multi-langue | — |
| 5 | **Chiffres d'impact** | Prove | Métriques réseau : 15M commandes, adoption rapide (60% digitalisation en 3 mois), scalabilité prouvée | Preuves #1, #6, #3 |
| 6 | **Témoignage distributeur** | Prove | Placeholder — emplacement pour témoignage distributeur futur | Preuve #14 (à fournir), preuve #15 (logos à fournir) |
| 7 | **Pré-footer CTA** | Convert | "Discutons de votre déploiement" + CTA "Nous contacter" + CTA secondaire "Demander une démo" | — |

#### FAQ objections (Franchise)

1. "Comment on déploie sur 200 points de vente ?" → Onboarding batch, gestion centralisée, déploiement progressif ou simultané.
2. "Chaque franchisé a son propre menu et ses horaires." → Personnalisation locale : chaque point de vente a son assistant IA personnalisé, sous contrôle central.
3. "Quel reporting réseau ?" → Analytics consolidés : CA par point, panier moyen, taux de conversion, performance campagnes — vue réseau + vue point de vente.
4. "Le pricing est-il adapté au volume ?" → Tarification sur mesure par réseau, dégressive selon le volume. Contact commercial pour devis.

#### SEO structurel v0

- **Title** : "HUGGO Franchise — Déploiement WhatsApp réseau | Analytics, gestion centralisée"
- **Meta description** : "Déployez HUGGO sur tout votre réseau de franchises. Assistant IA par point de vente, analytics consolidés, gestion centralisée. Contactez-nous."
- **H1** : promesse réseau (1 seul)
- **H2** : problématique, fonctionnalités, chiffres, témoignage, FAQ
- **Liens internes** : vers Retail (détail fonctionnalités), Collectivity (cross-link), Tarifs, Contact

#### Anti-template

- **INTERDIT** : reprise intégrale du contenu Retail (la page Franchise doit avoir son propre angle : scale, analytics, centralisation)
- **INTERDIT** : section "Nos clients" avec logos fictifs ou génériques

---

### PAGE : COLLECTIVITY (/collectivity)

**Intent** : convaincre collectivités locales et acteurs ruraux que HUGGO résout la désertification commerciale
**Audience** : collectivités, producteurs locaux, exploitations agricoles, commerces itinérants, associations de communes
**Objectif de conversion** : soumission formulaire contact
**KPI** : taux de soumission formulaire contact depuis cette page

**CTA primaire** : "Nous contacter"
**CTA secondaire** : "Demander une démo"

**Hiérarchie de message** :

- **H1** : promesse rurale (placeholder — "Le commerce de proximité, même là où il n'y a plus de commerce")
- **Sous-titre** : mécanisme (placeholder — "HUGGO connecte producteurs locaux et consommateurs par WhatsApp, sans infrastructure")
- **3 preuves** : 62% communes sans commerce · 6M Français à +7min · 400K exploitations

#### Sections (dans l'ordre)

| # | Section | Job | Contenu attendu | Preuve requise |
|---|---------|-----|-----------------|----------------|
| 1 | **Hero collectivity** | Clarify + Convert | H1 rurale + sous-titre + visuel contextuel (producteur local ou marché — placeholder) + CTA "Nous contacter" | — |
| 2 | **Le problème rural en chiffres** | Prove | 4 chiffres France en gros : 400K exploitations, 62% communes sans commerce, 6M Français à +7min, 10K camions itinérants. Sources à citer. | Preuve #21 |
| 3 | **HUGGO pour le circuit court** | Clarify | 3 cas d'usage : producteur vendant en direct via WhatsApp, commerce itinérant avec pré-commandes, commune organisant un "marché digital" | — |
| 4 | **Bénéfices** | Clarify | 3-4 bénéfices : pas d'infrastructure (pas de local, pas de site e-commerce), canal universel (WhatsApp), lien direct producteur-consommateur, inclusion digitale | Preuve #7 (clientèle non-technophile) |
| 5 | **Impact RSE** | Reassure | Anti-gaspi (pré-commandes), circuit court (moins de transport), inclusion digitale, commerce local renforcé | — |
| 6 | **Témoignage collectivité** | Prove | Placeholder — emplacement pour témoignage futur (producteur, collectivité, commerce itinérant) | Preuve #14 (à fournir) |
| 7 | **Pré-footer CTA** | Convert | "Créons ensemble un canal de commerce local" + CTA "Nous contacter" + CTA secondaire "Demander une démo" | — |

#### FAQ objections (Collectivity)

1. "La population rurale n'est pas connectée." → WhatsApp est installé sur 95% des smartphones. Pas d'app à télécharger. Clientèle non-technophile déjà convertie ailleurs (preuve #7).
2. "On n'a pas de budget tech." → Pas d'infrastructure requise : pas de local, pas de matériel, pas de développeur. Abonnement mensuel accessible.
3. "Les producteurs locaux ont déjà leurs circuits." → HUGGO complète, ne remplace pas. Commandes anticipées, moins de pertes, clientèle élargie au-delà du marché hebdomadaire.

#### SEO structurel v0

- **Title** : "HUGGO Collectivity — Commerce local et circuit court par WhatsApp"
- **Meta description** : "62% des communes françaises n'ont plus de commerce. HUGGO connecte producteurs locaux et consommateurs par WhatsApp. Circuit court, anti-gaspi, inclusion digitale."
- **H1** : promesse rurale (1 seul)
- **H2** : chiffres France, circuit court, bénéfices, RSE, témoignage, FAQ
- **Liens internes** : vers Comment ça marche, Retail (cross-link), Contact, À propos (RSE)

#### Anti-template

- **INTERDIT** : images bucoliques génériques sans données (les chiffres France sont le levier principal, pas l'émotion visuelle)
- **INTERDIT** : section "Notre engagement" vague (la section RSE est factuelle et liée à des mécanismes produit)

---

### PAGE : COMMENT ÇA MARCHE (/how-it-works)

**Intent** : lever le doute sur la complexité, montrer que l'onboarding est simple et le produit compréhensible
**Audience** : tous visiteurs (surtout commerçants peu technophiles)
**Objectif de conversion** : compréhension du produit → navigation vers Tarifs ou Contact
**KPI** : scroll > 75% + taux de sortie vers Tarifs ou Contact

**CTA primaire** : "Demander une démo"
**CTA secondaire** : "Voir les tarifs"

**Hiérarchie de message** :

- **H1** : clarification (placeholder — "De zéro à opérationnel en quelques minutes")
- **Sous-titre** : rassurance (placeholder — "Pas d'app à installer. Pas de développeur à embaucher. Vous commencez aujourd'hui.")
- **3 preuves** : 4 étapes · opérationnel le jour même · 0 connaissance technique requise

#### Sections (dans l'ordre)

| # | Section | Job | Contenu attendu | Preuve requise |
|---|---------|-----|-----------------|----------------|
| 1 | **Hero how-it-works** | Clarify + Convert | H1 + sous-titre + CTA "Demander une démo" | — |
| 2 | **4 étapes onboarding** | Clarify | Étape 1 : recherche commerce via Google Business. Étape 2 : import produits (photo de la carte OU synchro caisse). Étape 3 : création assistant WhatsApp personnalisé. Étape 4 : publication du numéro sur Google Business. Chaque étape = numéro + headline + 1-2 phrases + visuel/screenshot placeholder. | Preuve #5, preuve #17 (screenshots à fournir) |
| 3 | **Démo conversation** | Clarify | Simulation visuelle d'une conversation WhatsApp client ↔ assistant HUGGO : le client commande, l'assistant recommande, le client paie. Format : bulles de conversation (placeholder — screenshots réels à fournir). | Preuve #17 (screenshots à fournir) |
| 4 | **Panier 360°** | Clarify | Explication visuelle du panier synchronisé : WhatsApp → borne → caisse → site → paiement. Schéma ou animation montrant le même panier traversant les canaux. | Preuves #1, #11, #13 |
| 5 | **Vidéo démo** | Clarify | Vidéo embed (YouTube/Vimeo ou hébergée) montrant le produit en action. Placeholder — `[VIDÉO À FOURNIR]`. Accompagnée d'un titre court et d'un CTA. | Preuve #18 (vidéo à fournir) |
| 6 | **Résultats** | Prove | 3 métriques résultat : 60% digitalisation en 3 mois, +15-30% panier moyen, 15M commandes | Preuves #1, #4, #6 |
| 7 | **Pré-footer CTA** | Convert | "Convaincu ? Demandez votre démo." + CTA "Demander une démo" + "Voir les tarifs" | — |

#### FAQ objections (Comment ça marche)

1. "Il faut un développeur pour installer ça ?" → Non. 4 étapes, photo de votre carte, et c'est parti. Aucune compétence technique.
2. "Et si ma caisse n'est pas compatible ?" → HUGGO interface toutes les caisses existantes via HubRise et Orisha.
3. "Comment mes clients savent qu'ils peuvent commander sur WhatsApp ?" → HUGGO publie automatiquement votre numéro sur Google Business. QR code en magasin. Le bouche-à-oreille fait le reste.

#### SEO structurel v0

- **Title** : "Comment ça marche — HUGGO | Onboarding en 4 étapes, commande WhatsApp"
- **Meta description** : "Découvrez comment HUGGO fonctionne en 4 étapes simples. De la photo de votre carte à votre assistant WhatsApp opérationnel, en quelques minutes."
- **H1** : promesse onboarding (1 seul)
- **H2** : 4 étapes, démo conversation, panier 360°, vidéo, résultats, FAQ
- **Liens internes** : vers Retail, Tarifs, Contact

#### Anti-template

- **INTERDIT** : schéma technique avec des flèches et des acronymes (la cible est non-technophile)
- **INTERDIT** : vidéo en autoplay sans contrôles utilisateur
- **INTERDIT** : plus de 4 étapes d'onboarding (simplicité = conversion)

---

### PAGE : TARIFS (/pricing)

**Intent** : présenter la valeur par palier et déclencher la demande de devis
**Audience** : commerçants et distributeurs prêts à s'engager
**Objectif de conversion** : clic CTA "Demander un devis"
**KPI** : taux de clic "Demander un devis" + taux de navigation vers Contact

**CTA primaire** : "Demander un devis"
**CTA secondaire** : "Demander une démo"

**Hiérarchie de message** :

- **H1** : tarification (placeholder — "Un palier adapté à chaque commerce")
- **Sous-titre** : justification prix sur demande (placeholder — "Tarification personnalisée selon votre activité et votre volume")
- **3 preuves** : 0% commission · ROI prouvé (+15-30% panier) · sans engagement `[À CONFIRMER]`

#### Sections (dans l'ordre)

| # | Section | Job | Contenu attendu | Preuve requise |
|---|---------|-----|-----------------|----------------|
| 1 | **Hero tarifs** | Clarify + Convert | H1 + sous-titre + CTA "Demander un devis" | — |
| 2 | **Paliers fonctionnalités** | Clarify | 4 colonnes ou cards : Essentiel / Smart / Marketing / Analytics. Chaque palier = nom + liste de fonctionnalités + icône distinctive. AUCUN PRIX. CTA "Demander un devis" sous chaque palier. Progression visuelle de gauche à droite (basique → avancé). Analytics présenté comme add-on (+). | — |
| 3 | **Ce qui est inclus partout** | Reduce risk | Liste des éléments communs à tous les paliers : zéro commission, support, synchro caisse, paiement multi-méthodes. Rassure que même le palier de base est complet. | — |
| 4 | **ROI / valeur perçue** | Prove | Bloc argumentaire : "+15-30% panier moyen", "0% commission vs 20-30% sur les plateformes", "opérationnel le jour même" — justifie le coût avant même de le connaître | Preuves #3, #4 |
| 5 | **Offre réseau** | Orient | Encadré distinct : "Vous gérez un réseau de 50+ points de vente ? Tarification dédiée." + CTA "Nous contacter" | Preuve #3 |
| 6 | **FAQ tarifs** | Reduce risk | Questions spécifiques au pricing | — |
| 7 | **Pré-footer CTA** | Convert | "Obtenez votre devis en 24h" + CTA "Demander un devis" | — |

#### FAQ objections (Tarifs)

1. "Pourquoi les prix ne sont pas affichés ?" → Parce que la tarification est adaptée à votre activité et votre volume. Un devis personnalisé en 24h.
2. "Y a-t-il un engagement ?" → `[À CONFIRMER — engagement ou sans engagement]`
3. "Y a-t-il des commissions sur les ventes ?" → Non. Zéro commission. Abonnement mensuel fixe.
4. "Puis-je changer de palier ?" → Oui, évolution possible à tout moment.
5. "Y a-t-il une période d'essai ?" → `[À FOURNIR]`
6. "Quel est le coût pour un réseau ?" → Tarification dégressive par volume. Contactez notre équipe commerciale.

#### SEO structurel v0

- **Title** : "Tarifs HUGGO — Paliers fonctionnalités | 0% commission, devis personnalisé"
- **Meta description** : "Découvrez les paliers HUGGO : Essentiel, Smart, Marketing, Analytics. 0% commission sur les ventes. Demandez un devis personnalisé adapté à votre commerce."
- **H1** : promesse tarification (1 seul)
- **H2** : paliers, inclus partout, ROI, réseau, FAQ
- **Liens internes** : vers Retail (détail fonctionnalités), Comment ça marche, Contact

#### Anti-template

- **INTERDIT** : prix affichés (JAMAIS — pricing sur demande uniquement)
- **INTERDIT** : comparaison explicite avec les concurrents (pas de "vs Châtaigne" ou "vs Obypay")
- **INTERDIT** : palier "Gratuit" sauf si validé par le client `[À CONFIRMER]`
- **INTERDIT** : toggle mensuel/annuel (pas de prix = pas de toggle)

---

### PAGE : À PROPOS (/about)

**Intent** : rassurer sur la crédibilité, la solidité et les valeurs de HUGGO
**Audience** : visiteurs en phase finale de décision (commerçants ET distributeurs)
**Objectif de conversion** : rassurer → navigation vers Contact
**KPI** : temps passé sur page + taux de navigation vers Contact

**CTA primaire** : "Demander une démo"
**CTA secondaire** : "Nous contacter"

**Hiérarchie de message** :

- **H1** : identité (placeholder — "HUGGO, l'assistant IA qui rapproche les commerçants de leurs clients")
- **Sous-titre** : vision (placeholder — "Né de la conviction que WhatsApp est le canal naturel du commerce de proximité")
- **3 preuves** : filiale d'Atidgo · partenaires Google Cloud / Centrale Paris · 15M commandes

#### Sections (dans l'ordre)

| # | Section | Job | Contenu attendu | Preuve requise |
|---|---------|-----|-----------------|----------------|
| 1 | **Hero à propos** | Clarify + Convert | H1 + sous-titre + CTA "Demander une démo" | — |
| 2 | **Vision / mission** | Reassure | Paragraphe court : pourquoi HUGGO existe, quelle vision du commerce de proximité (placeholder — reformulation Agent 3). Pas de "nos valeurs" en liste : un récit factuel de 3-4 phrases. | — |
| 3 | **HUGGO, filiale d'Atidgo** | Reassure | 1 paragraphe : Atidgo comme maison-mère, crédibilité corporate, mais HUGGO = entité dédiée au commerce de proximité. Atidgo N'EST PAS mis en avant, juste mentionné pour la solidité. | — |
| 4 | **Partenaires technologiques** | Prove | Logos + 1 ligne chacun : Google Cloud Platform (infrastructure IA), ACSEO (intégration technique), Centrale Paris/France (modèle prédictif), Orisha Distribution (ERP), Contodeo (paiement) | Preuves #8, #9, #10, #11, #12 |
| 5 | **Chiffres** | Prove | 15M commandes, 50M historique, 3 distributeurs CHR actifs, ~50 intégrations (HubRise) | Preuves #1, #2, #3, #13 |
| 6 | **Engagements RSE** | Reassure | 4-6 engagements factuels : anti-gaspi (pré-commandes), inclusion digitale, commerce local, circuit court, qualité de vie, accessibilité. Chaque engagement = 1 headline + 1 phrase + lien vers le mécanisme produit. | — |
| 7 | **Pré-footer CTA** | Convert | "Rejoignez les commerçants qui transforment leur relation client" + CTA "Demander une démo" | — |

#### FAQ objections (À propos)

Non applicable — pas de FAQ sur cette page. La crédibilité se prouve par les faits et les logos, pas par du Q&A.

#### SEO structurel v0

- **Title** : "À propos de HUGGO — Vision, partenaires et engagements RSE"
- **Meta description** : "HUGGO, filiale d'Atidgo, transforme WhatsApp en canal de vente pour les commerçants. Découvrez notre vision, nos partenaires technologiques et nos engagements RSE."
- **H1** : identité HUGGO (1 seul)
- **H2** : vision, Atidgo, partenaires, chiffres, RSE
- **Liens internes** : vers Retail, Collectivity (RSE/circuit court), Contact

#### Anti-template

- **INTERDIT** : section "Nos valeurs" en liste (Engagement, Innovation, Proximité) — vide et non prouvable
- **INTERDIT** : mise en avant d'Atidgo plus que de HUGGO
- **INTERDIT** : photos d'équipe stock (si pas de vraies photos d'équipe, pas de section équipe)
- **INTERDIT** : timeline "notre histoire" (HUGGO est jeune — les chiffres parlent, pas la chronologie)

---

### PAGE : CONTACT / DÉMO (/contact)

**Intent** : convertir le visiteur en lead (démo pour commerçant, contact pour distributeur)
**Audience** : visiteurs prêts à s'engager
**Objectif de conversion** : soumission formulaire
**KPI** : taux de soumission formulaire (50 démos/mois + 20 contacts commerciaux/mois)

**CTA primaire** : "Envoyer ma demande de démo" (bouton submit commerçant)
**CTA secondaire** : "Envoyer ma demande" (bouton submit distributeur)

**Hiérarchie de message** :

- **H1** : conversion (placeholder — "Demandez votre démo en 30 secondes")
- **Sous-titre** : promesse post-soumission (placeholder — "Notre équipe vous rappelle sous 24h pour une démo personnalisée de 15 minutes")
- **3 preuves** : 15 min de démo · rappel sous 24h · sans engagement

#### Sections (dans l'ordre)

| # | Section | Job | Contenu attendu | Preuve requise |
|---|---------|-----|-----------------|----------------|
| 1 | **Hero contact** | Clarify + Convert | H1 + sous-titre + ancrage vers les deux formulaires | — |
| 2 | **Formulaire démo (commerçants)** | Convert | Formulaire : nom (requis), entreprise (requis), email (requis), téléphone (requis), type d'activité — commerçant pré-sélectionné (requis), message (optionnel). Bouton "Envoyer ma demande de démo". Micro-copy sous le bouton : "Nous vous rappelons sous 24h." | — |
| 3 | **Formulaire contact (distributeurs/réseaux)** | Convert | Formulaire distinct : nom (requis), entreprise (requis), email (requis), message (requis). Bouton "Envoyer ma demande". Micro-copy : "Notre équipe commerciale vous recontacte rapidement." | — |
| 4 | **Coordonnées** | Reduce risk | Email `[À FOURNIR]`, téléphone `[À FOURNIR]`, bouton WhatsApp (même numéro que le flottant). Pas de réseaux sociaux. | — |
| 5 | **Rassurance finale** | Reduce risk | 3 micro-blocs : "Sans engagement" `[À CONFIRMER]`, "Démo de 15 minutes", "Rappel sous 24h" | — |

#### FAQ objections (Contact)

Non applicable — le visiteur est en conversion, pas en objection. Le formulaire doit être frictionless.

#### SEO structurel v0

- **Title** : "Contact — Demandez une démo HUGGO | Réponse sous 24h"
- **Meta description** : "Demandez une démo personnalisée de HUGGO en 30 secondes. Commerçant ou distributeur, notre équipe vous rappelle sous 24h."
- **H1** : promesse conversion (1 seul)
- **H2** : formulaire démo, formulaire contact, coordonnées
- **Liens internes** : vers Tarifs (lien contextuel "Voir les paliers"), Comment ça marche

#### Anti-template

- **INTERDIT** : formulaire unique mêlant commerçants et distributeurs (les parcours sont distincts)
- **INTERDIT** : champs superflus (secteur d'activité, nombre de points de vente, CA) — ces questions se posent pendant le call
- **INTERDIT** : CAPTCHA visible (utiliser honeypot ou invisible reCAPTCHA)
- **INTERDIT** : page de confirmation vide — la page post-soumission doit rassurer et proposer une action secondaire (télécharger un cas client, visiter une page)

---

## D) "READY FOR COPY" CHECKLIST

### Pages et sections verrouillées

- [x] **Accueil** : 9 sections définies (Hero, Chiffres clés, Logo bar, Bénéfices, Verticales, Comment ça marche résumé, Social proof, Mascotte, Pré-footer CTA)
- [x] **Retail** : 9 sections définies (Hero, Problème, Réponse, Paliers, 360°, Résultats, Témoignage, Objections, Pré-footer CTA)
- [x] **Franchise** : 7 sections définies (Hero, Problématique, Réponse, Fonctionnalités, Chiffres, Témoignage, Pré-footer CTA)
- [x] **Collectivity** : 7 sections définies (Hero, Chiffres France, Circuit court, Bénéfices, RSE, Témoignage, Pré-footer CTA)
- [x] **Comment ça marche** : 7 sections définies (Hero, 4 étapes, Démo conversation, 360°, Vidéo, Résultats, Pré-footer CTA)
- [x] **Tarifs** : 7 sections définies (Hero, Paliers, Inclus partout, ROI, Offre réseau, FAQ, Pré-footer CTA)
- [x] **À propos** : 7 sections définies (Hero, Vision, Atidgo, Partenaires, Chiffres, RSE, Pré-footer CTA)
- [x] **Contact / Démo** : 5 sections définies (Hero, Formulaire démo, Formulaire contact, Coordonnées, Rassurance)

### Preuve requise identifiée pour chaque section

- [x] Chaque section "Prove" a au moins une référence au proof inventory (#1-#22)
- [x] Sections avec preuves `[À FOURNIR]` identifiées : témoignages (#14), logos clients (#15), case study (#16), screenshots (#17), vidéo (#18), résultats IA (#19), garantie (#20)
- [x] Sections de fallback prévues quand la preuve manque (chiffres + logos partenaires tech en remplacement de témoignages)

### Objections principales couvertes

- [x] **Accueil** : 4 objections
- [x] **Retail** : 5 objections
- [x] **Franchise** : 4 objections
- [x] **Collectivity** : 3 objections
- [x] **Comment ça marche** : 3 objections
- [x] **Tarifs** : 6 objections
- [x] Total : 25 objections traitées sur 8 pages (6 objections stratégiques toutes couvertes)

### CTA et friction validés

- [x] CTA "Demander une démo" présent sur toutes les pages (hero + pré-footer minimum)
- [x] CTA "Nous contacter" présent sur Franchise, Collectivity, Tarifs (offre réseau), Contact
- [x] CTA "Demander un devis" présent sur Tarifs (sous chaque palier)
- [x] Bouton WhatsApp flottant sur toutes les pages
- [x] Formulaire démo : 5 champs obligatoires + 1 optionnel (friction modérée, acceptable B2B)
- [x] Formulaire contact : 4 champs obligatoires (friction basse)
- [x] Aucun champ superflu ajouté

### Bilingue FR/EN validé

- [x] Structure d'URL prévue (/fr/, /en/)
- [x] Toggle langue dans le header
- [x] `hreflang` entre versions miroir
- [x] Toutes les pages ont leur équivalent EN

### Architecture extensible

- [x] URL /blog réservée pour ajout futur
- [x] URL /legal et /privacy réservées
- [x] Structure plate (1 niveau) permettant l'ajout de pages sans restructuration

---

## PACKAGE FOR COPY/UI

### Éléments transmis à l'Agent 3 (Copywriting)

1. **Sitemap v1** avec le rôle de chaque page (inform / convince / convert)
2. **Page specs v1** pour les 8 pages : intent, audience, objectif, CTA, hiérarchie de message, sections ordonnées avec jobs et contenu attendu
3. **25 FAQ/objections** réparties par page, chacune avec la preuve associée
4. **SEO structurel v0** : title, meta description, structure Hn, liens internes pour chaque page
5. **Proof inventory indexée** : chaque section référence les preuves par numéro (#1-#22)
6. **Anti-templates** par page : sections interdites sauf justification
7. **Double parcours** : commerçant (démo) vs distributeur (contact commercial) — le copy doit adapter le ton et les arguments
8. **Point de bifurcation hero** : le H1 et les CTA de l'accueil doivent permettre l'auto-identification en 3 secondes
9. **Règle tarifs** : paliers par fonctionnalités UNIQUEMENT, AUCUN prix, CTA = "Demander un devis"
10. **Règle Events** : AUCUNE mention dans le copy
11. **Contraintes lexicales** : mots à utiliser / mots interdits (voir pack stratégie)

### Éléments transmis à l'Agent 4 (UI Design)

1. **Sitemap v1** avec la structure de navigation (header, footer, éléments globaux)
2. **Page specs v1** pour les 8 pages : sections ordonnées, contenu attendu, visuels placeholder
3. **Éléments visuels spécifiques** :
   - Smartphone 3D interactif dans le hero Accueil (conversation WhatsApp à l'écran)
   - Logo bar défilante (~50 logos HubRise, B&W, CSS-only, horizontal scroll infini)
   - Bouton WhatsApp flottant (sticky bas-droite, toutes pages)
   - Mascotte HUGGO (placement défini : Accueil section 8)
   - Vidéo démo (page Comment ça marche section 5)
4. **Paliers tarifs** : 4 cards/colonnes (Essentiel / Smart / Marketing / Analytics), progression visuelle, pas de prix
5. **Double formulaire Contact** : commerçant (5+1 champs) + distributeur (4 champs), visuellement distincts sur la même page
6. **Anti-templates** par page : contraintes visuelles à respecter
7. **Responsive** : mobile-first, smartphone 3D dégradé gracieusement sur mobile
8. **Bilingue** : toggle FR/EN dans le header, mêmes layouts pour les deux langues
9. **Accessibilité** : cible Lighthouse > 95, contraste, focus states, alt texts