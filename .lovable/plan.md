# Bilinguisme NL+FR partout (6-12 ans) + langue de l'enfant

## Objectif
Tout texte vu par un enfant s'affiche en néerlandais ET en français, et toute consigne audio se dit dans les deux langues. La langue principale (celle affichée en premier / lue en premier) dépend de la langue de l'enfant choisie à l'inscription.

## 1. Langue de l'enfant à l'inscription
- Nouveau champ `language` (`nl` ou `fr`, défaut `nl`) sur le profil enfant, en base.
- Sélecteur « Langue de l'enfant / Taal van het kind » dans l'ajout d'enfant, la gestion des profils et les paramètres parent.
- Cette langue pilote partout : ordre d'affichage (langue de l'enfant en gras d'abord), ordre de la voix (langue de l'enfant puis l'autre).

## 2. Socle bilingue partagé
- Un module unique `src/lib/bilingual.ts` : type `Bilingual {nl, fr}`, helper `speakBilingual()` (voix nl-BE puis fr-BE, ou l'inverse), et hook `useBilingual()` qui lit la langue de l'enfant courant.
- `BilingualText` (déjà existant) devient le seul composant d'affichage de texte enfant, en mode empilé ou en ligne.
- Le fichier de traductions actuel est étendu : chaque clé UI enfant a une valeur NL et FR, `tBoth(key)` renvoie les deux.

## 3. Jeux et exercices 6-12 ans
Passage en affichage simultané NL+FR de tout le texte enfant :
- Enveloppes de jeu : `MathQuizGame`, `MathGameLayout`, `LevelSelect`, hubs de matières, listes de chapitres et sélection de niveau.
- Titres, sous-titres, consignes, boutons (Réécouter, Quitter, Suivant, Valider), barres de score, écrans de fin.
- Feedback : « Bravo ! / Goed zo ! », « Oups… / Oeps… », « Temps écoulé / Tijd om », y compris la phrase donnant la bonne réponse.
- `ExerciseRunner` : consigne, options vrai/faux, boutons, messages d'erreur et de réussite.
- Chapitres : titre et description de chaque chapitre traduits en NL.
- Audio : chaque consigne lue est jouée dans les deux langues, avec le même enchaînement (délai court) que l'Éveil ; les nombres et mots-cibles restent lus dans leur langue d'origine.

## 4. Contenu des exercices
- Le type `Exercise` reçoit des champs optionnels `questionNl` / `optionsNl`. Quand ils existent, l'énoncé s'affiche en NL+FR.
- Traduction NL livrée d'abord pour les chapitres néerlandais et les chapitres maths des niveaux P3-P4 ; les chapitres restants sont signalés par la vérification (point 5) et traduits par lots suivants, sans rien casser entre-temps.

## 5. Vérification anti-oubli
- Un test automatisé (`bunx vitest run`) parcourt les catalogues (jeux, chapitres, activités Éveil, clés de traduction enfant, exercices) et échoue en listant chaque entrée sans version NL ou sans version FR.
- Un script `scripts/check-bilingual.ts` produit le même rapport lisible en ligne de commande pour suivre l'avancement des traductions restantes.

## 6. Éveil (3-5 ans)
- Les 8 activités sont déjà bilingues dans le code ; correction des endroits restés en français seul (titres d'écran, boutons, messages de fin) et application de l'ordre selon la langue de l'enfant.

## Note technique
Aucune table de traductions en base : les contenus pédagogiques restent en TypeScript (performance, hors-ligne PWA), la vérification automatisée garantit l'absence de trous.
