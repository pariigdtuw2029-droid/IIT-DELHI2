def check_scope(target, scope):
    return target.startswith(scope.replace("./",""))