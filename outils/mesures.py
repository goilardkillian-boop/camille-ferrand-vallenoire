"""Les 24 mesures du programme (section 10 du brief) et leur rendu HTML."""
T='parent senior jeune commercant proprietaire'
PILIERS = [
 ('pouvoir-achat','Pouvoir d’achat','Priorité 1', [
  (1,'Taxe foncière : taux communal gelé','Aucune hausse du taux communal pendant tout le mandat.','Propriétaires','Vote annuel des taux','Dès le premier budget','proprietaire'),
  (2,'Cantine et périscolaire au quotient familial','Chaque famille paie selon ses revenus, avec un tarif plancher pour les plus petits budgets.','Familles','Tarifs communaux','Rentrée suivant l’élection','parent'),
  (3,'Une mutuelle communale négociée','Une complémentaire santé moins chère, négociée pour tous les habitants qui le souhaitent.','Seniors, petits revenus','Convention avec le CCAS','Première année','senior'),
  (4,'Achat groupé d’électricité et de gaz','Tous les foyers peuvent payer leur énergie moins cher, sans engagement.','Tous les habitants','Organisation communale','Première année',T),
  (5,'Guichet « Toutes vos aides »','Un seul endroit, en mairie et en permanence de quartier, pour connaître et obtenir les aides auxquelles vous avez droit.','Seniors, familles','CCAS','Six premiers mois','senior parent'),
  (6,'Pass jeunes sport et culture','Un coup de pouce pour les 16 à 25 ans : club, cinéma, conservatoire, médiathèque.','Jeunes de 16 à 25 ans','Budget communal','Première année','jeune'),
  (7,'Stationnement gratuit 1 heure en centre-ville','Faire ses courses sous les arcades sans payer la première heure.','Commerçants, seniors','Tarifs de stationnement','Dès le premier budget','commercant senior'),
  (8,'Rénovation énergétique des bâtiments communaux','Les économies d’énergie de la mairie financent les mesures de pouvoir d’achat.','Tous les habitants','Investissement communal','Tout le mandat',T)]),
 ('tranquillite','Tranquillité','Priorité 2 · présence et prévention', [
  (9,'Police municipale de proximité','Des agents à pied, connus des habitants, le soir et le week-end.','Tous les habitants','Effectifs et horaires','Première année',T),
  (10,'Médiateurs de rue','Des médiateurs pour apaiser les conflits de voisinage et prévenir les incivilités.','Tous les habitants','Recrutement ou partenariat associatif','Première année',T),
  (11,'Un référent tranquillité par quartier','Un interlocuteur identifié et une réunion publique par trimestre dans chaque quartier.','Tous les habitants','Organisation municipale','Six premiers mois',T),
  (12,'Un problème signalé, une réponse sous 7 jours','Un problème dans votre rue ? Application, téléphone ou accueil : la mairie répond en 7 jours.','Tous les habitants','Services municipaux','Six premiers mois',T),
  (13,'Éclairage LED des rues peu éclairées','Rentrer à pied le soir plus sereinement, en consommant moins d’énergie.','Tous les habitants','Éclairage public','Tout le mandat',T),
  (14,'Vidéoprotection, seulement là où les habitants la demandent','Uniquement aux points signalés par les habitants, avec une charte publique et une évaluation chaque année.','Commerçants, riverains','Conseil municipal et préfecture','Selon diagnostic partagé','commercant proprietaire')]),
 ('mobilite','Mobilité du quotidien','Mieux se déplacer au quotidien', [
  (15,'Rues aux écoles','Les rues devant les écoles fermées aux voitures à l’entrée et à la sortie des classes.','Familles','Pouvoir de police de la circulation','Rentrée suivant l’élection','parent'),
  (16,'Un plan vélo continu et sécurisé','Des pistes qui se suivent, d’un quartier à l’autre, sans rupture dangereuse.','18 à 40 ans','Voirie','Tout le mandat','jeune parent'),
  (17,'Aide à l’achat d’un vélo','Une aide selon les revenus pour un vélo classique, électrique ou cargo.','26 à 60 ans','Budget communal','Première année','parent'),
  (18,'Trottoirs praticables et bancs réguliers','Marcher avec une poussette ou une canne sans obstacle, et pouvoir s’asseoir en chemin.','Seniors, familles','Voirie','Programme annuel','senior parent'),
  (19,'Transport à la demande pour les aînés','Un service sur réservation pour les aînés et les personnes à mobilité réduite, hameaux compris.','Seniors','CCAS ou agglomération','Première année','senior'),
  (20,'Des bus le soir et le week-end','Plus de bus aux heures où l’on en a besoin, à tarif réduit pour les jeunes et les seniors.','Jeunes, seniors','Compétence de l’agglomération, portée par la commune','À négocier avec l’agglomération','jeune senior'),
  (21,'Parkings vélos sécurisés et aires de covoiturage','Laisser son vélo en confiance à la gare et partager la route vers Bordeaux.','Actifs','Foncier communal','Deux premières années','jeune parent')]),
 ('environnement','Environnement et méthode','Rendre des comptes', [
  (22,'Végétaliser les cours d’école et les rues les plus chaudes','Plus d’ombre et de fraîcheur l’été, là où les enfants jouent et où l’on marche.','Familles','Patrimoine communal','Tout le mandat','parent'),
  (23,'Le budget publié chaque année, en une page','Le coût de chaque engagement, lisible par tous, chaque année.','Tous les habitants','Transparence','Chaque année',T),
  (24,'Un bilan public à mi-mandat','Engagement par engagement : ce qui est fait, ce qui reste à faire, et pourquoi.','Tous les habitants','Transparence','À mi-mandat',T)])]

IMAGES = {
    'pouvoir-achat': ('cantine.jpg', 'Un plateau de cantine équilibré posé sur une table en bois'),
    'tranquillite': ('quais.jpg', 'Les quais éclairés en soirée, le long de la rivière'),
    'mobilite': ('ecole.jpg', 'Des enfants et leurs parents marchent vers l’école dans une rue fermée aux voitures'),
    'environnement': ('coteaux.jpg', 'Des coteaux de vigne et un village au loin'),
}


def html():
    out = []
    for pid, nom, prio, ms in PILIERS:
        img, alt = IMAGES[pid]
        out.append(f'''        <section class="pilier" id="pilier-{pid}" aria-labelledby="titre-{pid}">
          <div class="pilier-entete">
            <div><h3 id="titre-{pid}">{nom}</h3><p class="priorite">{prio} · {len(ms)} mesures</p></div>
            <img src="images/{img}" alt="{alt}" width="1350" height="900" loading="lazy" decoding="async">
          </div>
          <ul class="mesures" role="list">''')
        for n, t, b, pub, lev, hor, prof in ms:
            out.append(f'''            <li><details class="pliable mesure" id="mesure-{n}" data-pilier="{pid}" data-profils="{prof}">
              <summary><span class="num" aria-hidden="true">{n:02d}</span><span><span class="sr-only">Mesure {n} : </span><span class="titre-mesure">{t}</span><span class="benefice">{b}</span></span></summary>
              <div class="contenu"><dl><dt>Pour qui</dt><dd>{pub}</dd><dt>Levier de la mairie</dt><dd>{lev}</dd><dt>Quand</dt><dd>{hor}</dd></dl></div>
            </details></li>''')
        out.append('          </ul>\n        </section>')
    return '\n'.join(out)
