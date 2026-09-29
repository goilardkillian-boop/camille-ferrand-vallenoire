# Prompts · Site de Camille Ferrand

## 1. Installer le kit

1. Décompresser `kit-site-camille-ferrand.zip` : le dossier contient déjà `BRIEF.md`, le skill dans `.claude/skills/site-immersif-skill/` et le portrait dans `site/images/camille-ferrand.jpg`.
2. Déposer les images ChatGPT dans `site/images/`, avec les noms du tableau de la partie 3.
3. Ouvrir Claude Code dans ce dossier, puis coller le prompt ci-dessous.

## 2. Prompt Claude Code (à coller tel quel)

```
Construis le site de campagne de Camille Ferrand avec le skill site-immersif-skill.

Tout le cahier des charges est dans BRIEF.md, à la racine du projet : lis-le en entier avant de commencer.
- Les réponses aux 7 questions du skill sont dans la section 2 du brief : ne les repose pas.
- Les seules entorses autorisées au skill sont celles de la section 3. Tout le reste du moteur reste copié à l'identique.
- Le portrait de la candidate est dans site/images/camille-ferrand.jpg. Ne génère et ne retouche jamais d'image de la candidate.
- Les images de l'équipe sont dans site/images/ : ce sont les « photos du client » du skill. Complète le reste avec Unsplash et Pexels selon l'étape 4.2 du skill.
- Positionnement politique : centre, rassembleur, sans étiquette (section 4). Applique-le à chaque texte et à chaque image.
- Aucun tiret cadratin ni demi-cadratin dans les textes du site.

Avant d'écrire du code, montre-moi :
1. l'arborescence des fichiers ;
2. la liste des images par emplacement, avec leur provenance ;
3. les points du brief qui te semblent contradictoires ou risqués.
Attends ma validation. Ensuite, construis dans cet ordre : index.html (skill), config.js, campagne.css et campagne.js, engagement.html, question.html, programme.html, presse.html, pages légales, README.md et MAKE-SETUP.md. Termine par toutes les vérifications de la section 15 et le récapitulatif demandé.
```

## 3. Prompts ChatGPT : images

Ouvrir une nouvelle conversation, coller d'abord la direction artistique, puis une image par message.

**Direction artistique (message 1)**

```
Tu vas générer une série de photos réalistes pour le site de campagne municipale d'une ville fictive du Sud-Ouest de la France, Vallenoire : ancienne bastide du XIIIe siècle, place centrale à arcades en pierre blonde, rues pavées, façades à volets, quais de la Garonne, coteaux de vigne.

Direction artistique commune à toutes les images : photographie documentaire réaliste, plein format, objectif 35 mm, lumière naturelle de fin d'après-midi, tons chauds pierre et beige avec quelques touches de bleu roi (volets, vêtements, vélo), grain léger, rendu naturel sans effet artificiel.

Règles strictes pour chaque image :
- aucun texte, aucune lettre, aucun logo, aucune enseigne lisible ;
- aucun drapeau, aucun symbole politique, aucune affiche électorale, aucun uniforme ;
- pas de visage identifiable en gros plan : personnes de dos, lointaines ou floues ;
- ambiance calme, chaleureuse et positive, jamais dramatique ni menaçante.

Confirme simplement que tu as compris, puis attends mes demandes d'images.
```

**Images principales (format paysage 3:2, 1536 × 1024)**

| Fichier | Prompt |
| --- | --- |
| `hero.jpg` | `Image 1, format paysage 3:2. La place à arcades de Vallenoire un samedi matin de marché : étals de fruits et légumes sous les arcades, quelques habitants de dos avec des paniers, un vélo bleu appuyé contre un pilier, lumière dorée rasante qui traverse les arcades. Cadrage large en perspective, beaucoup d'air dans le haut de l'image.` |
| `benevoles.jpg` | `Image 2, format paysage 3:2. Gros plan sur deux mains qui tiennent une petite pile de flyers blancs totalement vierges, devant une porte d'entrée en bois peinte en bleu, dans une rue pavée ; en arrière-plan flou, une deuxième personne de dos avec un sac en toile. Lumière douce de fin d'après-midi.` |
| `quais.jpg` | `Image 3, format paysage 3:2. Les quais de la Garonne à l'heure bleue, lampadaires anciens allumés le long d'une promenade pavée, deux promeneurs lointains, reflets calmes sur l'eau. Ambiance paisible et rassurante.` |
| `ecole.jpg` | `Image 4, format paysage 3:2. Une rue devant une école élémentaire, fermée aux voitures par des jardinières fleuries ; des enfants de dos avec leurs cartables marchent avec un parent, un vélo cargo, des arbres. Matin lumineux.` |
| `cantine.jpg` | `Image 5, format paysage 3:2. Vue de dessus d'un plateau de cantine scolaire coloré et appétissant : crudités, plat chaud, fromage, fruit, verre d'eau, sur une table en bois clair. Lumière naturelle, rendu simple et sain.` |
| `reunion.jpg` | `Image 6, format paysage 3:2. Réunion de quartier dans une salle communale aux murs clairs : chaises disposées en cercle, habitants de tous âges vus de dos ou de loin, café et gobelets sur une table, grandes fenêtres. Ambiance conviviale.` |
| `coteaux.jpg` | `Image 7, format paysage 3:2. Coteaux de vigne au premier plan, la ville de Vallenoire et son clocher au loin dans la vallée de la Garonne, fin de journée, brume légère.` |

