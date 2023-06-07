from flask import Flask, request
from parse_functions import extract_text_from_pdf, extract_programming_keywords, resume_score_calc, process_keywords
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os

app = Flask(__name__)
CORS(app)


connection_string = os.getenv("MONGODB_URI")
client = MongoClient(connection_string)

db = client['resume-parser-db']
collection = db.applicants

@app.route('/add-applicant', methods=['POST'])
def add_applicant():
    #get the file and fields from the request
    applicant_name = request.form["name"]
    applicant_file = request.files["file"]
    desired_keywords_string = request.form["keywords"]

    #processing data to fill db
    desired_keywords = process_keywords(desired_keywords_string)
    applicant_resume_text = extract_text_from_pdf(applicant_file)
    applicant_keywords = extract_programming_keywords(applicant_resume_text, desired_keywords)
    applicant_score = resume_score_calc(desired_keywords, applicant_keywords)

    #creating the JSON
    document = {
        "applicant_name":applicant_name, 
        "applicant_score": applicant_score, 
        "applicant_keywords":applicant_keywords
    }

    collection.insert_one(document)
    document = dumps(document)
    return document


@app.route('/applicants', methods=['GET'])
def get_applicants():
    data = list(collection.find().sort("applicant_score",-1))
    documents = dumps(data)
    return documents


if __name__ == "__main__":
    app.run(debug=True)