from flask import request, abort
from flask_restful import Resource

# App imports
from api.models import PublicPost as database_model_public_post
from api.schemas import PublicPostSchema as schema_public_post
from api.vigenere_cipher import VigenereCipher

public_post_schema = schema_public_post()
class PublicPost(Resource):
    def get(self, public_post_id):
        def format_public_posts(public_posts):
            formatted_public_posts = [public_post_schema.dump(public_post) for public_post in public_posts]
            return formatted_public_posts

        response = {'public_posts': ''}
        if public_post_id not in ['all', 'archived', 'not_archived', 'decrypted', 'not_decrypted']:
            public_post = database_model_public_post.get_by_id(public_post_id)
            formatted_public_post = public_post_schema.dump(public_post)
            response.update({'public_posts': formatted_public_post})
        else:
            if public_post_id == 'all':
                public_posts = database_model_public_post.get_all()
            elif public_post_id == 'not_archived':
                public_posts = database_model_public_post.get_all_not_archived()
            elif public_post_id == 'archived':
                public_posts = database_model_public_post.get_all_archived()
            elif public_post_id == 'decrypted':
                public_posts = database_model_public_post.get_all_decrypted()
            elif public_post_id == 'not_decrypted':
                public_posts = database_model_public_post.get_all_not_decrypted()

            formatted_public_posts = format_public_posts(public_posts)
            response.update({'public_posts': formatted_public_posts})            

        return response, 200
    
    def put(self, public_post_id):
        response = {'public_posts': ''}
        
        if public_post_id == 'encrypt':
            new_public_message = database_model_public_post(
                author = request.form['author'],
                message = request.form['message'],
                key = request.form['key'],
                cipher = VigenereCipher.encrypt_message(
                    message = request.form['message'],
                    key = request.form['key']), )
            
            new_public_message.save_record()
            formatted_new_public_message = public_post_schema.dump(new_public_message)
            response.update({'public_posts': formatted_new_public_message})
            return response, 201    
        
        elif public_post_id == 'decrypt':
            public_post = database_model_public_post.get_by_id(request.form['id'])
            if (request.form['key'] == public_post.key):
                public_post.decrypt_record()
            return "", 200

    
    def delete(self, public_post_id):
        public_post_to_delete = database_model_public_post.get_by_id(public_post_id)
        if public_post_to_delete is None:
            abort(404)
        else:
            public_post_to_delete.archive_record()
            
        return "", 204

class CryptographyMessage(Resource):
    def put(self, route):
        if route not in ['encrypt', 'decrypt']:
            abort(404)
        else:
            if route == 'encrypt':
                message = request.form['message']
                key = request.form['key']
                cipher = VigenereCipher.encrypt_message(message = message, key = key)
                response = {'cipher': cipher, 'message': message, 'key': key}
                return response
            elif route == 'decrypt':
                cipher = request.form['cipher']
                key = request.form['key']
                message = VigenereCipher.decrypt_cipher(cipher = cipher, key = key)
                response = {'cipher': cipher, 'message': message, 'key': key}
                return response
