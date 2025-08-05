from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.controllers.auth_controller import login_user, handle_reset_password, handle_reset_password_request

auth_api = Blueprint("auth_api", __name__)

@auth_api.route("/login", methods=["POST"])
def login():
    return login_user(request)

@auth_api.route("/reset-password/<token>", methods=["POST"])
@jwt_required()
def reset_password(token):
    identity = get_jwt_identity()
    return handle_reset_password(request, identity, token)

@auth_api.route("/reset-password-request", methods=["POST"])
def reset_password_request():
    return handle_reset_password_request(request)

# # from flask import Blueprint, jsonify, request, url_for
# # from datetime import timedelta
# # from backend.models.auth import User
# # from backend.models import db
# # from backend.extensions import mail
# # from sqlalchemy import select
# # from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
# # from flas_mail import Message

# # auth_api = Blueprint('auth_api', __name__)

# # @auth_api.route("/login", methods=["POST"])
# # def login():
# #     try:
# #         email = request.json.get("email", None)
# #         password = request.json.get("password", None)
# #         user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()

# #         if user and user.check_password(password):
# #             access_token = create_access_token(identity=email, additional_claims={
# #                 "name": user.name,
# #                 "email": user.email,
# #                 "department": user.department.name if user.department else None
# #             },expires_delta=timedelta(hours = 1))
# #             return jsonify(access_token=access_token)
        

# #         return jsonify({"msg": "Bad email or password"}), 401

# #     except Exception as err:
# #         print(err)
# #         return jsonify({"msg": "You should sign up"}), 401
    



# # @auth_api.route("/reset-password/<token>", methods=["POST"])
# # @jwt_required()
# # def reset_password(token):
# #     try:
# #         print(token)
# #         email = get_jwt_identity()  
# #         print(email)

# #         if not email:
# #             return jsonify({"msg": "Invalid token."}), 400

# #         user = User.query.filter_by(email=email).first()
# #         if not user:
# #             return jsonify({"msg": "User not found"}), 404

# #         new_password = request.json.get('password')
# #         if not new_password:
# #             return jsonify({"msg": "Password is required"}), 400
        
# #         user.set_password(new_password)
# #         db.session.commit()

# #         return jsonify({"msg": "Password has been reset successfully"}), 200

# #     except Exception as e:
# #         return jsonify({"msg": "An error occurred", "error": str(e)}), 500


# # def send_reset_email(user, url):
# #     try:
# #         token = user.get_reset_token()

# #         reset_url = url_for('api.reset_password', token=token, _external=False)

# #         url_formatted = reset_url.replace(".", "-")

# #         msg = Message(
# #             'Recuperación de contraseña',  
# #             recipients=[user.email],  
# #             charset='utf-8'  
# #         )
        
# #         msg.body = f'Para restablecer tu contraseña, sigue este enlace: {url}{url_formatted}'
        
# #         msg.body = msg.body.encode('utf-8').decode('utf-8')
        
# #         mail.send(msg)
# #         print("Correo enviado correctamente")
    
# #     except Exception as e:
# #         print(f"Error al enviar el correo: {e}")




# # @auth_api.route('/reset-password-request', methods=['POST'])
# # def reset_password_request():
# #     email = request.json.get('email')
# #     url = request.json.get('url')
    
# #     user = User.query.filter_by(email=email).first()
    
# #     if not user:
# #         return jsonify({"message": "El correo no está registrado"}), 404

# #     reset_token = create_access_token(
# #         identity=email,
# #         expires_delta=timedelta(hours=1)
# #     )

# #     send_reset_email(user, url)
    
# #     print(f"Token generado: {reset_token}")

# #     return jsonify({"message": "Se ha enviado el correo de restablecimiento de contraseña"}), 200
# # Protect a route with jwt_required, which will kick out requests
# # without a valid JWT present.
# @auth_api.route("/profile", methods=["GET"])
# @jwt_required()
# def get_profile():
#     # Access the identity of the current user with get_jwt_identity
#     email = get_jwt_identity()
#     profile = db.session.execute(db.select(User).filter_by(email=email)).scalar_one().serialize()
#     return jsonify(profile), 200

# @auth_api.route('/departments', methods=['GET'])
# def get_departments():
#     departments = Department.query.all()
#     return jsonify([dept.serialize() for dept in departments]), 200

# @auth_api.route('/salaries', methods=['GET'])
# def get_salaries():
#     salaries = Salary.query.all()
#     return jsonify([salary.serialize() for salary in salaries]), 200