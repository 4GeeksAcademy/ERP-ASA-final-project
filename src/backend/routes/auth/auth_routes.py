from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.controllers import auth_controller

auth_api = Blueprint("auth_api", __name__)

@auth_api.route("/login", methods=["POST"])
def login():
    return auth_controller.login_user(request)

auth_api.route("/forgot_password", methods=["POST"])(auth_controller.forgot_password)
auth_api.route("/reset_password", methods=["POST"])(auth_controller.reset_password)
