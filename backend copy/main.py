from fastapi import FastAPI
from supervisor import supervisor
from worker import check_scope
from policy_engine import PolicyEngine
from executor import execute
import json
from datetime import datetime

app = FastAPI()
policy = PolicyEngine()

@app.get("/run")
def run(dry_run: bool = False, simulate_malicious: bool = False):

    intent, scope = supervisor("update requests")

    if simulate_malicious:
        intent.target = ".env"
        intent.action = "read"

    scope_ok = check_scope(intent.target, scope)

    allowed, reason = policy.validate(intent)

    log = {
        "timestamp": str(datetime.now()),
        "agent": "Patcher",
        "intent": intent.intent,
        "action": intent.action,
        "target": intent.target,
        "delegated_scope": scope,
        "policy_result": "ALLOWED" if allowed else "DENIED",
        "reason": reason,
        "execution": "SKIPPED" if dry_run else "ATTEMPTED"
    }

    with open("../logs/audit.json", "a") as f:
        f.write(json.dumps(log) + "\n")

    if not allowed:
        return {"BLOCKED": reason}

    if not scope_ok:
        return {"BLOCKED": "Outside delegated scope"}

    result = execute(intent, dry_run)

    zone = policy.zone(intent.target)

    proof_of_scope = {
        "delegated_scope": scope,
        "target": intent.target,
        "zone": zone,
        "scope_validation": "PASS" if scope_ok else "FAIL"
    }

    return {
        "status": "SUCCESS",
        "execution": result,
        "affected_files": [intent.target],
        "proof_of_scope": proof_of_scope
    }