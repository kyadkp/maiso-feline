# Maison Féline — Brief projet

Ce fichier est la référence du projet. À relire au début de chaque nouvelle session.

## Règle de fonctionnement (prioritaire)
- Avancer **étape par étape**, expliquer les choix simplement.
- **Ne jamais passer à l'étape suivante sans validation explicite** de la gérante.
- Poser des questions si une information manque — ne jamais inventer.
- À la fin de chaque étape : résumer ce qui a été fait + ce qu'il faut tester.

## 1. La boutique
- Nom : **Maison Féline**
- Produits : vêtements et chaussures — cible **mixte** (femme et homme, catégories séparées)
- Clients : principalement au Sénégal, majoritairement sur mobile
- Langue : français
- Devise : FCFA (XOF)

## 2. Expérience voulue
- Site sophistiqué, moderne, épuré, pas chargé
- Simple d'usage, mais soigné dans le détail, pensé pour donner envie d'acheter
- Mobile-first, parfaitement responsive
- Expérience mémorable : belles photos produits, transitions fluides, chargement rapide
- Référence d'inspiration : https://landonorris.com/ (esprit uniquement, pas l'identité ni les couleurs)
  - Grande typographie audacieuse, titres en majuscules
  - Animations au défilement fluides et élégantes
  - Photos produit qui changent au survol (ex. 2e photo au hover)
  - Grandes images plein écran, ambiance éditoriale/premium
  - Vraie personnalité, pas un site générique
- **Adaptation obligatoire** : identité mode/féline/raffinée (magazine de mode), pas sport automobile.
  Animations légères partout sauf page d'accueil : catalogue/produit/panier/paiement doivent rester rapides même en 4G moyenne.
- Couleurs : 3 palettes différentes proposées (une par maquette), adaptées à une marque de mode nommée Maison Féline.

## 3. Fonctionnalités côté client
- Accueil vitrine : nouveautés, meilleures ventes, promotions
- Catégories / sous-catégories (ex. Vêtements > Robes, Chaussures > Baskets) + filtres (taille, couleur, prix)
- Recherche produits
- Fiche produit : plusieurs photos avec zoom, description, tailles, couleurs, stock, prix
- Panier + commande en ligne
- Compte client optionnel (commande possible sans compte)
- Suivi de commande : statut (nouvelle, confirmée, livrée, annulée) via compte OU numéro de commande + téléphone
- Paiement : Wave, Orange Money, paiement à la livraison

## 4. Espace admin (gérante)
- Accès séparé et protégé
- Dashboard : nb commandes, nouvelles commandes, chiffre d'affaires
- Liste des commandes : client, contenu, date, montant, mode de paiement, adresse, téléphone
- Filtre/recherche par statut, date, client
- Changement de statut : nouvelle → confirmée → livrée, ou annulée
- Gestion produits : ajout/modif/suppression, photos, prix, tailles, stock
- Gestion catégories
- Utilisable depuis un téléphone

## 5. Sécurité (priorité absolue)
- Solutions éprouvées uniquement pour auth, paiement, base de données — jamais de sécurité "faite maison"
- HTTPS partout
- Mots de passe hachés, admin protégé (limitation tentatives, 2FA si possible)
- Protection injection SQL, XSS, CSRF, accès non autorisé aux données d'autrui
- Chaque client voit uniquement ses commandes ; admin voit tout
- Validation serveur de toutes les données
- Aucun secret (API, DB, paiement) dans le code → variables d'environnement uniquement
- Une commande n'est marquée payée qu'après confirmation serveur vérifiée (webhook signé Wave/Orange Money/agrégateur) — jamais depuis le navigateur client
- Données personnelles clients réduites au strict nécessaire et protégées
- Sauvegardes régulières de la base de données
- Dépendances à jour, sans faille connue

## 6. Technique — à proposer et faire valider avant de commencer
- Choisir la techno la plus adaptée : sécurité, rapidité, coût d'hébergement faible au départ, maintenabilité par la gérante. Expliquer en quelques lignes.
- Paiements : comparer intégration directe Wave Business API + Orange Money API vs agrégateur (PayDunya, PayTech, CinetPay...), puis recommander la solution la plus simple et la plus sûre.

