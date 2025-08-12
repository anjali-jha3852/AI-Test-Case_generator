import React, { useState } from "react";
import axios from "axios";
import RepoInput from "./Components/RepoInput";

const App = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [generatedTests, setGeneratedTests] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch file list from GitHub repo
  const fetchFiles = async (owner, repo) => {
    setError("");
    try {
      const response = await axios.get("/api/github/fetch-files", {
        params: { owner, repo },
      });
      setFiles(response.data);
    } catch (err) {
      console.error("❌ Error fetching repo files:", err);
      setFiles([]);
      setError("❌ Failed to fetch files.");
    }
  };

  // Generate test case using backend
  const generateTestCase = async (fileName, fileContent) => {
    console.log("📤 Sending to backend:", { fileName, fileContent: fileContent?.slice(0, 100) + "..." });

    try {
      const response = await axios.post("/api/test/generate", {
        fileName,
        fileContent,
      });

      console.log("✅ Received from backend:", response.data);
      setGeneratedTests(response.data.testCode);
      setSelectedFile({ name: fileName, content: fileContent }); // store both
    } catch (err) {
      console.error("❌ Failed to generate AI test case:", err);
      alert("❌ Failed to generate AI test case");
    }
  };

  // Download .test.js file
  const downloadTestFile = () => {
    if (!selectedFile?.name || !generatedTests) return;

    const element = document.createElement("a");
    const file = new Blob([generatedTests], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedFile.name.replace(/\.[^/.]+$/, "")}.test.js`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
      <RepoInput onFetchFiles={fetchFiles} />

      <div className="p-6 max-w-2xl mx-auto mt-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">
          📁 Repository Files
        </h2>

        {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4 text-center">{error}</p>}

        {files.length > 0 ? (
          <ul className="space-y-3">
            {files.map((file) => (
              <li
                key={file.sha}
                className="p-3 bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-md shadow-sm transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">📄 {file.name}</span>
                  <div className="flex gap-3 items-center">
                    <span className="text-sm text-gray-500 italic">{file.type}</span>
                    <button
                      className="text-indigo-600 hover:underline text-sm"
                      onClick={async () => {
                        try {
                          const fileContentRes = await axios.get(file.download_url);
                          generateTestCase(file.name, fileContentRes.data);
                        } catch (err) {
                          console.error("❌ Failed to fetch file content:", err);
                          alert("❌ Error fetching file content");
                        }
                      }}
                    >
                      🧠 Generate Test
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 italic">No files loaded yet.</p>
        )}

        {generatedTests && selectedFile && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2 text-green-700">
              🤖 AI-Based Test Cases for: <code>{selectedFile.name}</code>
            </h3>
            <pre className="bg-black text-green-300 p-4 rounded whitespace-pre-wrap overflow-auto">
              {generatedTests}
            </pre>
            <button
              onClick={downloadTestFile}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
              ⬇️ Download Test File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
