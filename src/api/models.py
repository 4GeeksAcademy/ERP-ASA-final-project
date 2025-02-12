from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, relationship
from typing import List

db = SQLAlchemy()

class Worker(db.Model):
    __tablename__ = "worker_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    sub_date = db.Column(db.String(20), unique=False, nullable=False)

    department_id = mapped_column(ForeignKey("department_table.id"))
    salary_id = mapped_column(ForeignKey("salary_table.id"))
    role_id = mapped_column(ForeignKey("role_table.id"))

    department = relationship("Department", back_populates="worker", foreign_keys=[department_id])
    salary = db.relationship("Salary", back_populates="worker")
    role = db.relationship("Role", back_populates="worker")

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
            "sub_date": self.sub_date,
            "salary": self.salary,
            "department": self.department,
            "role": self.role,
            # do not serialize the password, its a security breach
        }


class Department(db.Model):
    __tablename__ = "department_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=True)
    description = db.Column(db.String(800), unique=False, nullable=False)

    boss_id = mapped_column(ForeignKey("worker_table.id"))

    boss = relationship("Worker", foreign_keys=[boss_id])
    worker = relationship('Worker', back_populates='department', foreign_keys="[Worker.department_id]")
    role = db.relationship("Role", back_populates='department')
    offer = db.relationship("Offer")

    def __repr__(self):
        return f'<Department {self.id}>'

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
    offer = db.relationship("Offer")

    def __repr__(self):
        return f'<Role {self.id}>'

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
    offer = db.relationship("Offer")

    def __repr__(self):
        return f'<User {self.id}>'

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

    department_id = mapped_column(ForeignKey("department_table.id"))
    role_id = mapped_column(ForeignKey("role_table.id"))
    salary_id = mapped_column(ForeignKey("salary_table.id"))

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "requirements": self.requirements,
        }