# models/password_reset_token.py
from backend.models.database import db
import uuid
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy


class PasswordResetToken(db.Model):
    __tablename__ = "password_reset_tokens"

    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(120), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.utcnow() + timedelta(hours=1))
    used = db.Column(db.Boolean, default=False)

    user = db.relationship("User", backref="reset_tokens")