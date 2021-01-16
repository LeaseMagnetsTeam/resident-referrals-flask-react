from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from collections import namedtuple

db = SQLAlchemy()

FOLLOWUPS = [
    {
        "title": f"{days} Day Followup" if days != 0 else "Same-Day Followup",
        "days": days,
        "isComplete": False,
    }
    for days in [0, 3, 5, 7, 14, 30]
]


def initialize_db(app, tearDown=False):
    app.app_context().push()
    db.init_app(app)

    if tearDown:
        db.drop_all()
        db.create_all()



class ConstantsModel(db.Model):
    __tablename__ = "constants"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    followupTemplate = db.Column(db.JSON)
    agents = db.Column(db.JSON)

    def __init__(self):
        self.followupTemplate = [
            {
                "title": f"{days} Day Followup" if days != 0 else "Same-Day Followup",
                "days": days,
                "isComplete": False,
            }
            for days in [0, 3, 5, 7, 14, 30]
        ]


class TimestampModel:
    created_on = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_on = db.Column(
        db.DateTime, onupdate=datetime.utcnow, default=datetime.utcnow
    )


class Lead(TimestampModel, db.Model):
    __tablename__ = "leads"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), default="")
    email = db.Column(db.String(200), default="")
    number = db.Column(db.String(50), default="")
    notes = db.Column(db.String(20000), default="")

    leadType = db.Column(db.ARRAY(db.Integer), default=[])
    agent = db.Column(db.Integer, nullable=True, default=None)

    questionAsked = db.Column(db.String(2000), default="")
    tourBookedOn = db.Column(db.String(2000), default="")
    tourBookedFor = db.Column(db.String(2000), default="")

    followups = db.Column(db.JSON)

    notInterested = db.Column(db.Boolean, default=False)
    hasApplied = db.Column(db.Boolean, default=False)

    def __init__(self):
        self.followups = ConstantsModel.query.first().followupTemplate

    def __repr__(self):
        return f"<Lead {self.id}>"

# Apartments/user models --remove before pushing

class Apartment(db.Model):
    __tablename__ = "apartments"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), default="")

    def __repr__(self):
        return f"<Apartment {self.id}>"


# https://stackoverflow.com/questions/18807322/sqlalchemy-foreign-key-relationship-attributes
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), default="")
    phoneNumber = db.Column(db.String(50), default="")
    email = db.Column(db.String(200), default="")
    role = db.Column(db.String(50), default="") 
    apartment = db.Column(db.Integer, db.ForeignKey(Apartment.id))

    def __repr__(self):
        return f"<User {self.id}>"




