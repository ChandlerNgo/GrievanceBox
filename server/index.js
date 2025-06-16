const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(
  cors({
    origin: "https://chandlers-grievance-box.vercel.app", // allow only your frontend
    methods: ["GET", "POST"]
  })
);

app.use(bodyParser.json());

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const ALLOWED_USERNAME = process.env.ALLOWED_USERNAME;
const DISCORD_USER = process.env.DISCORD_USER;

// GET /
app.get("/", (req, res) => {
  res.send("Server is running");
});

// POST /api/submit
app.post("/api/submit", async (req, res) => {
  const { username, complaint } = req.body;

  if (!username || !complaint) {
    return res.status(400).send("Missing username or complaint");
  }

  if (ALLOWED_USERNAME && username !== ALLOWED_USERNAME) {
    return res.status(403).send("Unauthorized user");
  }

  try {
    await axios.post(WEBHOOK_URL, {
      content: `@${DISCORD_USER} hello`
    });

    res.status(200).send("Complaint sent to Discord!");
  } catch (err) {
    console.error("Error sending to Discord:", err);
    res.status(500).send("Failed to send complaint");
  }
});

app.listen(5000, console.log("Server started on PORT 5000"))