#!/usr/bin/env python3
"""
Construit les pages HTML du site (dossier site/) à partir des gabarits
de outils/gabarits/. Utile seulement pour modifier la structure commune
(en-tête, menu, pied de page) ou le contenu d'une page ; le site publié
reste 100 % statique et n'a besoin d'aucune étape de build.

Usage : python3 outils/construire.py
"""
import hashlib
import html
import json
import re
from pathlib import Path

import mesures

RACINE = Path(__file__).resolve().parent.parent
SITE = RACINE / 'site'
GABARITS = Path(__file__).resolve().parent / 'gabarits'

URL_SITE = 'https://goilardkillian-boop.github.io/camille-ferrand-vallenoire/'
NOM = 'Camille Ferrand'

# ─── Pages : (fichier, titre court, titre <title>, description, fil d'Ariane parent) ───
PAGES = [
    ('index.html', 'Accueil', 'Camille Ferrand, candidate à Vallenoire (projet étudiant)',
     'Camille Ferrand, la candidate du quotidien à Vallenoire : factures allégées, ville plus apaisée, déplacements plus simples. Projet étudiant : candidate et ville fictives.', None),
    ('programme.html', 'Programme', 'Le programme : 24 mesures pour Vallenoire',
     'Les 24 mesures de Camille Ferrand pour Vallenoire, avec pour chacune le public, le levier municipal et le calendrier. Simulateur et carte des quartiers. Projet étudiant.', None),
    ('facile-a-lire.html', 'Facile à lire', 'Le programme en facile à lire et à comprendre',
     'Le programme de Camille Ferrand expliqué avec des phrases courtes et des mots de tous les jours. Projet étudiant : candidate et ville fictives.', 'programme.html'),
    ('engagement.html', 'Je m’engage', 'Devenir bénévole et agenda des rencontres',
     'Rejoignez l’équipe de Camille Ferrand à Vallenoire : 2 heures par semaine suffisent. Missions, inscription et prochains rendez-vous. Projet étudiant.', None),
    ('je-vote.html', 'Je vote', 'Voter aux municipales : inscription, procuration, date',
     'Vérifier son inscription, faire une procuration, préparer le jour du vote : toutes les étapes pour voter à Vallenoire. Projet étudiant.', None),
    ('question.html', 'Une question ?', 'Poser une question ou donner votre avis',
     'Question, idée, soutien ou désaccord : écrivez à l’équipe de Camille Ferrand. Chaque message est lu, réponse sous 48 heures. Projet étudiant.', None),
    ('presse.html', 'Presse', 'Espace presse : biographie, visuels, contact',
     'Espace presse de Camille Ferrand : biographies, portrait, logo, palette, communiqués et contact. Projet étudiant : candidate et ville fictives.', None),
    ('accessibilite.html', 'Accessibilité', 'Accessibilité du site',
     'Déclaration d’accessibilité, réglages d’affichage et contact pour signaler un problème. Projet étudiant.', None),
    ('plan-du-site.html', 'Plan du site', 'Plan du site', 'Toutes les pages du site de Camille Ferrand. Projet étudiant.', None),
    ('mentions-legales.html', 'Mentions légales', 'Mentions légales', 'Mentions légales du site de campagne fictif de Camille Ferrand. Projet étudiant.', None),
    ('donnees.html', 'Données personnelles', 'Vos données personnelles',
     'Comment l’équipe de Camille Ferrand utilise et protège vos données personnelles. Projet étudiant.', None),
    ('404.html', 'Page introuvable', 'Page introuvable', 'Cette page n’existe pas ou a changé d’adresse.', None),
]

NAV = [('programme.html', 'Programme'), ('engagement.html', 'Je m’engage'), ('je-vote.html', 'Je vote'),
       ('question.html', 'Une question ?'), ('presse.html', 'Presse')]

LOGO = ('<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect width="64" height="64" rx="14" fill="#4169E1"/>'
        '<path d="M14 50V30a18 18 0 0 1 36 0v20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>'
        '<circle cx="32" cy="40" r="5" fill="#fff"/></svg>')

ICONES = {
    'affichage': '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="7" r="2.5" fill="#fff" stroke="currentColor" stroke-width="2"/><circle cx="15" cy="17" r="2.5" fill="#fff" stroke="currentColor" stroke-width="2"/></svg>',
    'menu': '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    'ecouter': '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    'fb': '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z"/></svg>',
    'wa': '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 20l1.2-3.6A8 8 0 1 1 8 19z"/></svg>',
    'lien': '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
}

NOUVEL_ONGLET = '<span class="sr-only"> (nouvel onglet)</span>'


