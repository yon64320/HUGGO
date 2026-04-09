# Pack Stratégique — HUGGO

> **Projet** : Site vitrine premium HUGGO
> **Version** : v1.0
> **Date** : 2026-04-09
> **Statut** : DRAFT — validation requise avant Gate 2

---

## A) STRATEGIC BRIEF

### Objectif business primaire

**KPI principal** : 50+ demandes de démo par mois (formulaire soumis)

**KPIs secondaires** :

| KPI | Cible | Mesure |
|-----|-------|--------|
| Contacts commerciaux (distributeurs/réseaux) | 20+/mois | Formulaire contact |
| Taux de conversion visiteur → lead | > 3% | Analytics |
| Taux de rebond | < 45% | Analytics |
| Score Lighthouse Performance | > 90 | Lighthouse |
| Score Lighthouse Accessibility | > 95 | Lighthouse |

---

### Offre

**Promesse** : HUGGO transforme WhatsApp en canal de vente automatisé pour les commerçants de proximité. Chaque commerçant obtient son propre assistant IA personnalisé, joignable 24/7 par ses clients, capable de prendre des commandes, recommander des produits, pousser des promotions et fidéliser — le tout dans une conversation WhatsApp ou RCS, sans app à télécharger, sans compte à créer.

**Scope** :

- 3 verticales : Retail (offre structurée en 4 paliers), Franchise (déploiement réseau), Collectivity (commerce rural et circuit court)
- Commande conversationnelle, panier synchronisé multi-canal, paiement intégré multi-méthodes, connexion à toutes les caisses existantes, IA prédictive, analytics
- Bilingue FR/EN

**Exclusions** :

- Events (festivals, stades, salons) — exclu du périmètre
- Espace client / dashboard commerçant (pas sur le site vitrine)
- E-commerce ou vente directe sur le site
- Blog (pas dans le scope initial, mais architecture extensible)
- Pages légales (à ajouter ultérieurement)
- Affichage des prix (pricing sur demande uniquement)

**Pour qui** :

- Commerçants de proximité (boulangers, restaurateurs, traiteurs, épiciers, cavistes, bars, déco, habillement) — TPE/PME, souvent peu technophiles, qui veulent augmenter leur CA sans complexité technique ni commissions
- Distributeurs CHR, réseaux de franchises, groupements de commerçants, collectivités locales — qui cherchent un déploiement scalable avec analytics réseau

**Pas pour qui** :

- Grandes enseignes avec des équipes tech internes et des apps propriétaires déjà déployées
- Commerçants sans clientèle locale récurrente (pure players e-commerce)
- Organisateurs d'événements (offre exclue)

---

### Audience primaire — ICP commerçants individuels

| Critère | Détail |
|---------|--------|
| Profil | Boulanger, restaurateur, traiteur, épicier, caviste, bar, déco, habillement |
| Taille | TPE/PME, souvent le patron qui gère tout |
| Rapport au digital | Peu technophile — veut du résultat, pas de la technique |
| Douleur n°1 | Les plateformes de livraison prennent 20-30% de commission et captent la relation client |
| Douleur n°2 | Pics d'activité = files d'attente, commandes perdues, stress opérationnel |
| Douleur n°3 | Digitalisation perçue comme complexe et coûteuse — "je ne suis pas informaticien" |
| Déclencheur d'achat | Perte de marge visible (commissions), concurrent local qui digitalise, pic saisonnier mal géré |
| Décision | Courte — le patron décide seul. Prix mensuel, pas d'engagement lourd |
| Canal naturel | WhatsApp (déjà installé, déjà utilisé pour les clients), bouche-à-oreille local |

### Segment secondaire — Distributeurs & Réseaux

| Critère | Détail |
|---------|--------|
| Profil | Distributeurs CHR, réseaux de franchises, groupements de commerçants, collectivités |
| Besoin | Déployer HUGGO sur 50-500+ points de vente simultanément |
| Attente | Analytics réseau, gestion centralisée, personnalisation par point de vente |
| Cycle de décision | Plus long, multi-interlocuteurs, pricing custom par volume |
| Canal de contact | Formulaire dédié "Contact commercial", appel direct |

