import os

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
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "postgresql://postgres:super_secret_dont_share@db:5432/leasemagnets",
    )
    DEBUG = True
