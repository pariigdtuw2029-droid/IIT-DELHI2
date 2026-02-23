// test-policy.js
const { policy, evaluatePolicy } = require('./src/policy');

const testIntents = [
  { toolName: "send_payment", amount: 2000 },
  { toolName: "send_notification" },
  { toolName: "transfer_crypto", amount: 500 },
  { toolName: "access_files", directory: "protected" },
];

function formatDecision(intent, result) {
  let emoji = result.decision === "allow" ? "✅ ALLOWED" : "🚫 BLOCKED";
  if (intent.toolName.toLowerCase().includes("crypto") && result.decision === "deny") {
    emoji = "🚨 BLOCKED";
  }

  console.log("======================================");
  console.log(`Tool Requested: ${intent.toolName}`);
  if (intent.directory) console.log(`Directory: ${intent.directory}`);
  if (intent.amount) console.log(`Amount: ${intent.amount}`);
  console.log(`Policy Decision: ${emoji}`);
  console.log(`Reason: ${result.reason}`);
  console.log("======================================\n");
}

testIntents.forEach((intent) => {
  const result = evaluatePolicy({ policy, intent });
  formatDecision(intent, result);
});
const fs = require('fs');

// Create an array to store audit logs
const auditLogs = [];

testIntents.forEach((intent) => {
  const result = evaluatePolicy({ policy, intent });
  formatDecision(intent, result);

  // Add to audit log
  auditLogs.push({
    agent: "Architect",
    intent,
    decision: result.decision,
    reason: result.reason,
    resource: intent.directory || intent.toolName || "N/A"
  });
});

// Write the audit log to file
fs.writeFileSync('./logs/audit.json', JSON.stringify(auditLogs, null, 2));
console.log("✅ Audit log written to logs/audit.json");