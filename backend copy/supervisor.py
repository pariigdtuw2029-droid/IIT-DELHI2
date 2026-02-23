from intent_model import Intent

def supervisor(prompt):

    print("Reasoning:")
    print("1. Identify target file")
    print("2. Assess risk")
    print("3. Delegation required")

    intent = Intent(
        agent="Architect",
        intent="update_dependency",
        action="write",
        target="src/utils.py",
        risk="medium"
    )

    scope = "./src"

    return intent, scope