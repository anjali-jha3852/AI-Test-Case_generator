import React from "react";

const TestCasePreview = ({ fileName, testCases }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ marginBottom: "12px", color: "#333" }}>
        Preview for <code>{fileName}</code>
      </h3>

      {testCases && testCases.length > 0 ? (
        testCases.map((testCase, index) => (
          <pre
            key={index}
            style={{
              backgroundColor: "#282c34",
              color: "#f8f8f2",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "12px",
              overflowX: "auto",
            }}
          >
            <code>{testCase}</code>
          </pre>
        ))
      ) : (
        <p style={{ color: "#777" }}>No test cases to preview yet.</p>
      )}
    </div>
  );
};

export default TestCasePreview;
