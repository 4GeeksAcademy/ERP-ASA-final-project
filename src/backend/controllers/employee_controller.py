from flask import jsonify
from backend.services.employee_service import EmployeeService
import os

class EmployeeController:
    @staticmethod
    def get_all():
        try:
            data = EmployeeService.get_all_employees()
            return jsonify(data), 200
        except PermissionError as e:
            return jsonify({"msg": str(e)}), 403

    @staticmethod
    def get_one(employee_id):
        try:
            data = EmployeeService.get_employee_by_id(employee_id)
            if not data:
                return jsonify({"msg": "Empleado no encontrado"}), 404
            return jsonify(data), 200
        except PermissionError as e:
            return jsonify({"msg": str(e)}), 403
    
    @staticmethod
    def create_employee(request):
        print("llegamos al controller")
        print("EL FILE EN CONTROLLER: " + str(request.files.get("profile_image_url")))
        try:
            new_employee = EmployeeService.create_employee_with_image(request)
            return jsonify(new_employee), 201
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    @staticmethod
    def get_all_departments():
        try:
            data = EmployeeService.get_all_departments()
            return jsonify(data), 200
        except PermissionError as e:
            return jsonify({"msg": str(e)}), 403
    @staticmethod
    def get_all_salaries():
        try:
            data = EmployeeService.get_all_salaries()
            return jsonify(data), 200
        except PermissionError as e:
            return jsonify({"msg": str(e)}), 403
    @staticmethod
    def update_employee_controller(employee_id, request):
        print("se llego al controller")
        try:
            data = request.form
            file = request.files.get("profile_image_url")  # imagen (si viene)

            result = EmployeeService.update_employee_service(employee_id, data, file)
            return jsonify(result), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def delete_employee_controller(employee_id):
        return EmployeeService.delete_employee_service(employee_id)