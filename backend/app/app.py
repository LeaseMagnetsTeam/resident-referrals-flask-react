from flask import Flask, request, jsonify, redirect, render_template
from flask_cors import CORS
from models import db, Lead, User, Apartment, ConstantsModel, initialize_db, Review
from util import request_data
import os
import json
import plivo
from twilio.rest import Client
import config

# Twilio Client
# Kyle fix this please
# client = Client(account_sid, auth_token)

app = Flask(__name__)
# conf = os.environ.get("APP_SETTINGS", "config.StagingConfig")

# if os.environ.get("FLASK_ENV") == "production":
# app.config.from_object(config.ProductionConfig)
# else:
app.config.from_object(config.StagingConfig)

initialize_db(app)
CORS(app, supports_credentials=True)

with open("secrets.json") as f:
    secrets = json.load(f)


@app.before_first_request
def before_first_req():
    db.session.execute("SELECT 1")
    # if not ConstantsModel.query.first():
    #     db.session.add(ConstantsModel())
    #     db.session.commit()


def sqldict(row):
    return {col: getattr(row, col) for col in row.__table__.columns.keys()}


@app.route("/")
def hello_world():
    return "hello world!! :) TYG"


@app.route("/init_db", methods=["GET", "POST"])
def init_db():
    if app.config["DEBUG"]:
        db.drop_all()
        db.create_all()
    return "initialized db"


@app.route("/delete_db", methods=["GET", "POST"])
def delete_db():
    if app.config["DEBUG"]:
        db.drop_all()
    return "deleted db"


@app.route("/followups", methods=["GET", "POST"])
def followups():
    """
        Get all leads with regards to the base lead obj
        To see how you can post multiple leads at a time, go here: https://pastebin.com/PEV8H5kf
    """
    x = ConstantsModel.query.first()

    if request.method == "POST":
        body = request_data()
        if "followupTemplate" in body:
            x.followupTemplate = body["followupTemplate"]
        db.session.commit()

    return jsonify(followupTemplate=x.followupTemplate)


@app.route("/leads", methods=["GET"])
def leads():
    """
        Get all leads with regards to the base lead obj
        To see how you can post multiple leads at a time, go here: https://pastebin.com/PEV8H5kf
    """
    leads = []
    for lead in Lead.query.all():
        leads.append(sqldict(lead))
    print(leads, flush=True)
    return jsonify(leads=leads)


