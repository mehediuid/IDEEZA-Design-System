# npm-e publish korar guide

Package-er naam: **`ideeza-ds`**

Eta scoped noy (`@ideeza/` nei), tai kono org-e membership lagbe na — je kono
npm account holei cholbe.

---

## Ek bar-i korte hobe: account

### 1. Account ache kina dekho

```bash
npm whoami
```

- **Naam dekhalo** → account ache, login-o kora. Sidha [Step 4](#4-build-ar-test) e jao.
- **`ENEEDAUTH` ba error** → hoy account nei, noy login kora nei.

### 2. Account banao

<https://www.npmjs.com/signup> — free.

Email verify korte hobe, na korle publish korte debe na.

### 3. Login

```bash
npm login
```

Browser khulbe, sekhane login korbe. Password terminal-e likhte hobe na.

Sesh hole abar `npm whoami` chaliye dekho — tomar username dekhale thik ache.

---

## Proti bar publish-er somoy

### 4. Build ar test

```bash
cd ~/Downloads/IDEEZA-Design-System
pnpm install
pnpm release
```

`pnpm install` ta prothom bar-e ba git theke notun kichu tanle lagbe — notun
package-er dependency gulo na thakle build `tsup: command not found` bole
bondho hoye jay.

Eta tinta kaj kore: **build** kore, **test** kore, ar **package file** banay.

Sob line-e `✅` dekhte hobe. Ekta-o `❌` thakle **thamo** — publish korona.
Ki bhul dhora porlo seta lekha thakbe.

Sesh-e emon ekta line ashbe:

```
ideeza-ds-0.1.0.tgz
```

Ei file-ta `packages/design-system/` folder-e toiri hoyeche.

### 5. Ki publish hocche ekbar dekhe nao

```bash
tar tzf packages/design-system/ideeza-ds-0.1.0.tgz
```

20-ta file-er ekta list ashbe — `dist/`, `README.md`, `LICENSE`, `package.json`.

Ei list-e `src/`, `.env`, kono password ba token **thakar kotha na**. Thakle
thamo, amake bolo.

### 6. Publish

```bash
npm publish packages/design-system/ideeza-ds-0.1.0.tgz
```

Phone-e ekta code chaite pare (2FA) — dile hoye jabe.

### 7. Sotti giyeche kina dekho

```bash
npm view ideeza-ds
```

Ba browser-e: <https://www.npmjs.com/package/ideeza-ds>

---

## Publish-er por

Je keu ekhon eta install korte parbe:

```bash
npm install ideeza-ds
```

```jsx
import { Button } from "ideeza-ds";
import "ideeza-ds/styles.css";
```

---

## Porer bar kichu bodlale

**Ek bar publish kora version ar bodlano jay na.** `0.1.0` ekbar geleo,
oi naam-e aar kichu pathano jabe na — muche feleo na. Tai proti bar notun
version dite hobe.

`packages/design-system/package.json`-e `version` bariye nao:

| Ki bodlecho | Ki version | Udahoron |
|---|---|---|
| Bug sarale, chhoto kichu thik korle | sesher sonkha | `0.1.0` → `0.1.1` |
| Notun component ba feature dile | majher sonkha | `0.1.1` → `0.2.0` |
| Purono kichu bhenge dile (naam bodlano, prop soranо) | prothom sonkha | `0.2.0` → `1.0.0` |

Tarpor abar **Step 4** theke.

---

## Kichu atke gele

**`npm ERR! 402 Payment Required`**
Scoped package private hisebe jacche. Amader package scoped noy, tai eta
ashar kotha na — ashle naam bodle geche kina dekho.

**`npm ERR! 403 Forbidden` / `You do not have permission`**
Ei naam onno keu niye niyeche, othoba tumi login-e nei. `npm whoami` diye
dekho.

**`npm ERR! 403 ... cannot publish over the previously published version`**
Ei version agei geche. Version bariye Step 4 theke abar koro.

**`npm ERR! 400 ... name can no longer contain capital letters`**
Package-er naam-e boro hater okkhor dhuke geche. Chhoto hater rakhte hobe.

**`tsup: command not found`**
`pnpm install` chalao, tarpor abar `pnpm release`.

**`Unknown option: 'recursive'`**
Purono `release` script cholche. `git pull` kore nao — thik kora ache.

**`pnpm release`-e `❌` dekhcho**
Publish korona. Ja lekha ache take amake dekhao — ki bhul seta lekhai thake.

---

## Nirapotta

- `npm login`-er token tomar computer-e `~/.npmrc` te thake. Eta **karo sathe
  share korona** — eta die tomar sob package-e publish kora jay.
- Ei repo-r `.gitignore`-e `.npmrc` ar `*.tgz` deya ache, tai bhuleo git-e
  chole jabe na.
