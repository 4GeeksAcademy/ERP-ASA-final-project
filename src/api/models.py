from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.orm import relationship, mapped_column
# from sqlalchemy import ForeignKey


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user_table"

    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,

            # do not serialize the password, its a security breach
        }

class Worker(db.Model):
    __tablename__ = "worker_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    lastname = db.Column(db.String(80), unique=False, nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    sub_date = db.Column(db.String(20), unique=False, nullable=False)
    salary = db.Column(db.Integer, unique=False, nullable=False)
    # department_id = mapped_column(ForeignKey("department_table.id"))
    # role_id = mapped_column(ForeignKey("role_table.id"))

    def __repr__(self):
        return f'<Worker {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
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
    # worker = relationship("Worker")
    # bossID = db.Column(db.String(800), unique=False, nullable=False)

    def __repr__(self):
        return f'<Department {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            # do not serialize the password, its a security breach
        }

class Role(db.Model):
    __tablename__ = "role_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=True)
    level = db.Column(db.String(800), unique=False, nullable=False)
    # worker = relationship("Worker")
    # department = db.Column(db.String(800), unique=False, nullable=False)

    def __repr__(self):
        return f'<Role {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            # do not serialize the password, its a security breach
        }

class Salary(db.Model):
    __tablename__ = "salary_table"

    id = db.Column(db.Integer, primary_key=True)
    gross_salary = db.Column(db.Integer, unique=False, nullable=True)
    # empleadoID

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "gross_salary": self.gross_salary,
            # do not serialize the password, its a security breach
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
            # do not serialize the password, its a security breach
        }