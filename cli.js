// cli.js
const readline = require('readline');
const { armorClawGuard } = require('./backend/armorclaw_guard');
const { executeIntent } = require('./agents/worker');

// Simple parser to create structured intent
function createIntent(input) {
  if (input.includes('pay')) return { toolName: "send_payment", amount: 2000 };
  if (input.includes('notify')) return { toolName: "send_notification" };
  if (input.includes('crypto')) return { toolName: "transfer_crypto", amount: 500 };
  if (input.includes('access')) return { toolName: "access_files", directory: "protected" };
  return { toolName: "unknown" };
}

// Terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser() {
  rl.question('\nEnter command: ', (input) => {
    const intent = createIntent(input);
    const decision = armorClawGuard(intent);

    console.log("\n=== Sentinel SDK Demo ===");
    console.log("Structured Intent:", intent);
    console.log("ArmorClaw Decision:", decision.decision, "-", decision.reason);

    if (decision.decision === "allow") {
      executeIntent(intent);
    } else {
      console.log("Execution blocked by policy!");
    }

    promptUser(); // repeat
  });
}

// Start CLI
console.log("=== Sentinel-SDK CLI Demo ===");
promptUser();