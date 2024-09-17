from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin

db = SQLAlchemy()

# Association table for Lawyer-Cases
class LawyerCases(db.Model):
    __tablename__ = 'lawyer_cases'
    lawyer_id = db.Column(db.Integer, db.ForeignKey('lawyers.id'), primary_key=True)
    lawyer_name = db.Column(db.String, nullable=False)
    case_id = db.Column(db.Integer, db.ForeignKey('cases.id'), primary_key=True)
    case_name = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'lawyer_id': self.lawyer_id,
            'lawyer_name': self.lawyer_name,
            'case_id': self.case_id,
            'case_name': self.case_name
        }

# Representation of Lawyers and Clients (many-to-many relationship)

class Representation(db.Model):
    __tablename__ = 'representation'
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    client_name = db.Column(db.String, nullable=False)
    lawyer_id = db.Column(db.Integer, db.ForeignKey('lawyers.id'), nullable=False)
    lawyer_name = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'client_id': self.client_id,
            'client_name': self.client_name,
            'lawyer_id': self.lawyer_id,
            'lawyer_name': self.lawyer_name
        }

# Client Model
class Client(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    phone_no = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    cases = db.relationship('Case', back_populates='client', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone_no": self.phone_no,
            "email": self.email,
            "cases": [case.title for case in self.cases]
        }

# Lawyer Model - inheriting from UserMixin for login management
class Lawyer(UserMixin, db.Model):
    __tablename__ = 'lawyers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    specialization = db.Column(db.String, nullable=True)
    cases = db.relationship('Case', secondary='lawyer_cases', back_populates='lawyers')
    clients = db.relationship('Representation', backref='lawyer')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "specialization": self.specialization,
            "cases": [lawyer_case.case_name for lawyer_case in LawyerCases.query.filter_by(lawyer_id=self.id).all()],
            "clients": [repr.client_name for repr in self.clients]
        }

# Case Model
class Case(db.Model):
    __tablename__ = 'cases'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('Client', back_populates='cases')
    lawyers = db.relationship('Lawyer', secondary='lawyer_cases', back_populates='cases')
    status = db.Column(db.String, default="Open")
    date_opened = db.Column(db.DateTime, default=datetime.utcnow)
    date_closed = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "client_id": self.client_id,
            "client_name": self.client.name if self.client else None,
            "lawyers": [lawyer_case.lawyer_name for lawyer_case in LawyerCases.query.filter_by(case_id=self.id).all()],
            "status": self.status,
            "date_opened": self.date_opened,
            "date_closed": self.date_closed
        }

# Admin Model
class Admin(UserMixin, db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

    def __repr__(self):
        return f'<Admin {self.username}>'