---

### Différenciation — 5 points prouvables

**1. Panier synchronisé multi-canal (le "360°")**

- **Mécanisme** : un seul panier partagé entre WhatsApp, borne en magasin, iPad, caisse, site web et paiement. Le client commence sa commande sur WhatsApp, la modifie en boutique, paie par le moyen qu'il préfère. Tout est synchronisé en temps réel.
- **Preuve** : fonctionnalité opérationnelle, connectée aux systèmes de caisse existants (via intégration HubRise + Orisha Distribution)
- **Pourquoi c'est non-copiable** : les concurrents se limitent au canal WhatsApp. HUGGO interface toutes les caisses du marché, ce qui rend le panier partagé possible à grande échelle.

**2. Onboarding en minutes, pas en semaines**

- **Mécanisme** : (1) recherche du commerce via Google Business, (2) import des produits par simple photo de la carte OU synchro automatique depuis la caisse, (3) création automatique de l'assistant WhatsApp, (4) publication du numéro sur Google Business. Le commerçant est opérationnel le jour même.
- **Preuve** : 0 → 30% de digitalisation de la clientèle en 1 mois, jusqu'à 60% en 3 mois — sur une clientèle historiquement non-technophile
- **Pourquoi c'est non-copiable** : l'import par photo de la carte et la synchro caisse automatique éliminent les semaines de paramétrage manuel que les concurrents imposent.

**3. Canal direct, zéro commission sur les ventes**

- **Mécanisme** : WhatsApp est un canal direct entre le commerçant et ses clients. Pas d'intermédiaire de livraison, pas de marketplace. Le commerçant conserve 100% de ses marges.
- **Preuve** : +15 à +30% d'augmentation du panier moyen vs app mobile classique (les clients commandent plus quand la friction et les frais disparaissent)
- **Pourquoi c'est non-copiable** : structurellement, les plateformes de livraison NE PEUVENT PAS supprimer la commission — c'est leur business model.

**4. Universel : pas d'app, pas de compte, même pour les touristes**

- **Mécanisme** : le client final n'a rien à télécharger, rien à installer, aucun compte à créer. Il ouvre WhatsApp (déjà installé sur 95% des smartphones en France), scanne un QR code ou clique un lien, et commande. Fonctionne pour les non-technophiles, les personnes âgées, les touristes étrangers.
- **Preuve** : clientèle historiquement non-technophile convertie — 60% de digitalisation en 3 mois
- **Pourquoi c'est non-copiable** : les solutions qui imposent une app dédiée ou un compte excluent de facto ces populations.

**5. IA prédictive locale (palier Marketing)**

- **Mécanisme** : modèle prédictif croisant données météo et événements locaux pour anticiper la demande. Le boulanger sait qu'il va pleuvoir samedi ET qu'il y a un match au stade → il adapte sa production et pousse une promo ciblée.
- **Preuve** : modèle mathématique développé avec Centrale Paris/France `[RÉSULTATS QUANTIFIÉS À FOURNIR]`
- **Pourquoi c'est non-copiable** : nécessite à la fois la data transactionnelle locale (que HUGGO accumule) et un modèle prédictif calibré (partenariat académique).

---

### Objections majeures + réponses

