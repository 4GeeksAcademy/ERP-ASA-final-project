from flask import jsonify
from backend.services.auth_service import (
    authenticate_user,
    reset_user_password,
    process_password_reset_request
)

def login_user(request):
    try:
        email = request.json.get("email")
        password = request.json.get("password")
        print("auth controller email:" + email + "password: " + password)
        return authenticate_user(email, password)
    except Exception as err:
        print(err)
        return jsonify({"msg": "You should sign up, pero, email:" + email + "password:" + password}), 401

def handle_reset_password(request, identity, token):
    try:
        new_password = request.json.get("password")
        return reset_user_password(identity, new_password)
    except Exception as err:
        return jsonify({"msg": "An error occurred", "error": str(err)}), 500

def handle_reset_password_request(request):
    try:
        email = request.json.get("email")
        url = request.json.get("url")
        return process_password_reset_request(email, url)
    except Exception as err:
        return jsonify({"msg": "Error", "error": str(err)}), 500