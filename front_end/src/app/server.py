# front_end\src\app\server.py

from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from api.model1py import make_prediction  # Adjusted import statement

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return 'Welcome to the Flask API!'

@app.route('/api/model1', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Perform prediction using the uploaded file
        prediction = make_prediction(file_path)
        
        return jsonify({'data': prediction})
    
    return jsonify({'error': 'Something went wrong'})

if __name__ == '__main__':
    app.run(debug=True)