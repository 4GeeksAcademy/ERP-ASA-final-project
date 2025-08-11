from backend.models.rrhh.employee import Employee
from backend.models.rrhh.salary import Salary
from backend.models.rrhh.department import Department
from backend.models import db


class EmployeeRepository:
    @staticmethod
    def get_all():
        return Employee.query.all()

    @staticmethod
    def get_by_id(employee_id):
        print("Se llegó al repository (get_by id)")
        return Employee.query.get(employee_id)
    
    @staticmethod
    def create_employee(form, image_url):
        print("llegamos al repositorio")
        employee = Employee(
            name=form.get("name"),
            last_name=form.get("last_name"),
            dni=form.get("dni"),
            address=form.get("address"),
            email=form.get("email"),
            birthdate=form.get("birthdate"),
            department_id=form.get("department_id"),
            salary_id=form.get("salary_id"),
            profile_image_url=image_url
        )

        db.session.add(employee)
        db.session.commit()

        return employee.serialize()
    
    @staticmethod
    def get_all_departments():
        return Department.query.all()
    
    @staticmethod
    def get_all_salaries():
        return Salary.query.all()
    
    @staticmethod
    def save_employee(employee):
        print("se llegó alrepository")
        db.session.add(employee)
        db.session.commit()