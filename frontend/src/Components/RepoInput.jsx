import React, { useState } from "react";

const RepoInput = ({ onFetchFiles }) => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && repo) {
      onFetchFiles(owner, repo);
    } else {
      alert("Please enter both owner and repository name.");
    }
  };

  return (
    <div className="bg-yellow-100 shadow-md rounded-xl p-8 max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🔍 GitHub Repo Explorer
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded text-center placeholder-gray-500"
            placeholder="Enter GitHub Owner (e.g., anjali-jha3852)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded text-center placeholder-gray-500"
            placeholder="Enter Repository Name (e.g., Test-Case-Backend)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          🚀 Fetch Files
        </button>
      </form>
    </div>
  );
};

export default RepoInput;