@app.route("/lead", methods=["GET", "POST", "DELETE"])
def experience():
    # search for resume
    lead = Lead.query.filter_by(id=request.args.get("id")).first()
    print(
        "original lead finding: ", lead, not not lead, flush=True,
    )
    if request.method in ("DELETE", "GET") and not lead:
        return jsonify(success=False)

    if request.method == "DELETE":
        db.session.delete(lead)
        db.session.commit()

    elif request.method == "POST":
        # lead = lead or Lead()
        # print(request.get_json(), flush=True)
        # print(request.args, flush=True)
        body = request_data()
        print("body: ", body, flush=True)

        # Check if another lead with the same email

        if "id" in body and lead:
            if body:
                for key in [
                    "name",
                    "email",
                    "number",
                    "notes",
                    "questionAsked",
                    "tourBookedOn",
                    "tourBookedFor",
                    "notInterested",
                    "hasApplied",
                ]:
                    if key in body:
                        setattr(lead, key, body[key])

                if "leadType" in body:
                    if isinstance(body["leadType"], str):
                        lead.leadType = json.loads(body["leadType"])
                    elif isinstance(body["leadType"], list):
                        lead.leadType = body["leadType"]

                if "followups" in body:
                    lead.followups = body["followups"]

                if "agent" in body:
                    if isinstance(body["agent"], str):
                        temp = json.loads(body["agent"])
                        if isinstance(temp, int):
                            lead.agent = temp

                    elif isinstance(body["agent"], int):
                        lead.agent = body["agent"]

        # conditions for adding info to an existing lead
        if (
            "email" in body
            and "id" not in body
            and len(body["email"]) > 0
            and Lead.query.filter_by(email=body["email"]).first()
        ):
            lead = Lead.query.filter_by(email=body["email"]).first()

            if "name" in body and len(body["name"]) > len(lead.name):
                lead.name = body["name"]

            if "leadType" in body and len(body["leadType"]) > 0:
                temp = []
                if isinstance(body["leadType"], str):
                    temp = json.loads(body["leadType"])
                elif isinstance(body["leadType"], list):
                    temp = body["leadType"]
                leadTypes = lead.leadType + temp
                leadTypes = list(set(leadTypes))
                lead.leadType = leadTypes
                print("the new lead types", leadTypes, flush=True)

            for key in [
                "number",
                "notes",
                "questionAsked",
                "tourBookedOn",
                "tourBookedFor",
            ]:
                if key in body and len(body[key]) > 0:
                    # if number is already created
                    if key == "number" and body[key] in lead.number:
                        continue
                    # check to ensure everything we are adding is larger than zero
                    if len(getattr(lead, key)) > 0:
                        separator = ", "
                        if key == "notes":
                            separator = ",\n\n"
                        setattr(lead, key, body[key] + separator + getattr(lead, key))
                    else:
                        setattr(lead, key, body[key])
                # add new information (for questions, tourbooked, tourbookedon, questionasked, notes, number)
                # leadType, add if not already there (make sure it is a number and )
                # agent if there update it
                # hasApplied / not interested else

            for key in [
                "notInterested",
                "hasApplied",
            ]:
                if key in body:
                    setattr(lead, key, body[key])

            if "agent" in body:
                if isinstance(body["agent"], str):
                    temp = json.loads(body["agent"])
                    if isinstance(temp, int):
                        lead.agent = temp

                elif isinstance(body["agent"], int):
                    lead.agent = body["agent"]

            if "followups" in body:
                lead.followups = body["followups"]

        # create a new lead
        else:
            lead = lead or Lead()

            if body:
                for key in [
                    "name",
                    "email",
                    "number",
                    "notes",
                    "questionAsked",
                    "tourBookedOn",
                    "tourBookedFor",
                    "notInterested",
                    "hasApplied",
                ]:
                    if key in body:
                        setattr(lead, key, body[key])
                if "followups" in body:
                    lead.followups = body["followups"]

                if "leadType" in body:
                    if isinstance(body["leadType"], str):
                        lead.leadType = json.loads(body["leadType"])
                    elif isinstance(body["leadType"], list):
                        lead.leadType = body["leadType"]

                if "agent" in body:
                    if isinstance(body["agent"], str):
                        temp = json.loads(body["agent"])
                        if isinstance(temp, int):
                            lead.agent = temp

                    elif isinstance(body["agent"], int):
                        lead.agent = body["agent"]

            db.session.add(lead)

        try:
            db.session.commit()
        except Exception as e:
            print(e, flush=True)
            raise e

    elif request.method == "GET":
        return jsonify(sqldict(lead))

    return jsonify(id=lead.id, name=lead.name, email=lead.email)


"""
    @DEPRECRATED
"""


@app.route("/send_sms/", methods=["GET", "POST"])
def send_sms():
    # client = plivo.RestClient(auth_id, auth_token)
    # response = client.messages.create(
    #     src="+12065313758",
    #     dst="+529841811149",
    #     text="Hello, this is a sample text TYG",
    # )
    # print(response)
    # # prints only the message_uuid
    # print(response.message_uuid)
    auth_id = secrets["plivo"]["auth_id"]
    auth_token = secrets["plivo"]["auth_token"]
    phlo_id = (
        "5f57d4cc-c61a-4414-bc0a-d6061d1a57cf"  # https://console.plivo.com/phlo/list/
    )
    payload = {"from": "+12065313758", "to": "+529841811149", "clientName": "Amulya"}
    phlo_client = plivo.phlo.RestClient(auth_id=auth_id, auth_token=auth_token)
    phlo = phlo_client.phlo.get(phlo_id)
    response = phlo.run(**payload)


