from ..database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, relationship

class Employee(db.Model):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    profile_image_url = db.Column(db.String(255), nullable=True)
    birthdate = db.Column(db.String(20), nullable=False)

    user_id = mapped_column(db.Integer, ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    user = relationship("User", back_populates="employee", uselist=False)

    department_id = mapped_column(db.Integer, ForeignKey('departments.id'), nullable=False)
    department = relationship("Department", back_populates="employees", uselist=False)

    salary_id = mapped_column(db.Integer, ForeignKey('salaries.id'), nullable=False)
    salary = relationship("Salary", back_populates="employees", uselist=False)

    @property
    def user_email(self):
        return self.user.email if self.user else 'N/A'
    
    @property
    def gross_salary(self):
        return self.salary.gross_salary if self.salary else 'N/A'

    @property
    def department_name(self):
        return self.department.name if self.department else 'N/A'

    def __repr__(self):
        return f'<{self.name}>'

    def __str__(self):
        return self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "dni": self.dni,
            "address": self.address,
            "email": self.email,
            "birthdate": self.birthdate,
            "department": self.department_name,
            "salary": self.gross_salary,
            "user": self.user_email

            # do not serialize the password, its a security breach
        }
    
    