const { armorclawGuard } = require('./armorclaw_guard');

const intents = [
  { toolName: "send_payment", amount: 2000 },
  { toolName: "send_notification" },
  { toolName: "transfer_crypto", amount: 500 },
  { toolName: "access_files", directory: "protected" },
];

intents.forEach(intent => {
  const result = armorclawGuard(intent);
  console.log('Intent:', intent);
  console.log('Policy Decision:', result.decision);
  console.log('Reason:', result.reason);
  console.log('----------------------');
});