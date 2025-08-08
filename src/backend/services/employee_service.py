from backend.repositories.employee_repository import EmployeeRepository
from backend.services.aux_service import AuxService
import cloudinary.uploader
from flask_jwt_extended import get_jwt_identity, get_jwt

class EmployeeService:
    @staticmethod
    def get_all_employees():
        print("se llegó al service")
        employees = EmployeeRepository.get_all()
        return [e.serialize() for e in employees]

    
    @staticmethod
    def get_employee_by_id(employee_id):
        claims = get_jwt()
        email = get_jwt_identity()

        employee = EmployeeRepository.get_by_id(employee_id)
        if not employee:
            return None

        # RRHH puede ver todo
        if claims.get("department") == "RRHH" or claims.get("employee_id") == employee_id:
            return employee.serialize()

        # Otro usuario solo puede ver su propio empleado
        if employee.email == email:
            return employee.serialize()

        raise PermissionError("No autorizado")

    @staticmethod
    def create_employee_with_image(request):
        print("👉 [DEBUG] Entramos en create_employee_with_image")

        form = request.form
        file = request.files.get("profile_image_url")

        # Mostrar contenido recibido
        print("[DEBUG] request.form:", form)
        print("[DEBUG] request.files:", request.files)

        # Validación básica
        required_fields = ["name", "last_name", "dni", "address", "email", "birthdate", "department_id", "salary_id"]
        for field in required_fields:
            if not form.get(field):
                raise ValueError(f"El campo '{field}' es obligatorio.")

        # Subir imagen si se incluye
        image_url = None
        if file and file.filename != "":
            try:
                result = cloudinary.uploader.upload(file)
                image_url = result.get("secure_url")
                print("✅ Imagen subida correctamente: " + image_url)
            except Exception as e:
                print("❌ Error al subir imagen a Cloudinary:", str(e))
                raise RuntimeError("Error al subir imagen")
        else:
            print("⚠️ No se ha recibido archivo válido")

        # Crear empleado
        return EmployeeRepository.create_employee(form, image_url)
    
    @staticmethod
    def get_all_departments():
        departments = EmployeeRepository.get_all_departments()
        return [e.serialize() for e in departments]
    
    @staticmethod
    def get_all_salaries():
        salaries = EmployeeRepository.get_all_salaries()
        return [e.serialize() for e in salaries]
    
    @staticmethod
    def update_employee_service(employee_id, data, file):
        employee = EmployeeRepository.get_by_id(employee_id)
        if not employee:
            raise Exception("Empleado no encontrado")

        # Actualizar campos
        employee.name = data.get("name", employee.name)
        employee.last_name = data.get("last_name", employee.last_name)
        employee.dni = data.get("dni", employee.dni)
        employee.address = data.get("address", employee.address)
        employee.email = data.get("email", employee.email)
        employee.birthdate = data.get("birthdate", employee.birthdate)
        employee.department_id = int(data.get("department_id", employee.department_id))
        employee.salary_id = int(data.get("salary_id", employee.salary_id))

        # Imagen
        if file:
            image_url = AuxService.upload_to_cloudinary(file)
            employee.profile_image_url = image_url

        EmployeeRepository.save_employee(employee)

        return {"msg": "Empleado actualizado", "employee_id": employee.id}