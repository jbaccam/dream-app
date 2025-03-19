// server.js (ES Module)

// 1) load environment variables from .env
import dotenv from 'dotenv';
dotenv.config(); // this reads .env and merges variables into process.env

// 2) import openai, express, and cors
import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

// 3) initialize openai with my api key
//    ensure .env has OPENAI=sk-... 
const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

// 4) create an express application
const app = express();
app.use(cors());        // allow cross origin requests
app.use(express.json()); // parse JSON bodies from incoming requests

// 5) set up /dream endpoint
app.post('/dream', async (req, res) => {
  try {
    // extract the prompt from the request body
    const prompt = req.body.prompt;

    // call the openai images.create() method
    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,            // number of images to generate
      size: '1024x1024' // resolution of the generated image
    });

    // extract the image URL from the response
    const image = aiResponse.data[0].url;

    // send the image URL back to the client
    res.send({ image });
  } catch (error) {
    // for debugging the actual openai error details 
    console.error('Error generating image:', error.response?.data || error.message);

    // send a 500 status with a generic error message
    res.status(500).send({ error: 'Failed to generate image' });
  }
});

// 6) start the server on port 8080
app.listen(8080, () => {
  console.log('Server running on http://localhost:8080/dream');
});
