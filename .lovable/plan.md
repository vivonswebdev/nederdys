# Audit complet NederDys — rapport et plan d'action

Mode audit uniquement : aucun fichier du projet, aucune base, aucun paramètre n'a été modifié ; rien n'a été publié. Seul ce rapport a été écrit.

## 1. Résumé exécutif

L'app est riche (70+ jeux, chapitres, boutique, défis, admin) et le build passe. Trois problèmes bloquent un lancement payant :

1. **Économie de jeu falsifiable (P0)** : un parent connecté (ou un enfant sur son appareil) peut se donner des pièces/XP illimités, et n'importe quel objet, via les droits actuels de la base.
2. **Données de mineurs exposées entre foyers (P0/P1)** : le classement mondial révèle prénom, genre et avatar de tous les enfants inscrits. Il n'existe ni politique de confidentialité, ni consentement parental explicite.
3. **Aucune couverture de tests** sur les règles (XP, prix, déblocage 80 %, PIN) et aucune base légale/commerciale (CGU, mentions, tarifs, paiement).

## 2. Preuves inspectées

- `package.json` (scripts build/lint/test, vitest), `index.html`, `public/` (robots.txt, icônes ; pas de sitemap).
- `src/App.tsx` (31 routes `Route`), `src/contexts/AuthContext.tsx`, `src/pages/AuthPage.tsx` (l.29 signUp + emailRedirectTo), `src/pages/ForgotPassword.tsx` (l.17-18), `src/lib/pin.ts`, `src/components/parent/RequireParentPin.tsx`, `src/components/child/ChildModeGuard.tsx`, `src/lib/bilingual.ts`, `src/contexts/LanguageContext.tsx`, `scripts/audit-i18n.ts`, `scripts/check-bilingual.ts`.
- Base : définition de toutes les fonctions serveur (fournie), politiques d'accès lues par requête pour `child_coins`, `child_levels`, `daily_streaks`, `achievements`, `game_difficulties`, `exercise_mistakes`, `sibling_challenges`, `error_reports`.
- Linter base : 57 avertissements (9 tables visibles hors connexion dans GraphQL, 26 visibles connecté, 1 fonction privilégiée appelable hors connexion, 21 appelables connecté).
- `src/test/` : seulement `example.test.ts` (+ `src/lib/translations.test.ts`).
- Recherches : aucune page légale/confidentialité/cookies ; aucune intégration paiement ; aucun outil d'analytics ; `supabase/functions/math-tts` sans contrôle d'authentification détecté.
- Non accessible : dépôt GitHub distant (seule la copie locale a été lue), réglages d'auth hébergés (confirmation email, protection mots de passe), logs de production, Lighthouse/lecteur d'écran réel.

## 3. Constats priorisés

Type : **B** = bug confirmé par le code/la base, **R** = risque à valider, **P** = recommandation produit.

