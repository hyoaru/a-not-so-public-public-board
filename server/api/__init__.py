import os
from flask import Flask
from dotenv import load_dotenv

# App imports
from api.instances import api, database, ma, cors
from api.models import PublicPost as model_public_post
from api.resources import PublicPost as resource_public_post
from api.resources import CryptographyMessage as resource_cryptography_message

def create_app():
    app = Flask(__name__)

    # Load configurations 
    load_dotenv()
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI_PRODUCTION')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

    # Add resources
    api.add_resource(resource_public_post, '/public_post/<public_post_id>')
    api.add_resource(resource_cryptography_message, '/message/<route>')

    # Initialize instances
    database.init_app(app)
    ma.init_app(app)
    cors.init_app(app)
    api.init_app(app)

    with app.app_context():
        database.create_all()
        print(f"\nCreated database")

    return app