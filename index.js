const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// POST /call endpoint
app.post("/call", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing phone number or message' });
  }

  try {
    const call = await client.calls.create({
      twiml: `<Response><Say>${message}</Say></Response>`,
      to,
      from: twilioNumber
    });

    res.json({ success: true, sid: call.sid });
  } catch (error) {
    console.error("Error making call:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Root route (optional)
app.get("/", (req, res) => {
  res.send("AI Cold Caller API is running.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
