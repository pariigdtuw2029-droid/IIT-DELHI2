const { armorclawGuard } = require('./backend/armorclaw_guard');

// Test allowed intent
const allowedIntent = { toolName: "send_notification" };

// Test blocked intents
const blockedIntent1 = { toolName: "send_payment", amount: 2000 };
const blockedIntent2 = { toolName: "access_files", directory: "protected" };
const blockedIntent3 = { toolName: "transfer_crypto", amount: 500 };

function testIntent(intent) {
  console.log("\n=== Testing Intent ===");
  console.log("Intent:", intent);
  const result = armorclawGuard(intent);
  console.log("ArmorClaw Decision:", result.decision, "-", result.reason);
  if (result.decision === "deny") {
    console.log("Execution blocked by policy!\n");
  } else {
    console.log("Execution allowed ✅\n");
  }
}

// Run tests
testIntent(allowedIntent);
testIntent(blockedIntent1);
testIntent(blockedIntent2);
testIntent(blockedIntent3);