| # | Prio | Type | Constat | Preuve | Impact | Correction proposée |
|---|---|---|---|---|---|---|
| 1 | P0 | B | Pièces/XP modifiables directement | Politiques UPDATE/INSERT sur `child_coins` et `child_levels` (`auth.uid() = user_id`, sans restriction de colonnes) | Boutique et classement sans valeur ; triche triviale via l'API | Supprimer INSERT/UPDATE client ; écriture uniquement via fonctions serveur |
| 2 | P0 | B | `claim_season_reward` accepte `p_item_id` et `p_bonus_coins` fournis par le client | Définition de la fonction | N'importe quel objet (même premium) et pièces illimitées | Récompenses lues dans une table serveur par palier |
| 3 | P0 | B | `record_exercise_session` : `p_correct` non borné par `p_total` | `v_xp := p_correct*2 …` | XP/pièces illimités en un appel | `LEAST(p_correct, p_total)`, borner `p_total`, limiter la fréquence |
| 4 | P1 | B | `record_game_completion` : XP choisi par le client (≤180) appelable en boucle | Fonction | Farming de pièces | XP calculé serveur depuis score/difficulté, plafond quotidien |
| 5 | P0/P1 | B | Classement mondial expose prénom, genre, avatar de tous les enfants | `get_leaderboard` (SECURITY DEFINER, tous les `children`) | Non-conformité RGPD mineurs | Pseudonymes générés, opt-in parental, ou classement limité au foyer |
| 6 | P1 | B | `sibling_challenges` : politique ALL côté parent | Politique « Parents manage challenges… » | Statut/gagnant/XP modifiables à la main | Lecture + création seulement ; résultat via `complete_sibling_challenge` |
| 7 | P1 | B | `achievements`, `daily_streaks` : INSERT/UPDATE/DELETE client | Politiques lues | Badges et séries falsifiables | Attribution serveur uniquement |
| 8 | P1 | R | PIN parent = verrou purement local (`localStorage`, 30 min) | `src/lib/pin.ts` l.62-77, `RequireParentPin` | Un enfant peut contourner le PIN via la console ; les données restent accessibles par l'API | Documenter comme barrière UX ; jeton de session PIN signé côté serveur pour actions sensibles |
| 9 | P1 | R | Fonction audio `math-tts` sans vérification d'auth détectée | `supabase/functions/math-tts/index.ts` | Consommation de crédits IA par des tiers | Vérifier le jeton, limiter la fréquence |
| 10 | P1 | R | 57 avertissements linter (tables visibles hors connexion, 1 fonction privilégiée appelable anonymement) | Linter | Découverte du schéma, surface d'attaque | Revoir les droits `anon`, révoquer EXECUTE inutiles |
| 11 | P1 | B | Aucune page légale (confidentialité, CGU, mentions, cookies) | Recherche dans `src/pages` et routes | Bloquant pour vente et RGPD (art. 8, âge belge 13 ans) | Pages FR/NL + consentement parental à l'inscription |
| 12 | P1 | R | Claims « enfants dyslexiques », mémoire « validation orthophoniste » non prouvée dans le contenu | `index.html` description, mémoire projet | Risque de promesse santé non validée | Formulation « adapté aux enfants qui ont des difficultés », mention « ne remplace pas un suivi logopédique » |
| 13 | P1 | B | Tests quasi inexistants | `src/test/example.test.ts` seul | Régressions silencieuses sur XP, prix, déblocage | Voir section 4 |
| 14 | P2 | R | `admin_logs.user_id`, `error_reports.user_id` liés directement à l'auth ; traces stockées sans durée de conservation | Schéma | RGPD (minimisation, rétention) | Politique de rétention (ex. 90 j) |
| 15 | P2 | R | Confirmation email / mot de passe divulgué : réglages non vérifiables d'ici | — | Comptes non vérifiés | Vérifier les réglages d'auth |
| 16 | P2 | B | `index.html` `lang="fr"` fixe ; titre de page réglé seulement sur quelques pages | `index.html`, `ParentGate.tsx` | SEO NL nul, lecteurs d'écran en mauvaise langue | `document.documentElement.lang` dynamique, pages NL |
| 17 | P2 | B | Pas de sitemap, pas de page d'accueil marketing NL, pas d'og:image propre | `public/` | Acquisition faible | Sitemap, landing FR/NL, données structurées |
| 18 | P2 | R | `min-h-screen`/`h-screen` probable, boutons icônes sans libellé, focus clavier dans les jeux drag & drop | À auditer page par page | Accessibilité DYS/moteur | Audit axe + clavier |
| 19 | P2 | B | i18n : 1 consigne non traduite (Jardin des Mots) signalée par `audit-i18n.ts` | Exécution précédente | Incohérence bilingue | Ajouter la traduction |
| 20 | P2 | P | Freemium/PRO absent du code (pas de tarifs, pas de limites, `is_premium` bloqué sans parcours d'achat) | `purchase_avatar_item` retourne `premium` | Aucun revenu possible | Phase 4 |
| 21 | P3 | P | Bundle lourd (jspdf, html2canvas, framer-motion, 70+ pages) | `package.json` | Lenteur mobile | Chargement différé des pages et du PDF |
| 22 | P3 | P | Aucun analytics ni consentement cookies | Recherche | Pas de mesure de conversion | Analytics respectueux (sans cookie), opt-in |

## 4. Tests manquants

- Règles serveur : XP par réponse (2/juste, +10 si ≥80 %), déblocage niveau 2/3 à 80 %, plafond XP jeu, prix et solde à l'achat, réclamation de collection unique, palier saison unique.
- Sécurité : un parent A ne lit/écrit aucune donnée d'un enfant du parent B ; écriture directe de pièces refusée ; PIN bloqué après 3 essais pendant 5 min.
- Parcours : inscription → ajout enfant → partie → XP visible au dashboard ; mot de passe oublié → réinitialisation.
- i18n : `audit-i18n.ts` en test CI (0 manque).
- Accessibilité : axe sur accueil, dashboard enfant, un jeu, boutique.

## 5. Plan d'action par phases

1. **Phase 1 — Sécurité/intégrité (P0)** : constats 1-7, 9, 10. Tests de sécurité associés.
2. **Phase 2 — Conformité mineurs** : 5, 11, 12, 14 ; consentement parental, export/suppression des données d'un enfant.
3. **Phase 3 — Qualité** : tests (section 4), 16, 18, 19, 21.
4. **Phase 4 — Acquisition et monétisation** : landing FR/NL, SEO, page tarifs, définition gratuit vs PRO (ex. 3 jeux/jour gratuits), paiement plus tard sur validation.

## 6. Critères d'acceptation

- Aucune écriture directe possible sur pièces, XP, badges, séries, défis depuis le navigateur (test qui échoue avant, passe après).
- Chaque fonction de récompense ignore toute valeur de gain fournie par le client.
- Le classement n'affiche aucun prénom réel d'un autre foyer sans opt-in.
- Pages Confidentialité, CGU, Mentions disponibles en FR et NL, liées depuis l'inscription avec case de consentement obligatoire.
- Linter : 0 fonction privilégiée appelable hors connexion.
- `bun run test` couvre les règles de la section 4 et passe ; `audit-i18n.ts` retourne 0.

## Confirmation

Rien n'a été modifié, migré ni publié. J'attends ta validation (et le choix des phases) avant toute implémentation.
