from flask import jsonify
from datetime import timedelta, datetime
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token
from backend.repositories import user_repository
from backend.utils.email_utils import send_reset_email
from backend.models import db


def authenticate_user(email, password):
    print(f"[DEBUG] (service) Email recibido: {email}")

    user = user_repository.get_user_by_email(email)
    if user:
        print("[DEBUG] Usuario encontrado")
        if user.check_password(password):
            print("[DEBUG] Contraseña válida")
            access_token = create_access_token(
                identity=email,
                additional_claims={
                    "employee_id": user.employee.id,
                    "name": user.employee.name,
                    "email": user.email,
                    "department": user.employee.department.name if user.employee.department else None
                },
                expires_delta=timedelta(hours=1)
            )
            employee_data = user.employee.serialize()
            return jsonify({
                "access_token": access_token,
                "employee": employee_data
            }), 200
        else:
            print("[DEBUG] Contraseña inválida")
    else:
        print("[DEBUG] No se encontró usuario con el email")
        return "no se ha encontrado el usuario"

    # return jsonify({"msg": "Bad email or password (service)"}), 401
    return True

def request_password_reset(email):
    user = user_repository.get_user_by_email(email)
    if not user:
        return False, "User not found"

    token = user_repository.create_reset_token(user)

    reset_link = f"https://fuzzy-umbrella-7jq56p5r57qhp7g9-3000.app.github.dev/reset-password/{token.token}"
    send_reset_email(
        user,
        reset_link
    )

    return True, "Reset email sent"

def reset_password(token_str, new_password):
    token = user_repository.get_valid_token(token_str)
    if not token:
        return False, "Invalid or already used token"

    if token.expires_at < datetime.utcnow():
        return False, "Token expired"

    user = token.user
    hashed_password = generate_password_hash(new_password)
    user_repository.update_user_password(user, hashed_password)
    user_repository.mark_token_as_used(token)

    return True, "Password updated successfully"

