"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/execute",
        {
          user_input: input,
        }
      );
      setResult(response.data);
    } catch (error) {
      alert("Backend not connected");
      console.log(error);
    }
  };

  return (
  <div style={{
  background: "#f5f5f5",
  padding: 15,
  borderRadius: 8,
  marginBottom: 20
}}>
      <h1 style={{ textAlign: "center" }}>
  🛡 Sentinel-SDK Governance Dashboard
</h1>
<div style={{
  textAlign: "center",
  marginTop: 10,
  marginBottom: 30
}}>
  <span style={{
    backgroundColor: "#e0f2fe",
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12
  }}>
    Governed Autonomous Agent System
  </span>
</div>

<p style={{ textAlign: "center", color: "gray" }}>
  Structured Intent • Deterministic Enforcement • Scoped Delegation
</p>
      <div style={{
  background: "#f5f5f5",
  padding: 15,
  borderRadius: 8,
  marginBottom: 20
}}>

  <input
    type="text"
    placeholder="Enter request"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    style={{ padding: 8, width: 300 }}
  />

  <button
  onClick={handleSubmit}
  disabled={loading}
  style={{
    marginLeft: 10,
    padding: "8px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    transition: "0.3s"
  }}
>
  {loading ? "Processing..." : "Submit"}
</button>

</div>

      {result && (
  <div style={{ marginTop: 40 }}>

    <h3>Supervisor Reasoning</h3>
    <pre>{result.reasoning}</pre>

    <h3>Structured Intent</h3>
    <pre>{JSON.stringify(result.intent, null, 2)}</pre>

    <div style={{
  background: "#f5f5f5",
  padding: 15,
  borderRadius: 8,
  marginBottom: 20
}}>
  <h3>ArmorClaw Decision</h3>
  <p style={{
    fontWeight: "bold",
    fontSize: 18,
    color: result.decision === "ALLOW" ? "green" : "red"
  }}>
    {result.decision}
  </p>
</div>

    <h3>Execution Result</h3>
    <pre>{result.execution}</pre>

  </div>
)}
<hr style={{ marginTop: 50 }} />
<p style={{ textAlign: "center", color: "gray" }}>
  Built for ARMORIQ × OPENCLAW Hackathon
</p>
    </div>
  );
}