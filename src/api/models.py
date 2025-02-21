from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, relationship, validates
from typing import List
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Worker(db.Model):
    __tablename__ = "worker_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), unique=False, nullable=False)
    birthdate = db.Column(db.String(20), unique=False, nullable=False)

    department_id = mapped_column(ForeignKey("department_table.id"))
    salary_id = mapped_column(ForeignKey("salary_table.id"))
    role_id = mapped_column(ForeignKey("role_table.id"))

    department = relationship("Department", back_populates="worker")
    salary = db.relationship("Salary", back_populates="worker")
    role = db.relationship("Role", back_populates="worker")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @validates('password_hash')
    def encrypt_password(self, key, password):
        """Se ejecuta automáticamente al crear o actualizar un usuario en Flask-Admin"""
        if password and not password.startswith('pbkdf2:sha256'):  # Evita doble encriptación
            return generate_password_hash(password)
        return password

    @property
    def password(self):
        raise AttributeError("La contraseña no se puede leer directamente")

    @password.setter
    def password(self, password):
        """Setter que encripta la contraseña cuando se asigna"""
        self.password_hash = generate_password_hash(password)

    def __repr__(self):
        return f'<Worker {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.last_name,
            "dni": self.dni,
            "address": self.address,
            "email": self.email,
            "birthdate": self.birthdate,
            "salary": self.salary.serialize() if self.salary else None,
            "department": self.department.serialize() if self.department else None,
            "role": self.role.serialize() if self.role else None
            # do not serialize the password, its a security breach
        }


class Department(db.Model):
    __tablename__ = "department_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=True)
    description = db.Column(db.String(800), unique=False, nullable=False)

    worker = relationship('Worker', back_populates='department')
    role = db.relationship("Role", back_populates='department')

    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }

class Role(db.Model):
    __tablename__ = "role_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=True)
    level = db.Column(db.String(80), unique=False, nullable=False)

    department_id = mapped_column(ForeignKey("department_table.id"))
    
    worker = relationship('Worker', back_populates='role')
    department = db.relationship("Department", back_populates="role")

    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
        }

class Salary(db.Model):
    __tablename__ = "salary_table"

    id = db.Column(db.Integer, primary_key=True)
    gross_salary = db.Column(db.Integer, unique=False, nullable=True)
    worker = db.relationship("Worker", back_populates="salary")

    def __repr__(self):
        return self.gross_salary

    def serialize(self):
        return {
            "id": self.id,
            "gross_salary": self.gross_salary,
        }


class Offer(db.Model):
    __tablename__ = "offer_table"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=True)
    description = db.Column(db.String(800), unique=False, nullable=False)
    requirements = db.Column(db.String(800), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "requirements": self.requirements,
        }