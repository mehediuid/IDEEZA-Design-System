#!/bin/bash
cd "$(dirname "$0")"

echo "IDEEZA Design System — GitHub e pathacchi..."
echo ""

# Ja ekhono commit kora hoyni seta commit koro; kichu na thakle skip
if [ -n "$(git status --porcelain)" ]; then
  echo "Notun poriborton peyechi — commit korchi:"
  git status --short
  echo ""
  git add .
  git commit -m "chore: local changes"
  echo ""
else
  echo "Sob already commit kora ache."
  echo ""
fi

AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "?")
echo "Push hobe $AHEAD ta commit:"
git log --oneline origin/main..HEAD 2>/dev/null
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
  echo "   Login lagle:  gh auth login"
  echo "   Ba GitHub Desktop diye push koro."
fi
echo "Bondho korte je kono key chapo."
echo "================================================"
read -n 1
