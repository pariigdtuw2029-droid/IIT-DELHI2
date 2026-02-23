// src/policy.ts
// Pure runtime-friendly policy file

const policy = {
  rules: [
    { id: "deny_large_payment", action: "deny", maxAmount: 1000 },
    { id: "deny_protected_directory", action: "deny", restrictedDirectory: "protected" },
    { id: "allow_notify_tool", action: "allow", tool: "send_notification" },
    { id: "deny_crypto_tool", action: "deny", tool: "transfer_crypto" },
  ],
};

function evaluatePolicy({ policy, intent }) {
  for (const rule of policy.rules) {
    if (rule.tool && rule.tool === intent.toolName) {
      return { decision: rule.action, reason: `Matched tool rule: ${rule.id}` };
    }
    if (rule.restrictedDirectory && intent.directory === rule.restrictedDirectory) {
      return { decision: rule.action, reason: `Restricted directory: ${rule.id}` };
    }
    if (rule.maxAmount && intent.amount && intent.amount > rule.maxAmount) {
      return { decision: rule.action, reason: `Amount exceeds limit: ${rule.id}` };
    }
  }
  return { decision: "deny", reason: "No matching allow rule found" };
}

// CommonJS export
module.exports = { policy, evaluatePolicy };