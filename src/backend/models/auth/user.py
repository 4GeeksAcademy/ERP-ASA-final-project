from backend.models.database import db
from sqlalchemy.orm import relationship, validates
from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app
from itsdangerous import URLSafeTimedSerializer
import re
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), unique=False, nullable=True)
    profile_image_url = db.Column(db.String(255), nullable=True)

    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id', ondelete="CASCADE"), nullable=False, unique=True)
    employee = relationship("Employee", back_populates="user", uselist=False)

    def get_reset_token(self):
      s = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
      return s.dumps({'reset_password': self.id}, salt=current_app.config['SECURITY_PASSWORD_SALT'])

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        
        return check_password_hash(self.password_hash, password)

    # @validates('password_hash')
    # def encrypt_password(self, key, password):
    #     return password
    
    @validates('email')
    def validate_email(self, key, email):
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, email):
            raise ValueError('Email format is not valid')
        return email

    @property
    def password(self):
        raise AttributeError("La contraseña no se puede leer directamente")
    @password.setter
    def password(self, password):
        """Setter que encripta la contraseña cuando se asigna"""
        self.password_hash = generate_password_hash(password)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def __str__(self):
        return f'{self.email}'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "profile_image_url": self.profile_image_url

            # do not serialize the password, its a security breach
        }
