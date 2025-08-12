// routes/testcase.js
const express = require("express");
const router = express.Router();

router.post("/generate", async (req, res) => {
  console.log("✅ /api/test/generate hit");
  const { fileName, fileContent } = req.body;

  if (!fileName || !fileContent) {
    return res.status(400).json({ error: "Missing fileName or fileContent" });
  }

  // ✅ Mock mode
  if (process.env.USE_MOCK === "true") {
    console.log("⚡ Mock mode enabled — returning fake test case");
    return res.json({
      success: true,
      mock: true,
      testCode: `// Mock test case for ${fileName}
describe('${fileName}', () => {
  it('should run correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
});`
    });
  }

  // ❌ If not mock mode — implement Hugging Face call here
  return res.status(500).json({
    error: "AI generation not implemented",
    details: "Enable USE_MOCK=true to test without Hugging Face or add HF API call here."
  });
});

module.exports = router;
