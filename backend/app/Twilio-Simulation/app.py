from flask import Flask, request, jsonify, redirect, render_template,url_for
from twilio.rest import Client
from keys import *
app = Flask(__name__)
client = Client(account_sid, auth_token)
sessionSid = ''

"""
This route starts the session between two users
"""
@app.route("/", methods=["GET" , "POST"])
def index():
    return(render_template('index.html'))

"""
This route starts the session between two users
"""
@app.route("/startSMS", methods=["GET" , "POST"])
def startSMS():
    if request.method == 'POST':
        global sessionSid
        session = client.proxy.services(service_sid) \
                          .sessions \
                          .create(unique_name='SessionBetweenUser1+User2' , ttl = 3500)
        sessionSid = session.sid
        return redirect(url_for('sendSMS'))
        #return ("Session has been created between two users")
    return(render_template('startSMS.html'))


"""
This route sends the messeges between two users
"""
@app.route("/sendSMS", methods=["GET" , "POST"])
def sendSMS():

    if request.method == 'POST':
        messege = request.form['messege']
        participant1 = client.proxy \
                        .services(service_sid) \
                        .sessions(sessionSid) \
                        .participants \
                        .create(friendly_name='Kyle', identifier='+17144229652')

        participant2 = client.proxy \
                            .services(service_sid) \
                            .sessions(sessionSid) \
                            .participants \
                            .create(friendly_name='Neala', identifier='+16192467421')

        message_interaction = client.proxy \
            .services(service_sid) \
            .sessions(sessionSid) \
            .participants(participant1.sid) \
            .message_interactions \
            .create(body=messege)

        message_interaction = client.proxy \
            .services(service_sid) \
            .sessions(sessionSid) \
            .participants(participant2.sid) \
            .message_interactions \
            .create(body=messege)

        print(sessionSid)
        return redirect(url_for('viewSMS'))
    #return ("Messeges has been sent")
    return(render_template('sendSMS.html'))


"""
This route allows users to view the messeges between the users
"""
@app.route("/viewSMS", methods=["GET" , "POST"])
def viewSMS():
    messegesFile = open('messeges.txt' , 'a')
    messages = []
    messegesFile.write("\n")
    messegesFile.write('Session has been created between User 3 and User 4')
    messegesFile.write("\n")
    if request.method == 'GET':
        interactions = client.proxy \
                         .services(service_sid) \
                         .sessions(sessionSid) \
                         .interactions \
                         .list(limit=20)

        for record in interactions:
            messegesFile.write(record.data)
            messegesFile.write("\n")
            messages.append(record.data)
        return (render_template('viewSMS.html' , messages=messages))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
