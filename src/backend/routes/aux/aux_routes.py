from backend.extensions import cloudinary
from backend.models.rrhh import Employee
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from backend import db
from backend.controllers.aux_controller import AuxController

aux_api = Blueprint('aux_api', __name__)

@aux_api.route('/upload_image', methods=['POST'])
def upload_image():
    user_id = get_jwt_identity()
    employee = Employee.query.get(user_id)

    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    result = cloudinary.uploader.upload(file)

    employee.profile_image_url = result['secure_url']
    db.session.commit()

    return jsonify({"message": "Image uploaded successfully", "image_url": employee.profile_image_url})



# @aux_api.route('/upload_image', methods=['POST'])
# def upload_image():
#     user_id = get_jwt_identity()
#     employee = Employee.query.get(user_id)

#     if not employee:
#         return jsonify({"error": "Employee not found"}), 404

#     if 'file' not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files['file']
#     result = cloudinary.uploader.upload(file)

#     employee.profile_image_url = result['secure_url']
#     db.session.commit()

#     return jsonify({"message": "Image uploaded successfully", "image_url": employee.profile_image_url})