"""
    Use this route to create a new user or get all users
    GET     /users -> lists out all users

    POST    /users -> creates a new user
        @EXAMPLE
        {
            "name": ...,
            "email": ...,
            "phoneNumber": ...,
            "role": ...,
            "apartment_id: ...
        }

        Notes: apartment_id is a @REQUIRED field

"""


@app.route("/users", methods=["GET", "POST"], strict_slashes=False)
def users():
    if request.method == "GET":
        users = []

        if apartment := request.args.get("apartment", default=None, type=int):
            for user in User.query.filter_by(apartment_id=apartment):
                users.append(sqldict(user))
        else:
            for user in User.query.all():
                users.append(sqldict(user))

        return jsonify(users=users)

    elif request.method == "POST":
        # TODO: Check params
        body = request_data()

        # If apartment is given as an string (name of apt)
        if type(body["apartment"]) == type(body["name"]):
            data = (
                db.session.query(Apartment)
                .filter(Apartment.aptName == body["apartment"])
                .one()
            )

            user = User(
                name=body["name"],
                phoneNumber=body["phoneNumber"],
                email=body["email"],
                role=body["role"],
                apartment=data,
            )
        # If apartment is given as an integer (apt id)
        else:
            apartment = Apartment.query.get_or_404(body["apartment"])

            user = User(
                name=body["name"],
                phoneNumber=body["phoneNumber"],
                email=body["email"],
                role=body["role"],
                apartment=apartment,
            )

        db.session.add(user)
        db.session.commit()

        return jsonify(user=sqldict(user)), 201

    return jsonify({"response": 405}), 405


@app.route("/users/<apt_slug>/<type>", methods=["GET"])
def getStaff(apt_slug, type):
    """Returns all users at apartment_id whose role is <type>."""
    # aptName will be a slug so need to convert to name first
    aptName = apt_slug.replace("-", " ").title()
    apt = db.session.query(Apartment).filter(Apartment.aptName == aptName).one()
    # Query User table and filter for apt <type> (staff or maintenance)
    data = (
        db.session.query(User)
        .filter(User.apartment == apt)
        .filter(User.role == type)
        .all()
    )
    # Convert all staff to json in a list
    staff = []
    for datum in data:
        staff.append(sqldict(datum))
    context = {"users": staff}

    return jsonify(**context)


"""
    Use this route to get or modify a specific user
    GET     /users/{{user_id}} -> Returns a specific user information

    PUT     /users/{{user_id}} -> changes a specific users information
        @EXAMPLE
        {
            "name": ...,
            "email": ...,
            "phoneNumber": ...,
            "role": ...,
            "apartment_id: ...
        }

        Notes: Sending an invalid apartment_id will return a 404 response code.
                No changes will be made.

    DELETE  /users/{{user_id}} -> deletes a specific user
        Notes: Sending an invalid user_id will return a 404 response code.
                No changes will be made.
"""


@app.route(
    "/users/<int:user_id>/", methods=["GET", "PUT", "DELETE"], strict_slashes=False
)
def user(user_id):
    if request.method == "GET":
        user = User.query.get_or_404(user_id)

        return jsonify(user=sqldict(user))

    elif request.method == "DELETE":
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()

        return jsonify({"response": 200}), 200

    elif request.method == "PUT":
        body = request_data()
        user = User.query.get_or_404(user_id)

        # TODO: Data transfer objects, try and catch
        if "name" in body:
            user.name = body["name"]

        if "phoneNumber" in body:
            user.phoneNumber = body["phoneNumber"]

        if "email" in body:
            user.email = body["email"]

        if "role" in body:
            user.role = body["role"]

        if "apartment" in body:
            apartment = Apartment.query.get_or_404(body["apartment"])
            user.apartment = apartment

        db.session.commit()
        return jsonify(user=sqldict(user))

    return jsonify({"response": 405}), 405


"""
    Use this route to create a new apartment or to list out all apartments

    GET     /apartments -> returns all apartments

    POST    /apartments -> creates a new apartment
        @EXAMPLE
        {
            "aptName": ...,
            "website": ...,
            "units": ...,
            "propertyType": ..,
            "websiteType": ...
        }
"""


