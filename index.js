const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("AI Cold Caller Backend is running ✅");
});

app.post("/call", (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing 'to' or 'message'" });
  }

  console.log(`📞 Calling ${to} with message: ${message}`);
  res.json({ success: true, to, message });
});

app.listen(PORT, () => {
  console.log(`✅ AI Cold Caller backend running on port ${PORT}`);
});