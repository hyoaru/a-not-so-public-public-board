from datetime import datetime

# App imports
from api.instances import database

class PublicPost(database.Model):
    id = database.Column(database.Integer, primary_key = True)
    author = database.Column(database.String(50), nullable = False)
    message = database.Column(database.String(300), nullable = False)
    cipher = database.Column(database.String(300), nullable = False)
    key = database.Column(database.String(50), nullable = False)
    is_decrypted = database.Column(database.Boolean, nullable = False, default = False)
    is_archived = database.Column(database.Boolean, nullable = False, default = False)
    creation_date = database.Column(database.DateTime, nullable = False, default = datetime.now)

    def __repr__(self):
        return f"PublicPost('({self.id}', '({self.cipher})'))"
    
    def save_record(self):
        database.session.add(self)
        database.session.commit()

    def delete_record(self):
        database.session.delete(self)
        database.session.commit()

    def archive_record(self):
        self.is_archived = True
        database.session.commit()
    
    def unarchive_record(self):
        self.is_archived = False
        database.session.commit()

    def decrypt_record(self):
        self.is_decrypted = True
        database.session.commit()

    def encrypt_record(self):
        self.is_decrypted = False
        database.session.commit()
    
    @classmethod
    def get_all(cls):
        public_posts = cls.query.all()
        return public_posts
    
    @classmethod
    def get_by_id(cls, id):
        public_post = cls.query.filter_by(id = id).first()
        return public_post
    
    @classmethod
    def get_all_not_archived(cls):
        public_posts = cls.query.filter_by(is_archived = False).all()
        return public_posts
    
    @classmethod
    def get_all_archived(cls):
        public_posts = cls.query.filter_by(is_archived = True).all()
        return public_posts
    
    @classmethod
    def get_all_decrypted(cls):
        public_posts = cls.query.filter_by(is_decrypted = True).all()
        return public_posts
    
    @classmethod
    def get_all_not_decrypted(cls):
        public_posts = cls.query.filter_by(is_archived = False).all()
        return public_posts