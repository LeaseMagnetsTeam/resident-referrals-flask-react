from flask import Flask, request, jsonify, redirect, render_template
from flask_cors import CORS
from models import db, Lead, ConstantsModel
from util import request_data
import os
import json
import plivo


app = Flask(__name__)
conf = os.environ.get("APP_SETTINGS", "config.StagingConfig")
app.config.from_object(conf)
db.init_app(app)
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
    return "hello world"


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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)

