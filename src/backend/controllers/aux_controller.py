from flask import jsonify
from backend.services.aux_service import AuxService

class AuxController:
    @staticmethod
    def upload_image(user_id, request):
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]

        try:
            image_url = AuxService.upload_employee_image(user_id, file)
            return jsonify({"message": "Image uploaded successfully", "image_url": image_url}), 200
        except ValueError as ve:
            return jsonify({"error": str(ve)}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500