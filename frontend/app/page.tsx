"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<any[]>([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8001/execute", {
        user_input: input,
      });
      setResult(response.data);
      const auditRes = await axios.get("http://127.0.0.1:8001/audit");
      setAudit(auditRes.data);
    } catch (error) {
      alert("Backend not connected");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#6d28d9,#9333ea,#ec4899)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20
    }}>

      <div style={{
        width: 480,
        background: "white",
        borderRadius: 24,
        padding: 30,
        boxShadow: "0 25px 60px rgba(0,0,0,.25)"
      }}>

        <h1 style={{textAlign:"center"}}>🤖 Sentinel SDK</h1>

        <p style={{textAlign:"center",color:"#666"}}>
          Governed Autonomous Agent
        </p>

        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Ask your AI agent..."
          style={{
            width:"100%",
            padding:12,
            borderRadius:12,
            border:"1px solid #ddd",
            marginTop:20
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width:"100%",
            marginTop:15,
            padding:12,
            borderRadius:12,
            border:"none",
            background:"#7c3aed",
            color:"white",
            fontWeight:"bold",
            cursor:"pointer"
          }}
        >
          {loading ? "Thinking..." : "Run Agent"}
        </button>

        {result && (
          <div style={{marginTop:25}}>

            <h4>🧠 Supervisor</h4>
            <pre>{result.reasoning}</pre>

            <h4>📦 Intent</h4>
            <pre>{JSON.stringify(result.intent,null,2)}</pre>

            <h4>🛡 ArmorClaw</h4>
            <p style={{
              fontWeight:"bold",
              color: result.decision==="ALLOW"?"green":"red"
            }}>
              {result.decision}
            </p>

            <h4>⚙ Execution</h4>
            <pre>{result.execution}</pre>
            {audit && audit.length > 0 && (
  <div style={{ marginTop: 20 }}>
    <h3>🧾 Audit Trail</h3>

    {audit.map((item: any, idx: number) => (
      <div
        key={idx}
        style={{
          background: "#111",
          color: "white",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          fontSize: 12
        }}
      >
        <div>🕒 <b>Time:</b> {item.timestamp}</div>
        <div>🤖 <b>Agent:</b> {item.agent}</div>
        <div>🎯 <b>Intent:</b> {item.intent}</div>
        <div>🛡 <b>Decision:</b> {item.policy_result}</div>
        <div>📌 <b>Reason:</b> {item.reason}</div>
      </div>
    ))}
  </div>
)}
          </div>
        )}

        <p style={{textAlign:"center",fontSize:12,color:"#999",marginTop:30}}>
          ARMORIQ × OPENCLAW Hackathon
        </p>

      </div>

    </div>
  );
}