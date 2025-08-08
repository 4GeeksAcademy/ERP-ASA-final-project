from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt
from backend.controllers.employee_controller import EmployeeController

employee_api = Blueprint('employee_api', __name__)

@employee_api.route('/', methods=['GET'])
@jwt_required()
def get_all_employees():
    return EmployeeController.get_all()

@employee_api.route('/<int:employee_id>', methods=['GET'])
@jwt_required()
def get_employee_by_id(employee_id):
    return EmployeeController.get_one(employee_id)

@employee_api.route('/', methods=['POST'])
@jwt_required()
def create_employee():
    claims = get_jwt()
    department = claims.get("department", None)

    if department != "RRHH":
        return {"error": "Acceso denegado. Solo RRHH puede realizar esta acción."}, 403

    return EmployeeController.create_employee(request)

@employee_api.route('/department', methods=['GET'])
def get_all_departments():
    return EmployeeController.get_all_departments()

@employee_api.route('/salary', methods=['GET'])
def get_all_salaries():
    return EmployeeController.get_all_salaries()

@employee_api.route("/<int:employee_id>", methods=["PUT"])
@jwt_required()
def update_employee(id):
    return EmployeeController.update_employee_controller(id, request)

# # @employee_api.route('employees', methods=['GET'])
# # def get_employees():
# #     try:
# #         data = db.session.scalars(select(Employee)).all()
# #         results = list(map(lambda item: item.serialize(), data))
        
# #         response_body = {
# #             "results": results
# #         }

# #         return jsonify(response_body), 200
    
# #     except Exception  as err:
# #         print(err)
# #         return "An error has occurred", 400
    
# # @employee_api.route('employee/<int:id>', methods=['GET'])
# # def get_employee():
# #     try:
# #         data = db.session.scalars(select(Employee)).all()
# #         results = list(map(lambda item: item.serialize(), data))
        
# #         response_body = {
# #             "results": results
# #         }

# #         return jsonify(response_body), 200
    
# #     except Exception  as err:
# #         print(err)
# #         return "An error has occurred", 400
    
# # @employee_api.route('/new_employee', methods=['POST'])
# # def add_employee():
# #     try:
# #         data = request.form  # Usamos request.form en lugar de request.get_json()
# #         file = request.files.get('profile_image_url')  # Obtener el archivo de imagen

# #         if not all(key in data for key in ['name', 'last_name', 'dni', 'address', 'email', 'password', 'birthdate', 'department_id', 'salary_id']):
# #             return jsonify({"message": "Missing required fields"}), 400

# #         image_url = None
        
# #         # Subir imagen a Cloudinary si se proporciona
# #         if file:
# #             print(file)
# #             try:
# #                 upload_result = cloudinary.uploader.upload(file)
# #                 print("Cloudinary response:", upload_result)
# #                 image_url = upload_result.get("secure_url")
# #             except Exception as e:
# #                 print("Cloudinary upload error:", str(e))
# #                 return jsonify({"msg": "Error uploading image", "error": str(e)}), 500
# #         else:
# #             print("no file")
# #             image_url = None
# #         print("Final image_url before saving:", image_url) 
# #         new_employee = Employee(
# #             name=data['name'],
# #             last_name=data['last_name'],
# #             dni=data['dni'],
# #             address=data['address'],
# #             email=data['email'],
# #             birthdate=data['birthdate'],
# #             department_id=data['department_id'],
# #             salary_id=data['salary_id'],
# #             profile_image_url=image_url  # Guardar la URL de la imagen
# #         )
         
# #         new_employee.set_password(data['password'])
# #         db.session.add(new_employee)
# #         db.session.commit()

# #         return jsonify({"msg": "Employee added successfully", "employee": new_employee.serialize()}), 201

# #     except Exception as err:
# #         db.session.rollback()
# #         print("Error adding employee:", str(err))  # Agrega este print para ver el error
# #         return jsonify({"msg": "Error adding employee", "error": str(err)}), 500

# # @employee_api.route('/edit_employee/<int:id>', methods=['PUT'])
# # def edit_employee():
# #     data = request.form  # Recibir datos del formulario
# #     file = request.files.get('profile_image')  # Recibir la imagen correctamente
    
# #     # Validar datos obligatorios
# #     required_fields = ['id', 'name', 'last_name', 'dni', 'address', 'email', 'password', 'birthdate', 'department_id', 'salary_id']
# #     if not all(key in data for key in required_fields):
# #         return jsonify({"message": "Missing required fields"}), 400

# #     # Subir imagen a Cloudinary si se proporciona
# #     image_url = None
# #     if file:
# #         try:
# #             upload_result = cloudinary.uploader.upload(file)
# #             image_url = upload_result.get("secure_url")
# #         except Exception as e:
# #             print("Cloudinary upload error:", str(e))
# #             return jsonify({"msg": "Error uploading image", "error": str(e)}), 500

# #     try:
# #         # Buscar el trabajador por ID
# #         employee = db.session.execute(select(Employee).filter_by(id=int(data['id']))).scalar_one()
        
# #         employee.name = data["name"]
# #         employee.last_name = data["last_name"]
# #         employee.dni = data["dni"]
# #         employee.address = data["address"]
# #         employee.email = data["email"]
# #         employee.birthdate = data["birthdate"]
# #         employee.department_id = int(data["department_id"])
# #         employee.salary_id = int(data["salary_id"])
# #         employee.set_password(data['password'])

# #         # Solo actualizar la imagen si se subió una nueva
# #         if image_url:
# #             employee.profile_image_url = image_url

# #         db.session.commit()

# #         return jsonify({"msg": "Employee edited successfully", "employee": employee.serialize()}), 200
    
# #     except Exception as err:
# #         print("Error updating employee:", err)
# #         db.session.rollback()
# #         return jsonify({"msg": "Error updating employee"}), 500


# # @employee_api.route('/employees/<int:id>', methods=['DELETE'])
# # def delete_employee(id):
# #     try:
# #         employee = db.session.execute(select(Employee).filter_by(id=id)).scalar_one()

# #         db.session.delete(employee)
# #         db.session.commit()

# #         data = db.session.scalars(select(Employee)).all()
# #         results = list(map(lambda item: item.serialize(), data))
# #         print(results)
        
# #         response_body = {
# #             "msg": "Employee deleted",
# #             "results": results
# #         }

# #         return jsonify(response_body), 200
    
# #     except Exception as err:
# #         print(err)
# #         return "An error has occurred", 400
