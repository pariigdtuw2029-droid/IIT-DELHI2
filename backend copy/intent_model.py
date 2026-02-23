from pydantic import BaseModel

class Intent(BaseModel):
    agent: str
    intent: str
    action: str
    target: str
    risk: str