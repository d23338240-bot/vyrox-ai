VYROX AI — GROQ CONNECTOR EDITION

This is a phone-first web app/PWA source project with a Node.js backend that calls Groq's OpenAI-compatible chat completions endpoint. It is not yet deployed or connected to a live API key.

SETUP REQUIREMENTS
- Node.js 20+ and a Node.js hosting provider.
- Create a Groq account and API key at https://console.groq.com/keys
- Set GROQ_API_KEY in your host's private environment settings.
- Optional: set GROQ_MODEL to a currently available chat model in your Groq account. Default: llama-3.3-70b-versatile.
- Start with `npm install` and `npm start` on a Node.js environment.
- Deploy this project to a Node-capable host; a static-only host cannot run server.js by itself.

SECURITY
Never put the API key in public HTML or send it in chat. Do not publish this app publicly without authentication, rate limiting, and usage controls. Free API access is subject to provider eligibility, model availability, and rate limits.

CURRENT FEATURES
- Responsive black/red chat interface.
- Server-side Groq API connection.
- Browser speech recognition where supported and optional speech synthesis.
- Installable PWA shell with basic offline caching.

NOT YET IMPLEMENTED
- Native Android APK and background wake-word service.
- Arbitrary phone app control.
- Antivirus or deep device scanning.
- Image generation, video editing, live sports data, music streaming integrations, account login, or persistent synced chat history.

These require additional services, native Android work, permissions, and testing. This project does not claim those are already working.
