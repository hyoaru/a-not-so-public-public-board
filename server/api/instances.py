from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_marshmallow import Marshmallow
from flask_cors import CORS

database = SQLAlchemy()
ma = Marshmallow()
api = Api()
cors = CORS()