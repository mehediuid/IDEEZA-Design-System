#!/bin/bash
cd "$(dirname "$0")" || { echo "Folder-e jete parlam na."; read -n 1; exit 1; }

PORT=6006

echo "================================================"
echo " IDEEZA Design System — Storybook"
echo "================================================"
echo ""

fail() { echo ""; echo "❌ $1"; echo ""; echo "Bondho korte je kono key chapo."; read -n 1; exit 1; }

# ── Node ────────────────────────────────────────────────────────
command -v node >/dev/null 2>&1 || fail "Node.js nei. Install koro: https://nodejs.org"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
[ "$NODE_MAJOR" -ge 18 ] || fail "Node 18+ lage (package.json engines), tomar $(node --version)"
echo "Node   : $(node --version)"

# ── pnpm ────────────────────────────────────────────────────────
# corepack enable /usr/local/bin e likhte chay ar prai EACCES dey.
# Tai: already thakle setai, na thakle npx diye chalai — sudo lagbe na.
PNPM=""
if command -v pnpm >/dev/null 2>&1; then
  PNPM="pnpm"
else
  echo "pnpm nei — corepack try korchi (fail korle npx e jabo)..."
  corepack enable >/dev/null 2>&1 && corepack prepare pnpm@9 --activate >/dev/null 2>&1
  if command -v pnpm >/dev/null 2>&1; then
    PNPM="pnpm"
  else
    echo "  corepack pareni — npx pnpm@9 use korchi (prothom bar download hobe)."
    PNPM="npx --yes pnpm@9"
  fi
fi
echo "pnpm   : $($PNPM --version 2>/dev/null || echo '?')  [$PNPM]"
echo "Machine: $(uname -s)-$(uname -m)"
echo ""

# ── Dependencies ────────────────────────────────────────────────
# node_modules-e platform-specific binary thake (esbuild, rollup).
# Onno machine-e install kora hole segulo cholbe na — tai marker
# rekhe platform milie dekhi, na milley notun kore install kori.
#
# Marker .gitignore-e ache, tai fresh download-e HAVE=none. Setao
# "milche na" — karon node_modules jodi thake, oita onno kothao
# theke esheche. Tokhon muchhe fela-i thik.
#
# Lockfile-er hash-o rakhi: notun workspace package add hole (jemon
# @ideeza/icons) node_modules purono theke jay ar import fail kore,
# othocho platform ek-i. Sudhu platform dekhle eta dhora pore na.
MARKER=".deps-platform"
PLATFORM="$(uname -s)-$(uname -m)"
LOCK_HASH="$(shasum pnpm-lock.yaml 2>/dev/null | cut -d' ' -f1)"
[ -n "$LOCK_HASH" ] || LOCK_HASH="nolock"
WANT="$PLATFORM $LOCK_HASH"
HAVE="$(cat "$MARKER" 2>/dev/null || echo "none none")"
HAVE_PLATFORM="${HAVE%% *}"
HAVE_LOCK="${HAVE##* }"

if [ ! -d node_modules ] || [ ! -d apps/storybook/node_modules ]; then
  NEED_INSTALL="dependencies nei"
elif [ "$HAVE_PLATFORM" != "$PLATFORM" ]; then
  NEED_INSTALL="dependencies onno platform-er ($HAVE_PLATFORM) — ei machine $PLATFORM"
elif [ "$HAVE_LOCK" != "$LOCK_HASH" ]; then
  NEED_INSTALL="pnpm-lock.yaml bodleche — package add/soranu hoyeche"
else
  NEED_INSTALL=""
fi

if [ -n "$NEED_INSTALL" ]; then
  echo "▸ Install korchi — karon: $NEED_INSTALL"
  # Purota mucha lage sudhu platform bodlale. Lockfile bodlale pnpm
  # nijei difference ta milie nite pare.
  if [ -d node_modules ] && [ "$HAVE_PLATFORM" != "$PLATFORM" ]; then
    echo "  purono node_modules muchhe felchi..."
    rm -rf node_modules packages/*/node_modules apps/*/node_modules
  fi
  echo "  (prothom bar ~1-2 min)"
  # confirmModulesPurge=false — pnpm jate "Proceed? (Y/n)" jigges kore
  # script-ke atke na rakhe.
  $PNPM install --config.confirmModulesPurge=false || fail "install fail korlo"
  echo "$WANT" > "$MARKER"
  echo ""
else
  echo "▸ Dependencies ready."
  echo ""
fi

# ── Build (Storybook egulo import kore) ─────────────────────────
# Package naam hardcode kori na — `pnpm build` turbo chalay, ar
# turbo.json e `dependsOn: ["^build"]` ache, tai notun package
# (jemon @ideeza/icons) apne-apni thik order-e build hobe.
#
# Output chepe rakhi na — fail korle purota dekhabo, noile chup.
BUILD_LOG="$(mktemp -t ideeza-build)" || fail "temp file banate parlam na"
echo "▸ Build korchi (turbo dependency order-e)..."
if ! $PNPM build >"$BUILD_LOG" 2>&1; then
  echo ""
  echo "── build output ────────────────────────────────"
  cat "$BUILD_LOG"
  echo "────────────────────────────────────────────────"
  rm -f "$BUILD_LOG"
  fail "build fail (upore asol error ta dekho)"
fi
grep -E "^ *(Tasks|Cached|Time): *" "$BUILD_LOG" | sed 's/^ */  /'
rm -f "$BUILD_LOG"
echo ""

# ── Port khali kore nei ─────────────────────────────────────────
# Port dhora thakle Storybook onno port-e chole jay, ar amra bhul
# instance browser-e khule feli.
BUSY_PIDS="$(lsof -nP -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null)"
if [ -n "$BUSY_PIDS" ]; then
  echo "⚠️  Port $PORT-e already kichu cholche (PID: $(echo "$BUSY_PIDS" | tr '\n' ' '))."
  printf "   Oita bondho kore notun Storybook chalabo? [Y/n] "
  read -r ANSWER
  case "$ANSWER" in
    [Nn]*)
      echo ""
      echo "Thik ache — purono ta-i cholche: http://localhost:$PORT"
      echo "Bondho korte je kono key chapo."
      read -n 1
      exit 0
      ;;
    *)
      echo "$BUSY_PIDS" | xargs kill 2>/dev/null
      for _ in 1 2 3 4 5 6 7 8 9 10; do
        lsof -nP -tiTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1 || break
        sleep 1
      done
      lsof -nP -tiTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1 \
        && echo "$BUSY_PIDS" | xargs kill -9 2>/dev/null
      echo "   Bondho korlam."
      echo ""
      ;;
  esac
fi

# ── Storybook ───────────────────────────────────────────────────
echo "================================================"
echo " Storybook chalu hocche → http://localhost:$PORT"
echo " Browser nijei khulbe. Bondho korte: Ctrl + C"
echo "================================================"
echo ""

# Timer noy — port sotti reply korle tobei browser khulbo.
(
  for _ in $(seq 1 90); do
    if curl -sf -o /dev/null "http://localhost:$PORT"; then
      open "http://localhost:$PORT" >/dev/null 2>&1
      exit 0
    fi
    sleep 1
  done
) &
OPENER_PID=$!

$PNPM --filter @ideeza/storybook storybook

kill "$OPENER_PID" 2>/dev/null

echo ""
echo "Storybook bondho holo. Je kono key chapo."
read -n 1
