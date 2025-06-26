const express = require("express");
const axios = require("axios");
const twilio = require("twilio");
const textToSpeech = require("./tts");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Twilio config
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Entry route
app.get("/", (req, res) => {
  res.send("Tmax Home LLC AI Cold Caller is running.");
});

// Cold call route
app.post("/call", async (req, res) => {
  const { to, message } = req.body;
  if (!to || !message) {
    return res.status(400).json({ error: "Missing 'to' or 'message'" });
  }

  try {
    const audioUrl = await textToSpeech(message);

    await twilioClient.calls.create({
      url: audioUrl,
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.status(200).json({ success: true, called: to });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Call failed", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Tmax Home LLC AI Cold Caller listening on port ${port}`);
});