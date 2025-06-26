const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// POST /call endpoint
app.post('/call', (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing phone number or message' });
  }

  console.log(`📞 Simulating call to ${to}: ${message}`);

  // Placeholder: you can call your real Twilio or ElevenLabs logic here
  res.status(200).json({
    success: true,
    message: `Call placed to ${to} with message: ${message}`
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ AI Cold Caller backend running on port ${port}`);
});
