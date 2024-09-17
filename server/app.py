from dotenv import load_dotenv
load_dotenv()
import os
from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Client, Lawyer, Case, LawyerCases,  Representation, Admin
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'  # This is required for session security
db.init_app(app)
migrate = Migrate(app, db)

# Home Route
@app.route('/')
def home():
    return "Welcome to the Case Management System!"

# Logout Route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Successfully logged out"}), 200


# For setting up Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Used to load user from database
@login_manager.user_loader
def load_user(user_id):
    if Admin.query.get(user_id):
        return Admin.query.get(user_id)
    return Lawyer.query.get(user_id)

class ClientResource(Resource):
    def get(self):
        clients = Client.query.all()
        return jsonify([client.to_dict() for client in clients])

    def post(self):
        data = request.get_json()
        new_client = Client(name=data['name'], phone_no=data['phone_no'], email=data['email'])
        db.session.add(new_client)
        db.session.commit()
        return jsonify(new_client.to_dict()), 201

class ClientDetailResource(Resource):
    def get(self, id):
        client = Client.query.get(id)
        if client:
            return jsonify(client.to_dict())
        return make_response(jsonify({"error": "Client not found"}), 404)

    def delete(self, id):
        client = Client.query.get(id)
        if client:
            db.session.delete(client)
            db.session.commit()
            return make_response(jsonify({"message": "Client successfully deleted"}), 200)
        return make_response(jsonify({"error": "Client not found"}), 404)

class LawyerResource(Resource):
    def get(self):
        lawyers = Lawyer.query.all()
        return jsonify([lawyer.to_dict() for lawyer in lawyers])

    def post(self):
        data = request.get_json()
        new_lawyer = Lawyer(name=data['name'], email=data['email'], specialization=data['specialization'])
        db.session.add(new_lawyer)
        db.session.commit()
        return jsonify(new_lawyer.to_dict()), 201

class LawyerDetailResource(Resource):
    def get(self, id):
        lawyer = Lawyer.query.get(id)
        if lawyer:
            return jsonify(lawyer.to_dict())
        return make_response(jsonify({"error": "Lawyer not found"}), 404)

    def delete(self, id):
        lawyer = Lawyer.query.get(id)
        if lawyer:
            db.session.delete(lawyer)
            db.session.commit()
            return make_response(jsonify({"message": "Lawyer successfully deleted"}), 200)
        return make_response(jsonify({"error": "Lawyer not found"}), 404)

class CaseResource(Resource):
    def get(self):
        cases = Case.query.all()
        return jsonify([case.to_dict() for case in cases])

    def post(self):
        data = request.get_json()
        new_case = Case(
            title=data['title'],
            client_id=data['client_id'],
            status=data.get('status', 'Open'),
            date_opened=data.get('date_opened', datetime.utcnow())
        )
        db.session.add(new_case)
        db.session.commit()
        return jsonify(new_case.to_dict()), 201

class CaseDetailResource(Resource):
    def get(self, id):
        case = Case.query.get(id)
        if case:
            return jsonify(case.to_dict())
        return make_response(jsonify({"error": "Case not found"}), 404)

    def delete(self, id):
        case = Case.query.get(id)
        if case:
            db.session.delete(case)
            db.session.commit()
            return make_response(jsonify({"message": "Case successfully deleted"}), 200)
        return make_response(jsonify({"error": "Case not found"}), 404)

    def patch(self, id):
        case = Case.query.get(id)
        if case:
            data = request.get_json()
            case.title = data.get('title', case.title)
            case.status = data.get('status', case.status)
            db.session.commit()
            return jsonify(case.to_dict()), 200
        return make_response(jsonify({"error": "Case not found"}), 404)

class AssignLawyerResource(Resource):
    def post(self, case_id, lawyer_id):
        case = Case.query.get(case_id)
        lawyer = Lawyer.query.get(lawyer_id)
        if case and lawyer:
            lawyer_case = LawyerCases(lawyer_id=lawyer.id, lawyer_name=lawyer.name, case_id=case.id, case_name=case.title)
            db.session.add(lawyer_case)
            db.session.commit()
            return jsonify(case.to_dict()), 200
        return jsonify({"error": "Case or Lawyer not found"}), 404

class LawyerCasesResource(Resource):
    def get(self):
        lawyer_cases = LawyerCases.query.all()
        return jsonify([lawyer_case.to_dict() for lawyer_case in lawyer_cases])

class RepresentationResource(Resource):
    def get(self):
        representations = Representation.query.all()
        return jsonify([representation.to_dict() for representation in representations])

class SearchResource(Resource):
    def get(self):
        query = request.args.get('q', '')
        clients = Client.query.filter(Client.name.ilike(f'%{query}%')).all()
        lawyers = Lawyer.query.filter(Lawyer.name.ilike(f'%{query}%')).all()
        cases = Case.query.filter(Case.title.ilike(f'%{query}%')).all()
        results = {
            'clients': [{'id': client.id, 'name': client.name} for client in clients],
            'lawyers': [{'id': lawyer.id, 'name': lawyer.name} for lawyer in lawyers],
            'cases': [{'id': case.id, 'title': case.title} for case in cases]
        }
        return jsonify(results)

# Register Resources with Flask-RESTful Api
api.add_resource(ClientResource, '/clients')
api.add_resource(ClientDetailResource, '/clients/<int:id>')
api.add_resource(LawyerResource, '/lawyers')
api.add_resource(LawyerDetailResource, '/lawyers/<int:id>')
api.add_resource(CaseResource, '/cases')
api.add_resource(CaseDetailResource, '/cases/<int:id>')
api.add_resource(AssignLawyerResource, '/cases/<int:case_id>/assign_lawyer/<int:lawyer_id>')
api.add_resource(LawyerCasesResource, '/lawyer_cases')
api.add_resource(RepresentationResource, '/representation')
api.add_resource(SearchResource, '/search')

if __name__ == '__main__':
    app.run(debug=True)