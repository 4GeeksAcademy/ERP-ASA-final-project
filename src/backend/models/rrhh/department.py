from ..database import db
from sqlalchemy.orm import relationship

class Department(db.Model):
    __tablename__ = "departments"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(800), nullable=True)

    employees = relationship('Employee', back_populates='department')
    offers = relationship('Offer', back_populates='department')

    def __str__(self):
        return self.name
    
    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }