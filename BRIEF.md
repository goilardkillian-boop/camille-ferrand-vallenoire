# BRIEF · Site de campagne de Camille Ferrand (Vallenoire)

Ce fichier est le cahier des charges complet du site. Il se lit avec le skill `site-immersif-skill`. Quand ce brief et le skill divergent, ce brief l'emporte uniquement sur les points listés en section 3 ; partout ailleurs, le skill s'applique à la lettre.

Règle d'écriture valable pour TOUS les textes du site : aucun tiret cadratin ni demi-cadratin. Utiliser « · », « : » ou une virgule. Cela vaut aussi pour les champs en majuscules du template (`kicker`, `meta`, `author`, `reassurance`), où le fichier d'exemple utilise des tirets : les remplacer par « · ».

---

## 1. Contexte

- Projet étudiant (école de communication). La candidate et la ville sont **fictives**. Le site doit le dire clairement, sans gâcher l'expérience (voir 5.1).
- Candidate : **Camille Ferrand**, candidate à l'élection municipale de **Vallenoire**, ville fictive de 45 000 habitants dans la vallée de la Garonne (Nouvelle-Aquitaine), à environ 50 minutes de Bordeaux en TER. Ancienne bastide de 1283 : place centrale à arcades, quais de la Garonne, coteaux viticoles, marché du samedi sous les arcades.
- Six quartiers : Centre bastide, Les Quais, Les Coteaux, Le Pradet, Gare Saint-Jean, Hameaux viticoles.
- Objectifs de la campagne :
  - cognitif : faire connaître la candidate, ses idées et son programme ; contenus forts et mémorisables ;
  - affectif : sentiment d'appartenance, lien avec la candidate, valeurs partagées, sujets concrets où chacun se reconnaît ;
  - conatif : faire adhérer, faire voter, et **recruter 30 bénévoles**.
- Cibles :
  - principale : habitants de 41 à 60 ans, souvent propriétaires, classes moyennes ;
  - cœur de cible : 41 à 50 ans avec enfants à charge, bénévoles potentiels ;
  - importante : les 60 ans et plus (44 % des votants estimés) → lisibilité maximale ;
  - secondaire : journalistes et blogueurs locaux → espace presse dédié.
- Hébergement : **GitHub Pages** (site 100 % statique, aucun serveur). Les formulaires partent vers **Make** (webhook). Aucune étape de build : HTML, CSS et JS servis tels quels.

## 2. Réponses aux 7 questions du skill (déjà fournies : NE PAS les reposer)

| # | Question | Réponse |
| --- | --- | --- |
| 1 | Secteur | Campagne électorale municipale : service abstrait, donc `proof.layout: 'bento'` |
| 2 | Nom | `Camille Ferrand` (slug du dossier : `site`) |
| 3 | Thème | **Clair** (ne pas ajouter `data-theme="dark"`) |
| 4 | Accent | Personnalisé : bleu roi `#4169E1`, accent foncé donc `--lime-ink: #ffffff` |
| 5 | Activité | Voir sections 1 et 4 : les textes de `content.js` sont fournis en section 6 |
| 6 | E-mail | `[EMAIL_EQUIPE]` (placeholder à remplacer, à centraliser dans `config.js`) |
| 7 | Photos | « Quelques-unes » : portrait de la candidate + images déposées dans `site/images/` par l'équipe. Compléter le reste par Unsplash et Pexels selon l'étape 4.2 du skill |

Photos déjà fournies (les copier dans `site/images/`) :
- `camille-ferrand.jpg` : portrait vertical de la candidate, fond gris. **Ne jamais modifier le visage, ne jamais générer ni retoucher d'image de la candidate.** Recadrage et compression uniquement.
- Images de l'équipe (générées sous ChatGPT, noms en section 8) : à traiter comme « photos du client » (étape 4.1 du skill).
- Choix d'images de banque : privilégier lieux, gestes, objets, silhouettes de dos. **Éviter les visages identifiables** (hors candidate) : une personne réelle ne doit pas sembler soutenir une campagne.

## 3. Dérogations au skill (liste LIMITATIVE)

Le skill interdit de modifier `index.html` et `app.js` et limite `styles.css` à deux valeurs. Pour ce projet, et UNIQUEMENT pour les points ci-dessous, les modifications sont autorisées. Tout le reste du moteur reste copié verbatim, et toute la vérification de l'étape 6 du skill s'applique à `index.html`.

