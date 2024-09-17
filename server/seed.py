from app import app, db
from models import Client, Lawyer, Case, LawyerCases, Representation
from faker import Faker
import random

fake = Faker()

def seed_clients(n=10):
    clients = []
    for _ in range(n):
        client = Client(
            name=fake.name(),
            phone_no=fake.phone_number(),
            email=fake.unique.email()
        )
        db.session.add(client)
        clients.append(client)
    db.session.commit()
    return clients

def seed_lawyers(n=5):
    specializations = ["Criminal Law", "Corporate Law", "Family Law", "Intellectual Property", "Tax Law"]
    lawyers = []
    for _ in range(n):
        lawyer = Lawyer(
            name=fake.name(),
            email=fake.unique.email(),
            specialization=random.choice(specializations)
        )
        db.session.add(lawyer)
        lawyers.append(lawyer)
    db.session.commit()
    return lawyers

def seed_cases(clients, lawyers, n=15):
    statuses = ["Open", "Closed", "Pending"]
    for _ in range(n):
        client = random.choice(clients)
        case_title = f"Case: {fake.catch_phrase()}"
        new_case = Case(
            title=case_title,
            client_id=client.id,
            status=random.choice(statuses),
            date_opened=fake.date_this_year(),
            date_closed=fake.date_this_year() if random.choice([True, False]) else None
        )
        db.session.add(new_case)
        db.session.commit()
        
        selected_lawyers = random.sample(lawyers, random.randint(1, 3))
        for lawyer in selected_lawyers:
            lawyer_case = LawyerCases(
                lawyer_id=lawyer.id,
                lawyer_name=lawyer.name,
                case_id=new_case.id,
                case_name=new_case.title
            )
            db.session.add(lawyer_case)

            representation = Representation(
                client_id=client.id,
                client_name=client.name,
                lawyer_id=lawyer.id,
                lawyer_name=lawyer.name
            )
            db.session.add(representation)

        db.session.commit()

def seed_all():
    with app.app_context():
        db.drop_all()
        db.create_all()

        clients = seed_clients(10)
        lawyers = seed_lawyers(5)
        seed_cases(clients, lawyers, 15)

if __name__ == "__main__":
    seed_all()
    print("Database seeded!")
