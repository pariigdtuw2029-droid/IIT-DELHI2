// agents/worker.js
function executeIntent(intent) {
  console.log("\n=== Worker ===");
  console.log(`Executing: ${JSON.stringify(intent)}`);

  // Simulate action
  if (intent.toolName === 'send_payment') {
    console.log("💸 Payment sent!");
  } else if (intent.toolName === 'send_notification') {
    console.log("📣 Notification sent!");
  } else if (intent.toolName === 'transfer_crypto') {
    console.log("💰 Crypto transferred!");
  } else if (intent.toolName === 'access_files') {
    console.log("📂 File accessed!");
  } else {
    console.log("❌ Unknown action!");
  }
}

module.exports = { executeIntent };