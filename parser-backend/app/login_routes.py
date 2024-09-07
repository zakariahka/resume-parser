from app import users, app
from flask import request, jsonify
from bson.json_util import dumps
import json
from bcrypt import gensalt, hashpw, checkpw
import re
from flask_jwt_extended import JWTManager, create_access_token
import os
from dotenv import load_dotenv

load_dotenv()

jwt_secret_key = os.getenv('JWT_SECRET_KEY')

app.config["JWT_SECRET_KEY"] = jwt_secret_key
jwt = JWTManager(app)

def create_token(user_id):
    access_token = create_access_token(identity=user_id)
    return access_token

@app.route('/register', methods = ["POST"])
def register():
    
    email = request.get_json().get("email")
    password = request.get_json().get("password")

    if not email or not password:
        return jsonify({'error': 'Fields should not be empty'}), 400
    
    valid_email = re.match(r'^[\w.-]+@[\w.-]+\.\w+$', email)
    if not valid_email:
        return jsonify({'error': 'Invalid email format'}), 400
    
    is_valid_password = re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', password)

    if not is_valid_password:
        return jsonify({'error': 'Password is not strong enough'}), 400
    
    exists = users.find_one({"email":email})

    if exists:
        return jsonify({'error': 'User already exists'}), 400
    
    encoded_password = password.encode('utf-8')
    salt = gensalt(10)
    hashed_password = hashpw(encoded_password,salt)

    user = {
        "email":email,
        "password":hashed_password,
    }

    inserted_user = users.insert_one(user)
    inserted_user_id = inserted_user.inserted_id
    serialized_user_id = json.loads(dumps(inserted_user_id))
    token = create_token(str(serialized_user_id['$oid']))

    return jsonify({"email": email, "token": token}), 200

@app.route('/login', methods = ["POST"])
def login():

    email = request.get_json().get("email")
    password = request.get_json().get("password")

    if not email or not password:
        return jsonify({'error': 'Fields should not be empty'}), 400

    user = users.find_one({"email":email})

    if not user:
        return jsonify({'error': 'Incorrect Email'}), 400
    
    entered_password = password.encode('utf-8')

    match = checkpw(entered_password,user["password"])
    
    if not match:
        return jsonify({'error': 'Incorrect Password'}), 400
    
    user_id = str(user["_id"])

    token = create_token(user_id)

    return jsonify({"email": email, "token": token}), 200

@app.route('/test-db-connection', methods=["GET"])
def test_db_connection():
    try:
        # Perform a simple query to check if connection is successful
        # For example, count the documents in the 'users' collection
        user_count = users.count_documents({})
        return jsonify({
            "status": "success",
            "message": "Successfully connected to MongoDB",
            "user_count": user_count
        }), 200
    except Exception as e:
        # Catch any exception and return an error message
        return jsonify({
            "status": "fail",
            "message": f"Failed to connect to MongoDB: {str(e)}"
        }), 500
