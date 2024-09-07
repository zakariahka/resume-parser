from flask import request, jsonify
from parse_functions import extract_text_from_pdf, extract_programming_keywords, resume_score_calc, process_keywords, is_pdf_file
from bson.json_util import dumps
from app import app
from app import collection
from auth import require_auth

@app.route('/add-applicant', methods=['POST'])
@require_auth
def add_applicant():
    applicant_name = request.form.get("name")
    applicant_file = request.files.get("file")
    desired_keywords_string = request.form.get("keywords")
    user_id = request.user_id

    if not applicant_name or not applicant_file or not desired_keywords_string:
        return jsonify({'error': 'One or more fields are empty.'}), 400

    if not is_pdf_file(applicant_file):
         return jsonify({'error': 'You did not send a pdf file.'}), 400

    desired_keywords = process_keywords(desired_keywords_string)
    applicant_resume_text = extract_text_from_pdf(applicant_file)
    applicant_keywords = extract_programming_keywords(applicant_resume_text, desired_keywords)
    applicant_score = resume_score_calc(desired_keywords, applicant_keywords)

    document = {
        "applicant_name":applicant_name, 
        "applicant_score": applicant_score, 
        "applicant_keywords":applicant_keywords,
        "user_id":user_id
    }

    collection.insert_one(document)
    document = dumps(document)
    return document


@app.route('/applicants', methods=['GET'])
@require_auth
def get_applicants():
    user_id = request.user_id
    data = list(collection.find({"user_id":user_id}).sort("applicant_score",-1).limit(10))
    documents = dumps(data)
    return documents