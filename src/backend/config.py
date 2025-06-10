import os
from datetime import timedelta

class Config:
    ENV = os.getenv("FLASK_ENV", "production")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:////tmp/test.db").replace("postgres://", "postgresql://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "ASA-ERP-final-project"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'erpasa4geeksacademy@gmail.com'
    MAIL_PASSWORD = 'alwd slbu hkcz ixwf'
    MAIL_DEFAULT_SENDER = 'tucorreo@gmail.com'

    SECRET_KEY = 'ERP-ASA'
    SECURITY_PASSWORD_SALT = 'ERP-ASA'