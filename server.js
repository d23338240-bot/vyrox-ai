import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;
const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(apiKey), provider: "Groq" });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!apiKey) {
      return res.status(503).json({
        error: "Vyrox is ready, but its Groq AI key has not been added to the server yet."
      });
    }
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const safeMessages = messages
      .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-16)
      .map(m => ({ role: m.role, content: m.content.slice(0, 6000) }));
    if (!safeMessages.length) return res.status(400).json({ error: "Send a message first." });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are Vyrox, Daniel's helpful personal AI assistant. Be friendly, practical, concise, and clear. Use simple language. Never claim you performed an action on the phone unless the app actually did it. You cannot independently access the user's phone, files, accounts, microphone, camera, or location; only use capabilities explicitly provided by the app. For risky requests, prioritize safety."
          },
          ...safeMessages
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Groq error:", response.status, data?.error?.message || "");
      return res.status(502).json({ error: "Groq couldn't answer. Check the API key, model and account limits." });
    }
    res.json({ reply: data.choices?.[0]?.message?.content || "I couldn't form a reply just now." });
  } catch (err) {
    console.error("AI request failed:", err?.message || err);
    res.status(500).json({ error: "Vyrox couldn't reach its AI service. Check the server and internet connection." });
  }
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(port, () => console.log(`Vyrox AI listening on port ${port}`));
