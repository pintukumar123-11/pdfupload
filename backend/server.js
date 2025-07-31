const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const { cleanLLMOutput } = require('./utils/formatter');
const { buildPrompt } = require('./utils/promptBuilder');
const { extractTextFromPDF } = require('./processors/pdfProcessor');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/ask', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
    if (!req.body.question) return res.status(400).json({ error: 'No question provided.' });

    const pdfText = await extractTextFromPDF(req.file.buffer);
    const prompt = buildPrompt(pdfText, req.body.question);

    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const raw = await result.response.text();
    const clean = cleanLLMOutput(raw);

    res.json({ answer: clean });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
