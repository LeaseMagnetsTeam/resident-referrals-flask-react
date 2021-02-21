import os
import sqlalchemy

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = "Content-Type"
    SECRET_KEY = b""
    ADMIN_USERNAME = ""
    ADMIN_PW_HASH = ""


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "")


class StagingConfig(Config):
    DEVELOPMENT = True
    # SQLALCHEMY_DATABASE_URI = os.environ.get(
    #     "DATABASE_URL",
    #     "postgresql://postgres:super_secret_dont_share@db:5432/leasemagnets",
    # )

    # SQLALCHEMY_DATABASE_URI = os.environ.get(
    #     "DATABASE_URL",
    #     "postgresql+pg8000://postgres:848971TYGBUILD@db:5432/leasemagnets",
    # )
    DEBUG = True

    # https://stackoverflow.com/questions/58921457/having-trouble-connecting-to-cloud-sql-postgresql-using-pythons-sqlalchemy

    username = "postgres"  # DB username
    password = "848971TYGBUILD"  # DB password
    host = "35.222.83.195"  # Public IP address for your instance
    port = "5432"
    database = ""  # Name of database ('postgres' by default)

    db_url = "postgresql+psycopg2://{}:{}@{}:{}/{}".format(
        username, password, host, port, database
    )

    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", db_url,)

