import os

def execute(intent, dry_run=False):

    if dry_run:
        return "SKIPPED (dry-run)"

    os.makedirs("src", exist_ok=True)
    with open(intent.target,"a") as f:
        f.write("\n# updated by Sentinel")

    return "EXECUTED"