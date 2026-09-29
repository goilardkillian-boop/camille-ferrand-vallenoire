/* ═══════════════════════════════════════════════════════════
   CAMILLE FERRAND · VALLENOIRE · content.js
   Textes et visuels du récit de campagne (index.html).
   Seule la moitié haute (window.SITE_CONTENT) se modifie.
   La moitié basse (INJECTION) est le moteur du template :
   ne jamais la toucher.

   Remplacer une image : déposer le nouveau fichier dans images/
   sous le MÊME nom, rien d'autre à changer.
   ═══════════════════════════════════════════════════════════ */

window.SITE_CONTENT = {

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
    /* 10 visuels du nuage, dans l'ordre des 10 emplacements de index.html */
    floaters: [
      'images/detail-1.jpg',          // arcades en pierre (2:3)
      'images/detail-2.jpg',          // volets bleus (2:3)
      'images/detail-7.jpg',          // étal de légumes (3:2)
      'images/detail-4.jpg',          // lampadaire ancien (2:3)
      'images/detail-6.jpg',          // table de terrasse (3:2)
      'images/detail-5.jpg',          // vélos devant une façade (3:2)
      'images/detail-3.jpg',          // marché de rue (2:3)
      'images/camille-ferrand.jpg',   // portrait de la candidate (2:3)
      'images/detail-10.jpg',         // volet bleu (2:3)
      'images/detail-8.jpg'           // pains à l'étal (3:2)
    ]
  },

  positioning: 'Moins de dépenses. Plus de tranquillité.',

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

  /* Parole de la candidate + chiffre réel sourcé (pas de faux témoignage d'habitant) */
  testimonial: {
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

  /* 20 petits visuels de la traînée (240 × 300) : marché, arcades,
     quais, vélos, école, flyers. Jamais le portrait de la candidate. */
  trail: [
    'images/trail-01.jpg', 'images/trail-02.jpg', 'images/trail-03.jpg', 'images/trail-04.jpg',
    'images/trail-05.jpg', 'images/trail-06.jpg', 'images/trail-07.jpg', 'images/trail-08.jpg',
    'images/trail-09.jpg', 'images/trail-10.jpg', 'images/trail-11.jpg', 'images/trail-12.jpg',
    'images/trail-13.jpg', 'images/trail-14.jpg', 'images/trail-15.jpg', 'images/trail-16.jpg',
    'images/trail-17.jpg', 'images/trail-18.jpg', 'images/trail-19.jpg', 'images/trail-20.jpg'
  ]
};


