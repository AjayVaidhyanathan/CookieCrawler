# Martinelli Cookie Banner (Vanilla JS)

A premium, GDPR-compliant cookie consent banner that is framework-agnostic. No React, no Vite, no jargon—just a single script tag.

## Simple CDN Usage

Add the banner to any website by including the script and initializing it:

\`\`\`html
<!-- 1. Include the script -->
<script src="https://cdn.jsdelivr.net/gh/[username]/[repo]/CookieBanner.js"></script>

<!-- 2. Initialize with your settings -->
<script>
  CookieBanner.init({
    restaurantName: "Your Restaurant Name",
    privacyUrl: "/privacy-policy",
    // gtmId: "GTM-XXXXXXX" // Optional: Google Tag Manager ID
    // gaId: "G-XXXXXXXXXX" // Optional: GA4 ID (if not using GTM)
  });
</script>

## 🚀 No Frontend Setup Needed
The banner is fully self-contained. You do **not** need to add any HTML elements, placeholders, or CSS files to your frontend. The script automatically:
- Injects all necessary premium styles.
- Creates the banner and the "Cookie" bubble button.
- Appends everything to the page safely.

## 🛠 Usage in Framer
To use this in Framer, go to **Settings > Custom Code**:
1. Paste the script tag (Step 1) in the **Head** or **Start of Body** section.
2. Paste the initialization script (Step 2) right below it.
3. If the banner doesn't appear immediately after making a change, add `?v=2` to the script URL to bypass caching.
\`\`\`

## Features

- **Premium Design**: Shimmer effects, smooth animations, and Urbanist typography.
- **GDPR Compliant**: Supports Consent Mode v2 (GTM/GA4 integration).
- **Standalone**: All styles and logic are bundled in one file.
- **Responsive**: Works perfectly on mobile and desktop.

## Local Development

To see the banner in action locally:

1. Clone the repository.
2. Run `npm start` (or just open `index.html` in your browser).

## Customization

The `init` method accepts the following options:

| Option | Default | Description |
| :--- | :--- | :--- |
| `restaurantName` | "Martinelli" | Name displayed in the banner. |
| `privacyUrl` | "/datenschutz" | Link to your privacy policy. |
| `gtmId` | "" | Your Google Tag Manager container ID. |
| `gaId` | "" | Your GA4 Measurement ID (standalone). |

## License

ISC