def tete(fichier, titre_court, titre, description, profondeur_ariane):
    url = URL_SITE + ('' if fichier == 'index.html' else fichier)
    donnees = [{
        '@context': 'https://schema.org', '@type': 'WebSite', 'name': 'Camille Ferrand · Vallenoire',
        'url': URL_SITE, 'inLanguage': 'fr-FR',
        'description': 'Site de campagne municipale fictif, réalisé dans le cadre d’un projet étudiant.'
    }, {
        '@context': 'https://schema.org', '@type': 'Person', 'name': NOM,
        'description': 'Candidate fictive aux élections municipales de Vallenoire (ville fictive), projet étudiant.',
        'image': URL_SITE + 'images/camille-ferrand.jpg', 'url': URL_SITE
    }]
    if fichier != 'index.html' and fichier != '404.html':
        chemin = [('Accueil', URL_SITE)]
        if profondeur_ariane:
            parent = next(p for p in PAGES if p[0] == profondeur_ariane)
            chemin.append((parent[1], URL_SITE + parent[0]))
        chemin.append((titre_court, url))
        donnees.append({'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': u} for i, (n, u) in enumerate(chemin)]})
    titre_complet = f'{titre} · Camille Ferrand, Vallenoire (projet étudiant)' if fichier != 'index.html' else titre
    # La page 404 est servie à n'importe quelle adresse : ses liens partent de la racine du site
    base = f'\n  <base href="{URL_SITE.split(".io", 1)[1]}">' if fichier == '404.html' else ''
    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">{base}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(titre_complet, quote=False)}</title>
  <meta name="description" content="{html.escape(description)}">
  <!-- Projet étudiant : le site ne doit pas apparaître dans les moteurs de recherche.
       Pour l'ouvrir un jour, remplacer "noindex, nofollow" par "index, follow". -->
  <meta name="robots" content="noindex, nofollow">
  <link rel="canonical" href="{url}">
  <meta name="theme-color" content="#4169E1">
  <meta name="color-scheme" content="light">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Camille Ferrand · Vallenoire">
  <meta property="og:title" content="{html.escape(titre)}">
  <meta property="og:description" content="{html.escape(description)}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{URL_SITE}images/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Camille Ferrand, sur fond bleu, avec le slogan : Vallenoire, le quotidien d’une ville qui nous facilite la vie">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&amp;display=swap" rel="stylesheet">
  <script>
    /* Préférences d'affichage appliquées avant l'affichage (voir campagne.js) */
    (function (r) {{
      r.classList.add('js');
      try {{
        var t = localStorage.getItem('cf-texte');
        if (t === 'grand') r.classList.add('texte-grand');
        if (t === 'tres-grand') r.classList.add('texte-tres-grand');
        [['cf-contraste', 'contraste'], ['cf-espace', 'espace'], ['cf-lisible', 'lisible'], ['cf-sans-animation', 'sans-animation']]
          .forEach(function (p) {{ if (localStorage.getItem(p[0]) === '1') r.classList.add(p[1]); }});
      }} catch (e) {{}}
    }})(document.documentElement);
  </script>
  <link rel="stylesheet" href="campagne.css">
  <script type="application/ld+json">{json.dumps(donnees, ensure_ascii=False)}</script>
