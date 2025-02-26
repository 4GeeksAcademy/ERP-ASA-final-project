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
    data = request.get_json()
    print("data")
    print(data)
    if not all(key in data for key in ['name', 'last_name', 'dni', 'address', 'email', 'password', 'birthdate', 'department_id', 'salary_id', 'role_id']):
        return jsonify({"message": "Missing required fields"}), 400
    try:
        new_worker = Worker(
            name = data['name'],
            last_name = data['last_name'],
            dni = data['dni'],
            address = data['address'],
            email = data['email'],
            birthdate = data['birthdate'],
            department_id = data['department_id'],
            salary_id = data['salary_id'],
            role_id = data['role_id'],
        )

        new_worker.set_password(data['password'])
        db.session.add(new_worker)
        print("New Worker:", new_worker)
        db.session.commit()

        return jsonify({"msg": "Worker added successfully", "worker": new_worker.serialize()}), 201
    
    except Exception as err:
        print("err")
        print(err)
        db.session.rollback()
        return jsonify({"msg": "Error adding worker"}), 500
    
@api.route('/worker', methods=['PUT'])
def edit_worker():
    data = request.get_json()
    if not all(key in data for key in ['id', 'name', 'last_name', 'dni', 'address', 'email', 'password', 'birthdate', 'department_id', 'salary_id', 'role_id']):
        return jsonify({"message": "Missing required fields"}), 400
    
    try:
        worker = db.session.execute(select(Worker).filter_by(id=data['id'])).scalar_one()
        
        worker.id = data["id"]
        worker.name = data["name"]
        worker.last_name = data["last_name"]
        worker.dni = data["dni"]
        worker.address = data["address"]
        worker.email = data["email"]
        worker.birthdate = data["birthdate"]
        worker.department_id = data["department_id"]
        worker.salary_id = data["salary_id"]
        worker.role_id = data["role_id"]
        worker.set_password(data['password'])
        db.session.commit()

        return jsonify({"msg": "Worker edit successfully", "worker": worker.serialize()}), 201
    
    except Exception as err:
        print(err)
        db.session.rollback()
        return jsonify({"msg": "Error updating worker"}), 500
    

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