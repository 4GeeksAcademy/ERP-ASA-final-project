from backend.repositories.aux_repository import AuxRepository
import cloudinary, cloudinary.uploader
import time, hashlib, os

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
    
    @staticmethod
    def upload_to_cloudinary(file):
        timestamp = int(time.time())
        api_secret = os.getenv("CLOUDINARY_API_SECRET")
        api_key = os.getenv("CLOUDINARY_API_KEY")
        cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")

        public_id = f"employee_{timestamp}"
        params = {
            "timestamp": timestamp,
            "public_id": public_id
        }

        # Firma
        signature_str = f"public_id={public_id}&timestamp={timestamp}{api_secret}"
        signature = hashlib.sha1(signature_str.encode("utf-8")).hexdigest()

        response = cloudinary.uploader.upload(
            file,
            api_key=api_key,
            api_secret=api_secret,
            cloud_name=cloud_name,
            timestamp=timestamp,
            public_id=public_id,
            signature=signature
        )
        return response["secure_url"]