</head>
'''


def entete(fichier):
    courant = ' aria-current="page"'
    lien = lambda f, l: f'<li><a href="{f}"{courant if f == fichier else ""}>{l}</a></li>'
    nav = ''.join(lien(f, l) for f, l in NAV)
    nav_mobile = ''.join(lien(f, l) for f, l in [('index.html', 'Accueil')] + NAV + [('facile-a-lire.html', 'Facile à lire')])
    return f'''<body class="page">
  <a class="lien-evitement" href="#contenu">Aller au contenu</a>
  <aside class="bandeau" aria-label="Avertissement"><p><strong>Projet étudiant · candidate et ville fictives</strong></p><p class="compte" data-compte></p></aside>
  <header class="entete">
    <div class="conteneur entete-in">
      <a class="marque" href="index.html">{LOGO}<span translate="no">Camille Ferrand</span><span class="sr-only">, accueil</span></a>
      <nav class="nav-principale" aria-label="Navigation principale"><ul>{nav}</ul></nav>
      <div class="outils">
        <button class="btn-outil" type="button" data-ouvrir-affichage aria-haspopup="dialog">{ICONES["affichage"]}<span class="libelle">Affichage</span></button>
        <a class="btn btn-bleu btn-petit btn-engage" href="engagement.html">Je m’engage</a>
        <button class="btn-outil btn-menu" type="button" data-ouvrir-menu aria-haspopup="dialog" aria-expanded="false" aria-controls="menu-mobile">{ICONES["menu"]}<span>Menu</span></button>
      </div>
    </div>
  </header>

  <dialog class="menu-mobile" id="menu-mobile" aria-label="Menu">
    <div class="dedans">
      <div class="haut">
        <a class="marque" href="index.html">{LOGO}<span translate="no">Camille Ferrand</span></a>
        <button class="btn-outil" type="button" data-fermer>Fermer</button>
      </div>
      <nav aria-label="Menu principal"><ul>{nav_mobile}</ul></nav>
      <div class="bas">
        <button class="btn-outil" type="button" data-ouvrir-affichage aria-haspopup="dialog">{ICONES["affichage"]}<span>Réglages d’affichage</span></button>
        <p>Projet étudiant · candidate et ville fictives</p>
      </div>
    </div>
  </dialog>

  <dialog class="panneau" id="panneau-affichage" aria-labelledby="titre-affichage">
    <form method="dialog">
      <div class="haut">
        <h2 id="titre-affichage">Réglages d’affichage</h2>
        <button class="btn-outil" type="button" data-fermer>Fermer</button>
      </div>
      <p class="discret">Vos choix restent enregistrés sur cet appareil pour toutes les pages.</p>
      <fieldset>
        <legend>Taille du texte</legend>
        <div class="choix">
          <label><input type="radio" name="texte" value="normal"> Normale</label>
          <label><input type="radio" name="texte" value="grand"> Grande</label>
          <label><input type="radio" name="texte" value="tres-grand"> Très grande</label>
        </div>
      </fieldset>
      <div>
        <label class="interrupteur"><span>Contraste renforcé<span class="aide">Texte noir sur fond blanc, bords marqués.</span></span><input type="checkbox" name="contraste" role="switch"></label>
        <label class="interrupteur"><span>Texte plus espacé<span class="aide">Plus d’air entre les lignes, les mots et les lettres.</span></span><input type="checkbox" name="espace" role="switch"></label>
        <label class="interrupteur"><span>Police très lisible<span class="aide">Lettres plus faciles à distinguer, utile en cas de dyslexie ou de vue basse.</span></span><input type="checkbox" name="lisible" role="switch"></label>
        <label class="interrupteur"><span>Couper les animations<span class="aide">Aucun mouvement à l’écran.</span></span><input type="checkbox" name="animation" role="switch"></label>
      </div>
      <p class="discret" data-affichage-etat role="status"></p>
      <div class="actions">
        <button class="btn btn-bleu btn-petit" type="button" data-fermer>Terminé</button>
        <button class="btn btn-contour btn-petit" type="button" data-reinitialiser>Revenir à l’affichage par défaut</button>
      </div>
    </form>
  </dialog>
'''


def ariane(fichier, titre_court, parent):
    if fichier in ('index.html', '404.html'):
        return ''
    items = ['<li><a href="index.html">Accueil</a></li>']
    if parent:
        p = next(x for x in PAGES if x[0] == parent)
        items.append(f'<li><a href="{p[0]}">{p[1]}</a></li>')
    items.append(f'<li><span aria-current="page">{titre_court}</span></li>')
    return f'<nav class="ariane conteneur" aria-label="Fil d’Ariane"><ol>{"".join(items)}</ol></nav>\n'


ECOUTER = f'''<div class="ecouter" data-lecture data-pas-lire>
            <button class="btn-outil" type="button" data-lire>{ICONES["ecouter"]}<span>Écouter cette page</span></button>
            <button class="btn-outil" type="button" data-pause hidden>Pause</button>
            <button class="btn-outil" type="button" data-stop hidden>Arrêter</button>
            <p data-lecture-etat role="status"></p>
          </div>'''

PARTAGE = f'''<div class="partage" data-partage>
              <span>Partager</span>
              <a data-partage-facebook href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener">{ICONES["fb"]}Facebook{NOUVEL_ONGLET}</a>
              <a data-partage-whatsapp href="https://wa.me/" target="_blank" rel="noopener">{ICONES["wa"]}WhatsApp{NOUVEL_ONGLET}</a>
              <button type="button" data-copier hidden>{ICONES["lien"]}Copier le lien</button>
              <p class="sr-only" data-copie-etat role="status"></p>
            </div>'''


def pied(fichier):
    flottant = '' if fichier in ('engagement.html', '404.html') else \
        '\n    <a class="btn btn-bleu cta-flottant" href="engagement.html">Je m’engage <span class="fleche" aria-hidden="true">→</span></a>'
    return f'''
  <footer class="pied">
    <div class="conteneur">
      <div class="pied-haut">
        <div>
          <a class="marque" href="index.html">{LOGO}<span translate="no">Camille Ferrand</span></a>
          <p class="slogan">Vallenoire, le quotidien d’une ville qui nous facilite la vie !</p>
          {PARTAGE}
        </div>
        <nav aria-labelledby="pied-programme">
          <h2 id="pied-programme">Le projet</h2>
          <ul>
            <li><a href="programme.html">Le programme</a></li>
            <li><a href="facile-a-lire.html">Le programme en facile à lire</a></li>
            <li><a href="programme.html#simulateur">Ce que je gagne</a></li>
            <li><a href="programme.html#quartiers">Quartier par quartier</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="pied-agir">
          <h2 id="pied-agir">Agir</h2>
          <ul>
            <li><a href="engagement.html">Je m’engage</a></li>
            <li><a href="engagement.html#agenda">Les prochains rendez-vous</a></li>
            <li><a href="je-vote.html">Je vote</a></li>
            <li><a href="question.html">Poser une question</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="pied-infos">
          <h2 id="pied-infos">Informations</h2>
          <ul>
            <li><a href="presse.html">Espace presse</a></li>
            <li><a href="accessibilite.html">Accessibilité</a></li>
            <li><a href="plan-du-site.html">Plan du site</a></li>
            <li><a href="mentions-legales.html">Mentions légales</a></li>
            <li><a href="donnees.html">Données personnelles</a></li>
            <li><a href="experience.html">Version animée</a></li>
            <li><a data-config="emailEquipe" href="question.html">Écrire à l’équipe</a></li>
            <li><a data-reseau="facebook" href="#" hidden target="_blank" rel="noopener">Facebook{NOUVEL_ONGLET}</a><span data-bientot class="discret">Facebook et Instagram : bientôt</span></li>
            <li><a data-reseau="instagram" href="#" hidden target="_blank" rel="noopener">Instagram{NOUVEL_ONGLET}</a></li>
          </ul>
        </nav>
      </div>
      <div class="pied-bas">
        <p>© 2026 · Vallenoire, vallée de la Garonne</p>
        <p><strong>Projet étudiant · candidate et ville fictives</strong></p>
      </div>
    </div>{flottant}
  </footer>

  <script src="config.js"></script>
  <script src="campagne.js" defer></script>
