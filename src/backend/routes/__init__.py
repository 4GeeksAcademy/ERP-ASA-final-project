from .rrhh import employee_api
from .auth import auth_api
from .aux import aux_api


def register_routes(app):
    app.register_blueprint(employee_api, url_prefix="/api/employee")
    app.register_blueprint(auth_api, url_prefix="/api/auth")
    app.register_blueprint(aux_api, url_prefix="/api/aux")