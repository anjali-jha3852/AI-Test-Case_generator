import React, { useState } from "react";
import axios from "axios";

const TestGenerator = ({ selectedFile }) => {
  const [generatedTests, setGeneratedTests] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTests = async () => {
    if (!selectedFile) {
      alert("⚠️ Please select a file first.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/test/generate", {
        fileName: selectedFile.name, // ✅ must match backend's expected keys
        fileContent: selectedFile.content,
      });

      console.log("📦 API Response:", response.data);
      setGeneratedTests(response.data.testCode); // ✅ expect { testCode: "..." }
    } catch (error) {
      console.error("❌ Test generation failed:", error.response?.data || error.message);
      alert("❌ Failed to generate test cases.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>🧪 Generate Test Cases for: <code>{selectedFile?.name || "No file selected"}</code></h3>

      <button onClick={generateTests} disabled={loading || !selectedFile}>
        {loading ? "Generating..." : "🧠 Generate Test Cases"}
      </button>

      {generatedTests && (
        <pre
          style={{
            background: "#1e1e1e",
            color: "#c5f7c5",
            padding: "12px",
            marginTop: "1rem",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          {generatedTests}
        </pre>
      )}
    </div>
  );
};

export default TestGenerator;
