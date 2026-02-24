def execute(intent, dry_run=False):
    if dry_run:
        return "DRY RUN — execution skipped"

    return "EXECUTED"