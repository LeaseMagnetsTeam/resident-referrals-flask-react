FROM python:3.8-slim

# copy requirements first to utilize docker caching
COPY ./app/requirements.txt /
RUN pip install --no-cache-dir -r /requirements.txt

WORKDIR /app

COPY ./app .

ENV FLASK_ENV production

CMD [ "python", "app.py" ]
