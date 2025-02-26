"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import Worker, Department, Role, Salary, Offer
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_admin import Admin
from datetime import datetime, timedelta
import cloudinary.uploader

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/employees', methods=['GET'])
def get_employees():
    try:
        data = db.session.scalars(select(Worker)).all()
        results = list(map(lambda item: item.serialize(), data))
        
        response_body = {
            "results": results
        }

        return jsonify(response_body), 200
    
    except Exception  as err:
        print(err)
        return "An error has occurred", 400

@api.route('/worker', methods=['POST'])
def add_worker():
    try:
        data = request.form  # Usamos request.form en lugar de request.get_json()
        file = request.files.get('profile_image_url')  # Obtener el archivo de imagen

        if not all(key in data for key in ['name', 'last_name', 'dni', 'address', 'email', 'password', 'birthdate', 'department_id', 'salary_id', 'role_id']):
            return jsonify({"message": "Missing required fields"}), 400

        image_url = None 
        
        # Subir imagen a Cloudinary si se proporciona
        if file:
            print(file)
            try:
                upload_result = cloudinary.uploader.upload(file)
                print("Cloudinary response:", upload_result)
                image_url = upload_result.get("secure_url")
            except Exception as e:
                print("Cloudinary upload error:", str(e))
                return jsonify({"msg": "Error uploading image", "error": str(e)}), 500
        else:
            print("no file")
            image_url = None
        print("Final image_url before saving:", image_url) 
        new_worker = Worker(
            name=data['name'],
            last_name=data['last_name'],
            dni=data['dni'],
            address=data['address'],
            email=data['email'],
            birthdate=data['birthdate'],
            department_id=data['department_id'],
            salary_id=data['salary_id'],
            role_id=data['role_id'],
            profile_image_url=image_url  # Guardar la URL de la imagen
        )
         
        new_worker.set_password(data['password'])
        db.session.add(new_worker)
        db.session.commit()

        return jsonify({"msg": "Worker added successfully", "worker": new_worker.serialize()}), 201

    except Exception as err:
        db.session.rollback()
        print("Error adding worker:", str(err))  # Agrega este print para ver el error
        return jsonify({"msg": "Error adding worker", "error": str(err)}), 500

@api.route('/worker', methods=['PUT'])
def edit_worker():
    data = request.form  # Recibir datos del formulario
    file = request.files.get('profile_image')  # Recibir la imagen correctamente
    
    # Validar datos obligatorios
    required_fields = ['id', 'name', 'last_name', 'dni', 'address', 'email', 'password', 'birthdate', 'department_id', 'salary_id', 'role_id']
    if not all(key in data for key in required_fields):
        return jsonify({"message": "Missing required fields"}), 400

    # Subir imagen a Cloudinary si se proporciona
    image_url = None
    if file:
        try:
            upload_result = cloudinary.uploader.upload(file)
            image_url = upload_result.get("secure_url")
        except Exception as e:
            print("Cloudinary upload error:", str(e))
            return jsonify({"msg": "Error uploading image", "error": str(e)}), 500

    try:
        # Buscar el trabajador por ID
        worker = db.session.execute(select(Worker).filter_by(id=int(data['id']))).scalar_one()
        
        worker.name = data["name"]
        worker.last_name = data["last_name"]
        worker.dni = data["dni"]
        worker.address = data["address"]
        worker.email = data["email"]
        worker.birthdate = data["birthdate"]
        worker.department_id = int(data["department_id"])
        worker.salary_id = int(data["salary_id"])
        worker.role_id = int(data["role_id"])
        worker.set_password(data['password'])

        # Solo actualizar la imagen si se subió una nueva
        if image_url:
            worker.profile_image_url = image_url

        db.session.commit()

        return jsonify({"msg": "Worker edited successfully", "worker": worker.serialize()}), 200
    
    except Exception as err:
        print("Error updating worker:", err)
        db.session.rollback()
        return jsonify({"msg": "Error updating worker"}), 500

# @api.route('/worker', methods=['PUT'])
# def edit_worker():
#     data = request.form
#     file = request.files.get('profile_image_url') 
    
#     if not all(key in data for key in ['id', 'name', 'last_name', 'dni', 'address', 'email', 'password', 'birthdate', 'department_id', 'salary_id', 'role_id']):
#         return jsonify({"message": "Missing required fields"}), 400
    
