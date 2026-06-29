import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize AI client
  let ai: GoogleGenAI | null = null;
  const getAi = () => {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is required');
      }
      ai = new GoogleGenAI({ apiKey });
    }
    return ai;
  };

  // --- API Routes ---

  // Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, systemInstruction, model = 'gemini-3.5-flash' } = req.body;
      const aiClient = getAi();
      
      const response = await aiClient.models.generateContent({
        model: model,
        contents: messages,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Chat API Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });

  // Image Generation Endpoint
  app.post('/api/generate-image', async (req, res) => {
    try {
      const { prompt, size } = req.body; // size: '1K', '2K', '4K'
      const aiClient = getAi();
      
      // Append size instruction to prompt if the API doesn't have a native size enum yet
      const finalPrompt = `${prompt}. Ensure the output is high-quality, aiming for ${size} resolution.`;

      const response = await aiClient.models.generateImages({
        model: 'gemini-3-pro-image-preview',
        prompt: finalPrompt,
        config: {
          numberOfImages: 1,
          aspectRatio: '16:9', // Defaulting to a cinematic aspect ratio for a premium feel
          outputMimeType: 'image/jpeg',
        },
      });

      const imageObj = response.generatedImages?.[0];
      if (imageObj && imageObj.image?.imageBytes) {
         res.json({ image: imageObj.image.imageBytes });
      } else {
         throw new Error("No image generated");
      }
    } catch (error: any) {
      console.error('Image Gen API Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate image' });
    }
  });

  // --- Vite Middleware for Development ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
