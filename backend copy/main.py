from fastapi import FastAPI
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
def execute(payload: UserInput):

    text = payload.user_input.lower()

    # SIMPLE ArmorClaw simulation (for demo)
    if ".env" in text or "password" in text:
        return {
            "reasoning": "Dangerous resource requested",
            "intent": {"target": payload.user_input},
            "decision": "DENY",
            "execution": "Blocked by policy"
        }

    return {
        "reasoning": "Structured intent created",
        "intent": {"target": payload.user_input},
        "decision": "ALLOW",
        "execution": "Worker executed successfully"
    }