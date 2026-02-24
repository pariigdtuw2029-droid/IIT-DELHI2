def armorclaw_guard(intent):
    target = intent.get("target","")

    if ".env" in target:
        return {"decision":"DENY","reason":"Access to .env blocked"}

    if "config" in target:
        return {"decision":"DENY","reason":"Config protected"}

    return {"decision":"ALLOW","reason":"Within policy"}