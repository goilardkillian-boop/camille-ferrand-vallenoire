---
version: 2.0
name: Camille-Ferrand-Vallenoire
description: Système de design du site de campagne (fictif) de Camille Ferrand à Vallenoire. Direction « le lieu porte tout » : les photographies de la bastide font le travail, la mise en page s'efface. Aplats, angles droits, aucune ombre au repos, aucun filet décoratif, Archivo condensé en très grand, un seul bleu roi pour agir. Lisible avant tout par les 60 ans et plus.

colors:
  bleu: "#4169E1"          # actions principales, bandes de couleur, tuile du plan
  bleu-fonce: "#3457C9"    # liens, survol, texte bleu sur fond clair
  bleu-pale: "#E6ECFB"     # étiquettes, cases cochées
  anthracite: "#192026"    # encre, carte du quartier, pied de page
  gris: "#4F5660"          # texte secondaire (5,9:1 sur beige)
  beige: "#EEE5D7"         # champs de couleur alternés (charte)
  beige-clair: "#F6F1E9"   # panneaux posés sur fond blanc
  blanc: "#FFFFFF"         # fond de page, panneaux posés sur beige
  corail-texte: "#B8321F"  # chiffres clés et erreurs (jamais en aplat à côté du bleu)
  succes: "#1E7A45"        # confirmations
  bordure: "#6B7280"       # bords des vrais champs de formulaire

typography:
  famille: "Archivo, hébergée sur le site (fonts/, licence OFL), variable : largeur 62 à 125 %, toutes les graisses de 100 à 900, romain et italique"
  famille-lisible: "Atkinson Hyperlegible Next, hébergée sur le site (option « police très lisible »)"
  nom-du-heros: "900, largeur 62 %, capitales, s'adapte pour occuper toute la largeur"
  affiche: "850, largeur 72 %, clamp(2.5rem, 5vw, 4.5rem), interligne 1"
  titre: "800, clamp(1.5rem, 2.6vw, 2.25rem)"
  chapo: "350, 1.375rem, interligne 1.5"
  texte: "1.125rem (18 px), interligne 1.6"
  petit: "1rem minimum, jamais en dessous"

spacing:
  sections: "clamp(5rem, 11vw, 10rem) en haut et en bas"
  gouttiere: "clamp(1.25rem, 3.2vw, 3rem), la même partout, des deux côtés"
  largeur-texte: "68ch maximum"
  largeur-page: "92rem"

radius:
  partout: "0 (angles droits) ; seuls les interrupteurs du panneau Affichage sont ronds"

elevation:
  repos: "aucune ombre ; les surfaces se distinguent par un pas de ton"
  flottant: "seuls la barre d'en-tête pendant le défilement et la fenêtre Affichage ont une ombre"
---

# Camille Ferrand · Système de design

## Intention

Un site de campagne municipale lu d'abord par des gens pressés ou peu à l'aise avec le numérique : parents de 41 à 50 ans, retraités, journalistes locaux. Chaque choix sert la lecture et l'action. Le ton visuel est civique, chaleureux et neutre politiquement : **aucun drapeau, aucune composition bleu, blanc, rouge, aucun symbole partisan, aucune imitation de charte municipale**.

**L'idée** : la bastide de 1283 porte la page. Le héros montre la place à arcades en plein cadre, avec « Vallenoire » posé sur le bord bas comme un titre de film. Ensuite, chaque section part d'un élément propre à la ville et à la candidate : les six quartiers (élément interactif « Dans votre quartier »), le calendrier du mandat, le plan où vit Camille.

Construit avec les skills de design Taste Skill (direction « The place carries it », vérifiée par son inspecteur), Impeccable (plancher de qualité) et frontend-design.

## Couleurs

- **Un fond, une encre, un accent.** Fond blanc, encre anthracite, bleu roi pour l'action.
- **Bleu roi** `#4169E1` : boutons principaux, champs de couleur (bande des valeurs, appel final), tuile du plan. Texte blanc dessus : 4,85:1, gras.
- **Bleu foncé** `#3457C9` : liens et texte bleu sur fond clair.
- **Beige** `#EEE5D7` (charte) : champs alternés. Les panneaux posés dessus sont blancs ; sur fond blanc, ils sont beige clair. Jamais d'ombre ni de filet pour séparer.
- **Corail** : ponctuation seulement, en version texte `#B8321F` (chiffres clés, erreurs), jamais en aplat à côté du bleu.