**`index.html`, autorisé :**
1. Remplacer la ligne Google Fonts par Archivo (graisses et largeurs utiles) :
   `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&display=swap`
2. Ajouter dans `<head>` : `<meta name="robots" content="noindex, nofollow">`, les balises Open Graph et Twitter (titre, description, `images/og-image.jpg`), le favicon (`favicon.svg`), `<meta name="theme-color" content="#4169E1">`, et `<link rel="stylesheet" href="campagne.css">` APRÈS `styles.css`.
3. Changer le `href` du CTA du dock (`.dock-cta`) et du CTA du processus (`#stepsCtaLink`) de `#contact` vers `engagement.html`. Le moteur ignore les liens qui ne commencent pas par `#` (vérifié dans `app.js`, gestionnaire des ancres) : aucune animation n'est touchée.
4. Dans le footer, ajouter une rangée de liens vers les autres pages (Programme, Je m'engage, Une question ?, Presse, Mentions légales, Données personnelles), dans un `<nav class="footer-pages">`, sans toucher aux éléments existants.
5. Ajouter `<script src="config.js"></script>` et `<script src="campagne.js" defer></script>` en fin de `<body>`, APRÈS les scripts du moteur. `campagne.js` ne doit jamais modifier le DOM du moteur (seulement le footer ajouté et les compteurs).

**`styles.css`, autorisé dans `:root` uniquement :**

| Token | Valeur | Raison |
| --- | --- | --- |
| `--bone` | `#EEE5D7` | Fond beige de la palette |
| `--ink` | `#192026` | Anthracite : 13,19:1 sur beige, 16,46:1 sur blanc |
| `--ink-rgb` | `25, 32, 38` | Composantes de l'anthracite |
| `--ash` | `#5A6069` | Texte secondaire : 5,08:1 sur beige (le gris d'origine ne passe pas AA sur beige) |
| `--white` | `#FFFFFF` | Surfaces élevées |
| `--lime` | `#4169E1` | Accent : bleu roi |
| `--lime-ink` | `#FFFFFF` | Texte sur accent : 4,85:1 |
| `--sans` | `'Archivo', ui-sans-serif, system-ui, sans-serif` | Typographie imposée |
| `--mono` | `'Archivo', ui-sans-serif, system-ui, sans-serif` | Les libellés en majuscules passent en Archivo |

Plus l'URL de `body.static .spot::before` → `url('images/hero.jpg')` (déjà prévue par le skill), plus les corrections mobiles que le skill demande lui-même à l'étape 6. Si Archivo modifie les métriques (largeur des mots du hero, ovale dessiné, pilule), régler par le TEXTE de `content.js` (plus court), jamais par le moteur.

**Nouveaux fichiers autorisés** (ils ne touchent pas le moteur) : `config.js`, `campagne.css`, `campagne.js`, les pages de la section 5, `favicon.svg`, `404.html`, `.nojekyll`, `README.md`, `MAKE-SETUP.md`, `illustrations/`, `images/`.

## 4. Positionnement et ligne éditoriale

**Positionnement : Camille Ferrand, la candidate du quotidien.** Pas de grands discours : un vocabulaire compréhensible, des données chiffrées, des mesures datées et vérifiables.
- **Protection** : Camille défend le budget et la tranquillité de chaque foyer de Vallenoire, avec des mesures concrètes et rassurantes.
- **Proximité** : candidate de terrain, qui connaît la réalité des quartiers et parle simplement.

**Promesse** : Vivre mieux à Vallenoire sans dépenser plus : des factures du quotidien allégées, une ville plus sûre et plus apaisée, des déplacements plus simples.
**Slogan** : « Vallenoire, le quotidien d'une ville qui nous facilite la vie ! »
**Ton** : institutionnel et moderne. Phrases courtes, verbes d'action, chiffres sourcés.

**Ancrage politique : CENTRE, rassembleur, sans étiquette.** C'est une contrainte forte, à appliquer dans chaque texte, chaque image, chaque choix graphique.
- Présenter une **liste citoyenne et rassembleuse**, au-delà des étiquettes. Aucune référence à un parti, un leader national, un camp.
- **Équilibre systématique** : chaque mesure de tranquillité s'accompagne de prévention et de présence humaine (médiateurs, éclairage, référents) ; chaque mesure de pouvoir d'achat insiste sur l'équité (quotient familial, aides pour tous les âges).
- Vocabulaire à privilégier : tranquillité, proximité, prévention, présence, ensemble, chacun, concret, équitable, écouter, rassembler, rendre des comptes.
- Vocabulaire à proscrire (connoté à droite) : ordre, autorité, laxisme, reconquête, tolérance zéro, insécurité galopante, assistanat, « ceux qui ont travaillé toute leur vie », « la France qui se lève tôt ».
- Vocabulaire à proscrire (connoté à gauche) : lutte, riches, patronat, camarades, casse sociale.
- Jamais de peur : pas de chiffres de délinquance, pas d'images de police en intervention, pas de nuit menaçante.
- Graphisme : aucun drapeau, aucune composition bleu, blanc, rouge, pas de Marianne, pas de blason ni de logo de la mairie (interdits à un candidat), aucun symbole partisan. Le corail reste une ponctuation (voir 7).

## 5. Architecture du site

```
site/
├── index.html            ← template immersif (skill) : le récit de campagne
├── programme.html        ← 24 mesures, simulateur, quartiers, chiffres clés
├── engagement.html       ← devenir bénévole, jauge, agenda, je vote
├── question.html         ← poser une question, donner une idée ou un avis
├── presse.html           ← espace presse (journalistes, blogueurs)
├── mentions-legales.html
├── donnees.html          ← données personnelles (RGPD)
├── 404.html
├── config.js             ← TOUS les réglages modifiables (voir 9)
├── content.js            ← textes du template (section 6)
├── app.js / styles.css   ← moteur du skill (verbatim sauf section 3)
├── campagne.css / campagne.js
├── favicon.svg
├── illustrations/        ← 4 SVG bento (skill)
├── images/
├── .nojekyll
├── README.md             ← mise en ligne GitHub Pages pas à pas
└── MAKE-SETUP.md         ← format exact des données envoyées à Make
```

### 5.1 Éléments communs aux pages secondaires

- Header fixe sobre : logo (ou wordmark « Camille Ferrand » en Archivo 800), liens des pages, bouton « Je m'engage » en bleu roi. Menu plein écran sur mobile.
- Mention **« Projet étudiant · candidate et ville fictives »** : discrète en haut des pages secondaires et en signature du footer de toutes les pages.
- Compte à rebours « J‑xx avant le vote » (date dans `config.js`).
- Bouton flottant « Je m'engage » en bas d'écran sur mobile.
- Bouton **« A+ »** : agrandit le texte de 125 %, choix mémorisé (localStorage dans un try/catch). Pensé pour les 60 ans et plus.
- Partage : Facebook, WhatsApp, copier le lien (pas de script tiers, simples liens de partage).
- Footer identique partout : liens, contacts, réseaux, signature projet étudiant.
- Animations : révélations douces au défilement (IntersectionObserver), compteurs qui montent, soulignés qui se dessinent, cartes qui se posent. Cohérentes avec le template mais plus légères. Tout est coupé si `prefers-reduced-motion`.
- Accessibilité AA : contrastes de la section 7, focus visible, navigation au clavier, `aria-live` sur les messages de formulaire, textes alternatifs, cibles tactiles de 44 px minimum, texte courant 18 px minimum.

### 5.2 `index.html` : le récit (template du skill)

Parcours : promesse → positionnement → démarche → 4 piliers (bento) → devise → 3 façons d'agir → parole de la candidate → objections → contact. Textes en section 6. Les CTA mènent à `engagement.html`.

### 5.3 `programme.html`

1. **Intro** : promesse, portrait de la candidate, 3 chiffres forts animés.
2. **Filtres** : par pilier (Pouvoir d'achat, Tranquillité, Mobilité, Environnement et méthode) et par profil (« Je suis : parent, senior, jeune, commerçant, propriétaire ») ; les mesures correspondantes se mettent en avant.
3. **Les 24 mesures** en cartes dépliables : titre, bénéfice concret en une phrase, public concerné, levier municipal, horizon. Contenu exact en section 10.
4. **Simulateur « Ce que je gagne »** : saisie simple (nombre d'enfants à la cantine, tranche de quotient, montant de la taxe foncière, facture d'électricité mensuelle) → estimation annuelle qui s'anime. **Hypothèses affichées et modifiables dans `config.js`**, avec la mention « Estimation indicative, hypothèses de travail » et un lien « Méthode » qui les détaille.
5. **Vallenoire quartier par quartier** : carte SVG schématique (6 zones, pas une vraie géographie), au clic ou au toucher : profil, enjeux, mesures prioritaires du quartier. Données en section 11. Alternative accessible en liste.
6. **Chiffres clés sourcés** (section 12), compteurs animés, source en lien sous chaque chiffre.
7. **Méthode** : budget publié chaque année, bilan à mi-mandat.
8. CTA final vers `engagement.html`.

### 5.4 `engagement.html`

1. **Jauge live** « XX bénévoles sur 30 » : lue dans un CSV publié par Google Sheets (URL dans `config.js`), valeur de repli dans `config.js` si la lecture échoue. Animation de remplissage.
2. **Missions** : porte à porte en binôme, stand du marché du samedi, distribution de flyers, relais numérique, accueil des réunions publiques. Durée indicative : deux heures par semaine.
3. **Formulaire bénévole** (voir 9) avec message de succès animé.
4. **Agenda** : prochaines rencontres (marchés, réunions publiques, permanences par quartier), dans `config.js`, triées par date, passées masquées automatiquement.
5. **Je vote** : vérifier son inscription (lien service-public.gouv.fr), faire une procuration (lien maprocuration.gouv.fr), date du scrutin.

### 5.5 `question.html`

Formulaire : prénom, e-mail, type choisi par l'habitant (question, idée, soutien, désaccord), thème optionnel, message, consentement. Promesse affichée : « Chaque message est lu par l'équipe. Réponse sous 48 heures. » L'IA de Make trie et résume ; un humain répond toujours.

### 5.6 `presse.html` (cible secondaire)

Biographie courte (50 mots) et longue (150 mots) à rédiger à partir du positionnement, sans inventer de parcours précis (marquer « à compléter » ce qui engage). Kit à télécharger : portrait HD, logo SVG et PNG, palette. Deux communiqués (annonce de candidature, présentation du programme) en cartes. Chiffres clés. Contact presse (`config.js`).

### 5.7 Pages légales

- `mentions-legales.html` : éditeur (placeholders), directeur de publication, hébergeur GitHub Inc. (88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis), mention projet étudiant, crédits photo (banques d'images, portrait) et mention « Certaines images d'illustration ont été générées par IA » si des images ChatGPT sont utilisées.
- `donnees.html` : finalités (organiser la campagne, répondre aux messages), base légale (consentement explicite : l'engagement politique est une donnée sensible au sens de l'article 9 du RGPD), destinataires (équipe de campagne, outils Make et Google), durée (suppression au plus tard un mois après l'élection), droits et contact.

## 6. Textes de `content.js` (à utiliser tels quels, ajuster seulement si le rendu l'exige)

```js
brand: {
  name: 'Camille Ferrand',
  title: 'Camille Ferrand · Municipales à Vallenoire (projet étudiant)',
  description: 'Camille Ferrand, la candidate du quotidien à Vallenoire : pouvoir d’achat, tranquillité, proximité. Projet étudiant : candidate et ville fictives.',
  kicker: 'CAMILLE FERRAND · CANDIDATE À VALLENOIRE',
  copyright: '© 2026 · VALLENOIRE, VALLÉE DE LA GARONNE',
  signature: 'PROJET ÉTUDIANT · CANDIDATE ET VILLE FICTIVES',
  socials: [
    { label: 'FACEBOOK ↗', url: '[URL_FACEBOOK]' },
    { label: 'INSTAGRAM ↗', url: '[URL_INSTAGRAM]' }
  ]
},
nav: { proof: 'PROJET', universes: 'AGIR', cta: 'JE M’ENGAGE' },
hook: {
  line1: 'Le quotidien d’une ville',
  line2a: 'qui nous',
  line2b: 'facilite la vie.',
  image: 'images/hero.jpg',
  imageAlt: 'La place à arcades de Vallenoire un samedi de marché',
  floaters: [ /* 10 visuels, dont images/camille-ferrand.jpg en format 2:3 */ ]
},
positioning: 'Moins de dépenses. Plus de tranquillité.',   // 40 caractères
manifesto: {
  text: 'Camille Ferrand connaît Vallenoire rue par rue. Pas de grands discours : des mesures chiffrées, datées, [[vérifiables par tous]] à la fin du mandat.'
},
proof: {
  layout: 'bento',
  kicker: 'LE PROJET EN 4 PILIERS',
  title: 'Ce qui change pour vous',
  sub: 'Deux priorités, deux engagements de fond, 24 mesures concrètes.',
  meta: '24 MESURES · 4 PILIERS',
  features: [
    { size: 'big',  illu: 'illustrations/fe-1.svg', title: 'Pouvoir d’achat', meta: 'TAXE FONCIÈRE GELÉE · CANTINE AU QUOTIENT' },
    { size: 'tall', illu: 'illustrations/fe-2.svg', title: 'Tranquillité', meta: 'PRÉSENCE · PRÉVENTION' },
    { size: 'tall', illu: 'illustrations/fe-3.svg', title: 'Mobilité du quotidien', meta: 'ÉCOLES · VÉLO · BUS' },
    { size: 'big',  illu: 'illustrations/fe-4.svg', title: 'Une mairie qui rend des comptes', meta: 'BUDGET EN 1 PAGE · BILAN À MI-MANDAT' }
  ]
},
motto: {
  kicker: 'CE QUI GUIDE CAMILLE',
  words: [
    { word: 'Protéger', hint: 'Le budget des familles et la tranquillité de chaque rue.' },
    { word: 'Écouter', hint: 'Une permanence par mois dans chacun des 6 quartiers.' },
    { word: 'Rassembler', hint: 'Une liste citoyenne, au-delà des étiquettes.' }
  ]
},
universes: {
  introA: 'Une',
  introB: 'campagne,',
  introC: '3 façons d’agir.',
  cta: 'Je m’engage →',
  image: 'images/benevoles.jpg',
  items: [
    { name: 'Je m’engage', meta: 'ÉTAPE · 01', desc: 'Deux heures par semaine suffisent : porte à porte, marché, distribution.' },
    { name: 'Je donne mon avis', meta: 'ÉTAPE · 02', desc: 'Une question, une idée, un désaccord : l’équipe répond sous 48 heures.' },
    { name: 'Je vote', meta: 'ÉTAPE · 03', desc: 'Vérifiez votre inscription et, si besoin, faites une procuration en ligne.' }
  ]
},
testimonial: {   // parole de la candidate + chiffre réel sourcé (pas de faux témoignage d'habitant)
  kicker: 'PRIX DE L’ÉNERGIE SUR UN AN · INSEE, AOÛT 2026',
  figure: '+16,7',
  unit: '%',
  quote: 'Chaque euro compte dans une famille. La mairie doit alléger tout ce qui dépend d’elle, à commencer par la cantine et la taxe foncière.',
  author: 'CAMILLE FERRAND · CANDIDATE'
},
objections: {
  items: ['Pas de promesses en l’air.', 'Pas de discours partisan.', 'Pas de solution toute faite.'],
  finale: 'Juste Vallenoire,',
  pill: 'ensemble.'
},
contact: {
  kicker: 'UNE QUESTION, UNE IDÉE ?',
  email: '[EMAIL_EQUIPE]',
  reassurance: 'RÉPONSE SOUS 48 H · CHAQUE MESSAGE EST LU PAR L’ÉQUIPE'
},
trail: [ /* 20 petits visuels : scènes de marché, arcades, quais, vélos, écoles, mains qui distribuent des flyers */ ]
```

Illustrations bento (règles du skill : une idée par tuile, aucun texte, UN seul élément en bleu roi, filets à 13 % d'encre, grand format, fond `#FFFFFF`) :
- fe-1 Pouvoir d'achat (big) : une rangée de barres horizontales dont une seule est raccourcie par un segment bleu.
- fe-2 Tranquillité (tall) : un grand halo circulaire de lampadaire, un point bleu au centre.
- fe-3 Mobilité (tall) : une ligne continue qui serpente d'un bord à l'autre, un point bleu dessus.
- fe-4 Rendre des comptes (big) : une grille de cases dont quelques-unes sont cochées, une seule en bleu.

## 7. Charte graphique

| Couleur | Code | Usage | Contraste vérifié |
| --- | --- | --- | --- |
| Bleu roi | `#4169E1` | Couleur principale : boutons, bande devise, titres, icônes | Blanc dessus : 4,85:1. Sur beige : 3,88:1, grands titres seulement |
| Bleu roi foncé | `#3457C9` | Survol, liens, texte bleu sur beige | 6,26:1 sur blanc, 5,02:1 sur beige |
| Anthracite | `#192026` | Texte courant, footer, fonds sombres | 16,46:1 sur blanc, 13,19:1 sur beige |
| Beige | `#EEE5D7` | Fond principal du site, sections alternées | Décoratif |
| Blanc | `#FFFFFF` | Cartes, surfaces, texte sur bleu | Décoratif |
| Corail | `#E74D3D` | Accent ponctuel : chiffres clés en 24 px minimum, icônes, filets | 3,80:1 sur blanc : **jamais de texte courant**. Version texte si nécessaire : `#C8382A` (5,18:1 sur blanc) |
| Gris texte | `#5A6069` | Texte secondaire | 5,08:1 sur beige |

- Le corail occupe **moins d'un dixième** de la surface, n'est **jamais posé en aplat à côté du bleu** (éviter toute lecture tricolore).
- Typographie : **Archivo** partout. Titres en 700 ou 800, titres d'affiche en largeur condensée (`font-stretch` 75 à 87 %), texte courant en 400 à 18 px minimum, chiffres clés en 800.
- Coins arrondis 12 px sur les pages secondaires, ombres très légères, icônes au trait (SVG inline, pas de bibliothèque).

## 8. Images attendues dans `site/images/`

| Fichier | Format | Contenu | Source |
| --- | --- | --- | --- |
| `camille-ferrand.jpg` | 2:3 | Portrait de la candidate | Fourni |
| `hero.jpg` | 1800×1200 | Place à arcades, marché du samedi, lumière dorée | ChatGPT (équipe) ou Unsplash |
| `benevoles.jpg` | 1800×1200 | Mains qui tiennent des flyers devant une porte, rue pavée | ChatGPT (équipe) |
| `quais.jpg` | 3:2 | Quais de la Garonne au crépuscule, lampadaires allumés | ChatGPT (équipe) |
| `ecole.jpg` | 3:2 | Rue devant une école fermée aux voitures, enfants de dos | ChatGPT (équipe) |
| `cantine.jpg` | 3:2 | Plateau de cantine coloré | ChatGPT (équipe) ou Unsplash |
| `reunion.jpg` | 3:2 | Réunion de quartier dans une salle communale | ChatGPT (équipe) |
| `coteaux.jpg` | 3:2 | Coteaux de vigne, ville au loin | Unsplash |
| `og-image.jpg` | 1200×630 | Portrait + slogan + fond bleu roi | À composer en code (canvas ou SVG exporté) à partir du portrait et d'Archivo |
| floaters, trail | selon skill | Détails : arcades, volets, pain au marché, vélo, lampadaire, poignée de main sans visage | Mix équipe + Unsplash/Pexels |

Si une image de l'équipe manque au moment de construire, utiliser Unsplash ou Pexels (méthode du skill) et lister à la livraison ce qui reste à remplacer. Optimiser : 1600 px maximum sur le grand côté, JPEG qualité 78, moins de 250 Ko par image hors hero.

## 9. Formulaires et Make (site statique)

**`config.js`** (un seul endroit pour tout régler, commenté en français) :

```js
window.CAMPAGNE = {
  emailEquipe: '[EMAIL_EQUIPE]',
  emailPresse: '[EMAIL_PRESSE]',
  makeWebhook: '[URL_WEBHOOK_MAKE]',          // un seul webhook, champ "kind" pour router
  compteurCsv: '[URL_CSV_ONGLET_COMPTEUR]',   // onglet "Compteur" publié en CSV
  benevolesRepli: 12,                          // affiché si le CSV ne répond pas
  objectifBenevoles: 30,
  dateScrutin: '2026-12-13',                   // hypothèse, à ajuster
  reseaux: { facebook: '[URL_FACEBOOK]', instagram: '[URL_INSTAGRAM]' },
  agenda: [ /* { date: '2026-10-10', heure: '9 h', lieu: 'Marché sous les arcades', titre: 'Stand de campagne', quartier: 'Centre bastide' } */ ],
  simulateur: { /* hypothèses de la section 10.5 */ }
};
```

**Envoi** (identique pour les deux formulaires) :
- `fetch(CAMPAGNE.makeWebhook, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(donnees) })`. Corps en `application/x-www-form-urlencoded` : pas de requête préalable CORS, Make lit les champs directement. La réponse est opaque : considérer l'envoi réussi si aucune erreur réseau.
- Champ `kind` : `benevole` ou `message`. Autres champs : voir le tableau ci-dessous. Ajouter `page`, `horodatage` (ISO) et `source: 'site'`.
- Anti-spam sans service tiers : champ piège invisible `site_web` (si rempli, ne rien envoyer mais afficher le succès), et refus si le formulaire est envoyé moins de 3 secondes après l'affichage.
- Validation côté client, messages d'erreur clairs sous chaque champ, consentement obligatoire.
- Si `makeWebhook` n'est pas renseigné ou si l'envoi échoue : proposer un lien `mailto:` prérempli vers `emailEquipe`, pour ne jamais perdre un bénévole.
- Succès : message animé, puis la jauge se met à jour localement de +1.

| Formulaire | Champs envoyés |
| --- | --- |
| Bénévole (`kind=benevole`) | prenom, contact (e-mail ou téléphone), quartier (6 choix), disponibilites (semaine, soir, week-end : plusieurs choix, joints par des virgules), missions (plusieurs choix), consentement=oui |
| Message (`kind=message`) | prenom, email, type (question, idee, soutien, desaccord), theme (pouvoir_achat, tranquillite, mobilite, environnement, autre ou vide), contenu, consentement=oui |

**Jauge** : lire le CSV de l'onglet « Compteur » (une seule cellule : le nombre d'inscrits). Cet onglet NE contient AUCUNE donnée personnelle. Délai d'actualisation Google d'environ 5 minutes : afficher « mis à jour régulièrement », pas « en direct ».

Documenter tout cela dans `MAKE-SETUP.md` (exemple de corps de requête pour chaque formulaire, liste exacte des champs).

## 10. Contenu du programme (programme.html)

Chaque mesure : titre · bénéfice en une phrase · public · levier municipal · horizon.

**10.1 Pouvoir d'achat (priorité 1)**
1. Taxe foncière gelée : aucune hausse des taux communaux pendant le mandat · propriétaires · vote annuel des taux · premier budget.
2. Cantine et périscolaire au quotient familial, tarif plancher pour les petits revenus · familles · tarifs communaux · rentrée suivante.
3. Mutuelle communale négociée · seniors, petits revenus · convention CCAS · première année.
4. Achat groupé d'électricité et de gaz, ouvert à tous, sans engagement · tous · organisation communale · première année.
5. Guichet « Toutes vos aides » en mairie et en permanences de quartier · seniors, familles · CCAS · six premiers mois.
6. Pass jeunes sport et culture pour les 16 à 25 ans · jeunes · budget communal · première année.
7. Stationnement gratuit 1 heure en centre-ville · commerçants, seniors · tarifs de stationnement · premier budget.
8. Rénovation énergétique des bâtiments communaux : les économies financent les mesures ci-dessus · tous · investissement · tout le mandat.

**10.2 Tranquillité (priorité 2 : présence et prévention)**
9. Police municipale de proximité : patrouilles à pied, le soir et le week-end · tous · effectifs et horaires · première année.
10. Médiateurs de rue pour prévenir les conflits et les incivilités · tous · recrutement ou partenariat associatif · première année.
11. Un référent tranquillité par quartier, une réunion publique par trimestre · tous · organisation municipale · six premiers mois.
12. Signalement simple (appli, téléphone, accueil) et réponse sous 7 jours · tous · services municipaux · six premiers mois.
13. Éclairage LED des rues et cheminements peu éclairés · tous · éclairage public · tout le mandat.
14. Vidéoprotection uniquement aux points signalés par les habitants, charte publique, évaluation chaque année · commerçants, riverains · conseil municipal et préfecture · selon diagnostic.

**10.3 Mobilité du quotidien**
15. Rues aux écoles, fermées aux voitures aux heures d'entrée et de sortie · familles · pouvoir de police de circulation · rentrée suivante.
16. Plan vélo continu et sécurisé · 18 à 40 ans · voirie · tout le mandat.
17. Aide à l'achat de vélo selon les revenus · 26 à 60 ans · budget communal · première année.
18. Trottoirs praticables et bancs réguliers · seniors, familles · voirie · programme annuel.
19. Transport à la demande pour les aînés et les personnes à mobilité réduite · seniors · CCAS ou agglomération · première année.
20. Bus le soir et le week-end, tarif réduit jeunes et seniors · jeunes, seniors · compétence de l'agglomération, portée par la commune · à négocier.
21. Parkings vélos sécurisés et aires de covoiturage · actifs · foncier communal · deux premières années.

**10.4 Environnement et méthode**
22. Végétalisation des cours d'école et des rues les plus chaudes · familles · patrimoine communal · tout le mandat.
23. Budget publié chaque année en une page : le coût de chaque engagement · tous · transparence · chaque année.
24. Bilan public à mi-mandat, engagement par engagement · tous · transparence · mi-mandat.

**10.5 Hypothèses du simulateur** (dans `config.js`, affichées sur la page, marquées « hypothèses de travail ») :
- Cantine : 140 repas par enfant et par an ; prix actuel 4,20 € ; tarifs au quotient : 1,00 € · 2,50 € · 3,50 € · 4,20 €.
- Taxe foncière : hausse évitée de 2 % par an sur la part communale, part communale estimée à 50 % de l'avis.
- Achat groupé d'énergie : économie de 10 % sur la facture d'électricité.
- Résultat affiché : « jusqu'à XXX € par an », arrondi à la dizaine, jamais de promesse ferme.

## 11. Quartiers (carte de programme.html)

| Quartier | Profil | Enjeux | Mesures mises en avant |
| --- | --- | --- | --- |
| Centre bastide | Surtout 60 ans et plus, commerçants | Commerces vacants, trottoirs étroits, centre calme le soir | 7, 9, 13, 18 |
| Les Quais | Retraités et jeunes couples | Éclairage des berges, stationnement | 13, 11, 21 |
| Les Coteaux | Familles de 41 à 60 ans, pavillons | Taxe foncière, cantine, trajets | 1, 2, 4, 16 |
| Le Pradet | Revenus modestes, familles, jeunes | Pouvoir d'achat, bus trop rares | 2, 5, 6, 20, 10 |
| Gare Saint-Jean | Actifs de 26 à 40 ans | Gare peu fréquentée le soir, parkings vélos | 9, 13, 21 |
| Hameaux viticoles | Agriculteurs, retraités isolés | Isolement, transport | 19, 3, 5 |

## 12. Chiffres clés (sourcés, lien sous chaque chiffre)

| Chiffre | Libellé | Source |
| --- | --- | --- |
| +2,4 % | Prix à la consommation sur un an, août 2026 | [Insee, Informations rapides n° 218](https://www.insee.fr/fr/statistiques/9051406) |
| +16,7 % | Prix de l'énergie sur un an, août 2026 | Idem |
| 488 € | Budget moyen de rentrée par foyer, soit 79 € de plus qu'en 2025 | [Enquête Cofidis, rentrée 2026](https://www.cofidis.fr/fr/questions-de-budget/projets-des-francais/enquete-budget-rentree-scolaire-2026.html) |
| 46 % | Des parents disent avoir du mal à financer la rentrée | [Empruntis, d'après l'enquête Cofidis](https://www.empruntis.com/rachat-credits/actualites/2026/budget-rentree-scolaire-2026-parents-craignent-manque-argent-21172/) |
| 56 % | Des parents craignent de manquer d'argent | Idem |

Ne pas afficher le budget médian : les sources divergent (260 € ou 261 €). Ne pas afficher l'exemple de cantine de l'Eure tant que l'article source n'a pas été relu.

## 13. Contraintes légales à respecter dans le site

- Aucune publicité payante pour le site (article L52-1 du Code électoral) : pas de pixel publicitaire, pas de script de tracking. Pas de Google Analytics ; si une mesure d'audience est voulue, une solution sans cookie.
- À partir de la veille du scrutin à 0 h, plus aucune mise à jour du site (article L49) : l'écrire dans le README.
- Pas de blason, de logo ni de charte de la mairie, pas de formulation « site officiel ».
- `noindex` partout : le site est un exercice, il ne doit pas remonter dans les moteurs de recherche.
- Données : consentement explicite, aucune donnée personnelle dans un fichier public, suppression après l'élection.

## 14. Mise en ligne GitHub Pages (à écrire dans README.md)

1. Dépôt GitHub public, contenu de `site/` à la racine (ou dossier `/docs`).
2. Fichier `.nojekyll` à la racine.
3. Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
4. Tous les chemins sont relatifs (le site vit sous `https://<compte>.github.io/<depot>/`).
5. Tester l'URL publiée : les formulaires, la jauge, le mode mobile, le mode réduit.

## 15. Vérifications avant livraison

- Toute la liste de l'étape 6 du skill sur `index.html` (y compris l'iframe mobile à 320, 375, 414 et 638 px).
- Pages secondaires : zéro erreur console, aucun défilement horizontal, contrastes de la section 7, navigation au clavier, mode `prefers-reduced-motion`, bouton A+.
- Formulaires : test avec un faux webhook local (petit serveur Node qui affiche le corps reçu) : champs, piège anti-spam, délai de 3 s, repli `mailto:`.
- Aucun tiret cadratin ni demi-cadratin dans les textes (`grep -n "—\|–"` sur les HTML et `content.js` : zéro résultat hors code).
- Aucune URL distante d'image (règle du skill).
- Récapitulatif final : fichiers créés, images par provenance, placeholders restant à remplir (`[EMAIL_EQUIPE]`, `[URL_WEBHOOK_MAKE]`, etc.), textes inventés à faire valider.