@app.route("/apartments", methods=["GET", "POST"], strict_slashes=False)
def apartment():
    if request.method == "GET":
        apartments = []
        for apartment in Apartment.query.order_by(Apartment.id).all():
            apartments.append(sqldict(apartment))
        # TODO: make search parameters?
        return jsonify(apartments=apartments)

    elif request.method == "POST":
        body = request_data()

        # TODO: Check params
        apartment = Apartment(
            aptName=body["aptName"],
            aptBadges=json.loads(body["aptBadges"]),
            website=body["website"],
            units=body["units"],
            propertyType=body["propertyType"],
            websiteType=body["websiteType"],
            reviewLink=body["reviewLink"],
        )

        db.session.add(apartment)
        db.session.commit()

        return jsonify(apartment=sqldict(apartment)), 201

    return jsonify({"response": 405}), 405


@app.route("/apartments/<apt_slug>", methods=["GET"])
def getApartmentByName(apt_slug):
    """Returns apartment json via search by name."""
    # apt_slug will be the apt name in all lower case
    # connected by '-'
    aptName = apt_slug.replace("-", " ").title()

    # Query by aptName
    data = db.session.query(Apartment).filter(Apartment.aptName == aptName).one()

    return jsonify(apartment=sqldict(data)), 201


"""
    Use this route to modify a specific apartment(community)
    GET     /apartments/{{apartment_id}} -> returns a specific apartment information

    PUT     /apartments/{{apartment_id}} -> modifies a specific apartment information
        @EXAMPLE
        {
            "aptName": ...,
            "website": ...,
            "units": ...,
            "propertyType": ..,
            "websiteType": ...
        }

        Notes: Not all fields have to be changed. Specified fields in the
                response body will be changed. Any values that are not fields
                of Apartments will be ignored

    DELETE      /apartments/{{apartment_id}} -> Deletes an apartment entry
        Notes: Will return a 404 response if apartment_id does not exist.

"""


@app.route(
    "/apartments/<int:apartment_id>",
    methods=["GET", "PUT", "DELETE"],
    strict_slashes=False,
)
def apartments(apartment_id):
    if request.method == "GET":
        apartment = Apartment.query.get_or_404(apartment_id)
        # TODO: Query parameters?
        return jsonify(apartment=sqldict(apartment))

    elif request.method == "PUT":
        # TODO: Data transfer object implementation, this is quick and dirty for now.
        body = request_data()
        apartment = Apartment.query.get_or_404(apartment_id)

        if "aptName" in body:
            apartment.aptName = body["aptName"]

        if "website" in body:
            apartment.website = body["website"]

        if "units" in body:
            apartment.units = body["units"]

        if "propertyType" in body:
            apartment.propertyType = body["propertyType"]

        if "websiteType" in body:
            apartment.websiteType = body["websiteType"]

        if "aptBadges" in body:
            apartment.aptBadges = body["aptBadges"]

        if "specialOffer" in body:
            apartment.specialOffer = body["specialOffer"]

        db.session.commit()
        return jsonify(apartment=sqldict(apartment))

    elif request.method == "DELETE":
        apartment = Apartment.query.get_or_404(apartment_id)
        db.session.delete(apartment)
        db.session.commit()

        return jsonify({"response": 200})


"""
This route initializes the session between two users
"""


@app.route("/startSMS", methods=["GET"])
def startSMS():
    messagesFile = open("messeges.txt", "a")
    session = client.proxy.services(service_sid).sessions.create(
        unique_name="New Session", ttl=3500
    )
    sessionSid = session.sid
    # return ("Session has been created between two users")
    return sendSMS(sessionSid)


"""
This route sends the messeges between two users
"""


