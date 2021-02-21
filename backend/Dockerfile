FROM python:3.8-slim

# Copy requirements first to utilize docker caching
COPY ./app/requirements.txt /
RUN pip install --no-cache-dir -r /requirements.txt

WORKDIR /app

COPY ./app .

# Put other env variables in .leasemagnets.env or .db.env
ENV FLASK_ENV production

CMD [ "python", "app.py" ]