## Typographie

- **Archivo** partout, hébergée sur le site (plus d'appel à Google Fonts), avec toute sa gamme de graisses : 900 pour le nom et les grands chiffres, 850 pour les affiches, 750 pour les petits titres, 550 pour le menu, 450 à 500 pour les phrases d'accroche et la citation (en italique), 300 à 350 pour les chapôs. Le texte courant reste à 400.
- **Cinq tailles** de texte, plus le nom du héros : affiche, titre, chapo, texte, petit. Pas de taille intermédiaire.
- **Pas de surtitre**, de petit libellé au-dessus d'un titre, de capitales espacées en petit corps, de numérotation 01 / 02 / 03, de police à chasse fixe.
- Titres de deux lignes au plus, à toutes les largeurs.
- Typographie française : espace insécable avant `: ; ! ?`, guillemets « », **jamais de tiret cadratin ni demi-cadratin**.

## Mise en page

- Une paire de marges égales à toutes les largeurs ; les grands éléments (photos, champs de couleur) vont bord à bord.
- Pas de grand vide autour des photos : chaque photo occupe sa colonne en entier, et le texte se pose en face, à hauteur égale.
- Chaque section a sa propre composition : rangées en quinconce (grande photo, texte en face, côté alterné), rangée qui défile à l'horizontale, vue plein cadre avec carte d'encre, mosaïque photo et tuile de couleur, chiffre posé sur le bord d'une photo, information pratique en deux colonnes, trois photos puis un champ bleu.
- Le pied de page est une fermeture dessinée : une photo des arcades d'un côté, le menu en grand de l'autre.

## Composants

- **Bouton principal** : rectangle plein, bleu roi ou papier sur photo, texte 700, hauteur 3.25 rem. Le libellé dit l'action.
- **Bouton secondaire** : rectangle contour anthracite 2 px.
- **Lien** : bleu foncé, **toujours souligné** (2 px).
- **Panneau** : aplat (beige clair sur blanc, blanc sur beige), aucun rayon, aucune ombre.
- **Champ de formulaire** : libellé visible au-dessus, bord 2 px `#6B7280` (un vrai champ garde son bord), angles droits, erreur sous le champ avec pictogramme et texte, résumé des erreurs en haut.
- **Accordéon** : `<details>` natif ; le signe + d'un carré anthracite pivote en ×.
- **Préférences d'affichage** : bouton « Affichage », fenêtre `<dialog>`. Taille du texte, contraste renforcé, espacement du texte, police très lisible, animations coupées.
- **Écouter la page** : synthèse vocale du navigateur, avec pause et arrêt.

## Mouvement

- Uniquement `opacity` et `transform`. Tout part d'un état visible : sans JavaScript ou animations coupées, le contenu est là.
- Le moment fort : la bande « Protéger • Écouter • Rassembler » qui défile, avec un **bouton pause** (critère WCAG 2.2.2), arrêtée au survol, au focus et en mouvement réduit.
- Le héros : la photo recule doucement, le nom monte, puis la phrase.
- Entrées en cascade au défilement (titre, texte, image), légers zooms des photos au survol.
- `prefers-reduced-motion` et le réglage « Animations » du site coupent tout. La version animée (`experience.html`) reste une option.

## Accessibilité (objectif WCAG 2.2 AA, RGAA 4.1)

- Un seul `h1` (« Camille Ferrand pour Vallenoire »), titres hiérarchisés, repères, lien d'évitement, fil d'Ariane, plan du site.
- Clavier : tout est atteignable ; la rangée du calendrier défile au clavier et par deux boutons.
- Plus de bouton flottant : il masquait des titres et le focus clavier (critère WCAG 2.4.11).
- Cibles de 48 px de haut, texte de 16 px minimum, texte courant à pleine encre.
- Texte blanc sur photo : toujours sur un voile neutre sombre, sous le texte seulement.

## À ne pas faire

- Pas d'ombre au repos, de dégradé décoratif, de filet, de verre dépoli, de carte à icône en série.
- Pas de surtitre, de numérotation décorative, de mot isolé stylé dans un titre.
- Pas de défilement détourné, de carrousel automatique, de fenêtre surgissante, de fausse urgence.
- Pas de couleur seule pour porter une information.
