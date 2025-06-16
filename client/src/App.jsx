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
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f9f9fb",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
      }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>📮 Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              fontSize: "16px"
            }}
          />
          <textarea
            placeholder="Your complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
            rows={4}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              fontSize: "16px",
              resize: "none"
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#6c63ff",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#5852d6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6c63ff")}
          >
            Submit
          </button>
        </form>
        {status && (
          <p style={{ marginTop: "15px", color: "#555", fontWeight: "500" }}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;