| Objection | Réponse | Preuve |
|-----------|---------|--------|
| "Mes clients ne sont pas technophiles, ils n'utiliseront jamais ça" | Les clients n'ont rien à apprendre : ils envoient un message WhatsApp, comme ils le font déjà 50 fois par jour. Pas d'app, pas de compte. | 60% de digitalisation en 3 mois sur clientèle non-technophile |
| "WhatsApp c'est personnel, pas pour commander" | WhatsApp Business est le canal commercial le plus utilisé au monde. En France, 95% de pénétration. Les clients préfèrent envoyer un message plutôt que téléphoner ou faire la queue. | 15M de commandes traitées depuis mars 2025 |
| "C'est cher, j'ai déjà un site / une page Facebook" | Un site ou une page Facebook ne prend pas de commandes automatiquement, ne recommande pas de produits, ne relance pas les paniers abandonnés. HUGGO le fait 24/7 sans embaucher. Et zéro commission vs 20-30% pour les plateformes. | +15 à +30% panier moyen, 0% commission |
| "Je ne suis pas informaticien, c'est trop compliqué à installer" | Onboarding en quelques minutes : photo de votre carte, et c'est parti. Pas de matériel, pas de formation, pas de développeur. | Onboarding même jour, synchro caisse automatique |
| "J'utilise déjà Deliveroo/UberEats" | HUGGO ne remplace pas la livraison — il crée un canal direct pour vos clients réguliers. Ceux qui viennent chercher, qui commandent pour midi, qui repassent chaque semaine. Eux, vous les perdez si vous les laissez sur une plateforme à 25% de commission. | 100% des marges conservées |
| "Et si ça ne marche pas ?" | `[GARANTIE / PÉRIODE D'ESSAI À FOURNIR]` | `[À FOURNIR]` |

---

### Conversions

**CTA primaire** : "Demander une démo"

- Formulaire : nom, entreprise, email, téléphone, type (commerçant/distributeur), message optionnel
- Présent sur toutes les pages, au minimum hero + fin de page
- Destination : agnostique (configurable au déploiement — email, CRM, webhook)

**CTA secondaire** : "Nous contacter"

- Formulaire simplifié ou lien direct (email/téléphone)
- Principalement pour distributeurs/réseaux
- Parcours distinct du CTA commerçant

**Micro-conversions** :

- Téléchargement d'un cas client PDF `[À FOURNIR]`
- Newsletter / actualités HUGGO

**Bouton WhatsApp flottant** : sticky bas-droite sur toutes les pages (cohérent avec le produit — le visiteur peut contacter HUGGO directement). Numéro `[À FOURNIR]`.

**Événements à tracker** :

| Événement | Type | Priorité |
|-----------|------|----------|
| Formulaire démo soumis | Conversion | P0 |
| Formulaire contact soumis | Conversion | P0 |
| Clic CTA "Demander une démo" | Engagement | P1 |
| Clic CTA "Nous contacter" | Engagement | P1 |
| Clic bouton WhatsApp flottant | Engagement | P1 |
| Changement de langue FR/EN | Navigation | P2 |
| Navigation vers page verticale (Retail/Franchise/Collectivity) | Engagement | P2 |
| Scroll > 75% sur page d'accueil | Engagement | P2 |
| Téléchargement cas client PDF | Micro-conversion | P1 |
| Inscription newsletter | Micro-conversion | P2 |

---

### Contraintes

**Ton** : professionnel accessible — sérieux mais chaleureux, rassurant, pas corporate. On parle à des commerçants et des décideurs distribution, pas à des DSI. Tutoiement interdit. Vouvoiement systématique mais pas guindé.

**Assets disponibles** :

- Logo HUGGO (fond vert + fond blanc) : disponibles
- Icône app : disponible
- Mascotte : disponible (jeune homme souriant, casquette + t-shirt HUGGO)
- Screenshots démo : `[À FOURNIR]` — existence confirmée
- Vidéos démo : `[À FOURNIR]` — existence confirmée
- Témoignages clients : non disponibles — emplacements à prévoir
- Logos clients (distributeurs CHR) : non disponibles — autorisation à obtenir
- Logos HubRise (intégrations) : ~50 logos à télécharger et convertir en B&W

**Editing** : site statique, éditable par un développeur (pas de CMS). Pas d'éditeur WYSIWYG pour le client.

**Zones sensibles** :

- HUGGO ≠ Atidgo : Atidgo est mentionné UNIQUEMENT comme maison-mère (footer ou page À propos), jamais mis en avant
- Pricing : JAMAIS de prix affichés sur le site. Les paliers sont présentés par fonctionnalités uniquement
- Concurrents : JAMAIS nommés (Châtaigne, Obypay) — positionnement par différenciation implicite
- Events : JAMAIS mentionnés (offre exclue du périmètre)

