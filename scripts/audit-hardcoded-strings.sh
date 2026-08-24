#!/usr/bin/env bash
# Filet de sécurité manuel : repère les chaînes françaises écrites en dur dans
# les composants montrés aux enfants, hors système de traduction.
#
# À lancer AVANT de valider un nouveau lot de contenu enfant :
#   bash scripts/audit-hardcoded-strings.sh
#
# Complément (plus complet, basé sur le JSX) :
#   bun run scripts/check-bilingual.ts

set -uo pipefail
cd "$(dirname "$0")/.."

DIRS="src/components/eveil src/components/child src/components/maths src/components/chapters src/pages/child src/pages/eveil src/pages/math src/pages/nl"
WORDS="Bravo|Essaie encore|Retour|Continuer|Suivant|Valider|Recommencer|Chargement|Quitter|Choisis|Clique"

echo "== Chaînes suspectes hors t() / BilingualText =="
# shellcheck disable=SC2086
hits=$(grep -rnE "\"[^\"]*($WORDS)[^\"]*\"|>[^<>{}]*($WORDS)[^<>{}]*<" $DIRS \
  --include="*.tsx" \
  | grep -v "translations.ts" \
  | grep -v "biFromFr\|BilingualText\|<Bi \|UI\.\|aria-label" || true)

if [ -z "$hits" ]; then
  echo "✅ Aucune chaîne suspecte détectée."
else
  echo "$hits"
  echo
  echo "⚠️  $(echo "$hits" | wc -l | tr -d ' ') ligne(s) à vérifier : passer par t(), UI.* ou BilingualText."
fi
