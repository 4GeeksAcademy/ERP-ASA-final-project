import os
from backend.models.database import db
from flask import Flask, send_from_directory
from backend.config import Config
from backend.extensions import migrate, jwt, mail, cors, cloudinary_config
from backend.routes import register_routes
from backend.utils import APIException, generate_sitemap
from backend.admin import setup_admin
from backend.commands import setup_commands
from dotenv import load_dotenv




def create_app():
    app = Flask(__name__, static_folder='../public', static_url_path='/')
    app.config.from_object(Config)
    register_routes(app)
    # Inicialización de extensiones
    load_dotenv()
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)
    cors.init_app(app)
    cloudinary_config()

    setup_admin(app)
    setup_commands(app)

    #app.register_blueprint(app, url_prefix="/api")

    @app.errorhandler(APIException)
    def handle_invalid_usage(error):
        return error.to_response()

    @app.route('/')
    def sitemap():
        if app.config["ENV"] == "development":
            return generate_sitemap(app)
        return send_from_directory(app.static_folder, 'index.html')

    @app.route('/<path:path>')
    def serve_file(path):
        if not os.path.exists(os.path.join(app.static_folder, path)):
            path = 'index.html'
        return send_from_directory(app.static_folder, path)

    return app

print("FLASK_ENV:", os.getenv("FLASK_ENV"))
print("MAIL_USERNAME:", os.getenv("MAIL_USERNAME"))