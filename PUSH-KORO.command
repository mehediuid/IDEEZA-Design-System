#!/bin/bash
cd "$(dirname "$0")" || { echo "Folder-e jete parlam na."; read -n 1; exit 1; }

echo "IDEEZA Design System — GitHub e pathacchi..."
echo ""

# Ja ekhono commit kora hoyni. Age `git add .` chilo — chokh bondho kore
# ja-i thakuk sob dhorto. Ekta bhule rekhe deya .env ba key file tokhon
# soja public repo te chole jeto. Tai ekhon: dekhai, sondeho hole
# satorko kori, ar onumoti chai.
if [ -n "$(git status --porcelain)" ]; then
  echo "Egulo ekhono commit kora hoyni:"
  git status --short
  echo ""

  RISKY="$(git status --porcelain --untracked-files=all | sed 's/^...//' \
    | grep -Ei '(^|/)\.env|\.pem$|\.p12$|\.key$|\.keystore$|id_rsa|(^|/)\.npmrc$|credential|secret|token')"
  if [ -n "$RISKY" ]; then
    echo "⚠️  Ei file gulo sensitive hote pare:"
    echo "$RISKY" | sed 's/^/      /'
    echo "   Commit korle egulo public repo te chole jabe."
    echo ""
  fi

  printf "Sob commit korbo? [y/N] "
  read -r ANSWER
  case "$ANSWER" in
    [Yy]*) ;;
    *)
      echo ""
      echo "Thik ache — kichu commit korlam na, push-o korlam na."
      echo "Bondho korte je kono key chapo."
      read -n 1
      exit 0
      ;;
  esac

  printf "Commit message (khali rakhle: chore: local changes): "
  read -r MSG
  [ -n "$MSG" ] || MSG="chore: local changes"
  git add -A
  git commit -m "$MSG" || { echo "❌ commit fail korlo."; read -n 1; exit 1; }
  echo ""
else
  echo "Sob already commit kora ache."
  echo ""
fi

# Remote e onno kichu push kora hoye thakle age setai jene nei — noile
# push reject hobe ar karon ta bojha jabe na.
git fetch origin >/dev/null 2>&1
BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo 0)
if [ "$BEHIND" -gt 0 ]; then
  echo "⚠️  origin/main e $BEHIND ta commit ache ja tomar kache nei."
  echo "   Soja push reject hobe. Age eta chalao:  git pull --rebase origin main"
  echo "   (conflict hole Claude ke dekhiyo — hate merge lagte pare.)"
  echo ""
  echo "Bondho korte je kono key chapo."
  read -n 1
  exit 1
fi

AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "?")
if [ "$AHEAD" = "0" ]; then
  echo "Push korar kichu nei — GitHub already up to date."
  echo ""
  echo "Bondho korte je kono key chapo."
  read -n 1
  exit 0
fi

echo "Push hobe $AHEAD ta commit:"
git log --oneline origin/main..HEAD
echo ""

git push origin main
STATUS=$?

echo ""
echo "================================================"
if [ $STATUS -eq 0 ]; then
  echo "✅ Hoye geche! GitHub e giye dekho:"
  echo "   https://github.com/mehediuid/IDEEZA-Design-System"
else
  echo "❌ Push hoyni (exit $STATUS)."
  echo "   Credential somossa hole:  git config --global --list | grep credential"
  echo "   Ba GitHub Desktop diye push koro."
fi
echo "Bondho korte je kono key chapo."
echo "================================================"
read -n 1
