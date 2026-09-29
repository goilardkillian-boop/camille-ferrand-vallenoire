/* ═══════════════════════════════════════════════════════════
   CAMILLE FERRAND · campagne.js
   Comportements de toutes les pages (sauf la version animée).
   Principe : chaque page fonctionne SANS ce fichier (contenu,
   liens, accordéons, formulaires en repli e-mail) ; ce script
   ajoute le confort : préférences d'affichage, lecture à voix
   haute, validation des formulaires, filtres, simulateur…
   Tous les réglages viennent de config.js (window.CAMPAGNE).
   ═══════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const CFG = window.CAMPAGNE || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const racine = document.documentElement;
  const mouvementReduit = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || racine.classList.contains('sans-animation');

  /* Une valeur est « à remplir » tant qu'elle est vide ou entre crochets */
  const rempli = (v) => typeof v === 'string' && v.trim() !== '' && !/^\[.*\]$/.test(v.trim());
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const memoire = {
    lire(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    ecrire(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* stockage bloqué : tant pis */ } }
  };

  const FR = 'fr-FR';
  const fmtEuro = (v, dec = 0) => new Intl.NumberFormat(FR, { style: 'currency', currency: 'EUR', minimumFractionDigits: dec, maximumFractionDigits: dec }).format(v);
  const fmtPct = (v) => new Intl.NumberFormat(FR, { style: 'percent', maximumFractionDigits: 1 }).format(v);
  const fmtDate = (d, o) => new Intl.DateTimeFormat(FR, o).format(d);
  const dateIso = (iso, h = 12) => { const d = new Date(iso + 'T' + String(h).padStart(2, '0') + ':00:00'); return isNaN(d) ? null : d; };
  const aujourdhui = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const page = (location.pathname.split('/').pop() || 'index.html');

  /* ═══════════ PRÉFÉRENCES D'AFFICHAGE ═══════════ */
  const PREFS = {
    texte: { cle: 'cf-texte', valeurs: { normal: '', grand: 'texte-grand', 'tres-grand': 'texte-tres-grand' } },
    contraste: { cle: 'cf-contraste', classe: 'contraste' },
    espace: { cle: 'cf-espace', classe: 'espace' },
    lisible: { cle: 'cf-lisible', classe: 'lisible' },
    animation: { cle: 'cf-sans-animation', classe: 'sans-animation' }
  };
  const chargerPoliceLisible = () => {
    if ($('#police-lisible')) return;
    const l = document.createElement('link');
    l.id = 'police-lisible'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;700;800&display=swap';
    document.head.appendChild(l);
  };
  const appliquerPrefs = () => {
    const t = memoire.lire(PREFS.texte.cle) || 'normal';
    Object.values(PREFS.texte.valeurs).filter(Boolean).forEach((c) => racine.classList.remove(c));
    if (PREFS.texte.valeurs[t]) racine.classList.add(PREFS.texte.valeurs[t]);
    ['contraste', 'espace', 'lisible', 'animation'].forEach((k) => racine.classList.toggle(PREFS[k].classe, memoire.lire(PREFS[k].cle) === '1'));
    if (racine.classList.contains('lisible')) chargerPoliceLisible();
  };
  appliquerPrefs();

  const panneau = $('#panneau-affichage');
  if (panneau && typeof panneau.showModal === 'function') {
    const form = $('form', panneau);
    const synchro = () => {
      const t = memoire.lire(PREFS.texte.cle) || 'normal';
      $$('input[name="texte"]', form).forEach((r) => { r.checked = r.value === t; });
      ['contraste', 'espace', 'lisible', 'animation'].forEach((k) => { const c = form.elements[k]; if (c) c.checked = memoire.lire(PREFS[k].cle) === '1'; });
    };
    let declencheur = null;
    $$('[data-ouvrir-affichage]').forEach((b) => b.addEventListener('click', () => {
      declencheur = b; synchro();
      const menu = $('#menu-mobile'); if (menu && menu.open) menu.close();
      panneau.showModal();
    }));
    form.addEventListener('change', (e) => {
      const el = e.target;
      if (el.name === 'texte') memoire.ecrire(PREFS.texte.cle, el.value);
      else if (PREFS[el.name]) memoire.ecrire(PREFS[el.name].cle, el.checked ? '1' : '0');
      appliquerPrefs();
      const etat = $('[data-affichage-etat]', panneau);
      if (etat) etat.textContent = 'Réglage appliqué.';
    });
    $('[data-reinitialiser]', panneau).addEventListener('click', () => {
      memoire.ecrire(PREFS.texte.cle, 'normal');
      ['contraste', 'espace', 'lisible', 'animation'].forEach((k) => memoire.ecrire(PREFS[k].cle, '0'));
      appliquerPrefs(); synchro();
      const etat = $('[data-affichage-etat]', panneau);
      if (etat) etat.textContent = 'Affichage par défaut rétabli.';
    });
    $$('[data-fermer]', panneau).forEach((b) => b.addEventListener('click', () => panneau.close()));
    panneau.addEventListener('close', () => { if (declencheur) declencheur.focus(); });
    panneau.addEventListener('click', (e) => { if (e.target === panneau) panneau.close(); });
  } else {
    $$('[data-ouvrir-affichage]').forEach((b) => { b.hidden = true; });
  }

  /* ═══════════ MENU MOBILE ═══════════ */
  const menu = $('#menu-mobile');
  const btnMenu = $('[data-ouvrir-menu]');
  if (menu && btnMenu && typeof menu.showModal === 'function') {
    btnMenu.addEventListener('click', () => { menu.showModal(); btnMenu.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('close', () => { btnMenu.setAttribute('aria-expanded', 'false'); btnMenu.focus(); });
    $$('[data-fermer]', menu).forEach((b) => b.addEventListener('click', () => menu.close()));
    matchMedia('(min-width: 1061px)').addEventListener('change', (m) => { if (m.matches && menu.open) menu.close(); });
  } else if (btnMenu) {
    /* Navigateur sans <dialog> : le bouton mène au plan du site */
    btnMenu.addEventListener('click', () => { location.href = 'plan-du-site.html'; });
  }

  /* ═══════════ COMPTE À REBOURS ET DATES ═══════════ */
  const jourJ = dateIso(CFG.dateScrutin || '', 0);
  const joursAvant = () => (jourJ ? Math.round((jourJ - aujourdhui()) / 86400000) : null);
  const texteCompte = () => {
    const n = joursAvant();
    if (n === null) return '';
    if (n > 1) return `J‑${n} avant le vote`;
    if (n === 1) return 'Le vote, c’est demain';
    if (n === 0) return 'C’est aujourd’hui : allez voter';
    return 'Merci à toutes et à tous';
  };
  $$('[data-compte]').forEach((el) => { el.textContent = texteCompte(); });
  $$('[data-date-scrutin]').forEach((el) => { if (jourJ) el.textContent = fmtDate(jourJ, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); });

  /* Inscription sur les listes : jusqu'au 6e vendredi avant le scrutin */
  if (jourJ) {
    const limite = new Date(jourJ);
    let vendredis = 0;
    while (vendredis < 6) { limite.setDate(limite.getDate() - 1); if (limite.getDay() === 5) vendredis++; }
    $$('[data-limite-inscription]').forEach((el) => { el.textContent = fmtDate(limite, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); });
    const veille = new Date(jourJ); veille.setDate(veille.getDate() - 1);
    $$('[data-veille-scrutin]').forEach((el) => { el.textContent = fmtDate(veille, { weekday: 'long', day: 'numeric', month: 'long' }); });
  }

  /* ═══════════ VALEURS DE config.js DANS LES PAGES ═══════════ */
  $$('[data-config]').forEach((el) => {
    const v = CFG[el.dataset.config];
    if (!rempli(v)) return;
    if (el.tagName === 'A' && /^email/.test(el.dataset.config)) { el.href = 'mailto:' + v; el.textContent = v; }
    else if (el.tagName === 'A' && /^tel/.test(el.dataset.config)) { el.href = 'tel:' + v.replace(/\s/g, ''); el.textContent = v; }
    else el.textContent = v;
  });
  $$('[data-si-config]').forEach((el) => { el.hidden = !rempli(CFG[el.dataset.siConfig]); });
  $$('[data-reseau]').forEach((el) => {
    const v = (CFG.reseaux || {})[el.dataset.reseau];
    if (rempli(v)) { el.href = v; el.hidden = false; const s = el.parentElement.querySelector('[data-bientot]'); if (s) s.hidden = true; }
  });
  $$('[data-lien]').forEach((el) => { const v = (CFG.liens || {})[el.dataset.lien]; if (v) el.href = v; });

  /* ═══════════ PARTAGE (liens simples, aucun script tiers) ═══════════ */
  const urlPage = () => (rempli(CFG.urlSite) ? CFG.urlSite.replace(/\/$/, '') + '/' + (page === 'index.html' ? '' : page) : location.href.split('#')[0]);
  $$('[data-partage]').forEach((zone) => {
    const u = encodeURIComponent(urlPage());
    const t = encodeURIComponent('Camille Ferrand, Vallenoire : le quotidien d’une ville qui nous facilite la vie');
    const fb = $('[data-partage-facebook]', zone); if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    const wa = $('[data-partage-whatsapp]', zone); if (wa) wa.href = `https://wa.me/?text=${t}%20${u}`;
    const copier = $('[data-copier]', zone);
    if (copier) {
      copier.hidden = !navigator.clipboard;
      copier.addEventListener('click', async () => {
        const etat = $('[data-copie-etat]', zone);
        try { await navigator.clipboard.writeText(urlPage()); etat.textContent = 'Lien copié. Vous pouvez le coller dans un message.'; }
        catch (e) { etat.textContent = 'La copie n’a pas fonctionné : copiez l’adresse dans la barre du navigateur.'; }
      });
    }
  });

  /* ═══════════ APPARITIONS DOUCES ═══════════ */
  const aReveler = $$('.apparait');
  if (mouvementReduit() || !('IntersectionObserver' in window)) aReveler.forEach((el) => el.classList.add('vu'));
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    aReveler.forEach((el) => io.observe(el));
    /* Sécurité : tout est visible après 2,5 s même si l'observateur ne s'est pas déclenché */
    setTimeout(() => aReveler.forEach((el) => el.classList.add('vu')), 2500);
  }

  /* CTA flottant sur mobile : caché quand un formulaire est à l'écran */
  const flottant = $('.cta-flottant');
  if (flottant) {
    let masque = false;
    const cible = $('[data-masque-cta]');
    if (cible && 'IntersectionObserver' in window) new IntersectionObserver((es) => { masque = es.some((e) => e.isIntersecting); maj(); }).observe(cible);
    function maj() { flottant.classList.toggle('visible', window.scrollY > 500 && !masque); }
    addEventListener('scroll', maj, { passive: true }); maj();
  }

  /* ═══════════ LECTURE À VOIX HAUTE ═══════════ */
  const zoneLecture = $('[data-lecture]');
  if (zoneLecture) {
    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') zoneLecture.hidden = true;
    else {
      const bLire = $('[data-lire]', zoneLecture), bPause = $('[data-pause]', zoneLecture), bStop = $('[data-stop]', zoneLecture), etat = $('[data-lecture-etat]', zoneLecture);
      let morceaux = [], i = 0, actif = false;
      const voix = () => (synth.getVoices() || []).find((v) => /^fr(-|_|$)/i.test(v.lang));
      const textes = () => $$('main h1, main h2, main h3, main p, main li, main dt, main dd, main summary, main blockquote')
        .filter((el) => el.offsetParent !== null && !el.closest('[data-pas-lire], .ariane, form, [hidden], .sr-only, nav'))
        .filter((el) => !el.querySelector('p, li, h2, h3'))
        .map((el) => el.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean);
      const majBoutons = () => { bPause.hidden = !actif; bStop.hidden = !actif; bLire.hidden = actif; bPause.textContent = synth.paused ? 'Reprendre' : 'Pause'; };
      const suivant = () => {
        if (!actif) return;
        if (i >= morceaux.length) { actif = false; etat.textContent = 'Lecture terminée.'; majBoutons(); return; }
        const u = new SpeechSynthesisUtterance(morceaux[i++]);
        u.lang = 'fr-FR'; u.rate = 0.95; const v = voix(); if (v) u.voice = v;
        u.onend = suivant; u.onerror = () => { actif = false; majBoutons(); };
        synth.speak(u);
      };
      bLire.addEventListener('click', () => { synth.cancel(); morceaux = textes(); i = 0; actif = true; etat.textContent = 'Lecture en cours…'; majBoutons(); suivant(); });
      bPause.addEventListener('click', () => { if (synth.paused) { synth.resume(); etat.textContent = 'Lecture en cours…'; } else { synth.pause(); etat.textContent = 'Lecture en pause.'; } majBoutons(); });
      bStop.addEventListener('click', () => { actif = false; synth.cancel(); etat.textContent = 'Lecture arrêtée.'; majBoutons(); });
      addEventListener('pagehide', () => synth.cancel());
      majBoutons();
    }
  }

  /* ═══════════ JAUGE DES BÉNÉVOLES ═══════════ */
  const jauge = $('[data-jauge]');
  let inscrits = null;
  const objectif = Number(CFG.objectifBenevoles) || 30;
  const afficherJauge = (n) => {
    if (!jauge) return;
    inscrits = n;
    const barre = $('progress', jauge);
    $$('[data-jauge-n]').forEach((el) => { el.textContent = n; });
    $$('[data-jauge-objectif]').forEach((el) => { el.textContent = objectif; });
    if (barre) { barre.max = objectif; barre.value = mouvementReduit() ? n : 0; requestAnimationFrame(() => setTimeout(() => { barre.value = Math.min(n, objectif); }, 60)); barre.textContent = `${n} sur ${objectif}`; }
    const reste = $('[data-jauge-reste]');
    if (reste) reste.textContent = n >= objectif ? 'Objectif atteint, merci ! Il reste de la place pour vous.' : `Encore ${objectif - n} pour atteindre l’objectif.`;
  };
  if (jauge) {
    const repli = Number(CFG.benevolesRepli) || 0;
    if (rempli(CFG.compteurCsv)) {
      const ctrl = 'AbortController' in window ? new AbortController() : null;
      const minuteur = setTimeout(() => ctrl && ctrl.abort(), 6000);
      fetch(CFG.compteurCsv, { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then((t) => { const m = t.match(/\d+/); if (!m) throw new Error('vide'); afficherJauge(parseInt(m[0], 10)); })
        .catch(() => afficherJauge(repli))
        .finally(() => clearTimeout(minuteur));
    } else afficherJauge(repli);
  }

  /* ═══════════ AGENDA (+ données structurées Event) ═══════════ */
  const rdvAVenir = (CFG.agenda || [])
    .filter((r) => { const d = dateIso(r.date, 23); return d && d >= aujourdhui(); })
    .sort((a, b) => a.date.localeCompare(b.date));
  $$('[data-agenda]').forEach((liste) => {
    const max = Number(liste.dataset.agenda) || 8;
    const n = rdvAVenir.slice(0, max);
    liste.innerHTML = n.length ? n.map((r) => {
      const d = dateIso(r.date);
      return `<li class="rdv">
        <p class="date"><time datetime="${esc(r.date)}"><span class="jour">${d.getDate()}</span> <span class="mois">${esc(fmtDate(d, { month: 'short' }).replace('.', ''))}</span></time></p>
        <div><h3>${esc(r.titre)}</h3><p>${esc(fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long' }))} · ${esc(r.heure || '')}<br>${esc(r.lieu || '')}</p></div>
        ${r.quartier ? `<p class="quartier">${esc(r.quartier)}</p>` : ''}
      </li>`;
    }).join('') : '<li class="vide">Les prochains rendez-vous seront bientôt annoncés. Écrivez-nous pour être prévenu.</li>';
  });
  if (rdvAVenir.length && $('[data-agenda]')) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(rdvAVenir.slice(0, 10).map((r) => ({
      '@context': 'https://schema.org', '@type': 'Event', name: r.titre, startDate: r.date,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled',
      location: { '@type': 'Place', name: r.lieu, address: { '@type': 'PostalAddress', addressLocality: 'Vallenoire (ville fictive)', addressRegion: r.quartier } },
      organizer: { '@type': 'Person', name: 'Camille Ferrand' }, isAccessibleForFree: true
    })));
    document.head.appendChild(s);
  }

  /* ═══════════ FORMULAIRES VERS MAKE ═══════════ */
  const uid = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const RE_TEL = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

  $$('form[data-kind]').forEach((form) => {
    const kind = form.dataset.kind;
    const affiche = Date.now();
    const etat = $('[data-etat]', form);
    const resume = $('[data-resume-erreurs]', form);
    const bouton = $('button[type="submit"]', form);
    const libelleBouton = bouton ? bouton.innerHTML : '';
    const valeur = (nom) => { const c = form.elements[nom]; return c && 'value' in c ? String(c.value || '').trim() : ''; };
    const coches = (nom) => $$(`input[name="${nom}"]:checked`, form).map((c) => c.value);

    const REGLES = {
      prenom: () => (valeur('prenom').length >= 2 ? '' : 'Indiquez votre prénom, par exemple : Nadia.'),
      email: () => (RE_EMAIL.test(valeur('email')) ? '' : 'Indiquez une adresse e-mail complète, par exemple : nadia@exemple.fr.'),
      contact: () => {
        const v = valeur('contact');
        if (!v) return 'Indiquez un e-mail ou un numéro de téléphone pour que l’on puisse vous rappeler.';
        return RE_EMAIL.test(v) || RE_TEL.test(v.replace(/\s+/g, ' ')) ? '' : 'Ce n’est ni un e-mail ni un numéro de téléphone français. Exemples : nadia@exemple.fr ou 06 12 34 56 78.';
      },
      quartier: () => (valeur('quartier') ? '' : 'Choisissez votre quartier dans la liste.'),
      type: () => (coches('type').length ? '' : 'Choisissez de quoi il s’agit : question, idée, soutien ou désaccord.'),
      contenu: () => (valeur('contenu').length >= 10 ? '' : 'Écrivez votre message (10 caractères au moins).'),
      consentement: () => (form.elements.consentement && form.elements.consentement.checked ? '' : 'Cochez la case pour que l’équipe puisse utiliser vos informations et vous répondre.')
    };
    const champs = Object.keys(REGLES).filter((n) => form.elements[n]);
    const libelles = {};
    champs.forEach((n) => {
      const c = form.elements[n];
      const premier = c.length && !c.tagName ? c[0] : c;
      const fs = premier.closest('fieldset');
      const lab = fs && premier.type === 'radio' ? $('legend', fs) : form.querySelector(`label[for="${premier.id}"]`);
      libelles[n] = { id: premier.id, texte: lab ? lab.textContent.replace(/\(.*\)/, '').trim().split('.')[0].slice(0, 60) : n };
    });

    const poserErreur = (nom, msg) => {
      const zone = $(`[data-erreur="${nom}"]`, form);
      if (zone) zone.textContent = msg || '';
      const els = form.elements[nom];
      const liste = els && els.length && !els.tagName ? [...els] : [els];
      liste.forEach((c) => {
        if (!c) return;
        const desc = (c.getAttribute('aria-describedby') || '').split(' ').filter((x) => x && x !== (zone && zone.id));
        if (msg) { c.setAttribute('aria-invalid', 'true'); if (zone) desc.push(zone.id); }
        else c.removeAttribute('aria-invalid');
        if (desc.length) c.setAttribute('aria-describedby', desc.join(' ')); else c.removeAttribute('aria-describedby');
      });
      return !msg;
    };

    /* Vérification au départ du champ, puis en direct une fois l'erreur affichée.
       Si l'on quitte le champ en cliquant ailleurs, le message attend la fin
       du clic : sinon il décale la page sous le pointeur et le clic rate sa cible. */
    let pointeurEnfonce = false;
    const enAttente = new Map();
    document.addEventListener('pointerdown', () => { pointeurEnfonce = true; }, true);
    document.addEventListener('pointerup', () => setTimeout(() => {
      pointeurEnfonce = false;
      enAttente.forEach((fn) => fn()); enAttente.clear();
    }, 0), true);
    champs.forEach((nom) => {
      const els = form.elements[nom];
      const liste = els.length && !els.tagName ? [...els] : [els];
      liste.forEach((c) => {
        const groupe = c.type === 'checkbox' || c.type === 'radio' || c.tagName === 'SELECT';
        const verifier = () => { if (groupe || c.value.trim()) poserErreur(nom, REGLES[nom]()); };
        c.addEventListener(groupe ? 'change' : 'blur', () => { if (!groupe && pointeurEnfonce) enAttente.set(nom, verifier); else verifier(); });
        if (!groupe) c.addEventListener('input', () => { if (c.getAttribute('aria-invalid') === 'true' && !REGLES[nom]()) poserErreur(nom, ''); });
      });
    });

    const donnees = () => {
      const d = { kind, id: uid(), page, horodatage: new Date().toISOString(), source: 'site', version_consentement: CFG.versionConsentement || '' };
      if (kind === 'benevole') {
        const c = valeur('contact');
        Object.assign(d, {
          prenom: valeur('prenom'), contact: c, contact_type: RE_EMAIL.test(c) ? 'email' : 'telephone',
          quartier: valeur('quartier'), disponibilites: coches('disponibilites').join(','), missions: coches('missions').join(','), consentement: 'oui'
        });
      } else {
        Object.assign(d, { prenom: valeur('prenom'), email: valeur('email'), type: coches('type')[0] || '', theme: valeur('theme'), contenu: valeur('contenu'), consentement: 'oui' });
      }
      return d;
    };

    const mailto = (d) => {
      const lignes = Object.entries(d).filter(([k]) => !['id', 'source', 'version_consentement', 'kind'].includes(k)).map(([k, v]) => `${k} : ${v}`);
      const sujet = d.kind === 'benevole' ? `Nouveau bénévole : ${d.prenom}` : `Message du site (${d.type}) : ${d.prenom}`;
      return `mailto:${CFG.emailEquipe}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(lignes.join('\n'))}`;
    };
    const finEnvoi = () => { if (bouton) { bouton.removeAttribute('aria-busy'); bouton.innerHTML = libelleBouton; } };
    const repli = (d, raison) => {
      finEnvoi();
      if (!etat) return;
      etat.classList.add('probleme');
      etat.innerHTML = rempli(CFG.emailEquipe)
        ? `${raison} Pour ne rien perdre, <a href="${esc(mailto(d))}">envoyez-le par e-mail</a> : le message est déjà rédigé, il suffit de l’envoyer.`
        : `${raison} Réessayez dans quelques minutes, ou venez nous voir au marché du samedi, sous les arcades.`;
      etat.focus();
    };
    const reussir = () => {
      const succes = $('[data-succes]', form.parentElement);
      form.hidden = true;
      if (succes) { succes.hidden = false; succes.focus(); }
      if (kind === 'benevole' && inscrits !== null) afficherJauge(inscrits + 1);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (bouton && bouton.getAttribute('aria-busy') === 'true') return;
      if (etat) { etat.textContent = ''; etat.classList.remove('probleme'); }

      /* Piège à robots : si rempli, on ne transmet rien mais on remercie */
      if (form.elements.site_web && form.elements.site_web.value) { reussir(); return; }

      const erreurs = champs.map((n) => [n, REGLES[n]()]).filter(([n, m]) => !poserErreur(n, m));
      if (erreurs.length) {
        if (resume) {
          resume.hidden = false;
          $('[data-resume-titre]', resume).textContent = erreurs.length > 1 ? `${erreurs.length} informations sont à corriger :` : '1 information est à corriger :';
          $('ul', resume).innerHTML = erreurs.map(([n, m]) => `<li><a href="#${libelles[n].id}">${esc(m)}</a></li>`).join('');
          resume.focus();
          $$('a', resume).forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); const c = document.getElementById(a.hash.slice(1)); if (c) { c.focus(); c.scrollIntoView({ block: 'center' }); } }));
        }
        return;
      }
      if (resume) resume.hidden = true;

      /* Envoi trop rapide : probablement un robot */
      if (Date.now() - affiche < 3000) {
        if (etat) etat.textContent = 'Prenez un instant pour relire, puis appuyez de nouveau sur le bouton.';
        return;
      }

      const d = donnees();
      if (!rempli(CFG.makeWebhook)) { repli(d, 'L’envoi automatique n’est pas encore en service.'); return; }

      if (bouton) { bouton.setAttribute('aria-busy', 'true'); bouton.textContent = 'Envoi en cours…'; }
      if (etat) etat.textContent = 'Envoi en cours…';
      fetch(CFG.makeWebhook, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(d) })
        .then(() => { if (etat) etat.textContent = ''; finEnvoi(); reussir(); })
        .catch(() => repli(d, 'L’envoi n’a pas abouti, sans doute une coupure de connexion.'));
    });
  });

  /* ═══════════ PROGRAMME : FILTRES (état dans l'adresse) ═══════════ */
  const filtres = $('[data-filtres]');
  if (filtres) {
    filtres.hidden = false;
    const params = new URLSearchParams(location.search);
    const etatF = { theme: params.get('theme') || 'tous', profil: params.get('profil') || 'tous' };
    const annonce = $('[data-filtre-resultat]');
    const appliquer = (ecrireUrl) => {
      let n = 0;
      const filtre = etatF.theme !== 'tous' || etatF.profil !== 'tous';
      $$('.mesure').forEach((m) => {
        const ok = (etatF.theme === 'tous' || m.dataset.pilier === etatF.theme) && (etatF.profil === 'tous' || (m.dataset.profils || '').split(' ').includes(etatF.profil));
        m.classList.toggle('eteinte', filtre && !ok);
        m.classList.toggle('allumee', filtre && ok);
        if (ok) n++;
      });
      $$('[data-filtre]', filtres).forEach((b) => b.setAttribute('aria-pressed', String(etatF[b.dataset.filtre] === b.dataset.valeur)));
      if (annonce) annonce.textContent = filtre ? `${n} mesure${n > 1 ? 's' : ''} sur 24 mise${n > 1 ? 's' : ''} en avant. Les autres restent lisibles, en plus pâle.` : 'Les 24 mesures sont affichées.';
      if (ecrireUrl) {
        const p = new URLSearchParams();
        if (etatF.theme !== 'tous') p.set('theme', etatF.theme);
        if (etatF.profil !== 'tous') p.set('profil', etatF.profil);
        history.replaceState(null, '', (p.toString() ? '?' + p : location.pathname) + location.hash);
      }
    };
    $$('[data-filtre]', filtres).forEach((b) => b.addEventListener('click', () => { etatF[b.dataset.filtre] = b.dataset.valeur; appliquer(true); }));
    appliquer(false);
  }
  const basculer = $('[data-tout-ouvrir]');
  if (basculer) {
    basculer.hidden = false;
    basculer.addEventListener('click', () => {
      const ouvrir = basculer.getAttribute('aria-pressed') !== 'true';
      $$('details.mesure').forEach((d) => { d.open = ouvrir; });
      basculer.setAttribute('aria-pressed', String(ouvrir));
      basculer.textContent = ouvrir ? 'Refermer toutes les mesures' : 'Ouvrir toutes les mesures';
    });
  }
  $$('[data-imprimer]').forEach((b) => { b.hidden = false; b.addEventListener('click', () => window.print()); });
  /* Impression : on déplie tout, puis on remet comme avant */
  let ouvertsAvant = [];
  addEventListener('beforeprint', () => { ouvertsAvant = $$('details').map((d) => d.open); $$('details').forEach((d) => { d.open = true; }); });
  addEventListener('afterprint', () => { $$('details').forEach((d, i) => { d.open = !!ouvertsAvant[i]; }); });

  /* Lien vers une mesure (#mesure-12) : on l'ouvre */
  const ouvrirCible = () => {
    const h = location.hash;
    if (!/^#mesure-\d+$/.test(h)) return;
    const d = document.querySelector(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; const s = $('summary', d); if (s) s.focus({ preventScroll: true }); }
  };
  addEventListener('hashchange', ouvrirCible); ouvrirCible();

  /* ═══════════ PROGRAMME : SIMULATEUR ═══════════ */
  const sim = $('[data-simulateur]');
  if (sim && CFG.simulateur) {
    sim.hidden = false;
    const H = CFG.simulateur;
    const zone = sim.closest('[data-zone-simulateur]') || document;
    const selTranche = sim.elements.tranche;
    selTranche.innerHTML = (H.tranches || []).map((t, i) => `<option value="${i}">${esc(t.libelle)} : ${fmtEuro(t.prix, 2)} le repas</option>`).join('');
    selTranche.value = String(Math.min(1, (H.tranches || []).length - 1));
    $$('[data-hyp]').forEach((el) => {
      const v = { repas: String(H.repasParAn), prix: fmtEuro(H.prixRepasActuel, 2), tarifs: (H.tranches || []).map((t) => fmtEuro(t.prix, 2)).join(' · '), taux: fmtPct(H.hausseTauxEvitee), part: fmtPct(H.partCommunale), energie: fmtPct(H.economieEnergie) }[el.dataset.hyp];
      if (v) el.textContent = v;
    });
    const enfants = sim.elements.enfants;
    const nombre = (nom) => { const v = parseFloat(String(sim.elements[nom].value || '').replace(/\s/g, '').replace(',', '.')); return isFinite(v) && v > 0 ? v : 0; };
    const arrondi = (v) => Math.round(v / (H.arrondi || 10)) * (H.arrondi || 10);
    const calculer = () => {
      const nb = Math.max(0, Math.min(8, parseInt(enfants.value, 10) || 0));
      const t = (H.tranches || [])[Number(selTranche.value)] || { prix: H.prixRepasActuel };
      const cantine = Math.max(0, (H.prixRepasActuel - t.prix) * H.repasParAn * nb);
      const fonciere = nombre('fonciere') * H.partCommunale * H.hausseTauxEvitee;
      const energie = nombre('electricite') * 12 * H.economieEnergie;
      const total = arrondi(cantine + fonciere + energie);
      $('[data-part="cantine"]', zone).textContent = fmtEuro(Math.round(cantine));
      $('[data-part="fonciere"]', zone).textContent = fmtEuro(Math.round(fonciere));
      $('[data-part="energie"]', zone).textContent = fmtEuro(Math.round(energie));
      $('[data-montant]', zone).textContent = fmtEuro(total);
    };
    $$('[data-enfant]', sim).forEach((b) => b.addEventListener('click', () => {
      enfants.value = Math.max(0, Math.min(8, (parseInt(enfants.value, 10) || 0) + Number(b.dataset.enfant)));
      calculer();
    }));
    sim.addEventListener('input', calculer);
    sim.addEventListener('change', calculer);
    sim.addEventListener('submit', (e) => { e.preventDefault(); calculer(); $('[data-montant]', zone).focus(); });
    calculer();
  }

  /* ═══════════ PROGRAMME : QUARTIERS ═══════════ */
  const plan = $('[data-plan-quartiers]');
  if (plan) {
    plan.removeAttribute('hidden');
    const fiche = $('[data-fiche-quartier]');
    const Q = {};
    $$('[data-quartier-ligne]').forEach((tr) => {
      const c = $$('th, td', tr).map((x) => x.textContent.trim());
      Q[tr.dataset.quartierLigne] = { nom: c[0], profil: c[1], enjeux: c[2], mesures: (tr.dataset.mesures || '').split(' ').filter(Boolean) };
    });
    const titreMesure = (n) => { const m = document.getElementById('mesure-' + n); const t = m && $('.titre-mesure', m); return t ? t.textContent : 'Mesure ' + n; };
    const montrer = (id, annoncer) => {
      const q = Q[id]; if (!q || !fiche) return;
      $$('.zone', plan).forEach((z) => z.setAttribute('aria-pressed', String(z.dataset.zone === id)));
      fiche.innerHTML = `<h3>${esc(q.nom)}</h3>
        <dl><dt><strong>Qui y vit</strong></dt><dd>${esc(q.profil)}</dd><dt><strong>Ce qui compte ici</strong></dt><dd>${esc(q.enjeux)}</dd></dl>
        <p><strong>Mesures prioritaires :</strong></p>
        <ul class="etiquettes">${q.mesures.map((n) => `<li><a href="#mesure-${n}">${n} · ${esc(titreMesure(n))}</a></li>`).join('')}</ul>`;
      if (annoncer) fiche.setAttribute('aria-label', 'Quartier choisi : ' + q.nom);
    };
    $$('.zone', plan).forEach((z) => {
      z.addEventListener('click', () => montrer(z.dataset.zone, true));
      z.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); montrer(z.dataset.zone, true); } });
    });
    const premier = $('.zone', plan); if (premier) montrer(premier.dataset.zone, false);
  }

  /* ═══════════ PRESSE : COMMUNIQUÉS ═══════════ */
  const zoneCom = $('[data-communiques]');
  if (zoneCom && CFG.presse) {
    zoneCom.innerHTML = (CFG.presse.communiques || []).map((c) => {
      const d = dateIso(c.date);
      const aVenir = d > aujourdhui();
      const action = c.fichier ? `<a class="btn btn-contour btn-petit" href="${esc(c.fichier)}" download>Télécharger le communiqué</a>`
        : `<p class="discret">${aVenir ? 'Disponible à cette date.' : 'Disponible sur demande auprès du contact presse.'}</p>`;
      return `<li class="carte"><p class="surtitre"><time datetime="${esc(c.date)}">${aVenir ? 'À paraître le ' : ''}${esc(fmtDate(d, { day: 'numeric', month: 'long', year: 'numeric' }))}</time></p>
        <h3>${esc(c.titre)}</h3><p>${esc(c.resume)}</p>${action}</li>`;
    }).join('');
  }
})();
