// ─────────────────────────────────────────────────────
// Example: How to use CookieBanner in your project
// ─────────────────────────────────────────────────────

import CookieBanner from "./src/CookieBanner"

// 1. Basic usage — add to your root App or Layout file
export default function App() {
  return (
    <>
      {/* Your page content here */}
      <main>...</main>

      {/* Cookie banner — place once at the root level */}
      <CookieBanner
        gaId="G-XXXXXXXXXX"          // ← Replace with your GA4 ID
        privacyUrl="/datenschutz"    // ← Your privacy policy URL
        cookiePolicyUrl="/cookies"   // ← Your cookie policy URL
        restaurantName="Martinelli"  // ← Your restaurant name
      />
    </>
  )
}


// ─────────────────────────────────────────────────────
// Example: Next.js App Router (app/layout.jsx)
// ─────────────────────────────────────────────────────

// "use client"  ← uncomment if needed in Next.js 13+

import CookieBanner from "@/components/CookieBanner"

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        {children}
        <CookieBanner
          gaId={process.env.NEXT_PUBLIC_GA4_ID}
          restaurantName="Martinelli"
        />
      </body>
    </html>
  )
}


// ─────────────────────────────────────────────────────
// Example: Framer (using as a Code Component)
// ─────────────────────────────────────────────────────

// 1. In Framer → Assets → Code → New Component
// 2. Paste CookieBanner.jsx contents
// 3. Add CookieBanner.css to Framer → Site Settings → Custom Code → <head>
// 4. Drag component onto any page (or the root frame)
