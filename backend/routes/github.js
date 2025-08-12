// routes/github.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/fetch-files", async (req, res) => {
  const { owner, repo } = req.query;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo) {
    return res.status(400).json({ error: "Missing owner or repo parameter" });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      {
        headers: { Authorization: `token ${token}` }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

module.exports = router;