@app.route("/sendSMS", methods=["GET"])
def sendSMS(sessionSid):
    participant1 = (
        client.proxy.services(service_sid)
        .sessions(sessionSid)
        .participants.create(
            friendly_name="User 1 Name", identifier="User 1 Phone Number"
        )
    )

    participant2 = (
        client.proxy.services(service_sid)
        .sessions(sessionSid)
        .participants.create(
            friendly_name="User 2 Name", identifier="User 2 Phone Number"
        )
    )

    message_interaction = (
        client.proxy.services(service_sid)
        .sessions(sessionSid)
        .participants(participant1.sid)
        .message_interactions.create(body="Reply To New User To Chat!")
    )

    message_interaction = (
        client.proxy.services(service_sid)
        .sessions(sessionSid)
        .participants(participant2.sid)
        .message_interactions.create(body="Reply To New User To Chat!")
    )

    print(sessionSid)
    # return ("Messeges has been sent")
    return viewSMS(sessionSid)


"""
This route allows users to view the messeges between the users, as well as save them in the
messeges.txt
"""


@app.route("/viewSMS", methods=["GET"])
def viewSMS(sessionSid):
    messagesFile = open("messages.txt", "a")
    messages = []
    messagesFile.write("\n")
    messagesFile.write("Session has been created between User 3 and User 4")
    messagesFile.write("\n")
    interactions = (
        client.proxy.services(service_sid)
        .sessions(sessionSid)
        .interactions.list(limit=20)
    )

    for record in interactions:
        messagesFile.write(record.data)
        messagesFile.write("\n")
        messages.append(record.data)
    return jsonify(messages)


@app.route("/reviews/<int:apartment_id>", methods=["GET", "POST"])
def viewAllReviews(apartment_id):
    """View all reviews for an apartment."""
    # Make sure user and apartment exist
    apartment = Apartment.query.get_or_404(apartment_id)

    # Query table to find all reviews that have this apt id
    data = db.session.query(Review).filter(Review.apartment_id == apartment_id).all()
    # Convert all reviews to json in a list
    reviews = []
    for datum in data:
        reviews.append(sqldict(datum))
    context = {"reviews": reviews}

    return jsonify(**context)


@app.route("/reviews/<apt_slug>/<int:user_id>", methods=["GET", "POST"])
def viewReview(apt_slug, user_id):
    """
        Create new resident review of an apartment or
        view all reviews for an employee of an apartment.
    """
    # Make sure user and apartment exist
    # apartment = Apartment.query.get_or_404(apartment_id)
    user = User.query.get_or_404(user_id)
    # aptName will be a slug so need to convert to name first
    aptName = apt_slug.replace("-", " ").title()
    apt = db.session.query(Apartment).filter(Apartment.aptName == aptName).one()

    if request.method == "POST":  # TODO: maybe try catch block? for 404 error
        # Get JSON from request
        body = request_data()

        # Create new review
        new_review = Review(
            rating=body.get("rating"),
            review=body.get("review"),
            aptBadges=body.get("badges"),
            apartment=apt,
            user_id=user_id,
        )

        # Put new review into database
        db.session.add(new_review)
        db.session.commit()

    # GET request
    # Query table to find all reviews that have this apt id and this user id
    data = (
        db.session.query(Review)
        .filter(Review.apartment == apt)
        .filter(Review.user_id == user_id)
        .all()
    )
    # Convert all reviews to json in a list
    reviews = []
    for datum in data:
        reviews.append(sqldict(datum))
    context = {"reviews": reviews}

    return jsonify(**context)


@app.route("/badges/<apt_slug>/<type>", methods=["GET"])
def getBadgeCount(apt_slug, type):
    """Returns dictionary with <type> of badges mapped to their amount."""
    # aptName will be a slug so need to convert to name first
    aptName = apt_slug.replace("-", " ").title()
    apt = db.session.query(Apartment).filter(Apartment.aptName == aptName).one()

    # Get all reviews for this apartment
    data = db.session.query(Review).filter(Review.apartment == apt).all()

    # Map to keep track of counts
    badges = {}

    # Type: "apartment" or "staff"
    # Parse through all reviews
    for datum in data:
        # Convert sql table to json
        review = sqldict(datum)
        # In case aptBadges doesn't even exist in this review
        if review["aptBadges"]:
            # Parse through apt badges
            for badge in review["aptBadges"]["staff" if type == "staff" else "apt"]:
                # If badge doesn't exist yet
                badges.setdefault(badge, 0)
                # Add count for this badge
                badges[badge] += 1

    return jsonify(badges=badges)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
