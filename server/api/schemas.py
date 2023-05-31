# App imports
from api.instances import ma
from api.models import PublicPost as database_model_public_post

class PublicPostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = database_model_public_post
        include_fk = True
        load_instance = True