---

### Hypothèses et inconnues

| Élément | Statut | Impact si non résolu |
|---------|--------|---------------------|
| Numéro WhatsApp Business pour le bouton flottant | `[À FOURNIR]` | Bouton non fonctionnel |
| Témoignages clients | Non disponibles | Section social proof vide — réduit la crédibilité (P1) |
| Logos clients (3 distributeurs CHR) | Autorisation à obtenir | Logo bar clients impossible — remplacée par logos partenaires tech uniquement |
| Screenshots / vidéos démo | `[À FOURNIR]` | Sections démo visuellement pauvres — impact conversion |
| Résultats quantifiés de l'IA prédictive | `[À FOURNIR]` | Claim prédictif non prouvable — risque de généricité |
| Garantie ou période d'essai | `[À FOURNIR]` | Objection "et si ça ne marche pas" sans réponse — frein conversion |
| Domaine (huggo.fr, huggo.ai, autre) | À décider | Bloquant pour le déploiement |
| Email et téléphone de contact | `[À FOURNIR]` | Pages contact non fonctionnelles |
| Politique d'essai gratuit ou freemium | Non clarifiée | Frein à la conversion si absent, mais peut dévaloriser si mal positionné |

---

## B) MESSAGE ARCHITECTURE

### Promesse primaire (candidat H1)

> **Vos clients commandent par WhatsApp. Vous encaissez sans commission.**

Mécanisme : canal direct WhatsApp → commande conversationnelle → paiement intégré → 0% commission
Preuve : 15M de commandes traitées, +15-30% panier moyen

#### Alternative H1-B

> **Un assistant IA sur WhatsApp qui vend pour vous, 24h/24.**

Mécanisme : IA conversationnelle personnalisée par commerçant, disponible en permanence
Preuve : 60% de digitalisation en 3 mois, 0 → opérationnel en quelques minutes

#### Alternative H1-C

> **WhatsApp devient votre meilleur vendeur.**

Mécanisme : transformation du canal de messagerie en canal de vente automatisé
Preuve : 15M de commandes, augmentation panier moyen prouvée

---

### 3 Supporting Claims

**Claim 1 — "De zéro à opérationnel en quelques minutes"**

- Sous-promesse : pas besoin d'être technicien pour démarrer. Photo de la carte, synchro caisse, et c'est parti.
- Preuve : onboarding en 4 étapes automatisées (Google Business → import produits → assistant WhatsApp → publication). 0 à 30% de clientèle digitalisée en 1 mois.
- Où utiliser : hero secondaire, page "Comment ça marche", section onboarding

**Claim 2 — "Un seul panier, partout : WhatsApp, borne, caisse, site"**

- Sous-promesse : le client commande où il veut, modifie où il veut, paie comme il veut. Tout est synchronisé.
- Preuve : intégration opérationnelle avec les principaux systèmes de caisse (HubRise, Orisha Distribution). Multi-paiement (Apple Pay, Google Pay, Stripe, Contodeo).
- Où utiliser : section fonctionnalités, page Retail, page "Comment ça marche"

**Claim 3 — "Zéro commission, 100% de vos marges"**

- Sous-promesse : contrairement aux plateformes de livraison (20-30% de commission), le canal WhatsApp est direct. Pas d'intermédiaire.
- Preuve : +15 à +30% d'augmentation du panier moyen vs app mobile classique. Modèle à abonnement mensuel, pas à la commission.
- Où utiliser : hero, comparaison implicite, page Tarifs, objection handling

---

### Angle "Why now"

**Le commerce de proximité est en train de perdre ses clients au profit des plateformes de livraison.** Chaque mois sans canal direct = des clients qui s'habituent à commander via Deliveroo/UberEats, à payer 25% de commission, et à ne plus connaître leur commerçant. WhatsApp est déjà installé sur le téléphone de 95% des Français. Le canal existe. La question est : est-ce vous qui l'utilisez, ou votre concurrent d'en face ?

