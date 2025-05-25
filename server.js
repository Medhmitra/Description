import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // If using Node 18 or lower, run: npm install node-fetch

const app = express();
const port = 5000;

// ✅ Replace this with your Together AI API Key
const TOGETHER_API_KEY = "13d07e42b8c62ada7f101964960bc790855536c69831f2890e29f107301f6a17";

app.use(cors());
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }
  
    try {
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3-8b-chat-hf",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 60
        })
      });
  
      const data = await response.json();
      console.log("Together API response:", JSON.stringify(data, null, 2)); // 👈 Add this
  
      const text = data?.choices?.[0]?.message?.content?.trim();
  
      if (!text) {
        console.error("No content in response:", data);
        throw new Error("No content returned from model");
      }
  
      res.json({ generated_text: text });
    } catch (err) {
      console.error("❌ Error generating description with Together AI:", err);
      res.status(500).json({ error: "Failed to generate description" });
    }
  });
  

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
