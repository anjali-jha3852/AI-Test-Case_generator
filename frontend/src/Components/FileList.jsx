import React from "react";

const FileList = ({ files, onSelectFile }) => {
  if (!files || files.length === 0) return <p>No files to display.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h3>📂 Repository Files:</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {files.map((file, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
            }}
            onClick={() => onSelectFile(file)}
          >
            📄 {file.name} ({file.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
