# 🍪 Martinelli Cookie Banner

GDPR-compliant cookie consent banner — React component, free, self-hosted, CDN-ready.

## What's included

- ✅ Alle akzeptieren / Alle ablehnen / Auswahl bestätigen — GDPR equal-prominence layout
- ✅ Cookie bubble (bottom-left) to reopen settings anytime
- ✅ Google Consent Mode v2 — all 4 signals (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`)
- ✅ **GTM-first** integration — banner fires consent signals, GTM picks them up automatically
- ✅ **Standalone GA4** integration — component loads GA4 directly (when not using GTM)
- ✅ Consent version check — re-prompts users if you add new cookie categories
- ✅ Consent stored with ISO timestamp (GDPR Art.7)
- ✅ Animated: shimmer line, gold dot, slide-up banner, confirm state
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Urbanist font via Google Fonts

---

## File structure

```
CookieBanner.jsx   ← React component (logic + structure)
CookieBanner.css   ← All styles
```

---

## Integration paths

There are **three ways** to use this banner depending on your stack:

| Path | When to use | Props needed |
|------|-------------|-------------|
| **GTM-first (recommended)** | You already use GTM or want to manage GA4+Ads via GTM | `gtmId` |
| **GA4 standalone** | No GTM, just direct GA4 | `gaId` |
| **React / Next.js** | Any React project | either prop above |

---

## Option A — GTM-first (recommended)

GTM manages GA4 and any other tags. The banner only fires the consent signals.

### Step 1 — Add the GTM consent default snippet in `<head>` (critical — must be first!)

```html
<head>
  <!-- 1. Consent defaults BEFORE GTM loads -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage:  'denied',
      ad_storage:         'denied',
      ad_user_data:       'denied',
      ad_personalization: 'denied',
      wait_for_update:    500
    });
  </script>

  <!-- 2. GTM snippet -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
</head>
```

> ⚠️ Replace `GTM-XXXXXXX` with your actual GTM container ID.

### Step 2 — Add the banner component

```jsx
import CookieBanner from "./CookieBanner"

export default function App() {
  return (
    <>
      <YourPageContent />
      <CookieBanner
        gtmId="GTM-XXXXXXX"
        privacyUrl="/datenschutz"
        cookiePolicyUrl="/cookies"
        restaurantName="Martinelli"
      />
    </>
  )
}
```

When the user accepts, the banner fires `gtag('consent', 'update', {...})` and GTM picks it up automatically — no changes needed in this component when you add new GTM tags.

---

## Option B — GA4 standalone (no GTM)

Use this if you just want GA4 without GTM.

```jsx
<CookieBanner
  gaId="G-XXXXXXXXXX"
  privacyUrl="/datenschutz"
  cookiePolicyUrl="/cookies"
  restaurantName="Martinelli"
/>
```

The banner will:
1. Set Consent Mode v2 defaults (all denied) on mount
2. Load the GA4 script only after the user grants analytics consent
3. Fire `gtag('consent', 'update', {...})` on every consent change

> ⚠️ Do **not** load GA4 manually in your HTML `<head>` when using this option — the component handles it.

---

## Option C — Next.js App Router

```jsx
// app/layout.jsx
"use client"
import CookieBanner from "@/components/CookieBanner"

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        {children}
        <CookieBanner
          gtmId={process.env.NEXT_PUBLIC_GTM_ID}      // GTM-first
          // gaId={process.env.NEXT_PUBLIC_GA4_ID}    // or GA4 standalone
          restaurantName="Martinelli"
        />
      </body>
    </html>
  )
}
```

---

## Serve via jsDelivr CDN

Push this repo to GitHub as a **public repo**, then you can access the files directly via jsDelivr — no npm, no Node, no build step needed.

### CSS (always load this)

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/AjayVaidhyanathan/CookieCrawler@main/CookieBanner.css">
```

### JS bundle

For non-React (plain HTML) use, you need to build a UMD bundle first:

```bash
# one-time build step in this repo
npx -y vite build --mode lib
```

Then the built file is at `dist/CookieBanner.umd.js` and you can link it:

```html
<script src="https://cdn.jsdelivr.net/gh/AjayVaidhyanathan/CookieCrawler@main/dist/CookieBanner.umd.js"></script>
```

#### Full plain-HTML example (CDN, no React)

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <!-- Consent defaults before everything -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
      wait_for_update: 500
    });
  </script>

  <!-- GTM -->
  <!-- paste your GTM snippet here -->

  <!-- Cookie banner CSS -->
  <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/AjayVaidhyanathan/CookieCrawler@main/CookieBanner.css">
