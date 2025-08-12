import React from "react";

const SummaryCard = ({ testSummary }) => {
  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px 0",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ marginBottom: "8px", color: "#333" }}>{testSummary.title}</h3>
      <p style={{ margin: "0", color: "#555" }}>{testSummary.description}</p>
      {testSummary.code && (
        <pre
          style={{
            backgroundColor: "#272822",
            color: "#f8f8f2",
            padding: "12px",
            borderRadius: "6px",
            marginTop: "10px",
            overflowX: "auto",
          }}
        >
          <code>{testSummary.code}</code>
        </pre>
      )}
    </div>
  );
};

export default SummaryCard;
