from backend.models import db, User

class AuxRepository:
    @staticmethod
    def get_employee_by_user_id(user_id):
        user = User.query.get(user_id)
        return user.employee if user else None

    @staticmethod
    def update_employee_image(employee, image_url):
        employee.profile_image_url = image_url
        db.session.commit()