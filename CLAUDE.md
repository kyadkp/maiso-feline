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
- (à compléter : choix final de l'agrégateur, nom de domaine, etc.)