De plus, les habitudes de consommation post-COVID ont ancré la commande à distance. Les clients ne reviendront pas en arrière — ils veulent le click-and-collect, la pré-commande, le "comme d'habitude" en un message. Les commerçants qui ne proposent pas ce canal perdent mécaniquement du trafic chaque trimestre.

---

### Positionnement — Comparateurs implicites

HUGGO se positionne SANS nommer ses concurrents, en rendant les différences évidentes :

| Axe | HUGGO (implicite) | Concurrent type A (WhatsApp basique) | Concurrent type B (plateforme multicanale) |
|-----|-------------------|--------------------------------------|-------------------------------------------|
| Canal | WhatsApp + borne + caisse + site (360°) | WhatsApp seul | App dédiée + web |
| Onboarding | Minutes (photo carte, synchro caisse) | Jours/semaines (paramétrage manuel) | Semaines (intégration technique) |
| Commission | 0% (abonnement fixe) | 0% mais fonctionnalités limitées | Commission variable |
| Caisse | Interface toutes les caisses existantes | Pas de synchro caisse | Quelques caisses compatibles |
| Cible | Tout commerçant, même non-technophile | Commerçants déjà digitalisés | Chaînes et réseaux |
| IA prédictive | Oui (météo + événements locaux) | Non | Reporting standard |

**Règle** : cette comparaison ne figure JAMAIS telle quelle sur le site. Elle alimente le copy pour que chaque phrase implicitement positionne HUGGO comme supérieur sur ces axes.

---

### Lexique

**Mots à utiliser** :

| Mot / Expression | Pourquoi |
|-----------------|----------|
| Assistant IA | Terme produit — personnalise, humanise |
| Canal direct | Oppose aux plateformes intermédiaires |
| Commande conversationnelle | Décrit le mécanisme, pas le buzzword |
| Panier synchronisé | Plus concret que "omnicanal" |
| Digitaliser votre clientèle | Objectif mesurable (0 → 60%) |
| Zéro commission | Différenciateur direct, chiffrable |
| En quelques minutes | Promesse onboarding concrète |
| Vos clients | Réappropriation — les clients sont les VÔTRES, pas ceux de la plateforme |
| Click & Collect | Terme connu, rassurant |
| 24/7 | Disponibilité permanente de l'assistant |

**Mots INTERDITS** (sans preuve/mécanisme attaché) :

| Mot | Pourquoi interdit | Alternative |
|-----|-------------------|-------------|
| Innovant | Générique, tout le monde le dit | Décrire le mécanisme spécifique |
| Expert | Non prouvable tel quel | Citer le partenariat (Centrale Paris, GCP) |
| Qualité | Vide — qualité de quoi ? | Citer le résultat (15M commandes, 60% digitalisation) |
| Accompagnement | Générique | Décrire l'onboarding en 4 étapes |
| Sur-mesure | Tout le monde le dit | "Assistant personnalisé à votre commerce" |
| À votre écoute | Corporate vide | Supprimer |
| Passion | Hors-sujet B2B | Supprimer |
| Synergie | Jargon corporate | Décrire la connexion technique (caisse ↔ WhatsApp) |
| Solutions | Trop vague | Nommer le produit : "HUGGO" |
| Performant | Non prouvable sans chiffre | Citer le chiffre (+15-30% panier moyen) |
| Omnicanal | Buzzword creux | "Panier synchronisé WhatsApp-borne-caisse" |
| Révolutionnaire | Hyper-générique | Supprimer |
| Transformation digitale | Corporate DSI | "Digitaliser votre clientèle" |

---

## C) PROOF INVENTORY

