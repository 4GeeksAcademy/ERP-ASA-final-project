from backend.models.database import db
from backend.models.auth import User
from backend.models.auth.password_token import PasswordResetToken


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()

def create_reset_token(user):
    token = PasswordResetToken(user_id=user.id)
    db.session.add(token)
    db.session.commit()
    return token

def get_valid_token(token_str):
    return PasswordResetToken.query.filter_by(token=token_str, used=False).first()

def mark_token_as_used(token):
    token.used = True
    db.session.commit()

def update_user_password(user, new_password_hash):
    user.password_hash = new_password_hash
    db.session.commit()