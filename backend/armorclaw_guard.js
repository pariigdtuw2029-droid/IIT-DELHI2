const fs = require('fs');
const path = require('path');
const { policy, evaluatePolicy } = require('../src/policy');

// Middleware function
function armorclawGuard(intent) {
  const result = evaluatePolicy({ policy, intent });

  // Write audit log
  const logPath = path.join(__dirname, '../logs/audit.json');
  let logs = [];
  if (fs.existsSync(logPath)) {
    logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
  }
  logs.push({ intent, result, timestamp: new Date().toISOString() });
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

  return result;
}

module.exports = { armorclawGuard };