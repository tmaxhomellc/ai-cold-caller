const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.post('/call', async (req, res) => {
  const { to, message } = req.body;

  // ✅ Log inputs for debugging
  console.log("Received call request:", { to, message });

  // TODO: Replace with your real call logic (e.g., using Twilio, ElevenLabs, Claude)
  if (!to || !message) {
    return res.status(400).json({ error: 'Missing "to" or "message"' });
  }

  // Simulate a response (remove this when you connect real calling logic)
  res.json({
    success: true,
    to,
    message,
    status: 'Simulated call sent ✅'
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ AI Cold Caller backend listening on port ${port}`);
});
