import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from collections import Counter
import PyPDF2
import filetype

def is_pdf_file(file):
    header = file.read(261)
    file_type = filetype.guess(header)
    if file_type is None or file_type.extension.lower() != 'pdf':
        return False

    return True

def extract_text_from_pdf(file):
    text = ""
    reader = PyPDF2.PdfReader(file)
    for page in reader.pages:
        text += page.extract_text()

    return text

def process_keywords(keywords_string):
    keywords_string = keywords_string.replace(" ","")
    keywords_string=keywords_string.lower()
    keywords=keywords_string.split(",")

    return keywords

def extract_programming_keywords(resume_text,desired_keywords,num_keywords=10,):
    # Tokenize the resume text
    tokens = word_tokenize(resume_text.lower())

    # Remove stop words
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token.isalpha() and token not in stop_words]

    # Filter tokens to include only programming terms
    programming_tokens = [token for token in tokens if token in desired_keywords]

    # Extract top keywords
    top_keywords = list(set(programming_tokens))[:num_keywords]

    return top_keywords

def resume_score_calc(desired_keywords, applicant_keywords):
    resume_score = len(applicant_keywords)/len(desired_keywords)
    resume_percent = resume_score * 100

    return round(resume_percent)
