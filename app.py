from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['resume_data']
collection = db['applicant_keywords']

desired_keywords = []

@app.route('/submit-keywords', methods=['POST'])
def submit_keywords():
    global desired_keywords
    keywords = request.form.get('keywords')
    desired_keywords = [keyword.strip() for keyword in keywords.split(',')]
    return 'Keywords submitted successfully'

@app.route('/submit-resume', methods=['POST'])
def submit_resume():
    resume_file = request.files.get('resume')

    # Read the PDF file and extract the text
    pdf_reader = PdfReader(resume_file)
    resume_text = ""
    for page in pdf_reader.pages:
        resume_text += page.extract_text()

    # Perform keyword matching and calculate the score
    matched_keywords = [keyword for keyword in desired_keywords if keyword in resume_text]
    score = len(matched_keywords)

    # Store the matched keywords in the MongoDB collection
    collection.insert_one({'keywords': matched_keywords})

    return jsonify({'score': score})

@app.route('/reset', methods=['POST'])
def reset_keywords():
    global desired_keywords
    desired_keywords = []
    return 'Keywords reset successfully'

if __name__ == '__main__':
    app.run(debug=True)