**Détails verticaux pour le nuage d'images (format 2:3, 1024 × 1536)**

```
Série de 6 images verticales 2:3, même direction artistique, une par message :
1. Un pilier d'arcade en pierre blonde avec une ombre portée graphique.
2. Des volets bleus sur une façade en pierre, un pot de géranium.
3. Deux mains qui échangent une baguette au-dessus d'un étal de marché.
4. Un lampadaire ancien allumé au crépuscule dans une rue pavée.
5. Un vélo bleu garé devant une devanture de boulangerie sans enseigne lisible.
6. Deux tasses de café sur une table de terrasse sous les arcades.
Nomme-les detail-1.jpg à detail-6.jpg.
```

## 4. Prompts ChatGPT : logo

**Planche de pistes**

```
Crée une planche de 4 pistes de logo pour la campagne municipale de Camille Ferrand, « la candidate du quotidien » à Vallenoire, ville fictive du Sud-Ouest : ancienne bastide à arcades, au bord de la Garonne.

Positionnement : proximité, protection, rassemblement. Le logo doit être centriste et sans étiquette : il ne doit évoquer aucun parti ni aucun camp politique.

Les 4 pistes, côte à côte sur fond beige #EEE5D7 :
1. Monogramme « CF » dont la lettre C dessine une arche d'arcade.
2. Wordmark « Camille Ferrand » en sans-serif grotesque, graisse bold, légèrement condensée, avec une arche fine au-dessus du nom.
3. Symbole : une arche d'arcade qui encadre une ligne d'horizon ondulée (la Garonne), placé à gauche du nom.
4. Symbole : deux arches qui se chevauchent pour former un V (Vallenoire), placé à gauche du nom.
Sous chaque piste, en petit : « Vallenoire · municipales ».

Contraintes :
- logo plat et vectoriel, deux couleurs : bleu roi #4169E1 et anthracite #192026, avec au plus un petit point corail #E74D3D ;
- pas de dégradé, pas d'ombre, pas de 3D, pas de maquette, pas de fond texturé ;
- lisible à 32 pixels de large ;
- interdits : drapeau, association bleu blanc rouge, Marianne, blason, couronne, flamme, rose, poing, flèche, étoile, feuille de chêne.
Orthographie exactement « Camille Ferrand ».
```

**Développer la piste retenue**

```
Développe uniquement la piste N, en grand et centrée :
1. version couleur sur fond blanc ;
2. version blanche sur fond bleu roi #4169E1 ;
3. icône seule, carrée, pour favicon et photo de profil ;
4. version horizontale et version empilée.
Même règles que précédemment.
```

**Après ChatGPT.** Le texte généré par ChatGPT n'est jamais exactement de l'Archivo, et les lettres peuvent être déformées. Deux options :
- redessiner le logo dans Illustrator (vectorisation dynamique pour le symbole, texte recomposé en Archivo) ;
- ou déposer le PNG retenu dans `site/images/` et demander à Claude Code : « Redessine ce logo en SVG propre, texte en Archivo, couleurs de la charte, et utilise-le dans le header, le favicon et l'espace presse. »

## 5. Scénario Make (gratuit)

1. **Google Sheets** : un fichier avec 3 onglets : `Benevoles`, `Messages`, `Compteur`. Dans `Compteur`, cellule A1 : `=NBVAL(Benevoles!B2:B)`.
2. **Publier le compteur seul** : Fichier → Partager → Publier sur le Web → choisir l'onglet `Compteur` uniquement → format CSV → copier l'URL dans `compteurCsv` de `config.js`. Ne jamais publier les autres onglets.
3. **Make, nouveau scénario** : module Webhooks « Custom webhook » → copier l'URL dans `makeWebhook` de `config.js` → envoyer un formulaire de test depuis le site pour que Make apprenne les champs.
4. **Router**, 2 routes :
   - **filtre `kind` = benevole** : Google Sheets « Add a row » (onglet Benevoles) → Gmail « Send an email » à l'équipe → Gmail message de bienvenue au bénévole si le contact contient « @ ».
   - **filtre `kind` = message** : Make AI Toolkit « Summarize text » (résumé en une phrase) → Make AI Toolkit « Categorize text » (catégories : normal, urgent, a_moderer) → Google Sheets « Add a row » (onglet Messages) → second Router : urgent vers le pôle communication avec « URGENT » dans l'objet ; question, idée, désaccord ou soutien vers le bon référent ; a_moderer : aucun envoi. Puis accusé de réception à l'habitant, sauf en modération.
5. **Budget gratuit** : 1 000 crédits par mois, 2 scénarios actifs (un seul suffit ici). L'IA de Make est incluse dans le plan gratuit, avec une limite de 200 000 jetons en entrée par semaine : largement assez pour la démonstration.
6. **Démo à l'oral** : envoyer un désaccord depuis un téléphone pendant la slide du workflow ; le jury voit l'alerte arriver et la ligne s'ajouter dans Google Sheets. Filmer une démo réussie la veille, au cas où.
