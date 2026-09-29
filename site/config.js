/* ═══════════════════════════════════════════════════════════
   CAMILLE FERRAND · VALLENOIRE · config.js
   TOUS les réglages modifiables du site sont ici, et nulle part
   ailleurs. Les valeurs entre crochets [COMME_CECI] sont des
   emplacements à remplir avant la mise en ligne.
   Rappel légal : plus aucune mise à jour du site à partir de la
   veille du scrutin à 0 h (article L49 du Code électoral).
   ═══════════════════════════════════════════════════════════ */

window.CAMPAGNE = {

  /* ─── Contacts ─── */
  emailEquipe: '[EMAIL_EQUIPE]',        // reçoit les messages et le repli des formulaires
  emailPresse: '[EMAIL_PRESSE]',        // contact affiché sur presse.html
  telPresse: '[TELEPHONE_PRESSE]',      // facultatif : laisser tel quel pour le masquer

  /* Adresse publique du site, SANS barre finale, par exemple
     https://moncompte.github.io/camille-ferrand. Sert aux liens de partage. */
  urlSite: '[URL_SITE]',

  /* ─── Make (voir MAKE-SETUP.md) ─── */
  makeWebhook: '[URL_WEBHOOK_MAKE]',          // un seul webhook, le champ "kind" route les envois
  compteurCsv: '[URL_CSV_ONGLET_COMPTEUR]',   // onglet "Compteur" publié en CSV (aucune donnée personnelle)
  benevolesRepli: 12,                         // affiché si le CSV ne répond pas
  objectifBenevoles: 30,

  /* Version du texte de consentement envoyée avec chaque formulaire :
     à changer si la formulation des cases de consentement change. */
  versionConsentement: '2026-09',

  /* ─── Scrutin ─── */
  dateScrutin: '2026-12-13',                  // hypothèse de travail, à ajuster
  liens: {
    inscription: 'https://www.service-public.gouv.fr/particuliers/vosdroits/services-en-ligne-et-formulaires/ISE',
    procuration: 'https://www.maprocuration.gouv.fr/'
  },

  /* ─── Réseaux ─── */
  reseaux: {
    facebook: '[URL_FACEBOOK]',
    instagram: '[URL_INSTAGRAM]'
  },

  /* ─── Agenda ───
     Une ligne par rendez-vous. Le site trie par date et masque
     automatiquement les dates passées. Format de date : AAAA-MM-JJ. */
  agenda: [
    { date: '2026-10-03', heure: '9 h à 12 h', lieu: 'Marché sous les arcades', titre: 'Stand de campagne', quartier: 'Centre bastide' },
    { date: '2026-10-08', heure: '18 h 30', lieu: 'Salle des fêtes du Pradet', titre: 'Réunion publique : pouvoir d’achat', quartier: 'Le Pradet' },
    { date: '2026-10-10', heure: '9 h à 12 h', lieu: 'Marché sous les arcades', titre: 'Stand de campagne', quartier: 'Centre bastide' },
    { date: '2026-10-14', heure: '17 h à 19 h', lieu: 'Café de la gare', titre: 'Permanence de quartier', quartier: 'Gare Saint-Jean' },
    { date: '2026-10-17', heure: '10 h à 12 h', lieu: 'Promenade des quais', titre: 'Balade de quartier : éclairage des berges', quartier: 'Les Quais' },
    { date: '2026-10-22', heure: '18 h 30', lieu: 'Foyer rural', titre: 'Réunion publique : se déplacer sans voiture', quartier: 'Hameaux viticoles' },
    { date: '2026-10-28', heure: '17 h à 19 h', lieu: 'Maison des associations', titre: 'Permanence de quartier', quartier: 'Les Coteaux' },
    { date: '2026-11-05', heure: '18 h 30', lieu: 'Salle communale des Quais', titre: 'Réunion publique : tranquillité et prévention', quartier: 'Les Quais' },
    { date: '2026-11-14', heure: '9 h à 12 h', lieu: 'Marché sous les arcades', titre: 'Présentation du programme', quartier: 'Centre bastide' },
    { date: '2026-11-26', heure: '18 h 30', lieu: 'Gymnase des Coteaux', titre: 'Grande réunion publique', quartier: 'Les Coteaux' }
  ],

  /* ─── Simulateur « Ce que je gagne » (programme.html) ───
     HYPOTHÈSES DE TRAVAIL, affichées telles quelles sur la page. */
  simulateur: {
    repasParAn: 140,                          // repas de cantine par enfant et par an
    prixRepasActuel: 4.20,                    // prix actuel d'un repas, en euros
    tranches: [                               // tarifs au quotient familial proposés
      { libelle: 'Quotient inférieur à 500 €', prix: 1.00 },
      { libelle: 'Quotient de 500 à 900 €', prix: 2.50 },
      { libelle: 'Quotient de 900 à 1 400 €', prix: 3.50 },
      { libelle: 'Quotient supérieur à 1 400 €', prix: 4.20 }
    ],
    hausseTauxEvitee: 0.02,                   // hausse annuelle du taux communal évitée (2 %)
    partCommunale: 0.50,                      // part communale estimée dans l'avis de taxe foncière
    economieEnergie: 0.10,                    // économie de l'achat groupé sur l'électricité (10 %)
    arrondi: 10                               // résultat arrondi à la dizaine d'euros
  },

  /* ─── Presse ─── */
  presse: {
    communiques: [
      { date: '2026-09-15', titre: 'Camille Ferrand annonce sa candidature à Vallenoire', resume: 'Une liste citoyenne et rassembleuse, au-delà des étiquettes, pour une ville qui facilite le quotidien.', fichier: '' },
      { date: '2026-11-14', titre: 'Présentation du programme : 24 mesures datées et chiffrées', resume: 'Pouvoir d’achat, tranquillité, mobilité du quotidien, environnement et méthode : le détail des engagements.', fichier: '' }
    ]
  }
};
