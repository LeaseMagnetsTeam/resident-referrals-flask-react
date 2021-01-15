import os
import secrets

from flask import Flask, render_template, flash, request, redirect, url_for, session
from twilio.rest import Client

import pyrebase
import json

app = Flask(__name__)

app.secret_key = secrets.token_urlsafe(16)

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
twilio_services = os.environ['TWILIO_SERVICE_TOKEN']

with open("firebase.json") as f:
    config = json.load(f)
    firebase = pyrebase.initialize_app(config)

db = firebase.database()
auth = firebase.auth()

client = Client(account_sid, auth_token)

@app.route('/' , methods = ['GET' , 'POST'])
def SignInForm():
    error = 'aaaa'
    if request.method == 'POST':
        user = auth.sign_in_with_email_and_password(request.form['email'], request.form['password'])
        users = db.child('users').get()

        if not auth.get_account_info(user['idToken'])['users'][0]['emailVerified']:
            return render_template('signin.html', error='Email not authenticated') 

        print(users.val()[user['localId']]['verified'])

        if not users.val()[user['localId']]['verified']:
            session['uuid'] = user['localId']
            print('1111')
            return redirect(url_for('PhoneVerification'))

        return redirect(url_for('Welcome'))

    return render_template('signin.html')

@app.route('/signup' , methods = ['GET' , 'POST'])
def SignUpForm():
    if request.method == 'POST':

        phonenumber = request.form['phoneNumber']
        phonenumber = '+' + phonenumber

        # Find if number exists
        phone_book = db.child('phone-verification').child('verified') \
                        .shallow().get().val()

        if phonenumber not in phone_book:
            verification = client.verify \
                        .services(twilio_services) \
                        .verifications \
                        .create(to=phonenumber, channel='sms')

            payload = {
                phonenumber:\
                    {"verified": False}
            }

            db.child('phone-verification').child('verified').update(payload)

            print(verification)

            user = auth.sign_in_with_email_and_password(request.form['email'], request.form['password'])
            print(user['localId'])

            payload = {
                user['localId']:
                {
                    'phone-number': phonenumber,
                    'verified': False
                }
            }

            db.child('users').update(payload)
        else:
            print('number exists')
            return redirect(url_for('SignUpForm'))


        return redirect(url_for('SignInForm'))

    return render_template('signup.html')

@app.route('/phone-verification', methods = ['GET', 'POST'])
def PhoneVerification():
    if request.method == 'POST':
        sms_verification = []
        for num in request.form:
            sms_verification.append(request.form[num])

        sms_verification = ''.join(sms_verification)

        phone_number = db.child('users').child(session['uuid']).get().val()['phone-number']

        verification_check = client.verify \
                                .services(twilio_services) \
                                .verification_checks \
                                .create(to=phone_number, code=sms_verification)

        print(sms_verification)
        print(verification_check.status)

        db.child('users').child(session['uuid']).update({'verified': True})
        db.child('phone-verification').child('verified').child(phone_number).update({'verified': True})
        

        if verification_check.status == 'approved':
            return render_template('signin.html')

    return render_template('verifyphone.html')

@app.route('/welcome' , methods = ['GET' , 'POST'])
def Welcome():
    return render_template('welcome.html')

if __name__ == "__main__":
    app.run(debug=True)
