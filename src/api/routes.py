"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import Worker, Department, Role, Salary, Offer
from sqlalchemy import select

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
    
    except Exception  as err:
        print(err)
        return "An error has occurred", 400


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
