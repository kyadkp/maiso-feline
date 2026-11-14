# Maison Féline — site web

## Lancer le site soi-même (sans Claude Code)

1. Ouvrez un terminal (PowerShell) dans ce dossier `site`.
2. Tapez cette commande et appuyez sur Entrée :

   ```bash
   npm run dev
   ```

3. Attendez le message `✓ Ready`, puis ouvrez votre navigateur à l'adresse :

   ```
   http://localhost:3000
   ```

4. Pour arrêter le site, retournez dans le terminal et appuyez sur `Ctrl + C`.

Tant que le terminal reste ouvert, le site continue de fonctionner. Si vous fermez le terminal ou éteignez l'ordinateur, il faudra refaire les étapes 1 à 3 pour le relancer.

## Espace admin

Adresse : `http://localhost:3000/admin`

Identifiants dans le fichier `.env` à la racine de `site` (ne jamais partager ce fichier ni le mettre en ligne) :
- `ADMIN_PHONE` — numéro de téléphone de connexion
- `ADMIN_PASSWORD` — mot de passe (provisoire pour l'instant, à changer dès que possible)

## À savoir

- Les données (produits, commandes, comptes) sont stockées localement dans `prisma/dev.db` sur cet ordinateur. Elles ne sont pas encore en ligne.
- Voir `CLAUDE.md` à la racine du projet pour l'avancement complet du projet, étape par étape.
