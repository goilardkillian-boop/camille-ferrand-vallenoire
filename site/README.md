# Camille Ferrand · Site de campagne (Vallenoire)

**Projet étudiant : la candidate et la ville sont fictives.**

Site 100 % statique (HTML, CSS, JavaScript, aucune étape de build au déploiement), hébergé sur **GitHub Pages**. Les formulaires partent vers **Make** : voir [`MAKE-SETUP.md`](MAKE-SETUP.md).

## Les pages

Le site est conçu d'abord pour l'accessibilité (objectif WCAG 2.2 AA et RGAA 4.1) : il se lit au clavier, avec un lecteur d'écran, à 400 % de zoom et sans JavaScript. Le système de design est décrit dans [`DESIGN.md`](../DESIGN.md), à la racine du dépôt.

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil accessible : promesse, 4 piliers, devise, 3 façons d'agir, parole de Camille, agenda |
| `programme.html` | 24 mesures en accordéons, filtres par thème et par profil (gardés dans l'adresse), simulateur « Ce que je gagne », plan et tableau des quartiers, chiffres sourcés, méthode, impression |
| `facile-a-lire.html` | Le programme en facile à lire et à comprendre |
| `engagement.html` | Jauge des bénévoles, missions, formulaire bénévole, agenda |
| `je-vote.html` | Inscription, procuration, date du scrutin, questions fréquentes sur le vote |
| `question.html` | Formulaire question, idée, soutien ou désaccord, et questions fréquentes |
| `presse.html` | Biographies, kit visuel, communiqués, contact presse |
| `accessibilite.html` | Réglages d'affichage, état de l'accessibilité, signaler un problème |
| `plan-du-site.html`, `mentions-legales.html`, `donnees.html`, `404.html` | Plan du site, pages légales, page d'erreur |
| `experience.html` | Version animée (modèle « Site Immersif »), proposée en option, peu accessible |

Sur chaque page : bouton **Affichage** (taille du texte, contraste renforcé, espacement, police très lisible, animations coupées), bouton **Écouter cette page**, fil d'Ariane, lien « Aller au contenu ».

## Ce que l'on modifie, et où

| Je veux changer… | Fichier |
| --- | --- |
| E-mails, webhook Make, compteur, date du scrutin, agenda, réseaux, hypothèses du simulateur, communiqués | **`config.js`** (tout est commenté) |
| Le texte d'une page, le menu, le pied de page | `outils/gabarits/<page>.html` et `outils/construire.py`, puis lancer `python3 outils/construire.py` depuis la racine du dépôt |
| Les 24 mesures | `outils/mesures.py`, puis relancer `python3 outils/construire.py` |
| Les textes de la version animée | `content.js`, moitié haute uniquement |
| Les couleurs, tailles, espacements | `campagne.css` (jetons en haut du fichier, voir `DESIGN.md`) |
| Une image | Déposer le nouveau fichier dans `images/` **sous le même nom** (voir `images/CREDITS.md`) |

Attention : les pages HTML de `site/` sont **produites** par `outils/construire.py`. Une modification faite directement dans `site/programme.html` sera écrasée à la prochaine construction : modifiez le gabarit. Ne jamais modifier `app.js` ni la partie « INJECTION » de `content.js` (moteur de la version animée).

## À remplir avant la mise en ligne

Cherchez les crochets `[` :

- `config.js` : `[TELEPHONE_PRESSE]` (facultatif), `[URL_WEBHOOK_MAKE]`, `[URL_WEBHOOK_COMPTEUR]` (webhook Make du scénario 2, qui compte les bénévoles dans Airtable) ;
- `content.js` et `experience.html` : `[EMAIL_EQUIPE]`, `[URL_FACEBOOK]`, `[URL_INSTAGRAM]` (mêmes valeurs) ;
- `outils/gabarits/mentions-legales.html` : éditeur, directeur de la publication, école, crédit du portrait ;
- `outils/gabarits/donnees.html` : responsable du traitement ;
- `outils/gabarits/presse.html` : passages surlignés « à compléter » des biographies.

L'adresse du site (`https://goilardkillian-boop.github.io/camille-ferrand-vallenoire/`) est déjà renseignée dans `config.js` et dans `outils/construire.py` (balises de partage, adresse canonique, `sitemap.xml`). Si le site change d'adresse, modifiez ces deux endroits.

## Mise en ligne sur GitHub Pages, pas à pas

Le site est dans le dossier `site/`. Deux façons de le publier :

### Option A (recommandée) : le dépôt tel quel, avec GitHub Actions

Le fichier `.github/workflows/pages.yml` (à la racine du dépôt) publie automatiquement le dossier `site/` à chaque envoi sur `main`.

1. Dépôt GitHub **public** (GitHub Pages gratuit l'exige).
2. Settings → Pages → *Build and deployment* → Source : **GitHub Actions**.
3. Envoyez vos modifications sur `main`, puis suivez l'onglet *Actions* : l'adresse publiée s'affiche à la fin.

### Option B : la méthode classique « Deploy from a branch »

1. Dépôt public dont la racine contient **le contenu de `site/`** (ou renommez `site/` en `docs/`).
2. Le fichier `.nojekyll` doit être à la racine publiée (il y est déjà).
3. Settings → Pages → *Deploy from a branch* → `main` → `/ (root)` (ou `/docs`).

### Dans les deux cas

- Tous les chemins sont relatifs : le site fonctionne sous `https://<compte>.github.io/<depot>/`.
- Limite connue : la page `404.html` est servie à n'importe quelle adresse inconnue ; si cette adresse est dans un sous-dossier, ses liens relatifs peuvent ne pas fonctionner.
- Testez l'adresse publiée : les deux formulaires, la jauge, l'affichage sur téléphone, le mode « animations réduites » (réglage d'accessibilité du téléphone ou de l'ordinateur) et le bouton A+.

## Tester en local

```bash
node ../.claude/serve-site.mjs          # http://localhost:4385
```

Faux webhook pour voir exactement ce que le site envoie :

```bash
node -e "require('http').createServer((q,r)=>{let b='';q.on('data',c=>b+=c);q.on('end',()=>{console.log(q.method,decodeURIComponent(b.replace(/\+/g,' ')).split('&').join('\n'));r.writeHead(200,{'Access-Control-Allow-Origin':'*'});r.end('ok')})}).listen(4390)"
```

puis, le temps du test, `makeWebhook: 'http://localhost:4390'` dans `config.js`.

## Règles à respecter pendant la campagne

- **Article L49 du Code électoral** : à partir de la **veille du scrutin à 0 h**, plus aucune mise à jour du site (ni texte, ni agenda, ni publication). Avec la date actuelle de `config.js` (13 décembre 2026) : plus aucune modification à partir du **samedi 12 décembre 2026 à 0 h**.
- **Article L52-1** : aucune publicité payante pour le site, aucun pixel publicitaire, aucun outil de suivi. Pas de Google Analytics. Si une mesure d'audience est nécessaire, choisir une solution sans cookie.
- Pas de blason, de logo ni de charte de la mairie, jamais la mention « site officiel ».
- `noindex` sur toutes les pages : le site ne doit pas apparaître dans les moteurs de recherche.
- Données : consentement explicite, aucune donnée personnelle dans un fichier public, suppression au plus tard un mois après l'élection (voir `MAKE-SETUP.md`, section 5).
- Écriture : aucun tiret cadratin ni demi-cadratin dans les textes ; utiliser « · », « : » ou une virgule.

## Charte

Bleu roi `#4169E1` (texte bleu sur fond clair : `#3457C9`), anthracite `#192026`, beige `#EEE5D7`, blanc, corail `#E74D3D` en ponctuation uniquement (chiffres clés, jamais de texte courant, jamais en aplat à côté du bleu). Typographie Archivo. Texte courant 18 px minimum, cibles tactiles de 44 px minimum.
