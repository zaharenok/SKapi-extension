# SKapi.pro — Landing Page

Official landing page for SKapi.pro — the first automation platform for Skool communities.

![SKapi](https://img.shields.io/badge/SKapi-Automation-purple)
![GA4](https://img.shields.io/badge/Analytics-GA4-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## About SKapi

SKapi.pro provides a custom API that connects your Skool community to popular automation platforms like **Make.com** and **n8n**. Automate member management, AI-powered responses, bulk messaging, and more — all without coding.

## Free Access Model

**Get the browser extension for free by joining our Skool community.**

The extension is completely free for all community members — no payment required. Simply join our Skool group and get immediate access to download the browser extension with real-time notifications and community management tools.

+ 🔓 **Free forever** for community members
+ 🎁 **Bonus features** exclusive to members
+ 🚀 **Early access** to new features and updates
+ 👥 **Community support** and automation tips

> **Note:** SKapi is an independent API and is not affiliated with, endorsed by, or sponsored by Skool.

## Features

- 🚀 One-click integration with Make.com and n8n
- 🤖 AI-powered automation (GPT, Claude)
- 📧 Mass messaging to thousands of members
- 👥 Automatic member screening and approvals
- 💬 Automated comments and replies
- 🔐 Zero coding required

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom styles with CSS variables
- **Vanilla JavaScript** — Form handling and analytics
- **Google Analytics 4** — Traffic and conversion tracking
- **Meta Pixel** — Facebook ads tracking

## Setup

1. Clone the repository:
```bash
git clone https://github.com/zaharenok/SKapi-extension.git
```

2. Open `index.html` in your browser or serve with:
```bash
python3 -m http.server 8000
```

3. Configure webhooks in `main.js` (line 28):
```javascript
const webhookUrl = 'https://your-webhook-url';
```

## Analytics Configuration

### Google Analytics 4

Edit the GA4 Measurement ID in all HTML files:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QB0NSGLNLR"></script>
```

Replace `G-QB0NSGLNLR` with your own GA4 ID.

### Conversion Tracking

The waitlist form sends a `generate_lead` event to GA4. To mark it as a conversion:
1. Go to GA4 → Configure → Events
2. Find `generate_lead`
3. Toggle the switch to mark as conversion

### Meta Pixel

Replace the Pixel ID in all HTML files:
```html
fbq('init', '3062462557296405');
```

## Project Structure

```
SKapi-extension/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── main.js             # Form handling & analytics
├── favicon.svg         # Site icon
├── make-color.webp     # Make.com logo
├── n8n-color.webp      # n8n logo
└── README.md           # This file
```

## Deployment

### GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `root`
4. Save

### Netlify

1. Connect your GitHub repository
2. Build settings: Leave empty (static site)
3. Deploy

### Vercel

```bash
npm i -g vercel
vercel
```

## License

MIT License — feel free to use this landing page as a template for your own projects.

## Contact

- Email: [connect@skapi.pro](mailto:connect@skapi.pro)
- Community: [Join our Skool community](https://www.skool.com/ai-pays-my-bills-7018/about)

---

Made with ❤️ for community automation