| # | Preuve | Type | Statut | Où utiliser | Risque si absent |
|---|--------|------|--------|-------------|------------------|
| 1 | 15M de commandes traitées depuis mars 2025 | Résultat quantifié | Disponible | Hero, social proof, page À propos | Crédibilité réduite — claim non prouvé |
| 2 | 50M d'historique qualifié de commandes (data IA) | Résultat quantifié | Disponible | Section IA/prédictif, page À propos | Claim IA prédictive fragilisé |
| 3 | 3 distributeurs CHR majeurs comme clients actifs | Social proof | Disponible (fait) — logos `[À FOURNIR]` | Logo bar, page Franchise, social proof | Section distributeurs sans preuve visuelle |
| 4 | +15 à +30% d'augmentation du panier moyen vs app mobile | Résultat quantifié | Disponible | Hero secondaire, page Retail, comparaison | Argument ROI non chiffré |
| 5 | 0 → 30% de digitalisation clientèle en 1 mois | Résultat quantifié | Disponible | Section onboarding, claim "rapidité" | Promesse rapidité non prouvée |
| 6 | Jusqu'à 60% de digitalisation en 3 mois | Résultat quantifié | Disponible | Section résultats, social proof | Claim adoption réduit |
| 7 | Clientèle historiquement non-technophile convertie | Qualificatif de preuve | Disponible | Objection handling, section onboarding | Argument accessibilité affaibli |
| 8 | Google Cloud Platform — partenaire infrastructure | Partenaire tech | Disponible | Logo bar partenaires, page À propos | Crédibilité technique réduite |
| 9 | ACSEO — intégrateur technique | Partenaire tech | Disponible | Page À propos | Impact limité |
| 10 | Centrale Paris/France — modèle prédictif | Partenaire académique | Disponible (partenariat) — résultats `[À FOURNIR]` | Section IA prédictive | Claim IA non prouvé — risque de généricité (P1) |
| 11 | Orisha Distribution — ERP synchro | Partenaire tech | Disponible | Section intégrations, logo bar | Impact limité |
| 12 | Contodeo — solution paiement | Partenaire tech | Disponible | Section paiement | Impact limité |
| 13 | Logos HubRise (~50 intégrations) | Intégrations / écosystème | À télécharger + convertir B&W | Logo bar défilante (toutes pages) | Section intégrations vide visuellement |
| 14 | Témoignages clients commerçants | Témoignage | `[À FOURNIR]` | Section testimonials, pages verticales | Conversion réduite — pas de voix client (P0) |
| 15 | Logos 3 distributeurs CHR | Logo client | `[À FOURNIR]` — autorisation requise | Logo bar clients, page Franchise | Social proof distributeurs absente |
| 16 | Case study : commerçant avant/après HUGGO | Case study | `[À FOURNIR]` | Page Retail, section résultats, PDF téléchargeable | Pas de preuve narrative — impact émotion/conviction (P1) |
| 17 | Screenshots démo conversation WhatsApp | Démo visuelle | `[À FOURNIR]` — existence confirmée | Hero, page "Comment ça marche", sections produit | Sections démo visuellement pauvres (P1) |
| 18 | Vidéo démo produit | Démo visuelle | `[À FOURNIR]` — existence confirmée | Page "Comment ça marche", hero alternatif | Compréhension produit réduite |
| 19 | Résultats quantifiés IA prédictive | Résultat quantifié | `[À FOURNIR]` | Section IA, page Retail palier Marketing | Claim prédictif non prouvable (P1) |
| 20 | Garantie / période d'essai / offre de lancement | Garantie | `[À FOURNIR]` | CTA, objection handling, page Tarifs | Objection "et si ça ne marche pas" sans réponse (P1) |
| 21 | Chiffres ruraux France (400K exploitations, 62% communes sans commerce, 6M Français à +7min, 10K camions itinérants) | Données sectorielles | Disponible (PRD) — sources à confirmer | Page Collectivity | Crédibilité data si sources non citées |
| 22 | Mascotte HUGGO (brand ambassador) | Asset visuel | Disponible | Hero, sections engagement, pages produit | Non bloquant — choix éditorial |

---

## D) CONVERSION MAP

### CTA primaire — "Demander une démo"

