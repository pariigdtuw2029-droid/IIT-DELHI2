import yaml
import hashlib
from pathlib import Path

class PolicyEngine:
    def __init__(self):
        with open("../policy/policy.yaml") as f:
            self.policy = yaml.safe_load(f)

        policy_hash = hashlib.sha256(open("../policy/policy.yaml","rb").read()).hexdigest()
        print("Loaded policy SHA256:", policy_hash)

    def zone(self, path):
        if path.endswith(".env"):
            return "red"
        if path.startswith("config"):
            return "yellow"
        if path.startswith("src"):
            return "green"
        return "red"

    def validate(self, intent):
        zone = self.zone(intent.target)

        for rule in self.policy["rules"]:
            if rule["zone"] == zone:
                if rule["action"] == intent.action or rule["action"] == "any":
                    return rule["allow"], f"Zone={zone}"

        return False, "No rule"