// agents/supervisor.js
const readline = require('readline');
const { armorClawGuard } = require('../backend/armorclaw_guard');
const { exec } = require('child_process'); // simulate actions
const fs = require('fs');

// Function to create structured intent
function createIntent(userInput) {
  // Simple parsing for hackathon demo
  if (userInput.includes('pay')) {
    return { toolName: "send_payment", amount: 2000 };
  } else if (userInput.includes('notify')) {
    return { toolName: "send_notification" };
  } else if (userInput.includes('crypto')) {
    return { toolName: "transfer_crypto", amount: 500 };
  } else if (userInput.includes('access')) {
    return { toolName: "access_files", directory: "protected" };
  }
  return { toolName: "unknown" };
}

// Read user input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your command: ', (answer) => {
  const intent = createIntent(answer);
  const decision = armorClawGuard(intent);
  
  console.log("\n=== Supervisor ===");
  console.log("Structured Intent:", intent);
  console.log("ArmorClaw Decision:", decision.decision, "-", decision.reason);
  
  // Pass intent to worker if allowed
  if (decision.decision === 'allow') {
    require('./worker').executeIntent(intent);
  } else {
    console.log("Execution blocked by policy!");
  }

  rl.close();
});