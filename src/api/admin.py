  
import os
from flask_admin import Admin
from .models import db, Worker, Department, Role, Salary, Offer
from flask_admin.contrib.sqla import ModelView


class WorkerView(ModelView):
    column_list = ('id', 'name', 'last_name','email', 'dni', 'address', 'department_name', 'role_name', 'gross_salary')

    column_formatters = {
        'department_name': lambda v, c, m, p: m.department.name if m.department else 'N/A',
        'role_name': lambda v, c, m, p: m.role.name if m.role else 'N/A',
        'gross_salary': lambda v, c, m, p: m.salary.gross_salary if m.salary else 'N/A'
    }
    column_sortable_list = ('id', 'name', 'last_name', 'dni', ('department_name', 'department.name'), 
                            ('role_name', 'role.name'), ('gross_salary', 'salary.gross_salary'))

    # form_excluded_columns = ('password',)

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(WorkerView(Worker, db.session))
    admin.add_view(ModelView(Department, db.session))
    admin.add_view(ModelView(Role, db.session))
    admin.add_view(ModelView(Salary, db.session))
    admin.add_view(ModelView(Offer, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))