import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
import os
import re

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://cybersapient_user:cybersapient_password@localhost:5432/cybersapient')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# PostgreSQL specific configurations
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_pre_ping': True,
    'pool_recycle': 300,
}

# Configure CORS
cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
CORS(app, 
     origins=cors_origins,
     methods=['GET', 'POST', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization'],
     supports_credentials=True)
db = SQLAlchemy(app)

# Database model for demo requests
class DemoRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    company_name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(80), nullable=False)
    message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'company_name': self.company_name,
            'username': self.username,
            'message': self.message,
            'created_at': self.created_at.isoformat()
        }

# Input validation functions
def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_input(data):
    """Validate request data"""
    errors = {}
    
    # Check required fields
    required_fields = ['email', 'company_name', 'full_name']
    for field in required_fields:
        if not data.get(field) or not data[field].strip():
            errors[field] = f'{field.replace("_", " ").title()} is required'
    
    # Validate email format
    if data.get('email') and not validate_email(data['email']):
        errors['email'] = 'Invalid email format'
    
    # Validate field lengths
    if data.get('full_name') and len(data['full_name'].strip()) < 2:
        errors['full_name'] = 'Name must be at least 2 characters'
    
    if data.get('company_name') and len(data['company_name'].strip()) < 2:
        errors['company_name'] = 'Company name must be at least 2 characters'
    
    if data.get('message') and len(data['message'].strip()) > 1000:
        errors['message'] = 'Message must be less than 1000 characters'
    
    return errors

# Create tables with proper error handling
with app.app_context():
    try:
        # Test database connection
        db.engine.connect()
        print("Successfully connected to PostgreSQL database")
        
        # Create all tables
        db.create_all()
        print("Database tables created successfully")
        
    except Exception as e:
        print(f"Database connection error: {e}")
        print("Make sure PostgreSQL is running and the database exists")
        # Don't exit - let the app start but log the error
        pass

@app.route('/api/demo-request', methods=['POST'])
def submit_demo_request():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        # Validate input
        validation_errors = validate_input(data)
        if validation_errors:
            return jsonify({
                'success': False,
                'message': 'Validation failed',
                'errors': validation_errors
            }), 400
        
        # Sanitize input data
        sanitized_data = {
            'email': data['email'].strip().lower(),
            'company_name': data['company_name'].strip(),
            'full_name': data['full_name'].strip(),
            'message': data.get('message', '').strip()
        }
        
        # Create new demo request
        demo_request = DemoRequest(
            email=sanitized_data['email'],
            company_name=sanitized_data['company_name'],
            username=sanitized_data['full_name'],
            message=sanitized_data['message']
        )
        
        # Save to database
        db.session.add(demo_request)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Demo request submitted successfully!',
            'id': demo_request.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error submitting demo request: {str(e)}'
        }), 500

@app.route('/api/demo-requests', methods=['GET'])
def get_demo_requests():
    try:
        requests = DemoRequest.query.order_by(DemoRequest.created_at.desc()).all()
        return jsonify([req.to_dict() for req in requests]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    port = int(os.getenv('PORT', 5000))
    app.run(debug=debug_mode, port=port, host='0.0.0.0')

#CD test