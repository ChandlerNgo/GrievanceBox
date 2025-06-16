import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [complaint, setComplaint] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("https://grievance-box-server.vercel.app/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, complaint })
      });

      if (res.ok) {
        setStatus("✅ Complaint submitted successfully!");
        setUsername("");
        setComplaint("");
      } else {
        const text = await res.text();
        setStatus(`❌ Error: ${text}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Submission failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Your complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
          rows={5}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>
      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}

export default App;
