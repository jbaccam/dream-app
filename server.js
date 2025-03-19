// server.js (ES Module)
import dotenv from 'dotenv';
dotenv.config(); // load environment variables from .env

import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

// 1) initialize openai with my api key
const openai = new OpenAI({
  apiKey: process.env.OPENAI, // ensure .env has OPENAI=sk-...
});

// 2) create express app
const app = express();
app.use(cors());
app.use(express.json());

// 3) setup /dream endpoint
app.post('/dream', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    // call the openai images.create() method
    const aiResponse = await openai.images.create({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    // get the image URL
    const image = aiResponse.data[0].url;
    res.send({ image });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send({ error: 'Failed to generate image' });
  }
});

// 4) start the server
app.listen(8080, () => {
  console.log('Server running on http://localhost:8080/dream');
});
