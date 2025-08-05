from flask import url_for
from backend.extensions import mail
from flask_mail import Message

def send_reset_email(user, base_url):
    try:
        token = user.get_reset_token()
        reset_url = url_for('auth_api.reset_password', token=token, _external=False)
        url_formatted = reset_url.replace(".", "-")

        msg = Message(
            'Recuperación de contraseña',
            recipients=[user.email],
            charset='utf-8'
        )
        msg.body = f'Para restablecer tu contraseña, sigue este enlace: {base_url}{url_formatted}'
        msg.body = msg.body.encode('utf-8').decode('utf-8')
        mail.send(msg)
        print("Correo enviado correctamente")

    except Exception as e:
        print(f"Error al enviar el correo: {e}")