## 7. Étapes de travail (validation obligatoire entre chaque étape)
1. **Maquettes** : 3 maquettes HTML statiques (accueil + fiche produit), produits fictifs, 1 palette différente par maquette, ouvrables dans le navigateur. Expliquer en une ligne ce qui distingue chaque maquette. → Arrêt, attendre le choix.
2. **Vitrine** : toutes les pages client dans le style choisi, données fictives. Attendre retours.
3. **Commandes et comptes** : base de données, comptes clients, panier, commande, suivi de commande.
4. **Espace admin** : dashboard, gestion commandes et produits.
5. **Paiements** : intégration Wave + Orange Money, d'abord en sandbox.
6. **Audit de sécurité** : revérifier tout le projet point par point (section 5), corriger, résumé clair.
7. **Mise en ligne** : déploiement + configuration du nom de domaine, expliqué simplement.

## Historique des décisions
- Cible confirmée : mixte (femme + homme)
- Pas de logo/charte existants : identité visuelle créée dans les maquettes
- Stack validée : Next.js + TypeScript, Tailwind CSS, PostgreSQL + Prisma, Auth.js, hébergement Vercel pour démarrer
- Paiement : agrégateur retenu en approche (PayTech en premier choix, CinetPay en second choix) — confirmation définitive à l'étape 5
- Palette retenue à l'issue de l'étape 1 : **Noir & Or** (maquettes/maquette-1-noir-or)
- Étape 2 (vitrine) démarrée : projet Next.js créé dans `site/` (App Router, TypeScript, Tailwind CSS v4), thème Noir & Or repris en variables CSS, données produits fictives dans `site/src/lib/products.ts`
- Pages réalisées à l'étape 2 : accueil, Femme/Homme/Chaussures + sous-catégories avec filtres (taille/couleur/prix), recherche, fiche produit (galerie, couleurs, tailles, panier ou commande directe), panier (persistant en local via localStorage, sans backend), pages d'info (contact, livraison, mentions légales, etc.)
- Volontairement pas encore fonctionnel à l'étape 2 (arrive aux étapes 3/5) : création de compte, connexion, validation de commande réelle, paiement — des pages d'attente expliquent cela au lieu de liens morts
- Étape 3 (commandes et comptes) réalisée :
  - Base de données SQLite en local via Prisma (adaptateur libSQL, requis par Prisma 7) ; config dans `site/prisma.config.ts` et `site/prisma/schema.prisma`. Pour passer en PostgreSQL à la mise en ligne (étape 7), il suffira de changer `DATABASE_URL` et l'adaptateur Prisma, le schéma ne change pas.
  - Comptes client par **numéro de téléphone + mot de passe** (confirmé avec la gérante), via Auth.js (next-auth v5), mots de passe hachés avec bcrypt, sessions JWT signées (`AUTH_SECRET` en variable d'environnement, jamais dans le code)
  - Tunnel de commande réel : `/commande` crée une vraie commande en base (numéro de commande type `MF-2026-123456`), `/commande/confirmation/[numéro]` affiche la confirmation
  - Sécurité appliquée : le prix et le nom de chaque article sont toujours relus depuis le catalogue serveur à la validation de la commande (jamais depuis les données envoyées par le navigateur) ; chaque client ne voit que ses propres commandes (`/compte`) ; le suivi sans compte (`/suivi-commande`) exige le numéro de commande ET le téléphone ensemble ; toutes les entrées sont validées côté serveur avec zod
  - Paiement Wave/Orange Money : le client choisit son mode de paiement à la commande, mais aucun paiement réel n'est encore traité (ça arrive à l'étape 5) — la commande est enregistrée et la cliente est contactée pour confirmer
  - Point de vigilance pour l'audit de sécurité (étape 6) : `npm audit` signale 7 failles "modérées" dans une dépendance de développement d'ESLint (jamais exécutée en production) ; à vérifier si un correctif est disponible d'ici l'étape 6