</head>
<body>
  <div id="cookie-root"></div>

  <!-- React (UMD) + banner bundle -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/AjayVaidhyanathan/CookieCrawler@main/dist/CookieBanner.umd.js"></script>
  <script>
    ReactDOM.createRoot(document.getElementById('cookie-root')).render(
      React.createElement(CookieBanner, {
        gtmId: 'GTM-XXXXXXX',
        restaurantName: 'Martinelli',
        privacyUrl: '/datenschutz',
        cookiePolicyUrl: '/cookies'
      })
    );
  </script>
</body>
</html>
```

> 💡 Replace `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` with your actual GitHub details, e.g. `ajayvaidhyanathan/martinelli-cookie`.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gtmId` | string | `""` | GTM container ID e.g. `GTM-XXXXXXX` — loads GTM & handles GA4 via GTM |
| `gaId` | string | `""` | GA4 Measurement ID e.g. `G-XXXXXXXXXX` — only when NOT using GTM |
| `privacyUrl` | string | `"/datenschutz"` | Link to privacy policy |
| `cookiePolicyUrl` | string | `"/cookies"` | Link to cookie policy |
| `restaurantName` | string | `"Martinelli"` | Name shown in banner title |

> ⚠️ Use either `gtmId` or `gaId`, not both. If both are set, GTM takes priority.

---

## Cookie logic

| Scenario | Behaviour |
|----------|-----------|
| No consent cookie | Banner shown after 900ms |
| Valid consent exists | Banner hidden, bubble shown, consent applied |
| Corrupt cookie | Banner shown (safe fallback) |
| Consent version mismatch | Banner re-shown (bump `CONSENT_VERSION` in `.jsx` when adding categories) |
| Consent expires | After 365 days the cookie expires and banner re-appears |

### Bumping consent version

If you add or remove a cookie category, bump the version constant in `CookieBanner.jsx`:

```js
const CONSENT_VERSION = "2.0"   // was "1.0" — all existing users will be re-prompted
```

---

## GDPR compliance

- All non-necessary toggles are **unchecked by default**
- Reject All button has **equal visual prominence** to Accept All (EDPB requirement)
- Consent record saved with ISO timestamp for audit trail
- Google Consent Mode v2 signals: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`
- Cookie bubble allows users to **withdraw consent at any time** (GDPR Art.7)
- Consent cookie expires after **365 days** (standard practice)

---

## Colors (edit in CookieBanner.css)

```css
--ck-bg:    #0f0d0b   /* dark background */
--ck-gold:  #c9a96e   /* gold accent */
--ck-white: #fdf8f0   /* text color */
```

---

## Framer Setup

> **Before you start:** You will need your GTM container ID (format: `GTM-XXXXXXX`).

### Step 1 — Add CSS and font to the `<head>`

In Framer: **Site Settings → Custom Code → Start of `<head>`**

Copy and paste this exactly:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/AjayVaidhyanathan/CookieCrawler@main/CookieBanner.css">
```

---

### Step 2 — Add consent defaults + GTM to the `<head>`

Still in **Site Settings → Custom Code → Start of `<head>`**, paste this **above** your GTM snippet:

```html
<!-- Consent Mode v2 defaults — must come before GTM -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    analytics_storage:  'denied',
    ad_storage:         'denied',
    ad_user_data:       'denied',
    ad_personalization: 'denied',
    wait_for_update:    500
  });
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

> ⚠️ Replace `GTM-XXXXXXX` with your actual GTM container ID.

---

### Step 3 — Add the banner to the end of `<body>`

In Framer: **Site Settings → Custom Code → End of `<body>`**

Copy and paste this exactly — replace `GTM-XXXXXXX` with your GTM ID:

```html
<div id="cookie-root"></div>
<script src="https://cdn.jsdelivr.net/gh/AjayVaidhyanathan/CookieCrawler@main/dist/CookieBanner.umd.js"></script>
<script>
  ReactDOM.createRoot(document.getElementById('cookie-root')).render(
    React.createElement(CookieBanner, {
      gtmId: 'GTM-XXXXXXX',
      restaurantName: 'Martinelli',
      privacyUrl: '/datenschutz',
      cookiePolicyUrl: '/cookies'
    })
  );
</script>
```

> ✅ Do **not** add a `<script src="react...">` tag — Framer already includes React on every page.

---

### Step 4 — Publish

Hit **Publish** in Framer. The cookie banner will appear automatically on your live site for every new visitor.

---

### Framer setup checklist

- [ ] CSS + font added to `<head>`
- [ ] Consent defaults + GTM snippet added to `<head>` (consent defaults **above** GTM)
- [ ] Banner script added to end of `<body>` with your real `GTM-XXXXXXX`
- [ ] Published
