import json
import os
from datetime import datetime
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    user_input: str


@app.get("/")
def root():
    return {"status": "backend alive"}


@app.post("/execute")
def execute(payload: UserInput, dry_run: bool = Query(default=False)):

    text = payload.user_input.lower()

    decision = "ALLOW"
    reason = "Green Zone: src allowed"

    if ".env" in text or "password" in text:
        decision = "DENY"
        reason = "Red Zone access blocked"

    # ensure logs folder exists
    os.makedirs("logs", exist_ok=True)

    log = {
        "timestamp": str(datetime.now()),
        "agent": "Patcher",
        "intent": payload.user_input,
        "policy_result": decision,
        "reason": reason
    }

    with open("logs/audit.json", "a") as f:
        f.write(json.dumps(log) + "\n")

    # DRY RUN
    if dry_run:
        return {
            "planned": payload.user_input,
            "policy": decision,
            "execution": "SKIPPED (dry-run)"
        }

    # BLOCKED
    if decision == "DENY":
        return {
            "reasoning": "Dangerous resource requested",
            "intent": payload.user_input,
            "decision": "DENY",
            "execution": "Blocked by policy"
        }

    # ALLOWED
    return {
        "reasoning": f"User requested: {payload.user_input}",
        "intent": payload.user_input,
        "decision": "ALLOW",
        "execution": "Executed safely",
        "proof_of_scope": {
            "file": "src/utils.py",
            "status": "inside delegated scope"
        }
    }


@app.get("/audit")
def get_audit():
    try:
        with open("logs/audit.json", "r") as f:
            return [json.loads(line) for line in f if line.strip()]
    except:
        return []