/* ═══════════════════════════════════════════════════════════
   INJECTION — NE PAS MODIFIER (remplit le DOM avant app.js)
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.SITE_CONTENT;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };

  document.title = C.brand.title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', C.brand.description);

  // chrome
  set('.loader-wordmark', C.brand.name);
  set('.dock-wordmark', C.brand.name);
  set('.dock-link[href="#travaux"]', C.nav.proof);
  set('.dock-link[href="#explorer"]', C.nav.universes);
  set('.dock-cta', C.nav.cta);

  // 1 · accroche
  set('#heroKicker', C.brand.kicker);
  set('#heroLine1', C.hook.line1);
  const hls = $$('#heroLine2 .hl');
  if (hls.length === 2) { hls[0].textContent = C.hook.line2a; hls[1].textContent = C.hook.line2b; }
  const g1 = $('#grow1 img');
  if (g1) { g1.src = C.hook.image; g1.alt = C.hook.imageAlt; }
  $$('.floaters .fl img').forEach((img, i) => { if (C.hook.floaters[i]) img.src = C.hook.floaters[i]; });

  // 2 · positionnement (un span par mot)
  const intro = $('#spotIntro');
  if (intro) intro.innerHTML = C.positioning.split(' ').map((w) => `<span>${w}</span>`).join(' ');

  // 3 · démarche
  const fill = $('#fillText');
  if (fill) {
    fill.innerHTML = C.manifesto.text.replace(
      /\[\[(.+?)\]\]/,
      '<span class="boxed" id="boxedPhrase">$1<svg class="box-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="boxPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>'
    );
  }

  // 4 · preuve : masonry (8 photos) ou bento (4 features big/tall/tall/big)
  const head = $$('.coll-head > *');
  if (head.length === 4) {
    head[0].textContent = C.proof.kicker;
    head[1].textContent = C.proof.title;
    head[2].textContent = C.proof.sub;
    head[3].textContent = C.proof.meta;
  }
  const grid = $('#collGrid');
  if (grid && C.proof.layout === 'bento') {
    grid.className = 'bento-grid';
    grid.innerHTML = C.proof.features.map((f) =>
      `<figure class="card${f.size ? ' b-' + f.size : ''}"><div class="card-img"><img src="${f.illu}" alt="${f.title}"></div><figcaption>${f.title}<span class="mono">${f.meta}</span></figcaption></figure>`
    ).join('');
  } else if (grid) {
    grid.className = 'coll-grid';
    const SPEEDS = [-0.05, 0.06, -0.028, 0.085];
    grid.innerHTML = SPEEDS.map((s, ci) =>
      `<div class="col" data-pspeed="${s}">` +
      C.proof.projects.slice(ci * 2, ci * 2 + 2).map((p) =>
        `<figure class="card"><div class="card-img"><img src="${p.img}" alt="${p.title} — ${p.meta}"></div><figcaption>${p.title}<span class="mono">${p.meta}</span></figcaption></figure>`
      ).join('') + '</div>'
    ).join('');
  }

  // 5 · devise (train de mots-clés)
  set('#mottoKicker', C.motto.kicker);
  const mtrack = $('#mottoTrack');
  if (mtrack) mtrack.innerHTML = C.motto.words.map((w) => `<span class="mw">${w.word}</span>`).join('');

  // 6-7 · processus immersif (visuels posés un à un)
  set('#nw1', C.universes.introA);
  set('#nw2', C.universes.introB);
  set('#nw3', C.universes.introC);
  const g2 = $('#grow2 img');
  if (g2) g2.src = C.universes.image || (C.universes.items[0] || {}).img || g2.src;
  const psteps = $('#psteps');
  if (psteps) {
    psteps.innerHTML = C.universes.items.map((u) =>
      `<div class="pstep"><span class="pstep-meta mono ash">${u.meta}</span><h3>${u.name}</h3><p>${u.desc || ''}</p></div>`
    ).join('');
  }
  const sCta = $('#stepsCtaLink');
  if (sCta) sCta.childNodes[0].textContent = C.universes.cta;

  // 8 · preuve sociale — le chiffre qui frappe
  set('#figKicker', C.testimonial.kicker || '');
  const figM = String(C.testimonial.figure || '').trim().match(/^([^\d.,+-]*[+\u2212-]?)\s*(-?[\d.,]+)/);
  set('#figPre', figM ? figM[1] : '');
  set('#figVal', figM ? figM[2] : '');
  set('#figUnit', C.testimonial.unit || '');
  set('#quoteText', C.testimonial.quote);
  set('#quoteAuthor', C.testimonial.author);

  // 9 · objections
  C.objections.items.forEach((t, i) => set('#fs' + (i + 1), t));
  const fs4 = $('#fs4');
  if (fs4) {
    fs4.innerHTML = `${C.objections.finale} <span class="pill" id="pillPhrase">${C.objections.pill}<svg class="pill-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="pillPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>`;
  }
  $$('#trail img').forEach((img, i) => { img.src = C.trail[i % C.trail.length]; });

  // 10 · conversion
  set('.footer-kicker', C.contact.kicker);
  const mail = $('.footer-mail');
  if (mail) { mail.href = 'mailto:' + C.contact.email; mail.querySelector('.footer-mail-text').textContent = C.contact.email; }
  set('.footer-reassurance', C.contact.reassurance);
  const fname = $('#footerName');
  if (fname) { fname.textContent = C.brand.name; fname.setAttribute('aria-label', C.brand.name); }
  const bottom = $$('.footer-bottom > p');
  if (bottom.length === 3) {
    bottom[0].textContent = C.brand.copyright;
    bottom[1].innerHTML = C.brand.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('&nbsp;&nbsp;&nbsp;');
    bottom[2].textContent = C.brand.signature;
  }
})();