#     image_url = None  
        
#     # Subir imagen a Cloudinary si se proporciona
#     if file:
#         print(file)
#         try:
#             upload_result = cloudinary.uploader.upload(file)
#             print("Cloudinary response edit:", upload_result)
#             image_url = upload_result.get("secure_url")
#         except Exception as e:
#             print("Cloudinary upload error:", str(e))
#             return jsonify({"msg": "Error uploading image", "error": str(e)}), 500
#     else:
#         print("no file")
#         image_url = None
    
#     try:
#         worker = db.session.execute(select(Worker).filter_by(id=data['id'])).scalar_one()
        
#         worker.id = data["id"]
#         worker.name = data["name"]
#         worker.last_name = data["last_name"]
#         worker.dni = data["dni"]
#         worker.address = data["address"]
#         worker.email = data["email"]
#         worker.birthdate = data["birthdate"]
#         worker.department_id = data["department_id"]
#         worker.salary_id = data["salary_id"]
#         worker.role_id = data["role_id"]
#         worker.set_password(data['password'])
#         worker.profile_image_url = image_url
#         db.session.commit()

#         return jsonify({"msg": "Worker edit successfully", "worker": worker.serialize()}), 201
    
#     except Exception as err:
#         print(err)
#         db.session.rollback()
#         return jsonify({"msg": "Error updating worker"}), 500
    

@api.route('/employees/<int:id>', methods=['DELETE'])
def delete_worker(id):
    try:
        worker = db.session.execute(select(Worker).filter_by(id=id)).scalar_one()

        db.session.delete(worker)
        db.session.commit()

        data = db.session.scalars(select(Worker)).all()
        results = list(map(lambda item: item.serialize(), data))
        print(results)
        
        response_body = {
            "msg": "Worker deleted",
            "results": results
        }

        return jsonify(response_body), 200
    
    except Exception as err:
        print(err)
        return "An error has occurred", 400

    
@api.route('/offer', methods=['POST'])
def add_offer():
    data = request.get_json()
    if not all(key in data for key in ['title', 'description', 'requirements']):
        return jsonify({"message": "Missing required fields"}), 400
    try:
        new_offer = Offer(
            title = data['title'],
            description = data['description'],
            requirements = data['requirements']
        )

        db.session.add(new_offer)
        db.session.commit()

        return jsonify({"msg": "Offer added successfully", "offer": new_offer.serialize()}), 201
    
    except Exception:
        db.session.rollback()
        return jsonify({"msg": "Error adding offer"}), 500
    

@api.route("/login", methods=["POST"])
def login():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        user = db.session.execute(db.select(Worker).filter_by(email=email)).scalar_one()

        if user and user.check_password(password):
            access_token = create_access_token(identity=email, additional_claims={
                "name": user.name,
                "email": user.email,
                "department": user.department.name if user.department else None
            },expires_delta=timedelta(hours = 1))
            return jsonify(access_token=access_token)
        

        return jsonify({"msg": "Bad email or password"}), 401

    except Exception as err:
        print(err)
        return jsonify({"msg": "You should sign up"}), 401
    

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    email = get_jwt_identity()
    profile = db.session.execute(db.select(Worker).filter_by(email=email)).scalar_one().serialize()
    return jsonify(profile), 200

@api.route('/departments', methods=['GET'])
def get_departments():
    departments = Department.query.all()
    return jsonify([dept.serialize() for dept in departments]), 200

@api.route('/salaries', methods=['GET'])
def get_salaries():
    salaries = Salary.query.all()
    return jsonify([salary.serialize() for salary in salaries]), 200

@api.route('/roles', methods=['GET'])
def get_roles():
    roles = Role.query.all()
    return jsonify([role.serialize() for role in roles]), 200

@api.route('/upload_image', methods=['POST'])
def upload_image():
    user_id = get_jwt_identity()
    worker = Worker.query.get(user_id)

    if not worker:
        return jsonify({"error": "Worker not found"}), 404

    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    result = cloudinary.uploader.upload(file)

    worker.profile_image_url = result['secure_url']
    db.session.commit()

    return jsonify({"message": "Image uploaded successfully", "image_url": worker.profile_image_url})