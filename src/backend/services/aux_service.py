from backend.repositories.aux_repository import AuxRepository
import cloudinary

class AuxService:
    @staticmethod
    def upload_employee_image(user_id, file):
        print("cloudinary version: " + cloudinary.__version__)
        employee = AuxRepository.get_employee_by_user_id(user_id)

        if not employee:
            raise ValueError("Employee not found for this user")

        result = cloudinary.uploader.upload(file)
        image_url = result["secure_url"]

        AuxRepository.update_employee_image(employee, image_url)

        return image_url