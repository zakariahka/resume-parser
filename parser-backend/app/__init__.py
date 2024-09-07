from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

connection_string = os.getenv("MONGODB_URI")
client = MongoClient(connection_string)

db = client['parsume']
collection = db.applicants
users = db.users

from app import applicant_routes
from app import login_routes