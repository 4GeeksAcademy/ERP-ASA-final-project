  
import os
from flask_admin import Admin
from .models import db, Employee, Department, Role, Salary, Offer, User
from flask_admin.contrib.sqla import ModelView
from werkzeug.security import generate_password_hash


class UserView(ModelView):
    column_list = ('id', 'name', 'last_name','email', 'dni', 'address', 'birthdate', 'department_name', 'role_name', 'gross_salary', "image_url")

    column_formatters = {
        'department_name': lambda v, c, m, p: m.department.name if m.department else 'N/A',
        'role_name': lambda v, c, m, p: m.role.name if m.role else 'N/A',
        'gross_salary': lambda v, c, m, p: m.salary.gross_salary if m.salary else 'N/A'
    }
    column_sortable_list = ('id', 'name', 'last_name', 'email', 'dni', 'address', 'birthdate', ('department_name', 'department.name','profile_image_url'), 
                            ('role_name', 'role.name'), ('gross_salary', 'salary.gross_salary'))

    form_args = {
        'department': {
            'query_factory': lambda: Department.query.all(),
            'get_label': 'name'  # Muestra el nombre del departamento en el desplegable
        },
        'role': {
            'query_factory': lambda: Role.query.all(),
            'get_label': 'name'  # Muestra el nombre del rol
        },
        'salary': {
            'query_factory': lambda: Salary.query.all(),
            'get_label': 'gross_salary'  # Muestra el salario bruto
        }
    }
    def on_model_change(self, form, model, is_created):
        """Se ejecuta antes de guardar un nuevo usuario o actualizar uno existente"""
        if model.password_hash and not model.password_hash.startswith('scrypt'):
            model.password_hash = generate_password_hash(model.password_hash)


class EmployeeView(ModelView):
    column_list = ('id', 'name', 'last_name','email', 'dni', 'address', 'birthdate', 'department_name', 'role_name', 'gross_salary', "image_url")

    column_formatters = {
        'department_name': lambda v, c, m, p: m.department.name if m.department else 'N/A',
        'role_name': lambda v, c, m, p: m.role.name if m.role else 'N/A',
        'gross_salary': lambda v, c, m, p: m.salary.gross_salary if m.salary else 'N/A'
    }
    column_sortable_list = ('id', 'name', 'last_name', 'email', 'dni', 'address', 'birthdate', ('department_name', 'department.name','profile_image_url'), 
                            ('role_name', 'role.name'), ('gross_salary', 'salary.gross_salary'))

    form_args = {
        'department': {
            'query_factory': lambda: Department.query.all(),
            'get_label': 'name'  # Muestra el nombre del departamento en el desplegable
        },
        'role': {
            'query_factory': lambda: Role.query.all(),
            'get_label': 'name'  # Muestra el nombre del rol
        },
        'salary': {
            'query_factory': lambda: Salary.query.all(),
            'get_label': 'gross_salary'  # Muestra el salario bruto
        }
    }

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(EmployeeView(Employee, db.session))
    admin.add_view(ModelView(Department, db.session))
    admin.add_view(ModelView(Role, db.session))
    admin.add_view(ModelView(Salary, db.session))
    admin.add_view(ModelView(Offer, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))