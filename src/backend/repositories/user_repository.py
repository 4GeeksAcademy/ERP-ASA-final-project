from backend.models.auth import User

def get_user_by_email(email):
    print("get_user_by_email result: " + str(User.query.filter_by(email=email).first()))
    return User.query.filter_by(email=email).first()