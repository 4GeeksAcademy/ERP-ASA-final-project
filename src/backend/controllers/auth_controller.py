from flask import request, jsonify
from backend.services import auth_service

def login_user(request):
    try:
        email = request.json.get("email")
        password = request.json.get("password")
        print("auth controller email:" + email + "password: " + password)
        return auth_service.authenticate_user(email, password)
    except Exception as err:
        print(err)
        return jsonify({"msg": "You should sign up, pero, email:" + email + "password:" + password}), 401

def forgot_password():
    data = request.get_json()
    email = data.get("email")

    success, message = auth_service.request_password_reset(email)
    status_code = 200 if success else 400
    return jsonify({"message": message}), status_code

def reset_password():
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("new_password")

    success, message = auth_service.reset_password(token, new_password)
    status_code = 200 if success else 400
    return jsonify({"message": message}), status_code