</body>
</html>
'''


def typographie(texte):
    """Espaces insécables de la typographie française, hors balises, scripts et styles."""
    morceaux = re.split(r'(<script[\s\S]*?</script>|<style[\s\S]*?</style>|<[^>]+>)', texte)
    for i, m in enumerate(morceaux):
        if not m or m.startswith('<'):
            continue
        m = re.sub(r' ([:;!?»])', '\u00a0\\1', m)
        m = re.sub(r'« ', '«\u00a0', m)
        m = re.sub(r'(\d) (%|€|h\b|heures|km|ans\b)', '\\1\u00a0\\2', m)
        morceaux[i] = m
    return ''.join(morceaux)


def version(nom):
    """Empreinte courte du fichier : change dès que le fichier change, ce qui
    oblige les navigateurs à recharger la nouvelle version (pas de mélange
    entre une ancienne feuille de style en cache et une nouvelle page)."""
    return hashlib.sha1((SITE / nom).read_bytes()).hexdigest()[:10]


def versionner(page):
    for nom in ('campagne.css', 'campagne.js', 'config.js', 'styles.css', 'app.js', 'content.js'):
        page = re.sub(r'(["\'])' + re.escape(nom) + r'(\?v=\w+)?\1', lambda m: f'{m.group(1)}{nom}?v={version(nom)}{m.group(1)}', page)
    return page


def main():
    for fichier, court, titre, description, parent in PAGES:
        corps = (GABARITS / fichier).read_text(encoding='utf-8')
        corps = corps.replace('{{ECOUTER}}', ECOUTER).replace('{{PARTAGE}}', PARTAGE).replace('{{MESURES}}', mesures.html())
        page = (tete(fichier, court, titre, description, parent) + entete(fichier)
                + '\n  <main id="contenu" tabindex="-1">\n' + ariane(fichier, court, parent)
                + corps + '  </main>\n' + pied(fichier))
        page = versionner(typographie(page))
        (SITE / fichier).write_text(page, encoding='utf-8')
        print('écrit', fichier)
    # La version animée n'est pas générée : on met seulement à jour ses numéros de version
    exp = SITE / 'experience.html'
    exp.write_text(versionner(exp.read_text(encoding='utf-8')), encoding='utf-8')
    print('versions mises à jour dans experience.html')
    # Plan du site pour les moteurs (inutile tant que le site est en noindex, prêt pour plus tard)
    urls = ''.join(f'  <url><loc>{URL_SITE}{"" if f == "index.html" else f}</loc></url>\n' for f, *_ in PAGES if f != '404.html')
    (SITE / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '</urlset>\n', encoding='utf-8')
    print('écrit sitemap.xml')


if __name__ == '__main__':
    main()
