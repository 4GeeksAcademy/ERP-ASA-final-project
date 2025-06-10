  
import os
from .models.database import db
from flask_admin import Admin
from .models import Employee, Department, Salary, Offer, User
from flask_admin.contrib.sqla import ModelView
from werkzeug.security import generate_password_hash
from wtforms.fields import PasswordField



#userview de chatgpt:
class UserView(ModelView):
    column_list = ('id', 'email', 'profile_image_url', 'employee')
    column_sortable_list = ('id', 'email', 'profile_image_url', 'employee')

    form_extra_fields = {
        "password": PasswordField("Password")
    }

    def on_model_change(self, form, model, is_created):
        if form.password.data:
            model.password = form.password.data  # esto usará el setter del modelo

# class UserView(ModelView):
#     column_list = ('id', 'email', 'profile_image_url','employee')

#     column_sortable_list = ('id', 'email', 'profile_image_url', 'employee')

#     def on_model_change(self, form, model, is_created):
#         """Se ejecuta antes de guardar un nuevo usuario o actualizar uno existente"""
#         if model.password_hash and not model.password_hash.startswith('scrypt'):
#             model.password_hash = generate_password_hash(model.password_hash)


class EmployeeView(ModelView):
    column_list = (
        'id', 'name', 'last_name','email', 'dni', 'address', 'birthdate', 
        'department_name', 'gross_salary','user_email', 'image_url'
    )
    # column_formatters = {
    #     'department_name': lambda m: m.department.name if m.department else 'N/A',
    #     'gross_salary': lambda m: m.salary.gross_salary if m.salary else 'N/A',
    # }
    column_sortable_list = ('id', 'name', 'last_name', 'email', 'dni', 'address', 'birthdate', 'user_email', ('department_name', 'department.name'), 
                           ('gross_salary', 'salary.gross_salary'))

    form_args = {
        'department': {
            'query_factory': lambda: Department.query.all(),
            'get_label': 'name'  # Muestra el nombre del departamento en el desplegable
        },
        'salary': {
            'query_factory': lambda: Salary.query.all(),
            'get_label': 'gross_salary'  # Muestra el salario bruto
        }
    }

    form_ajax_refs = {
        'user': {
            'fields': ('email',),
            'page_size': 10
        }
    }

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    # admin.add_view(EmployeeView(Employee, db.session))
    admin.add_view(EmployeeView(Employee, db.session, name="Empleados"))
    admin.add_view(UserView(User, db.session))
    admin.add_view(ModelView(Department, db.session))
    admin.add_view(ModelView(Salary, db.session))
    admin.add_view(ModelView(Offer, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))