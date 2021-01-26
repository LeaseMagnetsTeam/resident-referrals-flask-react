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

# TODO: explain tear down
def initialize_db(app, tearDown=False):
    app.app_context().push()
    db.init_app(app)

    # It be really bad if teardown was true on production!
    if tearDown and app.config["DEBUG"]:
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

lead_user = db.Table('lead_user', db.Model.metadata,\
                    db.Column('leads', db.Integer, db.ForeignKey('leads.id')), \
                    db.Column('users', db.Integer, db.ForeignKey('users.id'))
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
    hasLeased = db.Column(db.Boolean, default=False)

    users = db.relationship("User", secondary=lead_user, backref="leads")

    def __init__(self):
        self.followups = ConstantsModel.query.first().followupTemplate

    def __repr__(self):
        return f"<Lead {self.id}>"

class Apartment(db.Model):
    __tablename__ = "apartments"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    aptName = db.Column(db.String(200), default="")
    website = db.Column(db.String(200), default="")
    units = db.Column(db.Integer, default=0)
    propertyType = db.Column(db.String(200), default="")
    websiteType = db.Column(db.String(200), default="")

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
    apartment_id = db.Column(db.Integer, db.ForeignKey(Apartment.id))

    apartment = db.relationship("Apartment")

    def __repr__(self):
        return f"<User {self.id}>"


class Reviews(db.Model):
    '''Table for apartment reviews of staff/maintenance interaction.'''
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    rating = db.Column(db.Float, default=4.0)
    review = db.Column(db.String(500), default="")
    apartment_id = db.Column(db.Integer, db.ForeignKey(Apartment.id))
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    apartment = db.relationship("Apartment")
    user = db.relationship("User")

    def __repr__(self):
        return f"<Reviews {self.id}>"