- Étape 4 (espace admin) réalisée :
  - Accès séparé à `/admin/connexion`, zone protégée sous `/admin/(protected)` (mise en page distincte, sans le menu/panier du site client). Rôle `ADMIN` ajouté au modèle `User` (même mécanisme de connexion que les clientes, téléphone + mot de passe, mais accès refusé si le rôle n'est pas admin).
  - **Compte admin** : numéro confirmé par la gérante (771614453), stocké dans `.env` (`ADMIN_PHONE`/`ADMIN_PASSWORD`, jamais dans le code). Mot de passe encore provisoire (généré) — à changer par la gérante elle-même dès qu'une page de changement de mot de passe existe (pas encore construite).
  - Sécurité ajoutée : limitation des tentatives de connexion (5 essais, blocage 15 minutes) appliquée à tous les comptes, y compris admin — testée et fonctionnelle. 2FA pas encore mis en place (noté pour l'étape 6).
  - Tableau de bord : nombre de commandes, nouvelles commandes, chiffre d'affaires.
  - Gestion des commandes : liste complète, recherche (nom/téléphone/numéro), filtre par statut, changement de statut en un clic.
  - Catalogue (produits + catégories) **déplacé de données statiques vers la base de données** : la gérante peut maintenant ajouter/modifier/supprimer produits et catégories elle-même, avec envoi de photo (jpg/png/webp, 5 Mo max, stockées dans `site/public/uploads`). Une catégorie encore utilisée par des produits ne peut pas être supprimée (message d'erreur clair).
  - Toutes les pages client (accueil, catégories, recherche, fiche produit) lisent désormais la base de données en direct : un produit ajouté par la gérante apparaît immédiatement sur le site.
- Étape 5 (paiements) réalisée côté code, **en attente des clés PayTech de la gérante pour tester en conditions réelles** :
  - **Agrégateur confirmé : PayTech** (paytech.sn). Comparé à nouveau avec CinetPay avant de construire : PayTech offre un mode test immédiat sans aucun papier d'entreprise, une vérification de signature (HMAC-SHA256) bien documentée, et gère Wave + Orange Money ; CinetPay a un fonctionnement équivalent mais des conditions d'accès au sandbox moins claires. PayTech reste donc le premier choix validé.
  - Flux : à la commande, si Wave ou Orange Money est choisi, le site appelle l'API PayTech puis redirige la cliente vers une page de paiement hébergée par PayTech (sécurisée, hors de notre site). PayTech nous notifie ensuite automatiquement (webhook/IPN) du résultat.
  - Sécurité : la commande n'est marquée "payée" (`paymentStatus: PAID`) que si la notification de PayTech est vérifiée par signature HMAC-SHA256 côté serveur (`/api/paytech/ipn`) — jamais depuis le navigateur. Testé avec une fausse notification non signée : rejetée (403), commande inchangée.
  - Tant que les clés ne sont pas renseignées (`PAYTECH_API_KEY`/`PAYTECH_API_SECRET` dans `.env`), le site refuse poliment Wave/Orange Money à la commande et oriente vers "Paiement à la livraison" — aucun blocage, juste pas encore activé.
  - **Ce qu'il reste à faire avec la gérante** :
    1. Créer un compte gratuit sur paytech.sn (aucun document d'entreprise requis pour le mode test).
    2. Récupérer la Clé API et la Clé Secrète de test dans le tableau de bord PayTech, me les transmettre pour les ajouter à `.env`.
    3. Comme le site tourne sur cet ordinateur (pas encore en ligne), PayTech ne peut pas encore nous notifier automatiquement : il faudra un tunnel temporaire (ex. ngrok) pour tester le paiement de bout en bout avant la mise en ligne. À mettre en place avec son accord le moment venu.
  - Activation du mode réel (`env=prod`, vrai argent) : nécessite en plus une validation PayTech avec les documents de l'entreprise (NINEA, registre de commerce...) — à prévoir pour la mise en ligne (étape 7), pas avant.
  - **Décision de la gérante (2026-11-14)** : la création du compte PayTech est mise en pause pour l'instant. Wave et Orange Money restent affichés et sélectionnables sur le site (pas supprimés), mais ne sont pas fonctionnels tant que les clés ne sont pas fournies — en les choisissant, la cliente obtient un message clair l'invitant à payer à la livraison à la place.
  - **Nouvelle règle pour le paiement à la livraison** : un acompte de 50 % est demandé avant l'expédition (le solde est réglé à la livraison). Affiché sur la page de commande, la confirmation de commande et la page "Livraison & retours". La collecte de cet acompte se fait pour l'instant manuellement (la gérante contacte la cliente) puisque Wave/Orange Money ne sont pas encore connectés au site.
- **Galerie photos produit (2026-11-14)** : chaque produit peut désormais avoir plusieurs photos (une table dédiée en base, liée au produit). Décidé avec la gérante : 5 photos conseillées mais pas obligatoires, ordre = ordre d'ajout (pas de glisser-déposer pour l'instant).
  - Admin : possibilité d'ajouter plusieurs photos en une fois, et d'en supprimer une à une (case à cocher) sur la fiche produit.
  - Site client : vraies miniatures sous la photo principale ; clic sur la photo → ouverture en plein écran avec défilement animé (glisser au doigt sur mobile, flèches sur ordinateur) pour voir toutes les photos du produit.
  - Bonus (déjà prévu dans la section 2 du brief) : sur les cartes produit (listes), la 2e photo apparaît au survol de la souris.
  - La photo déjà envoyée par la gérante (Sandales Taïga) a été conservée automatiquement lors de la migration.
- **Étape 6 (audit de sécurité) démarrée (2026-11-15)** — revérification point par point de la section 5 :
  - **Faille corrigée** : les actions serveur de l'admin (produits, catégories, commandes) ne vérifiaient pas elles-mêmes la session — elles comptaient uniquement sur l'affichage de la page protégée. Une action serveur Next.js reste un point d'accès indépendant de la page qui l'affiche ; il faut donc revérifier l'autorisation à l'intérieur de chaque action. Corrigé avec une fonction `requireAdmin()` (basée sur Auth.js, pas de code maison) appelée au début de chacune de ces 5 actions.
  - Vérifié sans problème trouvé : mots de passe hachés (bcrypt), limitation des tentatives de connexion, aucune requête SQL brute (tout passe par Prisma, pas d'injection possible), aucun `dangerouslySetInnerHTML` (pas de faille XSS trouvée), CSRF couvert nativement par Next.js pour les actions serveur, aucun secret en dur dans le code (`.env` bien ignoré par git, seul `.env.example` est suivi), chaque client ne voit que ses propres commandes (`/compte` filtre par son identifiant), le suivi sans compte exige numéro + téléphone ensemble, le paiement n'est marqué payé que via webhook PayTech vérifié par signature (comparaison en temps constant), données personnelles limitées au nécessaire (nom, téléphone, adresse, ville — aucune donnée bancaire stockée chez nous).
  - **Ajouté** : en-têtes de sécurité HTTP de base (anti-clickjacking, anti-sniffing, politique de référent) dans `next.config.ts`, via la fonction `headers()` officielle de Next.js.
  - **Dépendances** : `npm audit` signale toujours les 7 failles "modérées" déjà notées à l'étape 3, dans une dépendance de développement d'ESLint (jamais exécutée en production) ; aucun correctif stable n'est encore publié (seulement des versions alpha) — à surveiller, sans urgence.
  - **Points encore ouverts, à traiter avant ou pendant la mise en ligne (étape 7)** : sauvegardes régulières de la base (pas pertinent tant que la base est en local — à mettre en place avec la base PostgreSQL de production), HTTPS (automatique une fois hébergé sur Vercel avec un nom de domaine).
  - **Changement de mot de passe admin (2026-11-15)** : page `/admin/mot-de-passe` (lien dans l'en-tête admin) permettant à la gérante de changer elle-même son mot de passe, en confirmant l'ancien avant d'enregistrer le nouveau (haché avec bcrypt). Elle peut donc remplacer le mot de passe provisoire quand elle le souhaite, sans intervention de ma part.
  - **2FA admin (2026-11-15)** : page `/admin/2fa` (lien dans l'en-tête admin) permettant à la gérante d'activer elle-même l'authentification à deux facteurs sur son compte, via une application d'authentification (Google Authenticator, Authy...) — aucun service tiers payant (pas de SMS). Activation : code QR à scanner, confirmation par un code à 6 chiffres avant d'enregistrer. Une fois activée, le code est demandé à chaque connexion admin, en plus du mot de passe ; un code manquant ou incorrect compte comme une tentative échouée (même blocage que le mot de passe, pour empêcher de deviner le code). Désactivation possible à tout moment en confirmant avec le mot de passe. Basé sur `otpauth` (standard TOTP/RFC 6238), pas de cryptographie faite maison. Testé de bout en bout (activation, connexion avec et sans code, désactivation) sur un compte de test jetable, supprimé après coup.
- **Étape 7 (mise en ligne) réalisée (2026-11-15)** — le site est en ligne : [maison-feline.vercel.app](https://maison-feline.vercel.app)
  - **Sans nom de domaine pour l'instant** (décision de la gérante) : adresse gratuite Vercel. Un vrai nom de domaine pourra être ajouté plus tard sans rien refaire.
  - Code hébergé sur GitHub (`github.com/kyadkp/maison-feline`), déployé automatiquement par Vercel à chaque changement poussé sur la branche `main`.
  - **Base de données** : passée de SQLite (fichier local) à PostgreSQL (Prisma Postgres, plan gratuit, intégré à Vercel). Adaptateur Prisma changé (`@prisma/adapter-pg`) ; nouvel historique de migrations propre à Postgres (l'ancien, propre à SQLite, n'était plus compatible). Le schéma lui-même n'a pas changé.
  - **Photos produits** : passées du disque du serveur (qui n'existe plus en ligne) à Vercel Blob (stockage gratuit pour démarrer). Testé avec un envoi et une suppression réels.
  - **Compte admin réel créé en production** avec le numéro et le mot de passe provisoire déjà connus de la gérante (`ADMIN_PHONE`/`ADMIN_PASSWORD` dans les variables Vercel) ; un script dédié (`prisma/seed-admin.ts`) le crée au déploiement sans jamais écraser un mot de passe qu'elle aurait déjà changé elle-même.
  - **Catalogue vide au départ** : volontaire — les produits fictifs utilisés en développement ne sont pas envoyés en production ; la gérante ajoute ses vrais produits depuis l'espace admin.
  - **Rendu dynamique forcé** sur les pages du site client (accueil, catégories, recherche, fiche produit...) pour qu'un produit ajouté par la gérante apparaisse immédiatement en ligne, sans attendre un nouveau déploiement.
  - **Secret de session (`AUTH_SECRET`) régénéré spécifiquement pour la production**, différent de celui utilisé en développement local.
  - **Point de vigilance (dépendances)** : `@vercel/blob` ajoute une dépendance indirecte (`zod`, utilisée en interne pour l'authentification OIDC de Vercel, jamais pour nos propres données) avec une faille "haute" connue ; aucun correctif sans rétrograder `@vercel/blob` n'est pour l'instant disponible. Risque jugé faible (code interne à Vercel, pas sur un chemin que notre application utilise) — à resurveiller, comme les failles ESLint déjà notées.
  - **Reste à faire avec la gérante, quand elle le souhaite** : se connecter à l'admin en ligne et changer le mot de passe provisoire (`/admin/mot-de-passe`), activer la 2FA si elle le souhaite (`/admin/2fa`), fournir les clés PayTech si elle relance ce chantier, ajouter un nom de domaine le moment venu.
