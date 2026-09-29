---
version: 1.0
name: Camille-Ferrand-Vallenoire
description: Système de design du site de campagne (fictif) de Camille Ferrand à Vallenoire. Un registre civique et rassurant, lisible avant tout par les 60 ans et plus : grands titres en Archivo condensé, texte courant large, fond beige chaud, cartes blanches, un seul bleu roi pour agir, le corail en simple ponctuation.

colors:
  bleu: "#4169E1"          # actions principales, bandes, pictogrammes
  bleu-fonce: "#3457C9"    # liens, survol, texte bleu sur fond clair
  bleu-pale: "#EEF2FC"     # fonds de sélection, étiquettes
  anthracite: "#192026"    # texte, pied de page, fonds sombres
  gris: "#4F5660"          # texte secondaire (5,9:1 sur beige)
  beige: "#EEE5D7"         # fond principal
  beige-clair: "#F7F2EA"   # sections alternées, encadrés
  blanc: "#FFFFFF"         # cartes, champs
  corail: "#E74D3D"        # ponctuation : chiffres clés, filets (jamais de texte courant)
  corail-texte: "#B8321F"  # messages d'erreur (6,0:1 sur blanc)
  succes: "#1E7A45"        # confirmations (5,4:1 sur blanc)
  bordure: "#6B7280"       # bords des champs (4,8:1 sur blanc)

typography:
  famille: "Archivo, system-ui, sans-serif (variable : largeur 62 à 125 %, graisse 300 à 800)"
  famille-lisible: "Atkinson Hyperlegible Next (option « police très lisible »)"
  base: "1.125rem (18 px), interligne 1.6"
  affiche: "800, largeur 80 %, clamp(2.5rem, 6vw, 5.25rem), interligne 1"
  titre: "800, largeur 86 %, clamp(2rem, 4vw, 3.25rem), interligne 1.08"
  sous-titre: "700, 1.375rem à 1.625rem, interligne 1.25"
  chapo: "400, 1.25rem, interligne 1.55"
  petit: "1rem minimum, jamais en dessous"
  chiffres: "800, largeur 82 %, chiffres tabulaires"

spacing:
  unite: "0.5rem"
  sections: "clamp(4rem, 9vw, 7.5rem) en haut et en bas"
  gouttiere: "clamp(1rem, 4vw, 3.5rem)"
  largeur-texte: "68ch maximum"
  largeur-page: "74rem"

radius:
  carte: "12px"
  bouton: "999px"
  champ: "10px"

elevation:
  carte: "0 1px 2px rgba(25,32,38,.06), 0 8px 24px rgba(25,32,38,.07)"
---

# Camille Ferrand · Système de design

## Intention

Un site de campagne municipale lu d'abord par des gens pressés ou peu à l'aise avec le numérique : parents de 41 à 50 ans, retraités, journalistes locaux. Chaque choix sert la lecture et l'action, jamais l'effet. Le ton visuel est civique, chaleureux et neutre politiquement : **aucun drapeau, aucune composition bleu, blanc, rouge, aucun symbole partisan, aucune imitation de charte municipale**.

## Couleurs

