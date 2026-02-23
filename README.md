# Sentinel-SDK
Governed autonomous system using ArmorClaw to enforce policies at runtime.  
Every agent action is converted into a structured intent and checked against policies before execution.

## Folder Structure

- **backend/** → Server & API logic (FastAPI / Node)
- **frontend/** → UI or CLI to interact with agents
- **policy/** → Policy definitions (YAML or TS)
- **agents/** → Supervisor & Worker agents
- **logs/** → Audit logs for all actions
- **docs/** → Documentation and diagrams
- **src/** → TypeScript source files (`policy.ts`, helpers)
- **test-policy.ts** → Script to test policy enforcement

## How to Run Tests

1. Open terminal in the `sentinel-sdk` folder  
2. Run:

```bash
npx ts-node test-policy.ts
## Enforcement Flow
1. User input -> Intent created
2. Intent passed to `test-policy.js` / ArmorClaw
3. `evaluatePolicy()` checks policy rules
4. Decision returned: allow/deny
5. Audit logged to `logs/audit.json`