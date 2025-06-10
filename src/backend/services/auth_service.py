from flask import jsonify
from datetime import timedelta
from flask_jwt_extended import create_access_token
from backend.repositories.user_repository import get_user_by_email
from backend.utils.email_utils import send_reset_email
from backend.models import db



#funcion antes de aplicar el debug de chatgpt

# def authenticate_user(email, password):
#     print(f"[DEBUG] Email recibido: {email}")
#     user = get_user_by_email(email)
#     print("Usuario encontrado:", user)
#     print("Contraseña válida:", user.check_password(password))
#     print("Departamento del usuario:", user.department.name if user.department else "Sin departamento")

#     if user and user.check_password(password):
#         access_token = create_access_token(identity=email, additional_claims={
#             "name": user.name,
#             "email": user.email,
#             "department": user.department.name if user.department else None
#         }, expires_delta=timedelta(hours=1))
#         return jsonify(access_token=access_token)

#     return jsonify({"msg": "Bad email or password"}), 401
def authenticate_user(email, password):
    print(f"[DEBUG] (service) Email recibido: {email}")

    user = get_user_by_email(email)
    if user:
        print("[DEBUG] Usuario encontrado")
        if user.check_password(password):
            print("[DEBUG] Contraseña válida")
            access_token = create_access_token(
                identity=email,
                additional_claims={
                    "name": user.employee.name,
                    "email": user.email,
                    "department": user.employee.department.name if user.employee.department else None
                },
                expires_delta=timedelta(hours=1)
            )
            return jsonify(access_token=access_token), 200
        else:
            print("[DEBUG] Contraseña inválida")
    else:
        print("[DEBUG] No se encontró usuario con el email")
        return "no se ha encontrado el usuario"

    # return jsonify({"msg": "Bad email or password (service)"}), 401
    return True


def reset_user_password(email, new_password):
    if not new_password:
        return jsonify({"msg": "Password is required"}), 400

    user = get_user_by_email(email)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user.set_password(new_password)
    db.session.commit()

    return jsonify({"msg": "Password has been reset successfully"}), 200

def process_password_reset_request(email, url):
    user = get_user_by_email(email)
    if not user:
        return jsonify({"message": "El correo no está registrado"}), 404

    token = create_access_token(identity=email, expires_delta=timedelta(hours=1))
    send_reset_email(user, url)
    return jsonify({"message": "Se ha enviado el correo de restablecimiento de contraseña"}), 200
