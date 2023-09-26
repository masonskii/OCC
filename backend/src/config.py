import os

from dotenv import load_dotenv

load_dotenv()

DB_HOST: str | None = os.environ.get("DB_HOST")
DB_PORT: str | None = os.environ.get("DB_PORT")
DB_USER: str | None = os.environ.get("DB_USER")
DB_PASS: str | None = os.environ.get("DB_PASS")
DB_NAME: str | None = os.environ.get("DB_NAME")

SECRET_COOKIE: str | None = os.environ.get("SECRET_COOKIE")

