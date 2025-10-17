from ..database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, relationship

class Offer(db.Model):
    __tablename__ = "offers"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=True)
    description = db.Column(db.String(800), nullable=False)
    requirements = db.Column(db.String(800), nullable=False)

    department_id = mapped_column(db.Integer, ForeignKey('departments.id', ondelete='CASCADE'), nullable=False)
    department = relationship("Department", back_populates="offers")



    def __repr__(self):
        return f'<Offer {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "requirements": self.requirements,
        }