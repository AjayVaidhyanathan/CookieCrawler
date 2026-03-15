/**
 * Martinelli Cookie Banner — Vanilla JS Version
 * Simple, standalone, and high-performance.
 * Usage: <script src="CookieBanner.js"></script>
 */

(function() {
  const CONSENT_KEY     = "martinelli_gdpr";
  const CONSENT_DAYS    = 365;
  const CONSENT_VERSION = "1.0.1";

  let instance = null;

  // ── Helpers ──────────────────────────────────────────

  function setCookie(value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  }

  function getCookie() {
    for (const c of document.cookie.split(";")) {
      const parts = c.trim().split("=");
      const k     = parts[0];
      const v     = parts.slice(1).join("=");
      if (k === CONSENT_KEY) return decodeURIComponent(v || "");
    }
    return null;
  }

  function saveConsent(analytics, marketing) {
    setCookie(
      JSON.stringify({
        necessary: true,
        analytics,
        marketing,
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
      }),
      CONSENT_DAYS
    );
  }

  function applyConsent(analytics, marketing) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    if (!window.gtag) window.gtag = gtag;
    window.gtag("consent", "update", {
      analytics_storage:  analytics ? "granted" : "denied",
      ad_storage:         marketing ? "granted" : "denied",
      ad_user_data:       marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    });
  }

  function setConsentDefaults() {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    if (!window.gtag) window.gtag = gtag;
    if (!window.google_tag_manager) {
      window.gtag("consent", "default", {
        analytics_storage:  "denied",
        ad_storage:         "denied",
        ad_user_data:       "denied",
        ad_personalization: "denied",
        wait_for_update:    500,
      });
    }
  }

  function loadGTM(gtmId) {
    if (!gtmId || document.getElementById("ck-gtm")) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const s  = document.createElement("script");
    s.id     = "ck-gtm";
    s.async  = true;
    s.src    = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(s);
  }

  function loadGA4(gaId) {
    if (!gaId || document.getElementById("ck-ga4")) return;
    const s  = document.createElement("script");
    s.id     = "ck-ga4";
    s.async  = true;
    s.src    = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    s.onload = () => {
      window.gtag("js", new Date());
      window.gtag("config", gaId, { anonymize_ip: true });
    };
  }

  // ── UI Components (HTML Templates) ──────────────────

  const Icons = {
    cookie: `<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M21.93 11.15a1 1 0 0 0-.89-.66 3 3 0 0 1-2.71-2.16 1 1 0 0 0-.78-.72 3 3 0 0 1-2.16-2.71 1 1 0 0 0-.66-.89A10 10 0 1 0 21.93 11.15ZM12 20a8 8 0 1 1 7.61-10.31 5 5 0 0 0 2.7 3 5 5 0 0 0 3 2.7A8 8 0 0 1 12 20Zm-1-7a1 1 0 1 1-1-1A1 1 0 0 1 11 13Zm-4-1a1 1 0 1 1-1-1A1 1 0 0 1 7 12Zm9 4a1 1 0 1 1-1-1A1 1 0 0 1 16 16Zm-1-5a1 1 0 1 1-1-1A1 1 0 0 1 15 11Z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>`
  };

  class CookieBanner {
    constructor(options = {}) {
      this.options = {
        gtmId: options.gtmId || "",
        gaId: options.gaId || "",
        privacyUrl: options.privacyUrl || "/datenschutz",
        cookiePolicyUrl: options.cookiePolicyUrl || "/cookies",
        restaurantName: options.restaurantName || "Martinelli",
      };

      this.state = {
        visible: false,
        bubbleVisible: false,
        analytics: false,
        marketing: false,
        detailsOpen: false
      };

      this.init();
    }

    init() {
      console.log("[CookieBanner] Initializing...");
      setConsentDefaults();
      if (this.options.gtmId) loadGTM(this.options.gtmId);

      const raw = getCookie();
      if (!raw) {
        console.log("[CookieBanner] No consent cookie found, showing banner in 900ms");
        setTimeout(() => this.showBanner(), 900);
      } else {
        try {
          const c = JSON.parse(raw);
          if (c.version !== CONSENT_VERSION) {
            console.log("[CookieBanner] Outdated version, showing banner in 900ms");
            setTimeout(() => this.showBanner(), 900);
          } else {
            console.log("[CookieBanner] Valid consent found:", c);
            this.state.analytics = !!c.analytics;
            this.state.marketing = !!c.marketing;
            this.state.visible = false;
            applyConsent(c.analytics, c.marketing);
            if (c.analytics && this.options.gaId && !this.options.gtmId) loadGA4(this.options.gaId);
            this.showBubble();
          }
        } catch (e) {
          console.error("[CookieBanner] Error parsing consent:", e);
          setTimeout(() => this.showBanner(), 900);
        }
      }

      const runRender = () => {
        if (!document.getElementById("martinelli-cookie-container")) {
          this.render();
        }
      };

      if (document.readyState === "complete" || document.readyState === "interactive") {
        runRender();
      } else {
        document.addEventListener("DOMContentLoaded", runRender);
      }
    }

    render() {
      // Inject CSS if not already there
      if (!document.getElementById("ck-styles")) {
        const style = document.createElement("style");
        style.id = "ck-styles";
        style.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
          :root {
            --ck-bg: #0f0d0b; --ck-deep: #161310; --ck-gold: #c9a96e; --ck-gold2: #e8c97a;
            --ck-white: #fdf8f0; --ck-muted: rgba(253, 248, 240, 0.42);
            --ck-border: rgba(201, 169, 110, 0.18); --ck-radius: 0px;
            --ck-font-display: 'Urbanist', sans-serif; --ck-font-body: 'Urbanist', sans-serif;
          }
          .ck-overlay { position: fixed; inset: 0; z-index: 99990; background: rgba(8, 6, 4, 0.6); backdrop-filter: blur(4px); display: none; }
          .ck-overlay.active { display: block; animation: ckFadeIn 0.4s ease forwards; }
          @keyframes ckFadeIn { from { opacity: 0; } to { opacity: 1; } }
          .ck-wrap { position: fixed; bottom: 0; left: 0; right: 0; z-index: 99999; transform: translateY(110%); transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1); }
          .ck-wrap.active { transform: translateY(0); }
          .ck-box { background: var(--ck-bg); border-top: 1px solid var(--ck-border); position: relative; overflow: hidden; }
          .ck-shimmer { position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.3) 20%, rgba(232,201,122,0.95) 50%, rgba(201,169,110,0.3) 80%, transparent 100%); animation: ckShimmer 3.5s ease-in-out infinite; }
          @keyframes ckShimmer { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
          .ck-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 32px 56px; }
          .ck-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
          .ck-eyebrow-line { width: 24px; height: 1px; background: linear-gradient(to right, var(--ck-gold), transparent); }
          .ck-eyebrow-dot { width: 4px; height: 4px; background: var(--ck-gold); border-radius: 50%; animation: ckDot 2s ease-in-out infinite; }
          @keyframes ckDot { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }
          .ck-eyebrow-text { font-family: var(--ck-font-display); font-size: 7.5px; letter-spacing: 0.5em; color: var(--ck-gold); text-transform: uppercase; opacity: 0.8; }
          .ck-grid { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: start; }
          .ck-title { font-family: var(--ck-font-display); font-size: 23px; font-weight: 300; color: var(--ck-white); line-height: 1.2; margin-bottom: 10px; }
          .ck-title em { font-style: italic; color: rgba(232, 201, 122, 0.92); }
          .ck-desc { font-family: var(--ck-font-body); font-size: 14px; color: var(--ck-muted); line-height: 1.8; max-width: 660px; margin-bottom: 20px; }
          .ck-desc a { color: rgba(201, 169, 110, 0.65); text-decoration: none; border-bottom: 1px solid rgba(201, 169, 110, 0.2); }
          .ck-cats { display: flex; flex-direction: column; border: 1px solid rgba(201, 169, 110, 0.1); margin-bottom: 16px; }
          .ck-cat { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid rgba(201, 169, 110, 0.08); transition: background 0.25s; gap: 12px; }
          .ck-cat:hover:not(.ck-cat--required) { background: rgba(201, 169, 110, 0.04); }
          .ck-cat--required { opacity: 0.55; }
          .ck-cat-left { display: flex; align-items: center; gap: 14px; flex: 1; }
          .ck-cat-text { display: flex; flex-direction: column; }
          .ck-cat-name { font-family: var(--ck-font-display); font-size: 8.5px; letter-spacing: 0.22em; color: rgba(253, 248, 240, 0.7); text-transform: uppercase; }
          .ck-cat-desc { font-family: var(--ck-font-body); font-size: 12.5px; color: rgba(253, 248, 240, 0.32); font-style: italic; }
          .ck-cat-cookies { font-family: var(--ck-font-body); font-size: 11px; color: rgba(201, 169, 110, 0.38); font-style: italic; margin-top: 1px; }
          .ck-required-badge { font-family: var(--ck-font-display); font-size: 7px; letter-spacing: 0.22em; color: var(--ck-gold); text-transform: uppercase; border: 1px solid rgba(201, 169, 110, 0.3); padding: 3px 9px; }
          .ck-toggle { position: relative; width: 36px; height: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); cursor: pointer; padding: 0; outline: none; }
          .ck-toggle--on { background: rgba(201, 169, 110, 0.35); border-color: var(--ck-gold); }
          .ck-toggle-thumb { position: absolute; top: 3px; left: 3px; width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.4); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .ck-toggle--on .ck-toggle-thumb { transform: translateX(16px); background: var(--ck-gold); box-shadow: 0 0 8px rgba(201,169,110,0.7); }
          .ck-details-btn { font-family: var(--ck-font-display); font-size: 7.5px; letter-spacing: 0.25em; color: rgba(201, 169, 110, 0.45); text-transform: uppercase; background: none; border: none; cursor: pointer; padding: 0; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 12px; }
          .ck-details-arrow { transition: transform 0.3s; display: inline-block; font-size: 14px; line-height: 1; }
          .ck-details-arrow--open { transform: rotate(90deg); }
          .ck-footer-note { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; padding-top: 12px; border-top: 1px solid rgba(201, 169, 110, 0.07); margin-top: 4px; }
          .ck-footer-note span, .ck-footer-note a { font-family: var(--ck-font-display); font-size: 7px; letter-spacing: 0.18em; color: rgba(201, 169, 110, 0.28); text-transform: uppercase; text-decoration: none; transition: color 0.3s; }
          .ck-footer-note a:hover { color: var(--ck-gold); }
          .ck-actions { display: flex; flex-direction: column; gap: 10px; min-width: 210px; }
          .ck-btn { width: 100%; font-family: var(--ck-font-display); font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase; border: none; cursor: pointer; padding: 15px 22px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; transition: transform 0.2s; }
          .ck-btn:active { transform: scale(0.98); }
          .ck-btn--accept { background: var(--ck-gold); color: var(--ck-bg); font-weight: 500; }
          .ck-btn--reject { background: transparent; color: rgba(253, 248, 240, 0.75); border: 1px solid rgba(201, 169, 110, 0.35); }
          .ck-btn--save { background: transparent; color: rgba(253, 248, 240, 0.42); border: 1px solid rgba(255, 255, 255, 0.1); font-size: 8.5px; }
          .ck-btn-sub { font-family: var(--ck-font-body); font-size: 9px; opacity: 0.5; font-weight: 400; text-transform: none; }
          .ck-bubble { position: fixed; bottom: 28px; left: 28px; z-index: 99997; display: none; }
          .ck-bubble.active { display: block; animation: ckFadeIn 0.4s ease; }
          .ck-bubble-btn { width: 48px; height: 48px; border-radius: 50%; background: var(--ck-bg); border: 1px solid rgba(201, 169, 110, 0.3); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--ck-gold); transition: transform 0.3s; }
          .ck-bubble-btn:hover { transform: scale(1.1); box-shadow: 0 0 18px rgba(201, 169, 110, 0.28); }
          .ck-confirm { display: none; align-items: center; gap: 14px; padding: 16px 0 4px; color: var(--ck-gold); }
          .ck-confirm.active { display: flex; animation: ckPopIn 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
          @keyframes ckPopIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          .ck-confirm-icon { width: 34px; height: 34px; border: 1px solid var(--ck-gold); display: flex; align-items: center; justify-content: center; }
          .ck-confirm-text { font-family: var(--ck-font-display); font-size: 8.5px; letter-spacing: 0.22em; text-transform: uppercase; }
          @media (max-width: 900px) { .ck-inner { padding: 24px 22px; } .ck-grid { grid-template-columns: 1fr; gap: 24px; } .ck-actions { flex-direction: row; flex-wrap: wrap; } .ck-btn { flex: 1; min-width: 130px; } }
          @media (max-width: 480px) { .ck-actions { flex-direction: column; } .ck-btn { width: 100%; } }
        `;
        document.head.appendChild(style);
      }

      const html = `
        <div id="ck-overlay" class="ck-overlay"></div>
        <div id="ck-wrap" class="ck-wrap">
          <div class="ck-box">
            <div class="ck-shimmer"></div>
            <div class="ck-inner">
              <div class="ck-eyebrow">
                <span class="ck-eyebrow-line"></span>
                <span class="ck-eyebrow-dot"></span>
                <span class="ck-eyebrow-text">Datenschutz & Cookie-Einstellungen</span>
              </div>
              <div class="ck-grid">
                <div class="ck-left">
                  <h2 class="ck-title">Ihre Privatsphäre bei <em>${this.options.restaurantName}</em></h2>
                  <p class="ck-desc">
                    Wir verwenden Cookies für die beste Erfahrung auf unserer Website.
                    Notwendige Cookies sind immer aktiv. Alle weiteren nur mit Ihrer ausdrücklichen Zustimmung.
                    Mehr in unserer <a href="${this.options.privacyUrl}">Datenschutzerklärung</a>.
                  </p>
                  <div class="ck-cats">
                    <div class="ck-cat ck-cat--required">
                      <div class="ck-cat-left">
                        <button class="ck-toggle ck-toggle--on" disabled><span class="ck-toggle-thumb"></span></button>
                        <div class="ck-cat-text">
                          <span class="ck-cat-name">Notwendig</span>
                          <span class="ck-cat-desc">Session, Sicherheit, Grundfunktionen</span>
                          <span class="ck-cat-cookies">ck_consent · 1 Jahr</span>
                        </div>
                      </div>
                      <span class="ck-required-badge">Immer aktiv</span>
                    </div>
                    <div class="ck-cat">
                      <div class="ck-cat-left">
                        <button id="ck-toggle-analytics" class="ck-toggle"><span class="ck-toggle-thumb"></span></button>
                        <div class="ck-cat-text">
                          <span class="ck-cat-name">Analyse</span>
                          <span class="ck-cat-desc">Google Analytics 4 — keine persönlichen Daten</span>
                          <span class="ck-cat-cookies">_ga, _ga_* · 2 Jahre · Google LLC</span>
                        </div>
                      </div>
                    </div>
                    <div class="ck-cat">
                      <div class="ck-cat-left">
                        <button id="ck-toggle-marketing" class="ck-toggle"><span class="ck-toggle-thumb"></span></button>
                        <div class="ck-cat-text">
                          <span class="ck-cat-name">Marketing</span>
                          <span class="ck-cat-desc">Personalisierte Werbung auf Drittplattformen</span>
                          <span class="ck-cat-cookies">_fbp · 90 Tage · Meta Platforms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button id="ck-details-btn" class="ck-details-btn">
                    Details & Cookie-Liste anzeigen
                    <span id="ck-details-arrow" class="ck-details-arrow">›</span>
                  </button>
                  <div class="ck-footer-note">
                    <span>DSGVO Art.7 · ePrivacy-konform · Zeitstempel gespeichert</span>
                    <a href="${this.options.privacyUrl}">Datenschutzerklärung →</a>
                  </div>
                  <div id="ck-confirm" class="ck-confirm">
                    <div class="ck-confirm-icon">${Icons.check}</div>
                    <span id="ck-confirm-msg" class="ck-confirm-text"></span>
                  </div>
                </div>
                <div id="ck-actions" class="ck-actions">
                  <button id="ck-accept-all" class="ck-btn ck-btn--accept">
                    <span>Alle akzeptieren</span>
                    <span class="ck-btn-sub">Analyse & Marketing aktivieren</span>
                  </button>
                  <button id="ck-save-selection" class="ck-btn ck-btn--save">
                    <span>Auswahl bestätigen</span>
                  </button>
                  <button id="ck-reject-all" class="ck-btn ck-btn--reject">
                    <span>Alle ablehnen</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="ck-bubble" class="ck-bubble">
          <button id="ck-reopen" class="ck-bubble-btn">${Icons.cookie}</button>
        </div>
      `;

      const container = document.createElement("div");
      container.id = "martinelli-cookie-container";
      container.innerHTML = html;
      document.body.appendChild(container);

      // Event Listeners with safety checks
      const bind = (id, fn) => {
        const el = document.getElementById(id);
        if (el) el.onclick = fn;
        else console.warn(`[CookieBanner] Missing element: ${id}`);
      };

      bind("ck-accept-all", () => this.acceptAll());
      bind("ck-reject-all", () => this.rejectAll());
      bind("ck-save-selection", () => this.saveSelection());
      bind("ck-reopen", () => this.reopen());
      
      this.toggles = {
        analytics: document.getElementById("ck-toggle-analytics"),
        marketing: document.getElementById("ck-toggle-marketing")
      };

      if (this.toggles.analytics) this.toggles.analytics.onclick = () => this.toggle("analytics");
      if (this.toggles.marketing) this.toggles.marketing.onclick = () => this.toggle("marketing");
      bind("ck-details-btn", () => this.toggle("detailsOpen"));

      this.updateUI();
    }

    toggle(key) {
      this.state[key] = !this.state[key];
      this.updateUI();
    }

    updateUI() {
      const wrap = document.getElementById("ck-wrap");
      const overlay = document.getElementById("ck-overlay");
      const bubble = document.getElementById("ck-bubble");
      const confirm = document.getElementById("ck-confirm");
      const actions = document.getElementById("ck-actions");

      if (this.state.visible) {
        wrap.classList.add("active");
        overlay.classList.add("active");
        bubble.classList.remove("active");
      } else {
        wrap.classList.remove("active");
        overlay.classList.remove("active");
        if (this.state.bubbleVisible) bubble.classList.add("active");
      }

      this.toggles.analytics.classList.toggle("ck-toggle--on", this.state.analytics);
      this.toggles.marketing.classList.toggle("ck-toggle--on", this.state.marketing);

      const detailsBtn = document.getElementById("ck-details-btn");
      const detailsArrow = document.getElementById("ck-details-arrow");
      if (detailsBtn && detailsArrow) {
        detailsBtn.childNodes[0].textContent = this.state.detailsOpen ? "Details ausblenden " : "Details & Cookie-Liste anzeigen ";
        detailsArrow.classList.toggle("ck-details-arrow--open", this.state.detailsOpen);
      }
    }

    showBanner() {
      this.state.visible = true;
      this.updateUI();
    }

    showBubble() {
      this.state.bubbleVisible = true;
      this.updateUI();
    }

    acceptAll() {
      this.state.analytics = true;
      this.state.marketing = true;
      this.finalize("Alle Cookies akzeptiert");
    }

    rejectAll() {
      this.state.analytics = false;
      this.state.marketing = false;
      this.finalize("Nur notwendige Cookies aktiv");
    }

    saveSelection() {
      this.finalize("Auswahl bestätigt");
    }

    finalize(msg) {
      saveConsent(this.state.analytics, this.state.marketing);
      applyConsent(this.state.analytics, this.state.marketing);
      if (this.state.analytics && this.options.gaId && !this.options.gtmId) loadGA4(this.options.gaId);

      const confirm = document.getElementById("ck-confirm");
      const msgEl = document.getElementById("ck-confirm-msg");
      const actions = document.getElementById("ck-actions");

      msgEl.textContent = msg;
      confirm.classList.add("active");
      actions.style.display = "none";

      setTimeout(() => {
        this.state.visible = false;
        this.state.bubbleVisible = true;
        this.updateUI();
        // Reset for next time banner opens
        setTimeout(() => {
          confirm.classList.remove("active");
          actions.style.display = "flex";
        }, 600);
      }, 1500);
    }

    reopen() {
      this.state.visible = true;
      this.state.bubbleVisible = false;
      this.updateUI();
    }
  }

  // Global entry point
  window.CookieBanner = {
    init: (options) => {
      if (instance) {
        console.log("[CookieBanner] Instance already exists, skipping initialization.");
        return instance;
      }
      instance = new CookieBanner(options);
      return instance;
    },
    show: () => {
      if (instance) instance.showBanner();
      else console.error("[CookieBanner] Not initialized. Call init() first.");
    }
  };
})();
