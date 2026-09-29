/* ═══════════════════════════════════════════════════════════
   CAMILLE FERRAND · campagne.js
   Comportements des pages secondaires : en-tête et pied communs,
   bouton A+, compte à rebours, animations, formulaires vers Make,
   jauge des bénévoles, agenda, programme (filtres, simulateur,
   quartiers) et presse.

   Sur index.html, ce fichier ne touche JAMAIS au DOM du moteur :
   il ne fait rien d'autre que vérifier la présence du footer
   ajouté (nav.footer-pages).
   Tous les réglages viennent de config.js (window.CAMPAGNE).
   ═══════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const CFG = window.CAMPAGNE || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Une valeur est « à remplir » tant qu'elle est vide ou entre crochets */
  const rempli = (v) => typeof v === 'string' && v.trim() !== '' && !/^\[.*\]$/.test(v.trim());
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* localStorage protégé : navigation privée, stockage bloqué… */
  const memoire = {
    lire(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    ecrire(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* rien */ } }
  };

  /* Bouton A+ : appliqué le plus tôt possible, sur toutes les pages secondaires */
  if (memoire.lire('cf-aplus') === '1' && document.body.classList.contains('page')) {
    document.documentElement.classList.add('a-plus');
  }

  /* index.html (moteur) : on s'arrête là. */
  if (!document.body.classList.contains('page')) return;

  document.documentElement.classList.remove('sans-js');

  const PAGES = [
    { href: 'index.html', label: 'Accueil' },
    { href: 'programme.html', label: 'Programme' },
    { href: 'engagement.html', label: 'Je m’engage' },
    { href: 'question.html', label: 'Une question ?' },
    { href: 'presse.html', label: 'Presse' }
  ];
  const courante = (location.pathname.split('/').pop() || 'index.html');

  const LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#4169E1"/><path d="M14 50V30a18 18 0 0 1 36 0v20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="32" cy="40" r="5" fill="#fff"/></svg>';

  /* ─── Dates ─── */
  const jourJ = () => {
    const d = new Date((CFG.dateScrutin || '') + 'T00:00:00');
    return isNaN(d) ? null : d;
  };
  const aujourdhui = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const joursAvant = () => {
    const d = jourJ();
    return d ? Math.round((d - aujourdhui()) / 86400000) : null;
  };
  const texteCompte = () => {
    const n = joursAvant();
    if (n === null) return '';
    if (n > 1) return `J‑${n} avant le vote`;
    if (n === 1) return 'Le vote, c’est demain';
    if (n === 0) return 'C’est aujourd’hui : allez voter';
    return 'Merci à toutes et à tous';
  };
  const dateLongue = (iso) => {
    const d = new Date(iso + 'T12:00:00');
    return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  /* ═══════════ EN-TÊTE, MENU, BANDEAU ═══════════ */
  const lienNav = (p) => `<a href="${p.href}"${p.href === courante ? ' aria-current="page"' : ''}>${p.label}</a>`;

  const zoneEntete = $('#entete-commun');
  if (zoneEntete) {
    zoneEntete.outerHTML = `
      <a class="lien-evitement" href="#contenu">Aller au contenu</a>
      <div class="bandeau" role="note"><span>Projet étudiant · candidate et ville fictives</span><span class="compte" data-compte>${texteCompte()}</span></div>
      <header class="entete" id="entete">
        <div class="conteneur entete-in">
          <a class="marque" href="index.html">${LOGO}<span>Camille Ferrand</span></a>
          <nav class="nav" aria-label="Navigation principale">${PAGES.slice(1).map(lienNav).join('')}</nav>
          <div class="outils">
            <button class="btn-aplus" type="button" aria-pressed="false" title="Agrandir le texte">A+<span class="sr-only"> : agrandir le texte</span></button>
            <a class="btn btn-bleu btn-petit" href="engagement.html">Je m’engage</a>
            <button class="btn-menu" type="button" aria-expanded="false" aria-controls="menu-plein">Menu</button>
          </div>
        </div>
      </header>
      <div class="menu-plein" id="menu-plein" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="haut">
          <a class="marque" href="index.html">${LOGO}<span>Camille Ferrand</span></a>
          <button class="btn-fermer" type="button">Fermer</button>
        </div>
        <nav aria-label="Menu mobile">${PAGES.map(lienNav).join('')}<a href="mentions-legales.html">Mentions légales</a></nav>
        <div class="bas">
          <a class="btn btn-blanc" href="engagement.html">Je m’engage <span class="fleche" aria-hidden="true">→</span></a>
          <p>Projet étudiant · candidate et ville fictives</p>
        </div>
      </div>
      <a class="btn btn-bleu cta-flottant" href="engagement.html">Je m’engage <span class="fleche" aria-hidden="true">→</span></a>`;
  }

  /* Bouton A+ (125 %, mémorisé) */
  const aplus = $('.btn-aplus');
  if (aplus) {
    const maj = () => aplus.setAttribute('aria-pressed', document.documentElement.classList.contains('a-plus') ? 'true' : 'false');
    maj();
    aplus.addEventListener('click', () => {
      const actif = document.documentElement.classList.toggle('a-plus');
      memoire.ecrire('cf-aplus', actif ? '1' : '0');
      maj();
    });
  }

  /* Menu plein écran : Échap ferme, le focus reste dans le menu */
  const menu = $('#menu-plein');
  const btnMenu = $('.btn-menu');
  if (menu && btnMenu) {
    const focusables = () => $$('a, button', menu);
    const ouvrir = () => {
      menu.classList.add('ouvert'); btnMenu.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      setTimeout(() => focusables()[0] && focusables()[0].focus(), 50);
    };
    const fermer = () => {
      menu.classList.remove('ouvert'); btnMenu.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = ''; btnMenu.focus();
    };
    btnMenu.addEventListener('click', ouvrir);
    $('.btn-fermer', menu).addEventListener('click', fermer);
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') fermer();
      if (e.key === 'Tab') {
        const f = focusables(); const premier = f[0]; const dernier = f[f.length - 1];
        if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
        else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
      }
    });
    matchMedia('(min-width: 1061px)').addEventListener('change', (m) => { if (m.matches && menu.classList.contains('ouvert')) fermer(); });
  }

  /* Ombre de l'en-tête et CTA flottant (mobile) au défilement */
  const entete = $('#entete');
  const flottant = $('.cta-flottant');
  const cibleCta = $('[data-masque-cta]');
  let ctaCache = false;
  if (cibleCta && 'IntersectionObserver' in window) {
    new IntersectionObserver((es) => { ctaCache = es.some((e) => e.isIntersecting); majDefil(); }, { threshold: 0 }).observe(cibleCta);
  }
  function majDefil() {
    const y = window.scrollY;
    if (entete) entete.classList.toggle('ombre', y > 8);
    if (flottant) flottant.classList.toggle('visible', y > 420 && !ctaCache);
  }
  addEventListener('scroll', majDefil, { passive: true });
  majDefil();

  /* ═══════════ PIED DE PAGE COMMUN ═══════════ */
  const reseau = (nom, url) => rempli(url)
    ? `<li><a href="${esc(url)}" target="_blank" rel="noopener">${nom} <span aria-hidden="true">↗</span><span class="sr-only"> (nouvel onglet)</span></a></li>`
    : `<li><span class="discret">${nom} : bientôt</span></li>`;
  const mailEquipe = rempli(CFG.emailEquipe) ? `<li><a href="mailto:${esc(CFG.emailEquipe)}">${esc(CFG.emailEquipe)}</a></li>` : '';

  const zonePied = $('#pied-commun');
  if (zonePied) {
    const r = CFG.reseaux || {};
    zonePied.outerHTML = `
      <footer class="pied">
        <div class="conteneur">
          <div class="pied-haut">
            <div>
              <a class="marque" href="index.html">Camille Ferrand</a>
              <p class="slogan">Vallenoire, le quotidien d’une ville qui nous facilite la vie !</p>
              <div class="partage" data-partage></div>
            </div>
            <div>
              <h2>Le site</h2>
              <ul>
                ${PAGES.map((p) => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}
                <li><a href="mentions-legales.html">Mentions légales</a></li>
                <li><a href="donnees.html">Données personnelles</a></li>
              </ul>
            </div>
            <div>
              <h2>Contact</h2>
              <ul>
                ${mailEquipe}
                <li><a href="question.html">Poser une question</a></li>
                ${reseau('Facebook', r.facebook)}
                ${reseau('Instagram', r.instagram)}
              </ul>
            </div>
          </div>
          <div class="pied-bas">
            <p>© 2026 · Vallenoire, vallée de la Garonne</p>
            <p><strong>Projet étudiant · candidate et ville fictives</strong></p>
          </div>
        </div>
      </footer>`;
  }

  /* Adresses et contacts issus de config.js, partout où la page les demande */
  $$('[data-config]').forEach((el) => {
    const v = CFG[el.dataset.config];
    if (!rempli(v)) return;
    if (el.tagName === 'A' && /^email/.test(el.dataset.config)) { el.href = 'mailto:' + v; el.textContent = v; }
    else if (el.tagName === 'A' && /^tel/.test(el.dataset.config)) { el.href = 'tel:' + v.replace(/\s/g, ''); el.textContent = v; }
    else el.textContent = v;
  });
  $$('[data-si-config]').forEach((el) => { if (!rempli(CFG[el.dataset.siConfig])) el.hidden = true; });
  $$('[data-lien]').forEach((el) => { const v = (CFG.liens || {})[el.dataset.lien]; if (v) el.href = v; });
  $$('[data-date-scrutin]').forEach((el) => { if (CFG.dateScrutin) el.textContent = dateLongue(CFG.dateScrutin); });
  $$('[data-compte]').forEach((el) => { el.textContent = texteCompte(); });

  /* ═══════════ PARTAGE (simples liens, aucun script tiers) ═══════════ */
  const urlPage = () => {
    if (rempli(CFG.urlSite)) return CFG.urlSite.replace(/\/$/, '') + '/' + (courante === 'index.html' ? '' : courante);
    return location.href.split('#')[0];
  };
  const ICONES = {
    fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 20l1.2-3.6A8 8 0 1 1 8 19z"/><path fill="currentColor" d="M9.2 8.3c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.5.3-1.2.5-2 .3-2.5-.6-4.6-2.7-5.2-5.2-.1-.6 0-1.3.4-1.7z"/></svg>',
    lien: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>'
  };
  $$('[data-partage]').forEach((zone) => {
    const u = encodeURIComponent(urlPage());
    const t = encodeURIComponent('Camille Ferrand · Vallenoire, le quotidien d’une ville qui nous facilite la vie');
    zone.innerHTML = `<span class="libelle">Partager</span>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener">${ICONES.fb}Facebook<span class="sr-only"> (nouvel onglet)</span></a>
      <a href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener">${ICONES.wa}WhatsApp<span class="sr-only"> (nouvel onglet)</span></a>
      <button type="button" data-copier>${ICONES.lien}<span>Copier le lien</span></button>
      <span class="sr-only" aria-live="polite" data-copie-etat></span>`;
    const b = $('[data-copier]', zone);
    b.addEventListener('click', async () => {
      const etat = $('[data-copie-etat]', zone);
      const lbl = $('span', b);
      try {
        await navigator.clipboard.writeText(urlPage());
        lbl.textContent = 'Lien copié'; etat.textContent = 'Lien copié dans le presse-papiers';
      } catch (e) {
        lbl.textContent = 'Copie impossible'; etat.textContent = 'Copie impossible : sélectionnez l’adresse dans la barre du navigateur';
      }
      setTimeout(() => { lbl.textContent = 'Copier le lien'; }, 2400);
    });
  });

  /* ═══════════ ANIMATIONS DOUCES ═══════════ */
  const animerNombre = (el) => {
    const cible = parseFloat(String(el.dataset.compteur).replace(',', '.'));
    if (!isFinite(cible)) return;
    const dec = (String(el.dataset.compteur).split(/[.,]/)[1] || '').length;
    const pre = el.dataset.prefixe || '';
    const suf = el.dataset.suffixe || '';
    const format = (v) => pre + v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    if (reduit) { el.textContent = format(cible); return; }
    const duree = 1400; const t0 = performance.now();
    const pas = (t) => {
      const k = Math.min(1, (t - t0) / duree);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = format(cible * e);
      if (k < 1) requestAnimationFrame(pas);
    };
    requestAnimationFrame(pas);
  };

  const aObserver = $$('.apparait, .pose, .souligne, [data-compteur]');
  if (reduit || !('IntersectionObserver' in window)) {
    aObserver.forEach((el) => { el.classList.add('vu'); if (el.dataset.compteur) animerNombre(el); });
  } else {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('vu');
        if (e.target.dataset.compteur) animerNombre(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    aObserver.forEach((el) => io.observe(el));
  }

  /* ═══════════ JAUGE DES BÉNÉVOLES ═══════════ */
  const jauge = $('[data-jauge]');
  let inscrits = null;
  const objectif = Number(CFG.objectifBenevoles) || 30;
  const afficherJauge = (n, anime = true) => {
    if (!jauge) return;
    inscrits = n;
    const nb = $('[data-jauge-n]', jauge);
    const barre = $('.jauge-barre i', jauge);
    const role = $('.jauge-barre', jauge);
    const pct = Math.max(0, Math.min(100, (n / objectif) * 100));
    if (nb) { nb.dataset.compteur = String(n); anime ? animerNombre(nb) : (nb.textContent = n); }
    if (barre) requestAnimationFrame(() => { barre.style.width = pct + '%'; });
    if (role) { role.setAttribute('aria-valuenow', String(n)); role.setAttribute('aria-valuetext', `${n} bénévoles sur ${objectif}`); }
    $$('[data-jauge-objectif]').forEach((el) => { el.textContent = objectif; });
    const reste = $('[data-jauge-reste]');
    if (reste) reste.textContent = n >= objectif ? 'Objectif atteint, merci ! Il reste de la place pour vous.' : `Encore ${objectif - n} pour atteindre l’objectif.`;
  };
  if (jauge) {
    const repli = Number(CFG.benevolesRepli) || 0;
    const demarrer = (n) => {
      if (reduit || !('IntersectionObserver' in window)) { afficherJauge(n); return; }
      const io = new IntersectionObserver((es) => {
        if (es.some((e) => e.isIntersecting)) { afficherJauge(n); io.disconnect(); }
      }, { threshold: 0.3 });
      io.observe(jauge);
    };
    if (rempli(CFG.compteurCsv)) {
      const ctrl = 'AbortController' in window ? new AbortController() : null;
      const minuteur = setTimeout(() => ctrl && ctrl.abort(), 6000);
      fetch(CFG.compteurCsv, { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then((t) => {
          const m = t.match(/\d+/);
          if (!m) throw new Error('csv vide');
          demarrer(parseInt(m[0], 10));
        })
        .catch(() => demarrer(repli))
        .finally(() => clearTimeout(minuteur));
    } else {
      demarrer(repli);
    }
  }

  /* ═══════════ AGENDA ═══════════ */
  const agenda = $('[data-agenda]');
  if (agenda) {
    const auj = aujourdhui();
    const liste = (CFG.agenda || [])
      .filter((r) => { const d = new Date(r.date + 'T23:59:59'); return !isNaN(d) && d >= auj; })
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, Number(agenda.dataset.agenda) || 8);
    agenda.innerHTML = liste.length
      ? liste.map((r, i) => {
        const d = new Date(r.date + 'T12:00:00');
        const mois = d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
        const jourSem = d.toLocaleDateString('fr-FR', { weekday: 'long' });
        return `<li class="rdv pose" data-delai="${Math.min(i, 3)}">
          <time datetime="${esc(r.date)}"><span class="jour">${d.getDate()}</span><span class="mois">${esc(mois)}</span></time>
          <div><h3>${esc(r.titre)}</h3><p>${esc(jourSem)} · ${esc(r.heure || '')} · ${esc(r.lieu || '')}</p></div>
          ${r.quartier ? `<span class="quartier">${esc(r.quartier)}</span>` : ''}
        </li>`;
      }).join('')
      : '<li class="vide">Les prochains rendez-vous arrivent très vite. Écrivez-nous pour être prévenu.</li>';
    const io = 'IntersectionObserver' in window && !reduit
      ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); } }), { threshold: 0.15 })
      : null;
    $$('.pose', agenda).forEach((el) => (io ? io.observe(el) : el.classList.add('vu')));
  }

  /* ═══════════ FORMULAIRES VERS MAKE ═══════════ */
  const uid = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const RE_TEL = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

  $$('form[data-kind]').forEach((form) => {
    const kind = form.dataset.kind;
    const affiche = Date.now();
    const etat = $('[data-etat]', form);
    const bouton = $('button[type="submit"]', form);

    const erreur = (nom, msg) => {
      const zone = $(`[data-erreur="${nom}"]`, form);
      const champs = $$(`[name="${nom}"]`, form);
      if (zone) zone.textContent = msg || '';
      champs.forEach((c) => {
        if (c.type === 'checkbox' && champs.length > 1) return;
        if (msg) { c.setAttribute('aria-invalid', 'true'); if (zone) c.setAttribute('aria-describedby', zone.id); }
        else c.removeAttribute('aria-invalid');
      });
      return !msg;
    };
    const valeur = (nom) => { const c = form.elements[nom]; return c ? String(c.value || '').trim() : ''; };
    const coches = (nom) => $$(`input[name="${nom}"]:checked`, form).map((c) => c.value);

    const REGLES = {
      prenom: () => (valeur('prenom').length >= 2 ? '' : 'Indiquez votre prénom.'),
      email: () => (RE_EMAIL.test(valeur('email')) ? '' : 'Indiquez une adresse e-mail valide, par exemple prenom@exemple.fr.'),
      contact: () => {
        const v = valeur('contact');
        if (!v) return 'Indiquez un e-mail ou un numéro de téléphone.';
        return RE_EMAIL.test(v) || RE_TEL.test(v.replace(/\s+/g, ' ')) ? '' : 'Ce n’est ni un e-mail ni un numéro valide (exemple : 06 12 34 56 78).';
      },
      quartier: () => (valeur('quartier') ? '' : 'Choisissez votre quartier.'),
      disponibilites: () => (coches('disponibilites').length ? '' : 'Cochez au moins un moment.'),
      missions: () => (coches('missions').length ? '' : 'Cochez au moins une mission.'),
      type: () => (coches('type').length ? '' : 'Dites-nous de quoi il s’agit.'),
      contenu: () => (valeur('contenu').length >= 10 ? '' : 'Votre message doit contenir au moins 10 caractères.'),
      consentement: () => (form.elements.consentement && form.elements.consentement.checked ? '' : 'Votre accord est nécessaire pour que l’équipe puisse vous répondre.')
    };
    const aValider = Object.keys(REGLES).filter((n) => form.elements[n] || $(`[name="${n}"]`, form));

    aValider.forEach((nom) => {
      $$(`[name="${nom}"]`, form).forEach((c) => {
        const ev = (c.type === 'checkbox' || c.type === 'radio' || c.tagName === 'SELECT') ? 'change' : 'blur';
        c.addEventListener(ev, () => { if (c.getAttribute('aria-invalid') === 'true' || ev === 'change') erreur(nom, REGLES[nom]()); });
        /* Champ texte en erreur : le message s'efface dès que la saisie est
           correcte, et non au moment de quitter le champ (sinon la page
           remonte sous le pointeur pendant le clic suivant). */
        if (ev === 'blur') c.addEventListener('input', () => { if (c.getAttribute('aria-invalid') === 'true' && !REGLES[nom]()) erreur(nom, ''); });
      });
    });

    const donnees = () => {
      const d = {
        kind,
        id: uid(),
        page: courante,
        horodatage: new Date().toISOString(),
        source: 'site',
        version_consentement: CFG.versionConsentement || ''
      };
      if (kind === 'benevole') {
        const c = valeur('contact');
        Object.assign(d, {
          prenom: valeur('prenom'),
          contact: c,
          contact_type: RE_EMAIL.test(c) ? 'email' : 'telephone',
          quartier: valeur('quartier'),
          disponibilites: coches('disponibilites').join(','),
          missions: coches('missions').join(','),
          consentement: 'oui'
        });
      } else {
        Object.assign(d, {
          prenom: valeur('prenom'),
          email: valeur('email'),
          type: coches('type')[0] || '',
          theme: valeur('theme'),
          contenu: valeur('contenu'),
          consentement: 'oui'
        });
      }
      return d;
    };

    const mailto = (d) => {
      const lignes = Object.entries(d).filter(([k]) => !['id', 'source', 'version_consentement'].includes(k)).map(([k, v]) => `${k} : ${v}`);
      const sujet = d.kind === 'benevole' ? `Nouveau bénévole : ${d.prenom}` : `Message du site (${d.type}) : ${d.prenom}`;
      return `mailto:${CFG.emailEquipe}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(lignes.join('\n'))}`;
    };

    const repli = (d, raison) => {
      if (!etat) return;
      etat.classList.add('probleme');
      etat.innerHTML = rempli(CFG.emailEquipe)
        ? `${raison} Pour ne rien perdre, <a href="${esc(mailto(d))}">envoyez-le par e-mail en un clic</a> : le message est déjà rédigé.`
        : `${raison} Réessayez dans quelques minutes, ou venez nous voir au marché du samedi.`;
      if (bouton) { bouton.disabled = false; bouton.removeAttribute('aria-busy'); }
      etat.focus();
    };

    const reussir = () => {
      form.classList.add('envoye');
      const s = $('.succes', form);
      if (s) { s.setAttribute('tabindex', '-1'); s.focus(); }
      if (kind === 'benevole' && inscrits !== null) afficherJauge(inscrits + 1, false);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (etat) { etat.textContent = ''; etat.classList.remove('probleme'); }

      /* Piège à robots : si rempli, on ne transmet rien mais on remercie */
      if (form.elements.site_web && form.elements.site_web.value) { reussir(); return; }

      const ok = aValider.map((n) => erreur(n, REGLES[n]())).every(Boolean);
      if (!ok) {
        const premier = $('[aria-invalid="true"]', form);
        if (premier) premier.focus();
        if (etat) etat.textContent = 'Certains champs sont à compléter : les indications sont sous chaque champ.';
        return;
      }

      /* Envoi trop rapide : probablement un robot */
      if (Date.now() - affiche < 3000) {
        if (etat) etat.textContent = 'Merci de prendre un instant pour relire, puis renvoyez le formulaire.';
        return;
      }

      const d = donnees();
      if (!rempli(CFG.makeWebhook)) { repli(d, 'L’envoi automatique n’est pas encore branché.'); return; }

      if (bouton) { bouton.disabled = true; bouton.setAttribute('aria-busy', 'true'); }
      if (etat) etat.textContent = 'Envoi en cours…';
      fetch(CFG.makeWebhook, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(d) })
        .then(() => { if (etat) etat.textContent = ''; reussir(); })
        .catch(() => repli(d, 'L’envoi n’a pas abouti (connexion interrompue ?).'));
    });
  });

  /* ═══════════ PROGRAMME : MESURES DÉPLIABLES ═══════════ */
  $$('.mesure-bouton').forEach((b) => {
    b.addEventListener('click', () => {
      const ouvert = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!ouvert));
      const d = document.getElementById(b.getAttribute('aria-controls'));
      if (d) d.hidden = ouvert;
    });
  });

  /* Filtres par pilier et par profil */
  const filtres = $('[data-filtres]');
  if (filtres) {
    const etatF = { pilier: 'tous', profil: 'tous' };
    const annonce = $('[data-filtre-resultat]');
    const appliquer = () => {
      let n = 0;
      $$('.mesure').forEach((m) => {
        const okP = etatF.pilier === 'tous' || m.dataset.pilier === etatF.pilier;
        const okQ = etatF.profil === 'tous' || (m.dataset.profils || '').split(' ').includes(etatF.profil);
        const actif = okP && okQ;
        const filtre = etatF.pilier !== 'tous' || etatF.profil !== 'tous';
        m.classList.toggle('eteinte', filtre && !actif);
        m.classList.toggle('allumee', filtre && actif);
        if (actif) n++;
      });
      if (annonce) annonce.textContent = (etatF.pilier === 'tous' && etatF.profil === 'tous') ? 'Les 24 mesures sont affichées.' : `${n} mesure${n > 1 ? 's' : ''} mise${n > 1 ? 's' : ''} en avant.`;
    };
    $$('[data-filtre]', filtres).forEach((b) => {
      b.addEventListener('click', () => {
        const g = b.dataset.filtre;
        $$(`[data-filtre="${g}"]`, filtres).forEach((x) => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
        etatF[g] = b.dataset.valeur;
        appliquer();
      });
    });
  }

  /* Liens « mesure n » : ouvre et met en avant la carte visée */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#mesure-"]');
    if (!a) return;
    const carte = document.querySelector(a.getAttribute('href'));
    if (!carte) return;
    const b = $('.mesure-bouton', carte);
    if (b && b.getAttribute('aria-expanded') !== 'true') b.click();
    setTimeout(() => b && b.focus({ preventScroll: true }), 400);
  });

  /* ═══════════ PROGRAMME : SIMULATEUR ═══════════ */
  const sim = $('[data-simulateur]');
  if (sim && CFG.simulateur) {
    const H = CFG.simulateur;
    const eur = (v, dec = 2) => v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + ' €';
    const pct = (v) => (v * 100).toLocaleString('fr-FR') + ' %';

    /* Hypothèses affichées telles que dans config.js */
    const selTranche = $('[name="tranche"]', sim);
    if (selTranche) selTranche.innerHTML = (H.tranches || []).map((t, i) => `<option value="${i}">${esc(t.libelle)} : ${eur(t.prix)} le repas</option>`).join('');
    $$('[data-hyp]').forEach((el) => {
      const k = el.dataset.hyp;
      const v = {
        repas: String(H.repasParAn),
        prix: eur(H.prixRepasActuel),
        tarifs: (H.tranches || []).map((t) => eur(t.prix)).join(' · '),
        taux: pct(H.hausseTauxEvitee),
        part: pct(H.partCommunale),
        energie: pct(H.economieEnergie)
      }[k];
      if (v) el.textContent = v;
    });

    let enfants = 1;
    const zoneSim = sim.closest('.simulateur') || document;
    const sortieEnfants = $('[data-enfants]', zoneSim);
    const montant = $('[data-montant]', zoneSim);
    const lignes = { cantine: $('[data-part="cantine"]', zoneSim), fonciere: $('[data-part="fonciere"]', zoneSim), energie: $('[data-part="energie"]', zoneSim) };
    let affiche = 0; let anim = null;

    const nombre = (nom) => {
      const v = parseFloat(String(($(`[name="${nom}"]`, sim) || {}).value || '').replace(/\s/g, '').replace(',', '.'));
      return isFinite(v) && v > 0 ? v : 0;
    };
    const arrondi = (v) => Math.round(v / (H.arrondi || 10)) * (H.arrondi || 10);

    const calculer = () => {
      const t = (H.tranches || [])[Number(selTranche ? selTranche.value : 0)] || { prix: H.prixRepasActuel };
      const cantine = Math.max(0, (H.prixRepasActuel - t.prix) * H.repasParAn * enfants);
      const fonciere = nombre('fonciere') * H.partCommunale * H.hausseTauxEvitee;
      const energie = nombre('electricite') * 12 * H.economieEnergie;
      const total = arrondi(cantine + fonciere + energie);
      lignes.cantine.textContent = eur(Math.round(cantine), 0);
      lignes.fonciere.textContent = eur(Math.round(fonciere), 0);
      lignes.energie.textContent = eur(Math.round(energie), 0);
      const depart = affiche; const t0 = performance.now();
      cancelAnimationFrame(anim);
      if (reduit) { affiche = total; montant.textContent = eur(total, 0); return; }
      const pas = (now) => {
        const k = Math.min(1, (now - t0) / 700); const e = 1 - Math.pow(1 - k, 3);
        affiche = Math.round(depart + (total - depart) * e);
        montant.textContent = eur(affiche, 0);
        if (k < 1) anim = requestAnimationFrame(pas);
      };
      anim = requestAnimationFrame(pas);
    };

    $$('[data-enfant]', sim).forEach((b) => b.addEventListener('click', () => {
      enfants = Math.max(0, Math.min(6, enfants + Number(b.dataset.enfant)));
      sortieEnfants.textContent = enfants;
      calculer();
    }));
    sim.addEventListener('input', calculer);
    sim.addEventListener('change', calculer);
    sim.addEventListener('submit', (e) => e.preventDefault());
    calculer();
  }

  /* ═══════════ PROGRAMME : QUARTIERS ═══════════ */
  const carteQ = $('[data-carte-quartiers]');
  if (carteQ) {
    const fiche = $('[data-fiche-quartier]');
    const donneesQ = {};
    $$('[data-quartier-ligne]').forEach((tr) => {
      const c = $$('td, th', tr).map((x) => x.textContent.trim());
      donneesQ[tr.dataset.quartierLigne] = { nom: c[0], profil: c[1], enjeux: c[2], mesures: (tr.dataset.mesures || '').split(' ').filter(Boolean) };
    });
    const titreMesure = (n) => { const m = document.getElementById('mesure-' + n); const t = m && $('.titre-mesure', m); return t ? t.textContent : 'Mesure ' + n; };
    const montrer = (id) => {
      const q = donneesQ[id]; if (!q || !fiche) return;
      $$('.zone', carteQ).forEach((z) => z.setAttribute('aria-pressed', String(z.dataset.zone === id)));
      fiche.innerHTML = `<p class="surtitre">Quartier</p><h3>${esc(q.nom)}</h3>
        <dl><dt>Qui y vit</dt><dd>${esc(q.profil)}</dd><dt>Ce qui compte ici</dt><dd>${esc(q.enjeux)}</dd></dl>
        <p><strong>Mesures prioritaires</strong></p>
        <div class="etiquettes">${q.mesures.map((n) => `<a href="#mesure-${n}">${n} · ${esc(titreMesure(n))}</a>`).join('')}</div>`;
    };
    $$('.zone', carteQ).forEach((z) => {
      z.addEventListener('click', () => montrer(z.dataset.zone));
      z.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); montrer(z.dataset.zone); } });
    });
    const premier = $('.zone', carteQ);
    if (premier) montrer(premier.dataset.zone);
  }

  /* ═══════════ PRESSE : COMMUNIQUÉS ═══════════ */
  const zoneCom = $('[data-communiques]');
  if (zoneCom && CFG.presse) {
    const auj = aujourdhui();
    zoneCom.innerHTML = (CFG.presse.communiques || []).map((c, i) => {
      const d = new Date(c.date + 'T12:00:00');
      const aVenir = d > auj;
      const dateTxt = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      const action = c.fichier
        ? `<a class="btn btn-contour btn-petit" href="${esc(c.fichier)}" download>Télécharger le communiqué</a>`
        : `<p class="discret">${aVenir ? 'Communiqué disponible à cette date.' : 'Sur demande auprès du contact presse.'}</p>`;
      return `<article class="carte communique pose" data-delai="${i}">
        <time datetime="${esc(c.date)}">${aVenir ? 'À paraître · ' : ''}${esc(dateTxt)}</time>
        <h3>${esc(c.titre)}</h3><p>${esc(c.resume)}</p>${action}</article>`;
    }).join('');
    const io = 'IntersectionObserver' in window && !reduit
      ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); } }), { threshold: 0.15 })
      : null;
    $$('.pose', zoneCom).forEach((el) => (io ? io.observe(el) : el.classList.add('vu')));
  }
})();
