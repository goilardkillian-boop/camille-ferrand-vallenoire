# Make + Airtable + Slack · le guide de A à Z

Le site est statique : il n'a ni serveur ni base de données. Tout ce qui se passe **après** l'envoi d'un formulaire se fait dans **Make** :

```
Site ──(formulaire)──▶ Make, scénario 1 ──▶ Airtable (la base de données)
                                        ├─▶ Slack (alerte à l'équipe)
                                        ├─▶ Gmail (e-mails)
                                        └─▶ IA de Make (résumé et tri des messages)

Site ──(page Je m'engage)──▶ Make, scénario 2 ──▶ Airtable ──▶ renvoie le nombre de bénévoles (la jauge)
```

Durée totale : environ 1 h 30 la première fois. Tout est gratuit.

---

## Étape A · Créer les comptes (10 min)

1. **Airtable** : [airtable.com](https://airtable.com), « Sign up for free », avec goilard.killian@gmail.com.
2. **Make** : [make.com](https://www.make.com), « Get started free », même adresse. Choisissez la région **EU** si elle est proposée.
3. **Slack** : [slack.com](https://slack.com), « Créer un espace de travail » nommé `Campagne Camille Ferrand`.
4. **Gmail** : votre boîte existante. Créez un filtre pour trier les messages du site : Gmail → barre de recherche → icône de réglages → « À : goilard.killian+vallenoire@gmail.com » → « Créer un filtre » → « Appliquer le libellé » `Campagne`.

---

## Étape B · La base Airtable (20 min)

### B1. Créer la base et importer les modèles

1. Airtable → **Create** → **Start from scratch** → nommez la base `Campagne Camille Ferrand`.
2. Dans la base, bouton **+ Add or import** (en haut, à côté des onglets) → **CSV file** → importez `outils/airtable/benevoles.csv` (dans le dépôt GitHub : ouvrez le fichier, bouton « Download raw file »). Nommez la table **`Benevoles`**, sans accent.
3. Recommencez avec `outils/airtable/messages.csv` → table **`Messages`**.
4. Supprimez la table vide « Table 1 » créée au départ (clic droit sur l'onglet → Delete table).
5. Supprimez la ligne « Exemple (à supprimer) » de chaque table.

### B2. Régler le type de chaque colonne

À l'import, Airtable devine les types et se trompe souvent. Vérifiez chaque colonne : **seule `Horodatage` (et `Réponse envoyée le`) doit être de type Date**. Une colonne `Version consentement` en Date provoque l'erreur Make « Invalid date in parameter ».

Clic sur la petite flèche à droite du nom de colonne → **Edit field** → choisissez le type.

**Table `Benevoles`**

| Colonne | Type Airtable | Options |
| --- | --- | --- |
| Prénom | Single line text | (colonne principale) |
| Contact | Single line text | |
| Type de contact | Single select | `email`, `telephone` |
| Quartier | Single select | `Centre bastide`, `Les Quais`, `Les Coteaux`, `Le Pradet`, `Gare Saint-Jean`, `Hameaux viticoles` |
| Disponibilités | Multiple select | `semaine`, `soir`, `week-end` |
| Missions | Multiple select | `porte-a-porte`, `marche`, `distribution`, `numerique`, `reunions` |
| Horodatage | Date | cochez « Include time », fuseau GMT |
| Consentement | Single line text | (contiendra toujours `oui`) |
| Version consentement | Single line text | |
| ID envoi | Single line text | sert à éviter les doublons |
| Statut | Single select | `Nouveau`, `Rappelé`, `Actif`, `Retiré` |
| Référent | Single line text | rempli à la main par l'équipe |
| Notes | Long text | |

**Table `Messages`**

| Colonne | Type Airtable | Options |
| --- | --- | --- |
| Prénom | Single line text | (colonne principale) |
| E-mail | Email | |
| Type | Single select | `question`, `idee`, `soutien`, `desaccord` |
| Thème | Single select | `pouvoir_achat`, `tranquillite`, `mobilite`, `environnement`, `autre` |
| Message | Long text | |
| Résumé IA | Long text | |
| Catégorie IA | Single select | `normal`, `urgent`, `a_moderer` |
| Thème IA | Single select | mêmes options que Thème |
| Horodatage | Date | avec l'heure |
| ID envoi | Single line text | |
| Statut | Single select | `À traiter`, `Répondu`, `Modéré` |
| Réponse envoyée le | Date | |

### B3. Deux vues pratiques (facultatif)

- `Benevoles` → **Grid view** → « Create » → vue **À rappeler** avec un filtre `Statut = Nouveau`, triée par Horodatage.
- `Messages` → vue **À traiter** avec un filtre `Statut = À traiter`, groupée par Thème IA.

> ⚠️ Les données révèlent une opinion politique (donnée sensible, article 9 du RGPD). Ne partagez **jamais** la base en lecture publique (« Share view » avec lien public) et n'invitez que les membres de l'équipe qui en ont besoin.

---

## Étape C · Slack (5 min)

Dans l'espace `Campagne Camille Ferrand`, créez 4 canaux (bouton **+** à côté de « Canaux ») :

| Canal | Ce qui y arrive |
| --- | --- |
| `#benevoles` | chaque nouvelle inscription |
| `#messages` | chaque message d'habitant, résumé par l'IA |
| `#urgent` | les messages classés urgents |
| `#moderation` | les messages injurieux, hors sujet ou publicitaires |

Conseil RGPD : dans Slack, ne postez que le prénom, le quartier et le résumé, jamais le téléphone ni l'e-mail.

---

## Étape D · Scénario 1 « Formulaires du site » (30 min)

### D1. Le webhook

1. Make → **Scenarios** → **Create a new scenario**.
2. Cliquez sur le gros **+** → cherchez **Webhooks** → **Custom webhook**.
3. **Create a webhook** → nom `site-formulaires` → **Save**. Make affiche une adresse du type `https://hook.eu2.make.com/abc123…` : cliquez sur **Copy address to clipboard**.
4. **Envoyez-moi cette adresse** : je la mets dans le site et je publie (2 minutes). Laissez Make ouvert, sur « Make is waiting for data ».
5. Quand je vous le dis, remplissez **le formulaire bénévole** du site, puis **le formulaire question** : Make apprend tous les champs et affiche « Successfully determined ».

### D2. L'aiguillage

1. Après le webhook, ajoutez **Flow Control** → **Router**.
2. Cliquez sur le trait de la **première route** → **Set up a filter** : nom `Bénévole`, condition `kind` *Equal to* `benevole`.
3. Deuxième route : filtre `Message`, condition `kind` *Equal to* `message`.

### D3. Route « Bénévole »

Pas de module *Search Records* pour détecter les doublons : quand la recherche ne trouve rien, Make s'arrête et la ligne n'est jamais créée. Le site n'envoie qu'une fois par formulaire, les doublons restent rares et se suppriment à la main.

| # | Module | Réglages |
| --- | --- | --- |
| 1 | **Airtable** → *Create a Record* | Connexion : « Add », autorisez votre compte Airtable. Base `Campagne Camille Ferrand`, table `Benevoles`. Prénom = `prenom`, Contact = `contact`, Type de contact = `contact_type`, Quartier = `quartier`, Disponibilités = `{{if(disponibilites; split(disponibilites; ","); emptyarray)}}`, Missions = `{{if(missions; split(missions; ","); emptyarray)}}` (activez l'interrupteur **Map** de ces deux champs), Horodatage = `horodatage`, Consentement = `consentement`, Version consentement = `version_consentement`, ID envoi = `id`, Statut = `Nouveau` |
| 2 | **Slack** → *Create a Message* | connexion à votre espace, canal `#benevoles`, texte : `🙋 Nouveau bénévole : {{prenom}} ({{quartier}}). Dispo : {{disponibilites}}. Missions : {{missions}}. Fiche dans Airtable.` |
| 3 | **Gmail** → *Send an Email* | connexion à goilard.killian@gmail.com. À : `goilard.killian+vallenoire@gmail.com`. Objet : `Nouveau bénévole : {{prenom}}, {{quartier}}`. Contenu : prénom, contact, quartier, disponibilités, missions. |
| filtre | avant le module 4 | condition `contact_type` *Equal to* `email` |
| 4 | **Gmail** → *Send an Email* | À : `{{contact}}`. Objet : `Bienvenue dans l'équipe de Camille Ferrand`. Contenu : merci, un membre de l'équipe vous rappelle dans la semaine, vous pouvez retirer votre accord à tout moment en répondant à cet e-mail. |

Pour un bénévole qui a laissé un **téléphone**, le message Slack suffit : le référent du quartier le rappelle.

### D4. Route « Message »

| # | Module | Réglages |
| --- | --- | --- |
| 1 | **Make AI Tools** → *Summarize* (ou *Ask AI*) | texte : `{{contenu}}`. Consigne : « Résume en une phrase neutre, en français, sans jugement. » |
| 2 | **Make AI Tools** → *Categorize* (ou *Ask AI*) | texte : `{{contenu}}`. Catégories : `normal`, `urgent`, `a_moderer`. Consigne : « urgent = danger, détresse, sécurité immédiate ou journaliste pressé ; a_moderer = injurieux, menaçant, publicitaire ou hors sujet ; sinon normal. Réponds par un seul mot. » |
| 2 bis | **Make AI Tools** → *Categorize* | sans filtre (un filtre ici arrêterait la suite du parcours quand le thème est rempli). Catégories : `pouvoir_achat`, `tranquillite`, `mobilite`, `environnement`, `autre` |
| 3 | **Airtable** → *Create a Record* | table `Messages`. Prénom, E-mail, Type, Thème, Message = `contenu`, Résumé IA = sortie du module 1, Catégorie IA = sortie du module 2, Thème IA = `{{ifempty(theme; sortie du 2 bis)}}`, Horodatage, ID envoi, Statut = `À traiter` |
| 4 | **Router** avec 3 routes | voir ci-dessous |

- **Route `a_moderer`** (filtre Catégorie IA = `a_moderer`) : **Slack** `#moderation` uniquement. Aucun e-mail à l'habitant.
- **Route `urgent`** (filtre Catégorie IA = `urgent`) : **Slack** `#urgent` (`🚨 {{prenom}} · {{type}} : {{résumé}}`) puis **Gmail** à `goilard.killian+vallenoire@gmail.com`, objet `URGENT · {{type}} · {{prenom}}`, puis l'accusé de réception ci-dessous.
- **Route normale** (clic droit sur la route → *Set as fallback route*) : **Slack** `#messages` (`✉️ {{type}} · {{thème}} · {{prenom}} : {{résumé}}`) puis l'accusé de réception.

**Accusé de réception** (Gmail → *Send an Email* à `{{email}}`) : « Bonjour {{prenom}}, votre message est bien arrivé. Il a été transmis à la personne de l'équipe qui suit ce sujet : vous aurez une réponse sous 48 heures. » **L'IA trie et résume, un humain répond toujours** : c'est la promesse affichée sur le site.

> Si « Make AI Tools » n'apparaît pas dans votre compte, utilisez le module **OpenAI** (ou **Anthropic Claude**) → *Create a completion* avec les mêmes consignes, ou supprimez les modules 1, 2 et 2 bis : tout le reste fonctionne sans IA.

### D5. Activer

En bas à gauche : **Scheduling** → *Immediately as data arrives*, puis l'interrupteur **ON**. Enregistrez (icône disquette).

---

## Étape E · Scénario 2 « Compteur de bénévoles » (10 min)

La jauge de la page « Je m'engage » demande à Make combien il y a de bénévoles. Ce scénario ne renvoie **qu'un nombre**, aucune donnée personnelle.

1. **Create a new scenario** → **Webhooks** → *Custom webhook* → **Create a webhook** → nom `site-compteur` → copiez l'adresse.
2. **Airtable** → *Search Records* : table `Benevoles`, formule `{Statut} != "Retiré"`, *Limit* : `1000`.
3. **Tools** → *Numeric aggregator* : *Source module* = le module Airtable, fonction **COUNT**.
4. **Webhooks** → *Webhook response* : *Status* `200`, *Body* : `{"benevoles": {{result}}}` (le résultat du module 3). Ouvrez *Show advanced settings* → *Custom headers* :
   - `Content-Type` : `application/json`
   - `Access-Control-Allow-Origin` : `*`
5. **Scheduling** → *Immediately as data arrives*, interrupteur **ON**.
6. **Envoyez-moi cette deuxième adresse**, je la mets dans le site.

Pour économiser les opérations Make, le site garde le chiffre 15 minutes sur l'appareil du visiteur. Si le scénario ne répond pas, la jauge affiche la valeur de repli de `config.js` (12).

---

## Étape F · Me donner les 2 adresses, puis tester (15 min)

1. Envoyez-moi l'adresse du **webhook `site-formulaires`** et celle du **webhook `site-compteur`**. Je les place dans `config.js` (`makeWebhook` et `compteurUrl`) et je publie.
2. Testez depuis votre téléphone :
   - un bénévole avec un e-mail, un bénévole avec un téléphone ;
   - un message avec thème, un sans thème, un message injurieux (pour la modération).
3. Vérifiez : 2 lignes dans `Benevoles`, 3 dans `Messages`, les bons canaux Slack, les bons e-mails, et la jauge de la page « Je m'engage » qui passe à 2 (après 15 minutes, ou en navigation privée).
4. Dans Make, onglet **History** de chaque scénario : chaque exécution doit être verte.

---

## Ce que le site envoie (référence technique)

```
POST <makeWebhook>
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
```

Le site envoie en mode `no-cors` : il ne lit pas la réponse de Make. Une erreur côté Make (scénario désactivé, quota épuisé) est donc invisible pour l'habitant : activez les alertes d'erreur (Scenario settings → *Notify on errors*). Si `makeWebhook` n'est pas renseigné ou en cas de coupure réseau, le site propose un e-mail **prérempli** vers `emailEquipe` : aucun bénévole n'est perdu. Anti-spam : champ piège invisible `site_web` et refus d'un envoi fait moins de 3 secondes après l'affichage.

**Champs communs** : `kind` (`benevole` ou `message`), `id` (identifiant unique de l'envoi), `page`, `horodatage` (ISO 8601, UTC), `source` (`site`), `version_consentement`, `consentement` (`oui`).

| Formulaire bénévole (`kind=benevole`) | Valeurs |
| --- | --- |
| `prenom` | texte, 2 caractères minimum |
| `contact` | un e-mail **ou** un téléphone français |
| `contact_type` | `email` ou `telephone` (calculé par le site) |
| `quartier` | `Centre bastide` · `Les Quais` · `Les Coteaux` · `Le Pradet` · `Gare Saint-Jean` · `Hameaux viticoles` |
| `disponibilites` | **facultatif** : `semaine`, `soir`, `week-end`, séparés par des virgules (vide si rien n'est coché) |
| `missions` | **facultatif** : `porte-a-porte`, `marche`, `distribution`, `numerique`, `reunions`, séparés par des virgules |

| Formulaire message (`kind=message`) | Valeurs |
| --- | --- |
| `prenom` | texte |
| `email` | e-mail valide |
| `type` | `question` · `idee` · `soutien` · `desaccord` |
| `theme` | `pouvoir_achat` · `tranquillite` · `mobilite` · `environnement` · `autre` · vide |
| `contenu` | texte, 10 à 3 000 caractères |

Exemple de corps reçu (bénévole) :

```
kind=benevole&id=3f6c1a9e-6d0b-4a8e-9b61-0c2f5d7e8a41&page=engagement.html&horodatage=2026-10-03T08%3A42%3A17.512Z&source=site&version_consentement=2026-09&prenom=Nadia&contact=06+12+34+56+78&contact_type=telephone&quartier=Les+Coteaux&disponibilites=soir%2Cweek-end&missions=marche&consentement=oui
```

---

## Suppression des données après l'élection

Promesse du site : suppression **au plus tard un mois après l'élection** (avec la date actuelle : le 12 janvier 2027).

1. Créez un scénario 3, déclenché une seule fois : **Scheduling** → *Once* → date du 12 janvier 2027.
2. Modules : **Airtable** → *Search Records* (table `Benevoles`, sans formule) → **Airtable** → *Delete a Record* (ID = l'ID du module précédent). Même chose pour `Messages`.
3. Ajoutez un message Slack dans `#benevoles` : « Données supprimées conformément à l'engagement RGPD ».
4. Videz aussi l'historique des scénarios Make, le libellé `Campagne` de Gmail et les canaux Slack concernés.

Une demande de suppression individuelle avant cette date se traite à la main : supprimer la ligne Airtable, les messages Slack et les e-mails, puis confirmer à la personne.

---

## Limites des offres gratuites (à vérifier sur les pages tarifs, elles évoluent)

- **Make** : environ 1 000 opérations par mois. Un formulaire en consomme 6 à 10, une lecture du compteur 3. Largement assez pour la démonstration.
- **Airtable** : 1 000 lignes par base.
- **Slack** : historique des messages limité dans le temps.
