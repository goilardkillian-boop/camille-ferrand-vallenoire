# Make · Mise en place des automatisations

Le site est 100 % statique : il n'a ni serveur ni base de données. Tout ce qui se passe **après** l'envoi d'un formulaire se fait dans **Make** :

- enregistrement dans la base de données (Google Sheets) ;
- e-mails (alerte à l'équipe, bienvenue au bénévole, accusé de réception à l'habitant) ;
- messages Slack pour l'équipe ;
- tri et résumé des messages par l'IA de Make ;
- compteur de bénévoles affiché sur le site ;
- suppression des données après l'élection.

Les deux formulaires envoient vers **un seul webhook**. Le champ `kind` dit de quel formulaire il s'agit.

---

## 1. Ce que le site envoie

### Format technique

```
POST <makeWebhook>
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
```

- Le site envoie en mode `no-cors` : **il ne lit pas la réponse de Make**. Tant qu'il n'y a pas de coupure réseau, il affiche « envoyé ». Une erreur côté Make (scénario désactivé, quota épuisé) est donc invisible pour l'habitant : **surveillez l'historique du scénario** et activez les alertes d'erreur de Make (voir 7).
- Si `makeWebhook` n'est pas renseigné dans `config.js`, ou en cas de coupure réseau, le site propose un e-mail **prérempli** vers `emailEquipe` : aucun bénévole n'est perdu.
- Anti-spam sans service tiers : champ piège invisible `site_web` (si un robot le remplit, rien n'est envoyé) et refus d'un envoi fait moins de 3 secondes après l'affichage du formulaire.

### Champs communs aux deux formulaires

| Champ | Exemple | Rôle |
| --- | --- | --- |
| `kind` | `benevole` ou `message` | Aiguillage du Router |
| `id` | `3f6c1a9e-…` | Identifiant unique : sert à éviter les doublons (clé de la ligne) |
| `page` | `engagement.html` | Page d'origine |
| `horodatage` | `2026-10-03T08:42:17.512Z` | Date et heure ISO 8601, en UTC |
| `source` | `site` | Toujours `site` |
| `version_consentement` | `2026-09` | Version du texte de consentement accepté (voir `config.js`) |
| `consentement` | `oui` | Toujours `oui` : le formulaire ne part pas sans la case cochée |

### Formulaire bénévole (`kind=benevole`)

| Champ | Valeurs possibles |
| --- | --- |
| `prenom` | Texte libre, 2 caractères minimum |
| `contact` | Un e-mail **ou** un numéro de téléphone français |
| `contact_type` | `email` ou `telephone` (calculé par le site : inutile de tester la présence de « @ ») |
| `quartier` | `Centre bastide` · `Les Quais` · `Les Coteaux` · `Le Pradet` · `Gare Saint-Jean` · `Hameaux viticoles` |
| `disponibilites` | Un ou plusieurs parmi `semaine`, `soir`, `week-end`, joints par des virgules |
| `missions` | Un ou plusieurs parmi `porte-a-porte`, `marche`, `distribution`, `numerique`, `reunions`, joints par des virgules |

Exemple de corps reçu :

```
kind=benevole&id=3f6c1a9e-6d0b-4a8e-9b61-0c2f5d7e8a41&page=engagement.html&horodatage=2026-10-03T08%3A42%3A17.512Z&source=site&version_consentement=2026-09&prenom=Nadia&contact=nadia%40exemple.fr&contact_type=email&quartier=Les+Coteaux&disponibilites=soir%2Cweek-end&missions=porte-a-porte%2Cmarche&consentement=oui
```

### Formulaire message (`kind=message`)

| Champ | Valeurs possibles |
| --- | --- |
| `prenom` | Texte libre |
| `email` | E-mail valide |
| `type` | `question` · `idee` · `soutien` · `desaccord` |
| `theme` | `pouvoir_achat` · `tranquillite` · `mobilite` · `environnement` · `autre` · vide (l'habitant ne sait pas) |
| `contenu` | Texte libre, 10 à 3 000 caractères |

Exemple de corps reçu :

```
kind=message&id=9b2e4c7d-1f3a-4e5b-8c6d-2a1b0f9e8d7c&page=question.html&horodatage=2026-10-05T17%3A03%3A55.020Z&source=site&version_consentement=2026-09&prenom=Paul&email=paul%40exemple.fr&type=desaccord&theme=tranquillite&contenu=Je+ne+suis+pas+d%27accord+avec+la+vid%C3%A9oprotection...&consentement=oui
```

---

## 2. La base de données : un Google Sheets, trois onglets

Créez un fichier **« Campagne Camille Ferrand · données »** dans le Drive de l'équipe (pas dans un Drive personnel), partagé uniquement avec les membres qui en ont besoin.

**Onglet `Benevoles`** (ligne 1 = en-têtes, dans cet ordre) :

```
id | horodatage | prenom | contact | contact_type | quartier | disponibilites | missions | consentement | version_consentement | statut | referent | notes
```

`statut` (`nouveau`, `rappelé`, `actif`, `retiré`), `referent` et `notes` sont remplis à la main par l'équipe.

**Onglet `Messages`** :

```
id | horodatage | prenom | email | type | theme | contenu | resume_ia | categorie_ia | theme_ia | referent | statut | reponse_envoyee_le
```

**Onglet `Compteur`** : une seule cellule, **A1** :

```
=NBVAL(Benevoles!A2:A)
```

(Version anglaise de Sheets : `=COUNTA(Benevoles!A2:A)`.) Pour ne compter que les bénévoles encore engagés : `=NB.SI(Benevoles!K2:K;"<>retiré")`.

### Publier le compteur (et seulement lui)

1. Fichier → Partager → **Publier sur le Web**.
2. Lien : choisir l'onglet **`Compteur`** uniquement (jamais « Document entier »), format **CSV**.
3. Copier l'URL dans `compteurCsv` de `config.js`.

Google met à jour la version publiée environ toutes les 5 minutes : le site affiche « mis à jour régulièrement », jamais « en direct ». Si la lecture échoue, le site affiche `benevolesRepli`.

> ⚠️ Les onglets `Benevoles` et `Messages` contiennent des données sensibles (opinion politique, article 9 du RGPD) : **ne jamais les publier**, ne jamais partager le fichier « à toute personne disposant du lien ».

---

## 3. Slack : les canaux de l'équipe

Créez un espace Slack pour l'équipe, avec au minimum :

| Canal | Ce qui y arrive |
| --- | --- |
| `#benevoles` | Chaque nouvelle inscription, avec le quartier et les missions |
| `#messages` | Chaque message d'habitant, résumé par l'IA, avec le thème |
| `#urgent` | Les messages classés urgents par l'IA (et les désaccords, si vous le souhaitez) |
| `#moderation` | Les messages à modérer : injurieux, hors sujet, spam. Aucune réponse automatique |

Si vous préférez un canal par référent de thème (`#pouvoir-achat`, `#tranquillite`…), utilisez le filtre sur `theme_ia` (voir 4.2).

Conseil RGPD : dans Slack, ne postez **que le prénom, le quartier et le résumé**, jamais le téléphone ou l'e-mail complet. Le lien vers la ligne du tableur suffit pour retrouver le contact.

---

## 4. Le scénario Make, module par module

```
[Webhooks · Custom webhook]
        │
   [Router]
   ├── Route 1 · filtre kind = benevole
   │     ├─ Google Sheets · Search rows (id)      ← évite les doublons
   │     ├─ Google Sheets · Add a row (Benevoles)
   │     ├─ Slack · Create a message (#benevoles)
   │     ├─ Gmail · Send an email (équipe)
   │     └─ Gmail · Send an email (bienvenue)     ← filtre contact_type = email
   │
   └── Route 2 · filtre kind = message
         ├─ Google Sheets · Search rows (id)
         ├─ Make AI Toolkit · Summarize text
         ├─ Make AI Toolkit · Categorize text (urgence)
         ├─ Make AI Toolkit · Categorize text (thème, si theme est vide)
         ├─ Google Sheets · Add a row (Messages)
         └─ [Router]
               ├─ categorie_ia = a_moderer → Slack #moderation (aucun envoi à l'habitant)
               ├─ categorie_ia = urgent    → Slack #urgent + Gmail « URGENT » au pôle communication + accusé de réception
               └─ sinon                    → Slack #messages + Gmail au référent du thème + accusé de réception
```

### 4.0 Le webhook

1. Nouveau scénario → module **Webhooks · Custom webhook** → *Add* → nommez-le `site-camille-ferrand`.
2. Copiez l'URL dans `makeWebhook` de `config.js`.
3. Cliquez **Redetermine data structure**, puis envoyez **un formulaire de chaque sorte** depuis le site (bénévole puis message) : Make apprend tous les champs.

### 4.1 Route bénévole (`kind` = `benevole`)

| Module | Réglages |
| --- | --- |
| Filtre | `kind` *Equal to* `benevole` |
| Google Sheets · Search rows | Onglet `Benevoles`, filtre `id` = `{{id}}`. Ajoutez ensuite un filtre « Total number of bundles = 0 » pour ne pas enregistrer deux fois le même envoi |
| Google Sheets · Add a row | Onglet `Benevoles`, une colonne par champ ; `statut` = `nouveau` |
| Slack · Create a message | Canal `#benevoles`. Texte : `🙋 Nouveau bénévole : {{prenom}} ({{quartier}}). Dispo : {{disponibilites}}. Missions : {{missions}}. Fiche : <lien du tableur>` |
| Gmail · Send an email | À : l'équipe. Objet : `Nouveau bénévole : {{prenom}}, {{quartier}}` |
| Gmail · Send an email | Filtre `contact_type` = `email`. À : `{{contact}}`. Objet : `Bienvenue dans l'équipe de Camille Ferrand`. Corps : remerciement, prochaine étape (« un membre de l'équipe vous rappelle dans la semaine »), rappel « vous pouvez retirer votre accord à tout moment en répondant à cet e-mail » |

Pour un bénévole qui a laissé un **téléphone**, le message Slack suffit : le référent du quartier le rappelle.

### 4.2 Route message (`kind` = `message`)

| Module | Réglages |
| --- | --- |
| Filtre | `kind` *Equal to* `message` |
| Google Sheets · Search rows | Anti-doublon sur `id`, comme ci-dessus |
| Make AI Toolkit · Summarize text | Texte : `{{contenu}}`. Consigne : « Résume en une phrase neutre, en français, sans jugement. » → `resume_ia` |
| Make AI Toolkit · Categorize text | Catégories : `normal`, `urgent`, `a_moderer`. Consigne : « urgent = situation de danger, détresse, problème de sécurité immédiat, ou journaliste pressé ; a_moderer = injurieux, menaçant, publicitaire, hors sujet ; sinon normal. » → `categorie_ia` |
| Make AI Toolkit · Categorize text | Seulement si `theme` est vide. Catégories : `pouvoir_achat`, `tranquillite`, `mobilite`, `environnement`, `autre` → `theme_ia` (sinon `theme_ia` = `theme`) |
| Google Sheets · Add a row | Onglet `Messages` ; `statut` = `à traiter` |
| Router | 3 routes ci-dessous |

**Route `a_moderer`** : Slack `#moderation` uniquement. Pas d'accusé de réception.

**Route `urgent`** : Slack `#urgent` (`🚨 {{prenom}} · {{type}} · {{resume_ia}}`) + Gmail au pôle communication, objet `URGENT · {{type}} · {{prenom}}` + accusé de réception à l'habitant.

**Route normale** (filtre de repli, *fallback*) : Slack `#messages` (`✉️ {{type}} · {{theme_ia}} · {{prenom}} : {{resume_ia}}`) + Gmail au référent du thème (tableau de correspondance ci-dessous) + accusé de réception.

| `theme_ia` | Référent (à compléter) |
| --- | --- |
| `pouvoir_achat` | `[EMAIL_REFERENT_POUVOIR_ACHAT]` |
| `tranquillite` | `[EMAIL_REFERENT_TRANQUILLITE]` |
| `mobilite` | `[EMAIL_REFERENT_MOBILITE]` |
| `environnement` | `[EMAIL_REFERENT_ENVIRONNEMENT]` |
| `autre` | `[EMAIL_EQUIPE]` |

Astuce : faites la correspondance avec la fonction `switch()` de Make dans le champ « À ».

**Accusé de réception** (Gmail · Send an email à `{{email}}`) : « Bonjour {{prenom}}, votre message est bien arrivé. Il a été transmis à la personne de l'équipe qui suit ce sujet : vous aurez une réponse sous 48 heures. » **L'IA trie et résume, un humain répond toujours** : c'est la promesse affichée sur le site.

---

## 5. Suppression des données après l'élection

Promesse du site : suppression **au plus tard un mois après l'élection**.

1. Créez un second scénario **planifié une seule fois** (*Schedule* → *Once*), à la date `dateScrutin + 30 jours` (avec la date actuelle de `config.js` : le 12 janvier 2027).
2. Modules : Google Sheets · *Clear values* sur `Benevoles!A2:M` et `Messages!A2:M`, puis Slack · *Create a message* dans `#benevoles` : « Données supprimées conformément à l'engagement RGPD ».
3. Pensez aussi à vider l'historique des exécutions Make (Scenario → History), la boîte Gmail de l'équipe et les canaux Slack concernés.

Une demande de suppression individuelle avant cette date se traite à la main : supprimer la ligne, les messages Slack et les e-mails concernés, puis confirmer à la personne.

---

## 6. Tester avant la mise en ligne

1. Renseignez `makeWebhook` et `compteurCsv` dans `config.js`.
2. Envoyez un bénévole avec un e-mail, un bénévole avec un téléphone, un message avec thème, un message sans thème, un message injurieux (pour la modération).
3. Vérifiez : 5 lignes dans le tableur, les bons canaux Slack, les bons e-mails, rien dans `#benevoles` pour les messages.
4. Attendez 5 minutes, rechargez `engagement.html` : la jauge doit avoir bougé.
5. Test de coupure : mettez une adresse fausse dans `makeWebhook`, envoyez : le site doit proposer l'e-mail prérempli.

Pour tester sans Make, un petit serveur local qui affiche le corps reçu suffit (voir la section « Tester en local » du README).

---

## 7. Surveillance et limites

- Activez dans Make **les notifications d'erreur** du scénario (Scenario settings → *Notify on errors*) vers l'e-mail de l'équipe.
- Plan gratuit de Make : nombre d'opérations mensuel limité (voir la page tarifs de Make, les conditions changent). Chaque envoi consomme une opération par module traversé : comptez 6 à 10 opérations par formulaire.
- L'IA de Make est soumise à un quota de jetons : les messages très longs sont tronqués à 3 000 caractères par le site.
- Aucun champ du site n'est obligatoire côté Make hormis `kind` : si vous ajoutez un champ au formulaire, relancez **Redetermine data structure**.