| Élément | Détail |
|---------|--------|
| Action | Soumission formulaire (nom, entreprise, email, téléphone, type commerçant/distributeur, message optionnel) |
| Friction | 5 champs obligatoires + 1 optionnel — friction modérée, acceptable pour un produit B2B nécessitant un call |
| Promesse | "Découvrez comment HUGGO peut augmenter votre chiffre d'affaires en 15 minutes" (proposé — Agent 3 finalise) |
| Placement | Hero (toutes pages), fin de chaque section, sticky header, page Contact/Démo |

### CTA secondaire — "Nous contacter"

| Élément | Détail |
|---------|--------|
| Action | Formulaire simplifié (nom, entreprise, email, message) OU lien direct email/téléphone |
| Friction | 3-4 champs — friction basse |
| Promesse | Orienté distributeurs/réseaux — "Discutons de votre déploiement" |
| Placement | Page Contact, section distributeurs, footer |

### Bouton WhatsApp flottant

| Élément | Détail |
|---------|--------|
| Action | Ouverture WhatsApp avec numéro pré-rempli `[À FOURNIR]` |
| Friction | Zéro — un clic |
| Cohérence | Le visiteur expérimente le canal HUGGO en le contactant par WhatsApp — méta-démonstration du produit |
| Placement | Sticky bas-droite, toutes pages |

---

### Double parcours conversion

**Parcours Commerçant** :

```
Hero (promesse + CTA démo)
  → Bénéfices chiffrés (panier moyen, 0% commission, 24/7)
    → Comment ça marche (4 étapes onboarding)
      → Fonctionnalités par palier (Essentiel → Smart → Marketing → Analytics)
        → Social proof (chiffres, témoignages, logos)
          → Tarifs (paliers sans prix + CTA "Demander un devis")
            → Formulaire démo
```

**Parcours Distributeur/Réseau** :

```
Hero (entrée "Distributeur/Réseau" visible)
  → Chiffres d'impact (15M commandes, 3 distributeurs CHR, scalabilité)
    → Déploiement à l'échelle (multi-points, analytics réseau, gestion centralisée)
      → Verticales (Franchise, Collectivity — volume et impact)
        → Formulaire contact commercial dédié
```

**Point de bifurcation** : le hero ou la navigation doit permettre au visiteur de s'auto-identifier (commerçant vs distributeur/réseau) dès les premières secondes. L'UX agent (Agent 2) définira le mécanisme exact.

---

### Friction budget

| Formulaire | Champs obligatoires | Champs optionnels | Étapes | Friction score |
|------------|--------------------|--------------------|--------|----------------|
| Demande de démo | 5 (nom, entreprise, email, tél, type) | 1 (message) | 1 | Moyenne — acceptable B2B |
| Contact commercial | 3-4 (nom, entreprise, email, message) | 0-1 | 1 | Basse |
| WhatsApp flottant | 0 | 0 | 1 clic | Zéro |

