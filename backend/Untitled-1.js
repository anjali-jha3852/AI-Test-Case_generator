const express = require("express");
const router = express.Router();

// ✅ Quick check route (works in browser)
router.get("/", (req, res) => {
  res.json({
    status: "✅ Testcase API is alive",
    usage: "Send a POST request to /api/testcase with filename & fileContent"
  });
});

// ✅ Main POST route for test case generation
router.post("/", (req, res) => {
  const { fileName, fileContent } = req.body;

  if (!fileName || !fileContent) {
    return res.status(400).json({
      error: "❌ Missing 'fileName' or 'fileContent' in request body"
    });
  }

  // For now just send back a placeholder until AI logic is connected
  res.json({
    message: `✅ Test case generation for ${fileName} successful`,
    fileContentPreview: fileContent.slice(0, 50) + (fileContent.length > 50 ? "..." : "")
  });
});

module.exports = router;
