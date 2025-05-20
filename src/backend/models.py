from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, relationship, validates
import re
import jwt
from datetime import datetime, timedelta
from flask import current_app
from typing import List
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer

db = SQLAlchemy()

class Employee(db.Model):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    profile_image_url = db.Column(db.String(255), nullable=True)
    birthdate = db.Column(db.String(20), unique=False, nullable=False)

    user_id = mapped_column(db.Integer, ForeignKey('users.id', ondelete= 'SET NULL'), nullable=True)
    user = relationship("User", back_populates="employee", uselist=False)

    department_id = mapped_column(db.Integer, ForeignKey('departments.id'), nullable=False)
    department = relationship("Department", back_populates="employees", uselist=False)

    salary_id = mapped_column(db.Integer, ForeignKey('salaries.id'), nullable=False)
    salary = db.relationship("Salary", back_populates="employees", uselist=False)

    role_id = mapped_column(db.Integer, ForeignKey('roles.id'), nullable=False)
    role = db.relationship("Role", back_populates="employees", uselist=False)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), unique=False, nullable=False)
    profile_image_url = db.Column(db.String(255), nullable=True)

    employee = relationship("Employee", back_populates="user", uselist=False)

    def get_reset_token(self):
      s = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
      return s.dumps({'reset_password': self.id}, salt=current_app.config['SECURITY_PASSWORD_SALT'])

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @validates('password_hash')
    def encrypt_password(self, key, password):
        return password
    
    @validates('email')
    def validate_email(self, key, email):
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, email):
            raise ValueError('Email format is not valid')
        return email

    @validates('dni')
    def validate_dni(self, key, dni):
        if not dni.isdigit() or len(dni) != 8:
            raise ValueError('Dni must have at least 8 digits')
        return dni

    @validates('birthdate')
    def validate_birthdate(self, key, birthdate):
        date_pattern = r'^\d{2}/\d{2}/\d{4}$'
        if not re.match(date_pattern, birthdate):
            raise ValueError('Birthdate format must be DD/MM/YYYY')
        try:
            datetime.strptime(birthdate, "%d/%m/%Y")
        except ValueError:
            raise ValueError('Birthdate is not valid')
        return birthdate

    @property
    def password(self):
        raise AttributeError("La contraseña no se puede leer directamente")
    @password.setter
    def password(self, password):
        """Setter que encripta la contraseña cuando se asigna"""
        self.password_hash = generate_password_hash(password)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "profile_image_url": self.profile_image_url

            # do not serialize the password, its a security breach
        }


class Department(db.Model):
    __tablename__ = "departments"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(800), unique=False, nullable=True)

    employees = relationship('Employee', back_populates='department')
    offers = relationship('Offer', back_populates='department')

    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }

class Role(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    
    employees = relationship('Employee', back_populates='role')

    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Salary(db.Model):
    __tablename__ = "salaries"

    id = db.Column(db.Integer, primary_key=True)
    gross_salary = db.Column(db.Integer, unique=False, nullable=False)
    
    employees = db.relationship("Employee", back_populates="salary")

    @validates('gross_salary')
    def validate_salary(self, key, gross_salary):
        if gross_salary is None or gross_salary <= 0:
            raise ValueError('Salary must be a positive number')
        return gross_salary

    def __repr__(self):
        return self.gross_salary

    def serialize(self):
        return {
            "id": self.id,
            "gross_salary": self.gross_salary,
        }


class Offer(db.Model):
    __tablename__ = "offers"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=True)
    description = db.Column(db.String(800), unique=False, nullable=False)
    requirements = db.Column(db.String(800), unique=False, nullable=False)

    department_id = mapped_column(db.Integer, ForeignKey('departments.id', ondelete='CASCADE'), nullable=False)
    department = relationship("Department", back_populates="offers")

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "requirements": self.requirements,
        }