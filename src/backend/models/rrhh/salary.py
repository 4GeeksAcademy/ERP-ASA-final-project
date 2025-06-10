from ..database import db
from sqlalchemy.orm import relationship, validates

class Salary(db.Model):
    __tablename__ = "salaries"

    id = db.Column(db.Integer, primary_key=True)
    gross_salary = db.Column(db.Integer, nullable=False)

    employees = relationship("Employee", back_populates="salary")

    @validates('gross_salary')
    def validate_salary(self, key, gross_salary):
        if gross_salary is None or gross_salary <= 0:
            raise ValueError('Salary must be a positive number')
        return gross_salary

    def __repr__(self):
        return str(self.gross_salary)

    def serialize(self):
        return {
            "id": self.id,
            "gross_salary": self.gross_salary,
        }
    def __str__(self):
        return self.gross_salary