- **Bleu roi** `#4169E1` : la seule couleur d'action. Boutons principaux, bande de la devise, pictogrammes. Texte blanc dessus : 4,85:1 (texte de 18 px gras minimum).
- **Bleu foncé** `#3457C9` : tous les liens et le texte bleu sur fond clair (5,02:1 sur beige, 6,26:1 sur blanc).
- **Anthracite** `#192026` : texte courant (13,2:1 sur beige), pied de page.
- **Gris** `#4F5660` : texte secondaire (5,9:1 sur beige, 7,4:1 sur blanc). Plus sombre que le gris de la charte (#5A6069) pour garder une marge confortable.
- **Beige** `#EEE5D7` et **beige clair** `#F7F2EA` : fonds. **Blanc** : cartes et champs.
- **Corail** `#E74D3D` : ponctuation. Chiffres clés de 40 px et plus, petits filets. Moins d'un dixième de la surface, jamais en aplat à côté du bleu, jamais pour du texte courant. Les erreurs utilisent `#B8321F`, toujours accompagné d'un pictogramme et d'un texte (jamais la couleur seule).

## Typographie

- **Archivo** partout. Titres d'affiche en 800 condensé (largeur 80 %), titres de section en 800 (86 %), texte courant en 400 à **18 px minimum**, interligne 1,6.
- Tailles en `rem` : le site respecte la taille de texte réglée dans le navigateur, et le réglage « Taille du texte » du site multiplie tout.
- Pas de majuscules sur plus de quatre mots. Les petits libellés en capitales font au moins 15 px, espacés de 0,06 em.
- Lignes de 68 caractères au plus. Titres en `text-wrap: balance`, paragraphes en `text-wrap: pretty`.
- Typographie française : espace insécable avant `: ; ! ?`, guillemets « », points de suspension `…`, **jamais de tiret cadratin ni demi-cadratin** (utiliser « · », « : » ou une virgule).

## Mise en page

- Une colonne sur mobile, deux au plus pour le texte sur ordinateur. Largeur de page 74 rem.
- Rythme vertical généreux : sections de 4 à 7,5 rem. Alternance beige, blanc et bleu pour découper le récit.
- En-tête collant de 72 px avec `scroll-padding-top` pour que le focus et les ancres ne passent jamais dessous.
- Points de rupture : 480, 760, 1060 px. Tout fonctionne de 320 px à 2560 px et à 400 % de zoom, sans défilement horizontal.

## Composants

- **Bouton principal** : pilule bleue, texte blanc 700, hauteur 3.25 rem (52 px), libellé qui dit l'action (« Je rejoins l'équipe »). Survol : bleu foncé. Focus : anneau de 3 px bleu foncé à 3 px de distance.
- **Bouton secondaire** : pilule contour anthracite 2 px.
- **Lien** : bleu foncé, **toujours souligné** dans le texte (le soulignement n'est jamais retiré, seulement épaissi au survol).
- **Carte** : blanche, rayon 12 px, ombre légère, padding 1.5 à 2 rem.
- **Champ de formulaire** : libellé visible au-dessus (jamais seulement un placeholder), aide sous le libellé, bord 1.5 px `#6B7280`, hauteur 3.25 rem, erreur sous le champ avec pictogramme et texte, résumé des erreurs en haut du formulaire.
- **Cases et boutons radio** : grandes pastilles cliquables de 48 px de haut, la zone entière est cliquable.
- **Accordéon** : `<details>` natif (fonctionne sans JavaScript, au clavier et avec les lecteurs d'écran).
- **Préférences d'affichage** : bouton « Affichage » dans l'en-tête, fenêtre `<dialog>` native. Taille du texte (3 niveaux), contraste renforcé, espacement du texte (critère WCAG 1.4.12), police très lisible, animations coupées. Choix mémorisés sur l'appareil.
- **Écouter la page** : lecture à voix haute du contenu principal par la synthèse vocale du navigateur, avec pause et arrêt.

## Mouvement

- Uniquement `opacity` et `transform`, 300 à 900 ms, courbe `cubic-bezier(.19, 1, .22, 1)`.
- Rien ne dépend du mouvement : le contenu est visible sans JavaScript et sans animation.
- `prefers-reduced-motion` et le réglage « Animations » du site coupent tout.
- La version animée (`experience.html`) est une option, jamais le parcours par défaut.

## Accessibilité (objectif WCAG 2.2 AA, RGAA 4.1)

- Structure : un seul `h1`, titres hiérarchisés, repères `header`, `nav`, `main`, `footer`, lien d'évitement, fil d'Ariane, plan du site.
- Clavier : tout est atteignable et visible au focus, ordre logique, pas de piège.
- Cibles tactiles de 48 × 48 px minimum (44 px au strict minimum pour les liens dans le texte).
- Formulaires : `autocomplete`, bon `type`, `inputmode`, erreurs reliées par `aria-describedby`, résumé d'erreurs focalisé, bouton actif jusqu'à l'envoi.
- Images : `alt` descriptif, `alt=""` pour la décoration, `width` et `height` toujours renseignés.
- Langue : `lang="fr"`, `translate="no"` sur le nom de la candidate.
- Contenus alternatifs : version « Facile à lire et à comprendre » du programme, tableaux en complément des cartes et du plan des quartiers.

## À ne pas faire

- Pas de défilement détourné, de texte qui n'apparaît qu'au scroll, de carrousel automatique, de fenêtre surgissante.
- Pas de fausse urgence, de faux témoignage, de compteur truqué.
- Pas de texte de moins de 16 px, pas de texte gris clair, pas de lien non souligné dans le texte.
- Pas de couleur seule pour porter une information.