**Recommandation** : ne PAS ajouter de champs supplémentaires (secteur d'activité, nombre de points de vente, CA) au formulaire de démo — ces questions se posent pendant le call. Chaque champ en plus = ~10% de drop. Le champ "type" (commerçant/distributeur) est le seul champ de qualification nécessaire à ce stade.

---

### Tracking plan v0

| Événement | Trigger | Paramètres | Priorité |
|-----------|---------|------------|----------|
| `demo_form_submit` | Soumission formulaire démo | type (commerçant/distributeur), page source | P0 |
| `contact_form_submit` | Soumission formulaire contact | page source | P0 |
| `cta_demo_click` | Clic sur CTA "Demander une démo" | page, position (hero/footer/sticky) | P1 |
| `cta_contact_click` | Clic sur CTA "Nous contacter" | page, position | P1 |
| `whatsapp_click` | Clic bouton WhatsApp flottant | page | P1 |
| `case_study_download` | Téléchargement cas client PDF | document_name | P1 |
| `newsletter_signup` | Inscription newsletter | page source | P2 |
| `page_view` | Chargement de page | page_path, language (fr/en) | P0 |
| `scroll_depth` | Scroll > 25%, 50%, 75%, 100% | page, depth_percent | P2 |
| `vertical_click` | Navigation vers Retail/Franchise/Collectivity | vertical_name, source_page | P2 |
| `language_switch` | Changement FR ↔ EN | from_lang, to_lang | P2 |
| `pricing_tier_view` | Vue d'un palier tarif (scroll into view) | tier_name (Essentiel/Smart/Marketing/Analytics) | P2 |

---

## STRATEGY PACK FOR UX/COPY

Éléments à transmettre aux agents downstream :

### Pour Agent 2 — UX Architecture

- [ ] **ICP dual** : commerçant individuel (TPE, peu technophile) + distributeur/réseau (déploiement scalable). Le site DOIT proposer un double parcours avec point de bifurcation clair.
- [ ] **Structure de pages indicative** : Accueil, Retail, Franchise, Collectivity, Comment ça marche, Tarifs (sans prix), À propos, Contact/Démo
- [ ] **CTA primaire** : "Demander une démo" (formulaire 5+1 champs). CTA secondaire : "Nous contacter" (3-4 champs). Bouton WhatsApp flottant sur toutes pages.
- [ ] **Friction budget** : formulaire démo = 5 champs max obligatoires. Pas de champs de qualification superflus.
- [ ] **Page Tarifs** : paliers présentés par fonctionnalités UNIQUEMENT (Essentiel, Smart, Marketing, Analytics), AUCUN prix affiché, CTA = "Demander un devis"
- [ ] **3 verticales** : Retail (mature, contenu riche), Franchise (structurer autour de déploiement/analytics/centralisation), Collectivity (angle RSE/rural, données sectorielles disponibles)
- [ ] **Events** : EXCLU du périmètre
- [ ] **Bilingue FR/EN** : chaque page dans les deux langues
- [ ] **Blog** : pas dans le scope initial mais architecture extensible
- [ ] **Parcours de référence** : Commerçant (hero → bénéfices → comment ça marche → paliers → proof → tarifs → démo) / Distributeur (hero → chiffres → déploiement → contact)

### Pour Agent 3 — Copywriting

- [ ] **Promesse primaire (candidat H1)** : "Vos clients commandent par WhatsApp. Vous encaissez sans commission." + 2 alternatives
- [ ] **3 supporting claims** avec preuves : onboarding en minutes, panier synchronisé 360°, zéro commission
- [ ] **Angle "Why now"** : perte de clients au profit des plateformes, canal WhatsApp déjà installé, habitudes post-COVID irréversibles
- [ ] **Messages bruts à reformuler** (§7 PRD) : "360° panier partagé magique" et "onboarding hyper rapide" → élever en copy premium
- [ ] **Proof inventory complète** : 22 preuves inventoriées, 8 `[À FOURNIR]`
- [ ] **Objections majeures** : 6 objections avec réponses et preuves associées
- [ ] **Lexique** : mots à utiliser (assistant IA, canal direct, commande conversationnelle...) / mots interdits (innovant, expert, solutions...)
- [ ] **Ton** : professionnel accessible, vouvoiement, pas corporate, pas startup cool
- [ ] **Positionnement** : différenciation implicite vs concurrents (jamais nommés) sur 6 axes
- [ ] **RSE** : anti-gaspi, inclusion digitale, commerce local, circuit court, qualité de vie, accessibilité (reformulation Agent 3)
- [ ] **Contrainte** : HUGGO ≠ Atidgo (mention maison-mère uniquement), pas de prix affichés, pas d'Events
- [ ] **Verticale Collectivity** : données sectorielles disponibles (400K exploitations, 62% communes sans commerce, 6M Français à +7min, 10K camions itinérants) — sources à confirmer

### Conversion map transmise aux deux agents

- [ ] **Tracking plan v0** : 12 événements hiérarchisés (P0/P1/P2)
- [ ] **Friction budget** : formulaire démo 5+1, contact 3-4, WhatsApp 0
- [ ] **Double parcours** : Commerçant (bénéfices → onboarding → paliers → proof → tarifs → démo) / Distributeur (chiffres → déploiement → contact)
