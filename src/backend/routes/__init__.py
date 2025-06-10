from .rrhh import employee_api
from .auth import auth_api
from .aux import aux_api


def register_routes(app):
    app.register_blueprint(employee_api)
    app.register_blueprint(auth_api)
    app.register_blueprint(aux_api)