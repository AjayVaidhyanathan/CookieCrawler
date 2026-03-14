import { useState, useEffect } from "react"
import "./CookieBanner.css"

const CONSENT_KEY     = "martinelli_gdpr"
const CONSENT_DAYS    = 365
const CONSENT_VERSION = "1.0"   // ← bump this string any time you add/remove cookie categories

// ── Helpers ──────────────────────────────────────────

function setCookie(value, days) {
  const d = new Date()
  d.setTime(d.getTime() + days * 86400000)
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`
}

// Fixed: use slice(1).join("=") so base64/JSON values with "=" chars don't get truncated
function getCookie() {
  for (const c of document.cookie.split(";")) {
    const parts = c.trim().split("=")
    const k     = parts[0]
    const v     = parts.slice(1).join("=")
    if (k === CONSENT_KEY) return decodeURIComponent(v || "")
  }
  return null
}

function saveConsent(analytics, marketing) {
  setCookie(
    JSON.stringify({
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,          // stored so we can re-prompt on version bump
    }),
    CONSENT_DAYS
  )
}

// Fires gtag consent update — works whether GTM or standalone GA4 is in use
function applyConsent(analytics, marketing) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  if (!window.gtag) window.gtag = gtag
  window.gtag("consent", "update", {
    analytics_storage:  analytics ? "granted" : "denied",
    ad_storage:         marketing ? "granted" : "denied",
    ad_user_data:       marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  })
}

// Sets consent MODE DEFAULTS — skipped if GTM already ran (it sets defaults via its own snippet)
function setConsentDefaults() {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  if (!window.gtag) window.gtag = gtag
  // Only call default if GTM hasn't already loaded (GTM sets window.google_tag_manager)
  if (!window.google_tag_manager) {
    window.gtag("consent", "default", {
      analytics_storage:  "denied",
      ad_storage:         "denied",
      ad_user_data:       "denied",
      ad_personalization: "denied",
      wait_for_update:    500,
    })
  }
}

// Load GTM container (GTM-first approach — GA4 is then managed via GTM tags)
function loadGTM(gtmId) {
  if (!gtmId || document.getElementById("ck-gtm")) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
  const s  = document.createElement("script")
  s.id     = "ck-gtm"
  s.async  = true
  s.src    = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(s)
}

// Load standalone GA4 (only used when NOT using GTM)
function loadGA4(gaId) {
  if (!gaId || document.getElementById("ck-ga4")) return
  const s  = document.createElement("script")
  s.id     = "ck-ga4"
  s.async  = true
  s.src    = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(s)
  s.onload = () => {
    window.gtag("js", new Date())
    window.gtag("config", gaId, { anonymize_ip: true })
  }
}


// ── Icons ─────────────────────────────────────────────
const IconCookie = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M21.93 11.15a1 1 0 0 0-.89-.66 3 3 0 0 1-2.71-2.16 1 1 0 0 0-.78-.72 3 3 0 0 1-2.16-2.71 1 1 0 0 0-.66-.89A10 10 0 1 0 21.93 11.15ZM12 20a8 8 0 1 1 7.61-10.31 5 5 0 0 0 2.7 3 5 5 0 0 0 3 2.7A8 8 0 0 1 12 20Zm-1-7a1 1 0 1 1-1-1A1 1 0 0 1 11 13Zm-4-1a1 1 0 1 1-1-1A1 1 0 0 1 7 12Zm9 4a1 1 0 1 1-1-1A1 1 0 0 1 16 16Zm-1-5a1 1 0 1 1-1-1A1 1 0 0 1 15 11Z"/>
  </svg>
)

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// ── Toggle Switch ─────────────────────────────────────
function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`ck-toggle ${checked ? "ck-toggle--on" : ""} ${disabled ? "ck-toggle--disabled" : ""}`}
    >
      <span className="ck-toggle-thumb" />
    </button>
  )
}

// ── Category Row ──────────────────────────────────────
function Category({ name, description, checked, onChange, required, cookies }) {
  return (
    <div className={`ck-cat ${required ? "ck-cat--required" : ""}`}>
      <div className="ck-cat-left">
        <Toggle checked={checked} onChange={onChange} disabled={required} />
        <div className="ck-cat-text">
          <span className="ck-cat-name">{name}</span>
          <span className="ck-cat-desc">{description}</span>
          {cookies && <span className="ck-cat-cookies">{cookies}</span>}
        </div>
      </div>
      {required && <span className="ck-required-badge">Immer aktiv</span>}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────
export default function CookieBanner({
  gtmId         = "",              // GTM container ID e.g. "GTM-XXXXXXX" (recommended, manages GA4 via GTM)
  gaId          = "",              // GA4 ID e.g. "G-XXXXXXXXXX" (only if NOT using GTM)
  privacyUrl    = "/datenschutz",
  cookiePolicyUrl = "/cookies",
  restaurantName = "Martinelli",
}) {
  const [visible, setVisible]       = useState(false)
  const [bubbleVisible, setBubble]  = useState(false)
  const [confirmed, setConfirmed]   = useState(false)
  const [confirmMsg, setConfirmMsg] = useState("")
  const [analytics, setAnalytics]   = useState(false)
  const [marketing, setMarketing]   = useState(false)
  const [detailsOpen, setDetails]   = useState(false)

  // ── Init: set consent defaults, then check stored consent ──
  useEffect(() => {
    // Set Consent Mode v2 defaults (skipped if GTM already ran via <head> snippet)
    setConsentDefaults()

    // Load GTM if gtmId provided and GTM not already on the page
    if (gtmId) loadGTM(gtmId)

    const raw = getCookie()

    // No cookie at all → show banner
    if (!raw) {
      setTimeout(() => setVisible(true), 900)
      return
    }

    try {
      const c = JSON.parse(raw)

      // Version mismatch → consent record is outdated → re-ask the user
      if (c.version !== CONSENT_VERSION) {
        setTimeout(() => setVisible(true), 900)
        return
      }

      // Valid consent found → apply it and show bubble
      setAnalytics(!!c.analytics)
      setMarketing(!!c.marketing)
      applyConsent(c.analytics, c.marketing)
      if (c.analytics && gaId && !gtmId) loadGA4(gaId)
      setBubble(true)
    } catch {
      // Corrupt cookie → show banner
      setTimeout(() => setVisible(true), 900)
    }
  }, [gtmId, gaId])

  // ── Actions ──
  function accept() {
    setAnalytics(true)
    setMarketing(true)
    saveConsent(true, true)
    applyConsent(true, true)
    if (gaId && !gtmId) loadGA4(gaId)   // GA4 only when not using GTM
    confirm("Alle Cookies akzeptiert — Herzlich Willkommen")
  }

  function reject() {
    setAnalytics(false)
    setMarketing(false)
    saveConsent(false, false)
    applyConsent(false, false)
    confirm("Nur notwendige Cookies aktiv")
  }

  function saveSelection() {
    saveConsent(analytics, marketing)
    applyConsent(analytics, marketing)
    if (analytics && gaId && !gtmId) loadGA4(gaId)
    confirm("Auswahl bestätigt — Danke")
  }

  function confirm(msg) {
    setConfirmMsg(msg)
    setConfirmed(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmed(false)
      setTimeout(() => setBubble(true), 600)
    }, 1500)
  }

  function reopen() {
    setBubble(false)
    setVisible(true)
    setConfirmed(false)
  }

  if (!visible && !bubbleVisible) return null

  return (
    <>
      {/* ── Overlay ── */}
      {visible && (
        <div className="ck-overlay" onClick={() => {}} />
      )}

      {/* ── Banner ── */}
      <div className={`ck-wrap ${visible ? "ck-wrap--visible" : ""}`}>
        <div className="ck-box">
          {/* Shimmer line */}
          <div className="ck-shimmer" />

          <div className="ck-inner">

            {/* Eyebrow */}
            <div className="ck-eyebrow">
              <span className="ck-eyebrow-line" />
              <span className="ck-eyebrow-dot" />
              <span className="ck-eyebrow-text">Datenschutz & Cookie-Einstellungen</span>
            </div>

            <div className="ck-grid">

              {/* ── LEFT: Text + toggles ── */}
              <div className="ck-left">
                <h2 className="ck-title">
                  Ihre Privatsphäre bei <em>{restaurantName}</em>
                </h2>
                <p className="ck-desc">
                  Wir verwenden Cookies für die beste Erfahrung auf unserer Website.
                  Notwendige Cookies sind immer aktiv. Alle weiteren nur mit Ihrer
                  ausdrücklichen Zustimmung. Mehr in unserer{" "}
                  <a href={privacyUrl}>Datenschutzerklärung</a> und{" "}
                  <a href={cookiePolicyUrl}>Cookie-Richtlinie</a>.
                </p>

                {/* Categories */}
                <div className="ck-cats">
                  <Category
                    name="Notwendig"
                    description="Session, Sicherheit, Grundfunktionen"
                    cookies="ck_consent · 1 Jahr"
                    checked={true}
                    required={true}
                  />
                  <Category
                    name="Analyse"
                    description="Google Analytics 4 — keine persönlichen Daten"
                    cookies="_ga, _ga_* · 2 Jahre · Google LLC"
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <Category
                    name="Marketing"
                    description="Personalisierte Werbung auf Drittplattformen"
                    cookies="_fbp · 90 Tage · Meta Platforms"
                    checked={marketing}
                    onChange={setMarketing}
                  />
                </div>

                {/* Details toggle */}
                <button
                  className="ck-details-btn"
                  onClick={() => setDetails(!detailsOpen)}
                >
                  {detailsOpen ? "Details ausblenden" : "Details & Cookie-Liste anzeigen"}
                  <span className={`ck-details-arrow ${detailsOpen ? "ck-details-arrow--open" : ""}`}>›</span>
                </button>

                {/* Footer note */}
                <div className="ck-footer-note">
                  <span>DSGVO Art.7 · ePrivacy-konform · Zeitstempel gespeichert</span>
                  <a href={privacyUrl}>Datenschutzerklärung →</a>
                </div>

                {/* Confirm state */}
                {confirmed && (
                  <div className="ck-confirm">
                    <div className="ck-confirm-icon">
                      <IconCheck />
                    </div>
                    <span
                      className="ck-confirm-text"
                      dangerouslySetInnerHTML={{ __html: confirmMsg }}
                    />
                  </div>
                )}
              </div>

              {/* ── RIGHT: Buttons ── */}
              {!confirmed && (
                <div className="ck-actions">
                  {/* 1. Allow All */}
                  <button className="ck-btn ck-btn--accept" onClick={accept}>
                    <span>Alle akzeptieren <span className="ck-btn-star">✦</span></span>
                    <span className="ck-btn-sub">Analyse & Marketing aktivieren</span>
                  </button>

                  {/* 2. Allow Selection */}
                  <button className="ck-btn ck-btn--save" onClick={saveSelection}>
                    <span>Auswahl bestätigen</span>
                    <span className="ck-btn-sub">Eigene Einstellungen speichern</span>
                  </button>

                  <div className="ck-btn-divider" />

                  {/* 3. Deny All */}
                  <button className="ck-btn ck-btn--reject" onClick={reject}>
                    <span>Alle ablehnen</span>
                    <span className="ck-btn-sub">Nur notwendige Cookies bleiben aktiv</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ── Cookie Bubble (bottom-left) ── */}
      {bubbleVisible && !visible && (
        <div className="ck-bubble">
          <button
            className="ck-bubble-btn"
            onClick={reopen}
            aria-label="Cookie-Einstellungen öffnen"
          >
            <IconCookie />
          </button>
          <div className="ck-bubble-tooltip">Cookie-Einstellungen</div>
        </div>
      )}
    </>
  )
}
